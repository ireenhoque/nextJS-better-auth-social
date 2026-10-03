import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
});

export const {
    signIn,
    signUp,
    signOut,
    updateUser,
    requestPasswordReset,
    resetPassword,
    useSession,
} = authClient;


/**
 * sign up: register: create Account: first time user
 * sign in: log in: already have account: repeated user
 * sign out: log out
 */