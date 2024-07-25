import { routesWrapper } from "./urls/urls";
import { DataAccess } from "./data-access/data-access";
import { Controller } from "./controller/controller";
import { connection } from "../../config/config";
import { DB } from "../../z-library/db/db";
import { venueSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";
import { Router } from "express";
import 'dotenv/config'

let eventsRouter: Router
const eventsDbName = process.env.EVENTSDB_NAME

try {
    if(eventsDbName) {
        const db = new DB(connection.switch(eventsDbName))
        const EventModel = db.createModel('Venue', venueSchema)
        
        const eventsDAL = new DataAccess(EventModel)
        const controller = new Controller(eventsDAL, 'venues')
        eventsRouter = routesWrapper(controller, authenticator)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Venues Database: ", error.message)
}

export { eventsRouter }
