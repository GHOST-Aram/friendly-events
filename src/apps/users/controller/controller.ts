import { Response, Request, NextFunction } from "../../../zero/types";
import { UsersDAL } from "../data-access/data-access";
import { GenericController } from "../../../zero/bases";
import { getDataFromRequest } from "../../../zero/request";
import { document } from "../../../zero/document";
import { DomainData } from "../../../zero/domain-data";
import { UserGroup } from "../../../zero/user-group";

export class UsersController extends GenericController<UsersDAL>{

    constructor(dataAccessLayer: UsersDAL, microserviceName: string){
        super(dataAccessLayer, microserviceName)
    }

    public updateOne = (domainData: DomainData, userGroup: UserGroup) =>{

        return async(req: Request, res: Response, next: NextFunction) =>{
        
            const data = getDataFromRequest(req)
            
            if(document.isOwnedByCurrentUser(data.referenceId, data.currentUserId) || userGroup.isAdmin(data.user)){

                const updateDoc = domainData.aggregateInputDocument(data)
                
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
            } else {
                this.respondWithForbidden(res)
            }
        }
    }

    public modifyOne = (domainData: DomainData, userGroup: UserGroup) =>{

        return async(req: Request, res: Response, next: NextFunction) =>{

            const data = getDataFromRequest(req)
            
            if(document.isOwnedByCurrentUser(data.referenceId, data.currentUserId) || userGroup.isAdmin(data.user)){

                const updateDoc = domainData.aggregateInputDocument(data)

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
            } else{
                this.respondWithForbidden(res)
            }
        }
    }

    public deleteOne = (userGroup: UserGroup) =>{

        return async(req: Request, res: Response, next: NextFunction) => {

            const { referenceId, currentUserId, user } = getDataFromRequest(req)

            if(document.isOwnedByCurrentUser(referenceId, currentUserId) || userGroup.isAdmin(user)){

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
            } else{
                this.respondWithForbidden(res)
            }
        }
    }
}
