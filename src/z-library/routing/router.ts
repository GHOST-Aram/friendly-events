import { Router } from "express";
import { Authenticator } from "../auth/auth";
import { Controller } from "../types";
import { AppRouter } from "./app-router";

export class GhostRouter implements AppRouter{
    public router: Router;
    public controller: Controller
    public authenticator: Authenticator;

    constructor(controller: Controller, authenticator: Authenticator){
        this.router = Router()
        this.controller = controller
        this.authenticator = authenticator
    }
    
    
    public authenticateAndControlRoutes = (): Router =>{
        return this.router
    }
    
}
