import { routesWrapper } from "./urls/urls";
import { UsersDAL } from "./data-access/data-access";
import { UsersController } from "./controller/controller";
import { connection } from "../../config/config";
import { DB } from "../../z-library/db/db";
import { userSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";
import { Router } from "express";

let usersRouter: Router
try {
    const db = new DB(connection.switch('homenest-users'))
    const UserModel = db.createModel('User', userSchema)
    
    const usersDAL = new UsersDAL(UserModel)
    const controller = new UsersController(usersDAL, 'users')
    usersRouter = routesWrapper(controller, authenticator)
    
} catch (error: any) {
    console.log("Error occured while Switching to Users Database: \n", error.message)
}

export { usersRouter }
