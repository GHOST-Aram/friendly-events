import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { DataAccess } from "../data-access/data-access";
import { domainData } from "../domain/data";
import { EventCategory } from "../data-access/model";
import { getDataFromRequest } from "../../../z-library/request/request-data";

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

        const inputData: EventCategory = { ...reqBody, createdBy: user._id }
        const updateDoc = file ? domainData.includeFile(inputData, file) : inputData

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

