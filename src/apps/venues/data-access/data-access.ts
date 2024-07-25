import { GenericDataAccess } from "../../../z-library/bases/generic-data-access"
import { Venue, VenueModel, HydratedVenueDoc } from "./model";
import { Paginator } from "../../../z-library/HTTP/http-response";

export class DataAccess extends GenericDataAccess<VenueModel, Venue>{

    public findByHostId = async(hostId: string, paginator: Paginator)
        : Promise<HydratedVenueDoc[]> => {
        return await this.model.find({ host: hostId }).skip(paginator.skipDocs)
            .limit(paginator.limit)
    }
}