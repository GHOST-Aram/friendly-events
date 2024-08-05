import { Response, Request, NextFunction } from "../../../z-library/types";
import { GenericController } from "../../../z-library/bases";
import { EventsDataAccess } from "../data-access/data-access";
import { domainData } from "../domain/data";
import { getDataFromRequest } from "../../../z-library/request";
import { document } from "../../../z-library/document";
import { userGroup } from "../../../utils/user-group/user-group";

export class EventsController extends GenericController<EventsDataAccess>{
    constructor (dataAccess: EventsDataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

}

