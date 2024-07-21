import { Response, Request, NextFunction } from "express";
import { UsersDAL } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { hash } from "bcrypt";
import { HydratedUserDoc } from "../data-access/model";
import { Paginator } from "../../../z-library/HTTP/http-response";

export class UsersController extends GenericController<UsersDAL>{

    constructor(dataAccessLayer: UsersDAL, microserviceName: string){
        super(dataAccessLayer, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const userData = req.body

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

    public getOne = async(req: Request, res: Response, next: NextFunction): Promise<void> =>{
        const referenceId = req.params.id

        try {
            const foundDocument = await this.dataAccess.findByReferenceId(referenceId)

            if(foundDocument){
                this.respondWithFoundResource(this.formatUserDocument(
                    foundDocument as HydratedUserDoc), res)
            } else{
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }
    }

    private formatUserDocument = (userDoc: HydratedUserDoc) =>{
        const formatedUserDoc = {
            _id: userDoc._id,
            fullName: userDoc.fullName,
            email: userDoc.email,
            userGroup: userDoc.userGroup,
            profilePicture: this.formatPictureProfile(userDoc.profilePicture),
            pictureUrl: userDoc.pictureUrl
        }

        return formatedUserDoc
    }

    private formatPictureProfile = (imageBuffer: any) =>{
        const profilePicture =  {
            name: imageBuffer.name,
            data: imageBuffer.data,
            contentType: imageBuffer.contentType  
        }

        return profilePicture
    }

    public getMany = async(req: Request, res: Response, next: NextFunction) =>{
        const paginator: Paginator = this.paginate(req) 

        try {
            const documents = await this.dataAccess.findWithPagination(paginator)
            
            if(documents.length) {
                const formatedDocs = documents.map(doc => this.formatUserDocument(doc))
                this.respondWithFoundResource(formatedDocs, res)
            } else {
                this.respondWithFoundResource([], res)
            }
            
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        const referenceId = req.params.id
        const reqBody = req.body

        const currentUser:any = req.user
        
        if(currentUser._id.toString() !== referenceId){
            this.respondWithForbidden(res)
        } else {
            
            try {
                const updateDoc = this.formatUpdateDoc(reqBody)
                
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
    }

    private formatUpdateDoc = async(updateDoc: any) =>{
        const { fullName, email, password, role, isAdmin } = updateDoc
        
        return {
            fullName,
            email,
            role,
            password: await hash(password, 10),
            isAdmin,
        }
    }

    public deleteOne = async(req: Request, res: Response, next: NextFunction) => {
        const referenceId = req.params.id
        const currentUser:any = req.user

        if(currentUser._id.toString() !== referenceId){
            this.respondWithForbidden(res, 'User cannot delete information of other users.')
        } else {
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
