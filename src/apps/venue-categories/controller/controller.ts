import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { DataAccess } from "../data-access/data-access";
import { Paginator } from "../../../z-library/HTTP/http-response";
import { getDataFromRequest } from "../../../z-library/request/request-data";
import { HydratedVenueCategory } from "../data-access/model";

export class Controller extends GenericController<DataAccess>{
    constructor (dataAccess: DataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public getByCreator = async(req: Request, res: Response, next: NextFunction) =>{
        const paginator: Paginator = this.paginate(req) 
        const organizerId = req.params.organizerId

        try {
            const documents = await this.dataAccess.findByCreatorId(organizerId, paginator)
            this.respondWithFoundResource(documents, res)
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        
        const { reqBody, referenceId, user } = getDataFromRequest(req)
        const currentUserId = user._id.toString()

        try {  
            const targetDoc = await this.dataAccess.findByReferenceId(referenceId)

            if(this.documentExists(targetDoc)){
                const creatorId = targetDoc?.createdBy.toString() as string

                if(this.isCreatedByCurrentUser(currentUserId, creatorId)){
                    this.processUpdate({updateDoc: reqBody, id: referenceId}, res)
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

    
    private documentExists = (doc: HydratedVenueCategory | null ):boolean =>{
        return Boolean(doc)
    }
    
    private isCreatedByCurrentUser = (creatorId: string, currentUserId: string ) =>{
        return currentUserId === creatorId
    }
    
    public processUpdate = async({ updateDoc, id }: {updateDoc: any, id: string }, res: Response) =>{
        const updatedDoc = await this.dataAccess.findByIdAndUpdate(id, updateDoc)
        this.respondWithUpdatedResource(updatedDoc as HydratedVenueCategory, res)
    }
    
    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{
        
        const { reqBody, referenceId, user } = getDataFromRequest(req)
        const currentUserId = user._id.toString()
        
        try {  
            const targetDoc = await this.dataAccess.findByReferenceId(referenceId)
            
            if(this.documentExists(targetDoc)){
                const creatorId = targetDoc?.createdBy.toString() as string

                if(this.isCreatedByCurrentUser(currentUserId, creatorId)){
                    this.processUpdate({updateDoc: reqBody, id: referenceId}, res)
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
        
        try {
            const creatorId = await this.findDocumentCreatorId(referenceId)
            const currentUserId = user._id.toString()
            
            if(typeof creatorId === 'string'){
                if(this.isCreatedByCurrentUser(creatorId, currentUserId)){
                    
                    this.processDeletion(referenceId, res)
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
    
    private findDocumentCreatorId = async(id: string): Promise<string | null> =>{
        const targetDoc = await this.dataAccess.findByReferenceId(id)
        return targetDoc !== null ? targetDoc.createdBy.toString() : null 
    }
    
    public processDeletion = async(referenceId: string, res: Response) =>{
        const deletedDoc = await this.dataAccess.findByIdAndDelete(
                referenceId) as HydratedVenueCategory

        this.respondWithDeletedResource(deletedDoc.id, res)
    }

}

