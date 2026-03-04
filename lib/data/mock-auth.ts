/**
 * Mock auth triggers for testing error states.
 * Auth pages import these constants so triggers are centralized and discoverable.
 *
 * Usage: Enter these values in auth forms to trigger specific error states.
 */

/** Email that triggers "email not found" on sign-in */
export const MOCK_ERROR_EMAIL = "error@test.com";

/** Password that triggers "wrong password" on sign-in */
export const MOCK_WRONG_PASSWORD = "wrong";

/** Email that triggers "account already exists" on provider-apply */
export const MOCK_EXISTING_EMAIL = "existing@test.com";

/** Token that triggers "magic link expired" on set-password */
export const MOCK_EXPIRED_TOKEN = "expired";

/** Any other email/password combo succeeds (mock) */
