import { DomainData } from "../../../zero/domain-data"
import { createFileBuffer } from "../../../zero/uploads"
import { Event } from "../data-access/model"
import { RequestData } from "../../../zero/request"
import { createObjectFromKeys } from "../../../utils/data-object/data-object"
import { uniqueObjectkeys } from "../data-access/model"

class EventData implements DomainData{
    
    public createUniqueSearchDocument = (inputData: any) => {
        const uniqueSearchDoc = createObjectFromKeys(uniqueObjectkeys, inputData)
        return uniqueSearchDoc
    }

    public aggregateInputDocument = (reqData: RequestData): Event => {
        const { reqBody, currentUserId, file } = reqData
        const inputData = {...reqBody, createdBy: currentUserId }
        
        const eventData = file ? { ...inputData, graphic: createFileBuffer(file) } : inputData

        return eventData
    }

}

export const domainData = new EventData()