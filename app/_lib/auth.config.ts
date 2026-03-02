import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: { signIn: "/login" },
	providers: [], // Providers are configured in auth.ts
	callbacks: {
		// ミドルウェアでの認証チェック（エッジランタイム対応）
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnAccount = nextUrl.pathname.startsWith("/account");
			if (isOnAccount && !isLoggedIn) return false; // → signIn ページへ
			return true;
		},
	},
} satisfies NextAuthConfig;
