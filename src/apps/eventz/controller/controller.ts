import { GenericController } from "../../../zero/bases";
import { EventsDataAccess } from "../data-access/data-access";

export class EventsController extends GenericController<EventsDataAccess>{
    constructor (dataAccess: EventsDataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

}

