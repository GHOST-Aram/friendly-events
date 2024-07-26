import { routesWrapper } from "./urls/urls";
import { DataAccess } from "./data-access/data-access";
import { Controller } from "./controller/controller";
import { connection } from "../../_config/config";
import { DB } from "../../z-library/db/db";
import { categorySchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";
import { Router } from "express";
import 'dotenv/config'

let categoriesRouter: Router
const categoriesDbName = process.env.CATEGORIESDB_NAME

try {
    if(categoriesDbName) {
        const db = new DB(connection.switch(categoriesDbName))
        const CategoryModel = db.createModel('Category', categorySchema)
        
        const categoriesDAL = new DataAccess(CategoryModel)
        const controller = new Controller(categoriesDAL, 'categories')
        categoriesRouter = routesWrapper(controller, authenticator)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Categories Database: ", error.message)
}

export { categoriesRouter }
