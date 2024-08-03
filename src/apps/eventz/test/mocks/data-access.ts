import { Event, EventModel } from "../../data-access/model"
import { MockDataAccess } from "../../../../z-library/testing"

export class EventsDAL extends MockDataAccess<EventModel, Event>{
    
    constructor(model: EventModel, validData: Object){
        super(model, validData)
    }

    public findExactMatch = async(eventData:Event) =>{
        if(/Existing/i.test(eventData.title)){
            return new this.model(eventData)
        }

        return null
    }
}
