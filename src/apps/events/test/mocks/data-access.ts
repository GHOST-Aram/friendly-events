import { Paginator } from "../../../../z-library/HTTP/http-response"
import { 
    HydratedEventDoc, 
    Event, 
    EventModel
} from "../../data-access/model"
import { jest } from "@jest/globals"
import { EventsDataAccess } from "../../data-access/data-access"

const ID_OF_EXISTING_DOCUMENT = '64c9e4f2df7cc072af2ac9e4'

export class EventsDAL extends EventsDataAccess{
    
    constructor(model: EventModel){
        super(model)
    }
    public createNew = jest.fn(

        async(eventData: Event): Promise<HydratedEventDoc> =>{

            const event = new this.model(eventData)  
            return event
        }
    )
}
