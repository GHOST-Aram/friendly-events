import { Response, Request, NextFunction } from "../../../z-library/types";
import { UsersDAL } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases";
import { domainData } from "../domain/data";
import { getDataFromRequest } from "../../../z-library/request";

export class UsersController extends GenericController<UsersDAL>{

    constructor(dataAccessLayer: UsersDAL, microserviceName: string){
        super(dataAccessLayer, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const data = getDataFromRequest(req)
        const userData = domainData.aggregateInputDocument(data)

        try {
            const user = await this.dataAccess.findByEmail(userData.email)

            if(user)
                this.respondWithConflict(res)
            else {

                const user = await this.dataAccess.createNew(userData)
                const userInfo = domainData.createMinizedUserObject(user.toObject())
                
                this.respondWithCreatedResource(userInfo, res)
            }
        } catch (error) {
            next(error)
        }
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
                this.addNew(req, res, next)
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
