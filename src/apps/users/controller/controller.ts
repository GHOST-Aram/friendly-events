import { Response, Request, NextFunction } from "../../../z-library/types";
import { UsersDAL } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases";
import { getDataFromRequest } from "../../../z-library/request";
import { document } from "../../../z-library/document";
import { DomainData } from "../../../z-library/domain-data";
import { UserGroup } from "../../../z-library/user-group";

export class UsersController extends GenericController<UsersDAL>{

    constructor(dataAccessLayer: UsersDAL, microserviceName: string){
        super(dataAccessLayer, microserviceName)
    }

    public updateOne = (domainData: DomainData, userGroup: UserGroup) =>{
        return async(req: Request, res: Response, next: NextFunction) =>{
        
            const data = getDataFromRequest(req)
            let updateDoc = domainData.aggregateInputDocument(data)
                
            try {            
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
    }

    public modifyOne = (domainData: DomainData, userGroup: UserGroup) =>{
        return async(req: Request, res: Response, next: NextFunction) =>{

            const data = getDataFromRequest(req)
            let updateDoc = domainData.aggregateInputDocument(data)

            try {
                
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
    }

    public deleteOne = (userGroup: UserGroup) =>{

        return async(req: Request, res: Response, next: NextFunction) => {

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
}
