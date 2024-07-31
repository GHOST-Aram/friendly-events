import { Response, Request, NextFunction } from "../../../z-library/types";
import { GenericController } from "../../../z-library/bases";
import { DataAccess } from "../data-access/data-access";
import { getDataFromRequest } from "../../../z-library/request";
import { document } from "../../../z-library/document";
import { domainData } from "../domain/data";

export class Controller extends GenericController<DataAccess>{
    constructor (dataAccess: DataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        
        const data = getDataFromRequest(req)
        const inputData = domainData.aggregateInputDocument(data)

        try {
            const newDocument = await this.dataAccess.createNew(inputData)
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

                if(document.isOwnedByCurrentUser(data.currentUserId, creatorId)){
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
        const updateDoc = domainData.aggregateInputDocument(data)
        
        try {  
            const targetDoc = await this.dataAccess.findByReferenceId(data.referenceId)
            
            if(document.exists(targetDoc)){
                const creatorId = targetDoc?.createdBy.toString() as string

                if(document.isOwnedByCurrentUser(data.currentUserId, creatorId)){
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

                if(document.isOwnedByCurrentUser(currentUserId, creatorId)){

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

