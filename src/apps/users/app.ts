import { routesWrapper } from "./urls/urls";
import { UsersDAL } from "./data-access/data-access";
import { UsersController } from "./controller/controller";
import { connection } from "../../config/config";
import { DB } from "../../z-library/db/db";
import { userSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";
import { Router } from "express";
import 'dotenv/config'

let usersRouter: Router
const usersDbName = process.env.USERSDB_NAME

try {
    if(usersDbName) {
        const db = new DB(connection.switch(usersDbName))
        const UserModel = db.createModel('User', userSchema)
        
        const usersDAL = new UsersDAL(UserModel)
        const controller = new UsersController(usersDAL, 'users')
        usersRouter = routesWrapper(controller, authenticator)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Users Database: ", error.message)
}

export { usersRouter }
