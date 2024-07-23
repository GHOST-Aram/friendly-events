import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { EventsDataAccess } from "../data-access/data-access";
import { Paginator } from "../../../z-library/HTTP/http-response";

export class EventsController extends GenericController<EventsDataAccess>{
    constructor (dataAccess: EventsDataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const user:any = req.user
        const inputData = req.body

        try {
            const newDocument = await this.dataAccess.createNew({
                ...inputData, organizer: user._id })

            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }   
    }

    public getByOrganizerId = async(req: Request, res: Response, next: NextFunction) =>{
        const paginator: Paginator = this.paginate(req) 
        const organizerId = req.params.organizerId

        try {
            const documents = await this.dataAccess.findByOrgnizerId(organizerId, paginator)
            this.respondWithFoundResource(documents, res)
        } catch (error) {
            next(error)
        }
    }
}

