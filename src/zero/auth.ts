import Authenticator from "./auth/auth";

const authenticator = new Authenticator()

const createTokenPayload = authenticator.createTokenPayload
export { authenticator, createTokenPayload, Authenticator }