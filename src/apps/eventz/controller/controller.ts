import { Response, Request, NextFunction } from "../../../z-library/types";
import { GenericController } from "../../../z-library/bases";
import { EventsDataAccess } from "../data-access/data-access";
import { eventData as domainData } from "../domain/data";
import { getDataFromRequest } from "../../../z-library/request";
import { document } from "../../../z-library/document";

export class EventsController extends GenericController<EventsDataAccess>{
    constructor (dataAccess: EventsDataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const reqData = getDataFromRequest(req)
        const eventData = domainData.aggregateInputDocument(reqData)

        try {
            const newDocument = await this.dataAccess.createNew(eventData)

            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }   
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{

        const data = getDataFromRequest(req)
        const updateDoc = domainData.aggregateInputDocument(data)

        try {
            const targetDoc = await this.dataAccess.findByReferenceId(data.referenceId)

            if(document.exists(targetDoc)){

                const creatorId = targetDoc?.createdBy.toString() as string

                if(document.isCreatedByCurrentUser(data.currentUserId, creatorId)){

                    this.updateAndRespond({updateDoc: updateDoc, id: data.referenceId}, res)

                } else {
                    this.respondWithForbidden(res)
                }
            } else {
                this.addNew(req, res, next)
            }

        } catch (error) {
            next(error)
        }
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{

        const data = getDataFromRequest(req)
        const updateDoc = domainData.aggregateInputDocument(data)

        try {
            const targetDoc = await this.dataAccess.findByReferenceId(data.referenceId)

            if(document.exists(targetDoc)){

                const creatorId = targetDoc?.createdBy.toString() as string

                if(document.isCreatedByCurrentUser(data.currentUserId, creatorId)){

                    this.updateAndRespond({updateDoc: updateDoc, id: data.referenceId}, res)

                } else {
                    this.respondWithForbidden(res)
                }
            } else {
                this.respondWithNotFound(res)
            }

        } catch (error) {
            next(error)
        }
    }

    public deleteOne = async(req: Request, res: Response, next: NextFunction) =>{
        
        const { currentUserId, referenceId } = getDataFromRequest(req)

        try {
            const targetDoc = await this.dataAccess.findByReferenceId(referenceId)

            if(document.exists(targetDoc)){

                const creatorId = targetDoc?.createdBy.toString() as string

                if(document.isCreatedByCurrentUser(currentUserId, creatorId)){

                    this.deleteAndRespond(referenceId, res)

                } else {
                    this.respondWithForbidden(res)
                }
            } else {
                this.respondWithNotFound(res)
            }

        } catch (error) {
            next(error)
        }
    }
      
}

