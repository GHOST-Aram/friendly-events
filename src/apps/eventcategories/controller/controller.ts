import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { DataAccess } from "../data-access/data-access";
import { domainData } from "../domain/data";
import { EventCategory } from "../data-access/model";
import { getDataFromRequest } from "../../../z-library/request/request-data";
import { document } from "../../../z-library/document/document";

export class Controller extends GenericController<DataAccess>{
    constructor (dataAccess: DataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        
        const { reqBody, user, file } = getDataFromRequest(req)

        const inputData: EventCategory = { ...reqBody, createdBy: user._id }
        const categoryData = file ? domainData.includeFile(inputData, file) : inputData

        try {
            const newDocument = await this.dataAccess.createNew(categoryData)
            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }   
    }
 
    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        
        const { reqBody, user, file, referenceId } = getDataFromRequest(req)

        const inputData: EventCategory = { ...reqBody, createdBy: user._id }
        const updateDoc = file ? domainData.includeFile(inputData, file) : inputData
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
            console.log(error)
            next(error)
        }
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{
        
        const { reqBody, user, file, referenceId } = getDataFromRequest(req)

        const inputData: EventCategory = { ...reqBody, createdBy: user._id }
        const updateDoc = file ? domainData.includeFile(inputData, file) : inputData
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

