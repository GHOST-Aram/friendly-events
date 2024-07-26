import { routesWrapper } from "./urls/urls";
import { DataAccess } from "./data-access/data-access";
import { Controller } from "./controller/controller";
import { connection } from "../../_config/config";
import { DB } from "../../z-library/db/db";
import { venueSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";
import { Router } from "express";
import 'dotenv/config'

let venuesRouter: Router
const venuesDbName = process.env.VENUESDB_NAME

try {
    if(venuesDbName) {
        const db = new DB(connection.switch(venuesDbName))
        const VenueModel = db.createModel('Venue', venueSchema)
        
        const venuesDAL = new DataAccess(VenueModel)
        const controller = new Controller(venuesDAL, 'venues')
        venuesRouter = routesWrapper(controller, authenticator)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Venues Database: ", error.message)
}

export { venuesRouter }
