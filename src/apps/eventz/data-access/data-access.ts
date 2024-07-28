import { GenericDataAccess } from "../../../z-library/bases/generic-data-access"
import { EventModel, Event } from "./model";

export class EventsDataAccess extends GenericDataAccess<EventModel, Event>{}
