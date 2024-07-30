import { GenericDataAccess } from "../../../z-library/bases"
import { EventModel, Event } from "./model";

export class EventsDataAccess extends GenericDataAccess<EventModel, Event>{}
