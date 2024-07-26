import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { DataAccess } from "../data-access/data-access";
import { Paginator } from "../../../z-library/HTTP/http-response";
import { domainData } from "../domain/data";
import { getDataFromRequest } from "../../../z-library/request/request-data";

export class Controller extends GenericController<DataAccess>{
    constructor (dataAccess: DataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const {files, reqBody, user } = getDataFromRequest(req)

        const inputData = { ...reqBody, host: user._id }
        const venueData = files ? domainData.includeFiles(inputData, files) : inputData

        try {
            const newDocument = await this.dataAccess.createNew(venueData)
            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }   
    }

    public getByHost = async(req: Request, res: Response, next: NextFunction) =>{
        const paginator: Paginator = this.paginate(req) 
        const hostId = req.params.hostId

        try {
            const documents = await this.dataAccess.findByHostId(hostId, paginator)
            this.respondWithFoundResource(documents, res)
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{

        const { user, files, reqBody, referenceId } = getDataFromRequest(req)

        const inputData = { ...reqBody, host: user._id }
        const updateDoc = files ? domainData.includeFiles(inputData, files) : inputData

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

        const { files, reqBody, referenceId } = getDataFromRequest(req)

        const updateDoc = files ? domainData.includeFiles(reqBody, files) : reqBody

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
}

