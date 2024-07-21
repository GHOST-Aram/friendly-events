import { NextFunction, Response, Request } from "express";
import { HttpResponse, Paginator } from "../HTTP/http-response";
import { Controllable } from "./controllable";
import { Accessible } from "./accessible";

export class GenericController <T extends Accessible> 
    extends HttpResponse implements Controllable {

    public dataAccess: T

    constructor(dataAccess: T, microserViceName: string){
        super(microserViceName)
        this.dataAccess = dataAccess
}

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const inputData = req.body

        try {
            const newDocument = await this.dataAccess.createNew(inputData)
            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }   
    }

    public getOne = async(req: Request, res: Response, next: NextFunction) =>{
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
            const docuements = await this.dataAccess.findWithPagination(paginator)
            this.respondWithFoundResource(docuements, res)
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        const referenceId = req.params.id
        const updateDoc = req.body

        try {
            const updatedDoc = await this.dataAccess.findByIdAndUpdate(referenceId, 
                updateDoc)

            if(updatedDoc){
                this.respondWithUpdatedResource(updatedDoc, res)
            } else{
                const newDoc = await this.dataAccess.createNew(updateDoc)
                this.addNew(req, res, next)
            }

        } catch (error) {
            next(error)
        }
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{
        const referenceId = req.params.id
        const updateDoc = req.body

        try {
            const modifiedDoc = await this.dataAccess.findByIdAndUpdate(referenceId, 
                updateDoc)

            if(modifiedDoc){
                this.respondWithModifiedResource(modifiedDoc, res)
            } else{
              this.respondWithNotFound(res)
            }

        } catch (error) {
            next(error)
        }
    }

    public deleteOne = async(req: Request, res: Response, next: NextFunction) => {
        const referenceId = req.params.id

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