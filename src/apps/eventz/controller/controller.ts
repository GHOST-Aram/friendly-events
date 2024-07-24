import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { EventsDataAccess } from "../data-access/data-access";
import { Paginator } from "../../../z-library/HTTP/http-response";
import { Event } from "../data-access/model";
import { createFileBuffer } from "../../../z-library/uploads/file-buffer";

export class EventsController extends GenericController<EventsDataAccess>{
    constructor (dataAccess: EventsDataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const user:any = req.user
        const file = req.file as Express.Multer.File
        const body = req.body

        const inputData = {...body, organizer: user._id }
        const eventData = this.formatEventData(inputData, file)

        try {
            const newDocument = await this.dataAccess.createNew(eventData)

            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }   
    }

    private formatEventData = (inputData: any, file: Express.Multer.File): Event => {
        const eventData: Event = inputData
        return file? { ...eventData, graphic: createFileBuffer(file) } : eventData
    }

    public getByOrganizerId = async(req: Request, res: Response, next: NextFunction) =>{
        const paginator: Paginator = this.paginate(req) 
        const organizerId = req.params.organizerId

        try {
            const documents = await this.dataAccess.findByOrganizerId(organizerId, paginator)
            this.respondWithFoundResource(documents, res)
        } catch (error) {
            next(error)
        }
    }
}

