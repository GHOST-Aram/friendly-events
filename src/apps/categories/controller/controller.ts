import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { DataAccess } from "../data-access/data-access";
import { Paginator } from "../../../z-library/HTTP/http-response";
import { domainData } from "../domain/data";
import { EventCategory } from "../data-access/model";

export class Controller extends GenericController<DataAccess>{
    constructor (dataAccess: DataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const reqBody = req.body
        const user:any = req.user
        const file = req.file as Express.Multer.File

        const inputData: EventCategory = { ...reqBody, createdBy: user._id }
        const categoryData = file ? domainData.includeFile(inputData, file) : inputData

        try {
            const newDocument = await this.dataAccess.createNew(categoryData)
            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }   
    }
}

