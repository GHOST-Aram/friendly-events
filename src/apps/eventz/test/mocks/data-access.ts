import { Event, EventModel } from "../../data-access/model"
import { MockDataAccess } from "../../../../z-library/testing/mocks/data-access"

export class EventsDAL extends MockDataAccess<EventModel, Event>{
    
    constructor(model: EventModel, validData: Object){
        super(model, validData)
    }
}
