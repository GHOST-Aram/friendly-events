import { Controller } from "../types"
import { Authenticator } from "../auth/auth"
import { Router } from "express"

export interface AppRouter{
    router: Router
    controller: Controller
    authenticator: Authenticator
    authenticateAndControlRoutes: ()=> Router
}