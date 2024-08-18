import { ZeroUser } from "../bases/user";

export interface UserGroup {
    isAdmin: (user: ZeroUser) => boolean
}