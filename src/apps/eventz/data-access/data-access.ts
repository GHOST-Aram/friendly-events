import { GenericDataAccess } from "../../../z-library/bases"
import { EventModel, Event } from "./model";

export class EventsDataAccess extends GenericDataAccess<EventModel, Event>{
    public findExactMatch = async(eventdata:Event) =>{
        return await this.model.findOne({
            category: eventdata.category,
            venue: eventdata.venue,
            title: eventdata.title,
            city: eventdata.city,
            date: eventdata.date,
            duration: eventdata.duration,
            ticketPrice: eventdata.ticketPrice,
            availableTickets: eventdata.availableTickets
        })
    }
}