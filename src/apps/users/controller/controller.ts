import { Response, Request, NextFunction } from "express";
import { UsersDAL } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { Paginator } from "../../../z-library/HTTP/http-response";
import { domainData } from "../domain/data";
import { getDataFromRequest } from "../../../z-library/request/request-data";

export class UsersController extends GenericController<UsersDAL>{

    constructor(dataAccessLayer: UsersDAL, microserviceName: string){
        super(dataAccessLayer, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const {file, reqBody } = getDataFromRequest(req)

        const userData = file ? domainData.includeFile(reqBody, file) : reqBody

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
                this.respondWithFoundResource(foundDocument, res)
            } else{
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }
    }

    public getMany = async(req: Request, res: Response, next: NextFunction) =>{
        const paginator: Paginator = this.paginate(req) 

        try {
            const documents = await this.dataAccess.findWithPagination(paginator)
            this.respondWithFoundResource(documents, res) 
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        const referenceId = req.params.id
        const reqBody = req.body
        const imageFile =  req.file as Express.Multer.File

        const currentUser:any = req.user
        
        if(currentUser._id.toString() !== referenceId){
            this.respondWithForbidden(res)
        } else {
            
            try {
                const updateDoc = domainData.formatInput(reqBody, imageFile)
                
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

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{
        const referenceId = req.params.id
        const reqBody = req.body
        const imageFile =  req.file as Express.Multer.File

        const currentUser:any = req.user
        
        if(currentUser._id.toString() !== referenceId){
            this.respondWithForbidden(res)
        } else {
            
            try {
                const updateDoc = domainData.formatInput(reqBody, imageFile)
                
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
