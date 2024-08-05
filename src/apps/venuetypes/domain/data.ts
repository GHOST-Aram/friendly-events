import { DomainData } from "../../../zero/domain-data";
import { VenueCategory, uniqueObjectkeys } from "../data-access/model";
import { RequestData } from "../../../zero/request";
import { createObjectFromKeys } from "../../../utils/data-object/data-object";

class VenueTData implements DomainData{
    public createUniqueSearchDocument = (inputData: any) => {
        const uniqueSearchDoc = createObjectFromKeys(uniqueObjectkeys, inputData)
        return uniqueSearchDoc
    }

    public aggregateInputDocument = (reqData: RequestData): VenueCategory =>{
        const { user, reqBody } = reqData
        return { ...reqBody, createdBy: user._id }
    };
}

export const domainData = new VenueTData()