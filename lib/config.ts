export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
export const SESSION_MAX_AGE = 60 * 60 * 6;
export const AUTH_COOKIE_NAME =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";