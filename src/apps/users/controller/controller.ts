import { Response, Request, NextFunction } from "../../../z-library/types";
import { UsersDAL } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases";
import { domainData } from "../domain/data";
import { getDataFromRequest } from "../../../z-library/request";
import { document } from "../../../z-library/document";

export class UsersController extends GenericController<UsersDAL>{

    constructor(dataAccessLayer: UsersDAL, microserviceName: string){
        super(dataAccessLayer, microserviceName)
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        
        const data = getDataFromRequest(req)
        let updateDoc = domainData.aggregateInputDocument(data)
            
        try {
            updateDoc = await domainData.encyptPassword(updateDoc)
            
            const updatedDoc = await this.dataAccess.findByIdAndUpdate(data.referenceId, 
                updateDoc)

            if(updatedDoc){
                this.respondWithUpdatedResource(updatedDoc.toObject(), res)
            } else{
                this.createAndRespond(updateDoc, res)
            }

        } catch (error) {
            next(error)
        }
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{

        const data = getDataFromRequest(req)
        let updateDoc = domainData.aggregateInputDocument(data)

        try {
            updateDoc = updateDoc.password ? await domainData.encyptPassword(updateDoc) : updateDoc
            
            const updatedDoc = await this.dataAccess.findByIdAndUpdate(data.referenceId, updateDoc)

            if(updatedDoc){
                this.respondWithUpdatedResource(updatedDoc.toObject(), res)
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
