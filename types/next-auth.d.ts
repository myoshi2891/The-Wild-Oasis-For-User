import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			guestId?: number;
		} & import("next-auth").DefaultSession["user"];
	}
	interface User {
		guestId?: number;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		guestId?: number | null;
	}
}