import { Response, Request, NextFunction } from "express";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { DataAccess } from "../data-access/data-access";
import { Paginator } from "../../../z-library/HTTP/http-response";
import { eventData as domainData } from "../domain/data";

export class Controller extends GenericController<DataAccess>{
    constructor (dataAccess: DataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
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
}

