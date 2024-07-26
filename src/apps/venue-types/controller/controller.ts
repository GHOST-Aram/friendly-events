import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { DataAccess } from "../data-access/data-access";
import { Paginator } from "../../../z-library/HTTP/http-response";
import { getDataFromRequest } from "../../../z-library/request/request-data";
import { HydratedVenueType } from "../data-access/model";

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

            if(targetDoc !== null){
                const creatorId = targetDoc?.createdBy.toString()

                //Check if user is the creator of the doc before updating
                if(currentUserId === creatorId){

                    const updatedDoc = await this.dataAccess.findByIdAndUpdate(referenceId, 
                        reqBody)

                    this.respondWithUpdatedResource(updatedDoc as HydratedVenueType, res)
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
        
        const { reqBody, referenceId, user } = getDataFromRequest(req)
        
        const currentUserId = user._id.toString()
            
        try {  
            const targetDoc = await this.dataAccess.findByReferenceId(referenceId)

            if(targetDoc !== null){
                const creatorId = targetDoc?.createdBy.toString()

                //Check if user is the creator of the doc before updating
                if(currentUserId === creatorId){

                    const updatedDoc = await this.dataAccess.findByIdAndUpdate(referenceId, 
                        reqBody)

                    this.respondWithUpdatedResource(updatedDoc as HydratedVenueType, res)
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

