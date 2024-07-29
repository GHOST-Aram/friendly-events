import { RequestData, DomainData } from "../../../z-library/types";
import { VenueCategory } from "../data-access/model";

class VenueTData implements DomainData{
    public createInputDocument = (reqData: RequestData): VenueCategory =>{
        const { user, reqBody } = reqData
        return { ...reqBody, createdBy: user._id }
    };
}

export const domainData = new VenueTData()