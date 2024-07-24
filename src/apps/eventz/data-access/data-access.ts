import { GenericDataAccess } from "../../../z-library/bases/generic-data-access"
import { EventModel, Event, HydratedEventDoc } from "./model";
import { Paginator } from "../../../z-library/HTTP/http-response";

export class EventsDataAccess extends GenericDataAccess<EventModel, Event>{

    public findByOrganizerId = async(organizerId: string, paginator: Paginator)
        : Promise<HydratedEventDoc[]> => {
        return await this.model.find({ organizer: organizerId }).skip(paginator.skipDocs)
            .limit(paginator.limit)
    }
}
