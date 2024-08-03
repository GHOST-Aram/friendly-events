import { GenericDataAccess } from "../../../z-library/bases"
import { EventModel, Event } from "./model";

export class EventsDataAccess extends GenericDataAccess<EventModel, Event>{
    public findExactMatch = async(eventdata:Event) =>{
        return await this.model.findOne(eventdata)
    }
}
