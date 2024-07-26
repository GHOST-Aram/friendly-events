import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { EventsDataAccess } from "../data-access/data-access";
import { Paginator } from "../../../z-library/HTTP/http-response";
import { eventData as domainData } from "../domain/data";
import { getDataFromRequest } from "../../../z-library/request/request-data";

export class EventsController extends GenericController<EventsDataAccess>{
    constructor (dataAccess: EventsDataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const { reqBody, user, file } = getDataFromRequest(req)

        const inputData = {...reqBody, organizer: user._id }
        const eventData = domainData.formatInput(inputData, file)

        try {
            const newDocument = await this.dataAccess.createNew(eventData)

            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }   
    }

    public getByOrganizer = async(req: Request, res: Response, next: NextFunction) =>{
        const paginator: Paginator = this.paginate(req) 
        const organizerId = req.params.organizerId

        try {
            const documents = await this.dataAccess.findByOrganizerId(organizerId, paginator)
            this.respondWithFoundResource(documents, res)
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{

        const { reqBody, user, file, referenceId } = getDataFromRequest(req)

        const inputData: Event = { ...reqBody, organizer: user._id}
        const updateDoc = domainData.formatInput(inputData, file)

        try {
            const updatedDoc = await this.dataAccess.findByIdAndUpdate(referenceId, 
                updateDoc)

            if(updatedDoc){
                this.respondWithUpdatedResource(updatedDoc, res)
            } else{
                this.addNew(req, res, next)
            }

        } catch (error) {
            next(error)
        }
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{
        
        const { reqBody, user, file, referenceId } = getDataFromRequest(req)

        const inputData: Event = { ...reqBody, organizer: user._id}
        const updateDoc = domainData.formatInput(inputData, file)

        try {
            const updatedDoc = await this.dataAccess.findByIdAndUpdate(referenceId, 
                updateDoc)

            if(updatedDoc){
                this.respondWithUpdatedResource(updatedDoc, res)
            } else{
                this.respondWithNotFound(res)
            }

        } catch (error) {
            next(error)
        }
    }
}

