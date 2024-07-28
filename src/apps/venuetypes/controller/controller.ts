import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { DataAccess } from "../data-access/data-access";
import { getDataFromRequest } from "../../../z-library/request/request-data";
import { document } from "../../../z-library/document/document";

export class Controller extends GenericController<DataAccess>{
    constructor (dataAccess: DataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        
        const { reqBody, referenceId, user } = getDataFromRequest(req)
        const currentUserId = user._id.toString()

        try {  
            const targetDoc = await this.dataAccess.findByReferenceId(referenceId)

            if(document.exists(targetDoc)){
                const creatorId = targetDoc?.createdBy.toString() as string

                if(document.isCreatedByCurrentUser(currentUserId, creatorId)){
                    this.updateAndRespond({updateDoc: reqBody, id: referenceId}, res)
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
        
        const { reqBody, referenceId, user } = getDataFromRequest(req)
        const currentUserId = user._id.toString()
        
        try {  
            const targetDoc = await this.dataAccess.findByReferenceId(referenceId)
            
            if(document.exists(targetDoc)){
                const creatorId = targetDoc?.createdBy.toString() as string

                if(document.isCreatedByCurrentUser(currentUserId, creatorId)){
                    this.updateAndRespond({updateDoc: reqBody, id: referenceId}, res)
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

    public deleteOne = async(req: Request, res: Response, next: NextFunction) => {
        const {referenceId, user} = getDataFromRequest(req)
        const currentUserId = user._id.toString()
        
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

