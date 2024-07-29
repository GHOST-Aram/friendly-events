import { Response, Request, NextFunction } from "express";
import { UsersDAL } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { domainData } from "../domain/data";
import { getDataFromRequest } from "../../../z-library/request/request-data";

export class UsersController extends GenericController<UsersDAL>{

    constructor(dataAccessLayer: UsersDAL, microserviceName: string){
        super(dataAccessLayer, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const data = getDataFromRequest(req)
        const userData = domainData.createInputDocument(data)

        try {
            const user = await this.dataAccess.findByEmail(userData.email)

            if(user)
                this.respondWithConflict(res)
            else {

                const user = await this.dataAccess.createNew(userData)

                this.respondWithCreatedResource(user, res)
            }
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        
        const data = getDataFromRequest(req)
        let updateDoc = domainData.createInputDocument(data)
            
        try {
            updateDoc = await domainData.encyptPassword(updateDoc)
            
            const updatedDoc = await this.dataAccess.findByIdAndUpdate(data.referenceId, 
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

        const data = getDataFromRequest(req)
        let updateDoc = domainData.createInputDocument(data)

        try {
            updateDoc = updateDoc.password ? await domainData.encyptPassword(updateDoc) : updateDoc
            
            const updatedDoc = await this.dataAccess.findByIdAndUpdate(data.referenceId, updateDoc)

            if(updatedDoc){
                this.respondWithUpdatedResource(updatedDoc, res)
            } else{
                this.respondWithNotFound(res)
            }

        } catch (error) {
            next(error)
        }
    }

    public deleteOne = async(req: Request, res: Response, next: NextFunction) => {

        const { referenceId } = getDataFromRequest(req)

        try {
            const deletedDoc = await this.dataAccess.findByIdAndDelete(referenceId)

            if(deletedDoc){
                this.respondWithDeletedResource(deletedDoc.id, res)
            } else{
                this.respondWithNotFound(res)
            }

        } catch (error) {
            next(error)
        }
    }
}
