import { Response, Request, NextFunction } from "../../../z-library/types";
import { GenericController } from "../../../z-library/bases";
import { DataAccess } from "../data-access/data-access";
import { getDataFromRequest } from "../../../z-library/request";
import { document } from "../../../z-library/document";
import { domainData } from "../domain/data";
import { userGroup } from "../../../utils/user-group/user-group";

export class Controller extends GenericController<DataAccess>{
    constructor (dataAccess: DataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }
}

