import { DomainData } from "../../../z-library/types";
import { VenueCategory } from "../data-access/model";
import { RequestData } from "../../../z-library/request";

class VenueTData implements DomainData{
    public aggregateInputDocument = (reqData: RequestData): VenueCategory =>{
        const { user, reqBody } = reqData
        return { ...reqBody, createdBy: user._id }
    };
}

export const domainData = new VenueTData()