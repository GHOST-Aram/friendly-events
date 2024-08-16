import authenticator from "./auth/auth";

const createTokenPayload = authenticator.createTokenPayload

export { authenticator, createTokenPayload }