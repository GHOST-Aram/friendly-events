import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { EventsDataAccess } from "../data-access/data-access";
import { Paginator } from "../../../z-library/HTTP/http-response";
import { eventData as domainData } from "../domain/data";
import { getDataFromRequest } from "../../../z-library/request/request-data";
import { document } from "../../../z-library/document/document";

export class EventsController extends GenericController<EventsDataAccess>{
    constructor (dataAccess: EventsDataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const { reqBody, user, file } = getDataFromRequest(req)

        const inputData = {...reqBody, organizer: user._id }
        const eventData = file ? domainData.includeFile(inputData, file) : inputData

        try {
            const newDocument = await this.dataAccess.createNew(eventData)

            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }   
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{

        const { reqBody, user, file, referenceId } = getDataFromRequest(req)

        const inputData: Event = { ...reqBody, createdBy: user._id}
        const updateDoc = file ? file ? domainData.includeFile(inputData, file) : inputData : inputData
        const currentUserId = user._id

        try {
            const targetDoc = await this.dataAccess.findByReferenceId(referenceId)

            if(document.exists(targetDoc)){

                const creatorId = targetDoc?.createdBy.toString() as string

                if(document.isCreatedByCurrentUser(currentUserId, creatorId)){

                    this.updateAndRespond({updateDoc: updateDoc, id: referenceId}, res)

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

        const { reqBody, user, file, referenceId } = getDataFromRequest(req)

        const inputData: Event = { ...reqBody, createdBy: user._id}
        const updateDoc = file ? file ? domainData.includeFile(inputData, file) : inputData : inputData
        const currentUserId = user._id

        try {
            const targetDoc = await this.dataAccess.findByReferenceId(referenceId)

            if(document.exists(targetDoc)){

                const creatorId = targetDoc?.createdBy.toString() as string

                if(document.isCreatedByCurrentUser(currentUserId, creatorId)){

                    this.updateAndRespond({updateDoc: updateDoc, id: referenceId}, res)

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

        const { user, referenceId } = getDataFromRequest(req)

        const currentUserId = user._id

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

