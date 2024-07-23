import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { EventsDataAccess } from "../data-access/data-access";
import mongoose from "mongoose";
import { createObjectId } from "../../../z-library/db/id";

export class EventsController extends GenericController<EventsDataAccess>{
    constructor (dataAccess: EventsDataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const user:any = req.user
        const inputData = req.body

        try {
            const newDocument = await this.dataAccess.createNew({
                ...inputData, organizer: createObjectId(user._id as string)})

            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }   
    }
}

