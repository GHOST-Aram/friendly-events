import { NextFunction, Response, Request } from "express";
import { HttpResponse, Paginator } from "../http"
import { Accessible } from "./accessible";
import { Controllable } from "./controllable";
import { getDataFromRequest, queryString } from "../request";
import { document } from "../document";
import { DomainData } from "../domain-data";
import { UserGroup } from "../user-group";
// import { userGroup } from "../../utils/user-group/user-group";

interface UpdateData {updateDoc: any, id: string }

export class GenericController <T extends Accessible> 
    extends HttpResponse implements Controllable {

    public dataAccess: T

    constructor(dataAccess: T, microserViceName: string){
        super(microserViceName)
        this.dataAccess = dataAccess
    }

    public addNew = (domainData: DomainData) =>{
        return async(req: Request, res: Response, next: NextFunction) =>{
                
            const data = getDataFromRequest(req)
            const inputData = domainData.aggregateInputDocument(data)
            const searchDoc = domainData.createUniqueSearchDocument(inputData)
        
            try {
                const existingEventCategory = await this.dataAccess.findExistingDocument(searchDoc)
        
                if(!document.exists(existingEventCategory)){
                    this.createAndRespond(inputData, res)
                } else {
                    this.respondWithConflict(res)
                }
            } catch (error) {
                next(error)
            }   
        }
    }

    public createAndRespond = async(document: any, res: Response) =>{
        const newDocument = await this.dataAccess.createNew(document)
        const serializedDoc = newDocument.toObject()
        
        this.respondWithCreatedResource(serializedDoc, res)
    }

        public getOne = async(req: Request, res: Response, next: NextFunction) =>{
        const referenceId = req.params.id

        try {
            const foundDocument = await this.dataAccess.findByReferenceId(referenceId)

            if(foundDocument){
                const serializedDoc = foundDocument.toObject()
                this.respondWithFoundResource(serializedDoc, res)
            } else{
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }
    }

    public getMany = (searchablePaths: string[]) => {
        
        return async(req: Request, res: Response, next: NextFunction) =>{

            const paginator: Paginator = this.paginate(req)
            const { query } = getDataFromRequest(req) 

            const searchDocument = queryString.createSearchDocument(query, searchablePaths)

            try {
                const docuements = await this.dataAccess.findBySearchDocument(searchDocument, paginator)
                const serializedDocs = docuements.map(doc => doc.toObject())

                this.respondWithFoundResource(serializedDocs, res)
            } catch (error) {
                next(error)
            }
        }
    }

    public updateOne = (domainData: DomainData, userGroup: UserGroup ) =>{

        return async(req: Request, res: Response, next: NextFunction) =>{
            
            const data = getDataFromRequest(req)
            const updateDoc = domainData.aggregateInputDocument(data)
    
            try {
                const targetDoc = await this.dataAccess.findByReferenceId(data.referenceId)
    
                if(document.exists(targetDoc)){
    
                    const creatorId = targetDoc?.createdBy.toString() as string
    
                    if(document.isOwnedByCurrentUser(data.currentUserId, creatorId) || userGroup.isAdmin(data.user)){
    
                        this.updateAndRespond({updateDoc: updateDoc, id: data.referenceId}, res)
    
                    } else {
                        this.respondWithForbidden(res)
                    }
                } else {
                    this.createAndRespond(updateDoc, res)
                }
            } catch (error) {
                next(error)
            }
        }
    }

    public updateAndRespond = async({ updateDoc, id }: UpdateData, res: Response) =>{
        const updatedDoc = await this.dataAccess.findByIdAndUpdate(id, updateDoc)
        const serializedDoc = updatedDoc.toObject()

        this.respondWithUpdatedResource(serializedDoc, res)
    }

    public modifyOne = (domainData: DomainData, userGroup: UserGroup) =>{
        return async(req: Request, res: Response, next: NextFunction) =>{
            
            const data = getDataFromRequest(req)
            const updateDoc = domainData.aggregateInputDocument(data)

            try {
                const targetDoc = await this.dataAccess.findByReferenceId(data.referenceId)

                if(document.exists(targetDoc)){

                    const creatorId = targetDoc?.createdBy.toString() as string

                    if(document.isOwnedByCurrentUser(data.currentUserId, creatorId) || userGroup.isAdmin(data.user)){

                        this.updateAndRespond({updateDoc: updateDoc, id: data.referenceId}, res)

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

    public deleteOne = (userGroup: UserGroup) =>{

        return async(req: Request, res: Response, next: NextFunction) =>{
                
            const { referenceId, currentUserId, user } = getDataFromRequest(req)
    
            try {
                const targetDoc = await this.dataAccess.findByReferenceId(referenceId)
    
                if(document.exists(targetDoc)){
    
                    const creatorId = targetDoc?.createdBy.toString() as string
    
                    if(document.isOwnedByCurrentUser(currentUserId, creatorId) || userGroup.isAdmin(user)){
    
                        this.deleteAndRespond(referenceId, res)
    
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

    public deleteAndRespond = async(referenceId: string, res: Response) =>{
        const deletedDoc = await this.dataAccess.findByIdAndDelete(
                referenceId)
        this.respondWithDeletedResource(deletedDoc.id, res)
    }
}