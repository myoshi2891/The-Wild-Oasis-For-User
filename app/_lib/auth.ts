import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest, DatabaseError } from "./data-service";
import { logger } from "./logger";
import { authConfig } from "./auth.config";
import type { Guest } from "@/types/domain";

/**
 * Fetches a guest by email and creates one if none exists.
 * @param email - The guest's email address to look up or create.
 * @param name - Optional full name for a new guest; if omitted, the guest's `fullName` will be set to empty string.
 * @returns The guest record for the given email, either existing or newly created.
 */
async function getOrCreateGuestByEmail(
	email: string,
	name: string | null | undefined
): Promise<Guest> {
	const existing = await getGuest(email); // publicクライアントでOK（SELECT）
	if (existing) return existing;
	// 作成は service-role（createGuest内でadminクライアント使用）
	try {
		return await createGuest({ email, fullName: name ?? "" });
	} catch (error) {
		const dbError = error as DatabaseError;
		if (dbError?.code === "23505") {
			const createdByAnotherRequest = await getGuest(email);
			if (createdByAnotherRequest) return createdByAnotherRequest;
		}
		throw error;
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	// セッションはJWT運用を明示
	session: { strategy: "jwt" },

	callbacks: {
		...authConfig.callbacks,
		// ① サインイン時：ここでは認証のみ
		async signIn() {
			return true;
		},

		// ② JWT：ここで一度だけDBに触れて guestId をトークンへ
		async jwt({ token, user, trigger }) {
			try {
				// 初回（サインイン直後）は user が入る。以後は token 維持
				const email = user?.email ?? token?.email;
				const name = user?.name ?? token?.name;

				if (email && (trigger === "signIn" || token.guestId === undefined)) {
					const guest = await getOrCreateGuestByEmail(email, name);
					token.guestId = guest?.id ?? null; // 失敗してもnullを格納しておく
				}
			} catch (error) {
				logger.error({
					event: "GUEST_LOOKUP_FAILED",
					message: "Guest lookup failed in getOrCreateGuestByEmail",
					email: token?.email ?? user?.email,
					trigger,
					error: error instanceof Error ? error.message : String(error)
				});
				throw error; // Fail-fast: do not silently continue leaving token.guestId undefined
			}
			return token;
		},

		// ③ セッション：DBに触れず token から写すだけ
		async session({ session, token }) {
			// token.guestId は number | null | undefined のいずれかを取りうる
			// session.user.guestId は number | undefined のみ許容するため、null を undefined に変換
			if (session?.user) {
				session.user.guestId =
					typeof token?.guestId === "number" ? token.guestId : undefined;
			}
			return session;
		},
	},
});
