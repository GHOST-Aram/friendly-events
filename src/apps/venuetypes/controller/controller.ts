import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { DataAccess } from "../data-access/data-access";
import { getDataFromRequest } from "../../../z-library/request/request-data";
import { document } from "../../../z-library/document/document";
import { domainData } from "../domain/data";

export class Controller extends GenericController<DataAccess>{
    constructor (dataAccess: DataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        
        const data = getDataFromRequest(req)
        const inputData = domainData.createInputDocument(data)

        try {
            const newDocument = await this.dataAccess.createNew(inputData)
            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }   
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        
        const data = getDataFromRequest(req)
        const updateDoc = domainData.createInputDocument(data)

        try {  
            const targetDoc = await this.dataAccess.findByReferenceId(data.referenceId)

            if(document.exists(targetDoc)){
                const creatorId = targetDoc?.createdBy.toString() as string

                if(document.isCreatedByCurrentUser(data.currentUserId, creatorId)){
                    this.updateAndRespond({updateDoc, id: data.referenceId}, res)
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
        const updateDoc = domainData.createInputDocument(data)
        
        try {  
            const targetDoc = await this.dataAccess.findByReferenceId(data.referenceId)
            
            if(document.exists(targetDoc)){
                const creatorId = targetDoc?.createdBy.toString() as string

                if(document.isCreatedByCurrentUser(data.currentUserId, creatorId)){
                    this.updateAndRespond({updateDoc, id: data.referenceId}, res)
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
        const { referenceId, currentUserId } = getDataFromRequest(req)
        
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

