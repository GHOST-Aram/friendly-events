import { DomainData } from "../../../z-library/domain-data"
import { createFileBuffer } from "../../../z-library/uploads"
import { Event } from "../data-access/model"
import { RequestData } from "../../../z-library/request"

class EventData implements DomainData{
    public aggregateInputDocument = (reqData: RequestData): Event => {
        const { reqBody, currentUserId, file } = reqData
        const inputData = {...reqBody, createdBy: currentUserId }
        
        const eventData = file ? { ...inputData, graphic: createFileBuffer(file) } : inputData

        return eventData
    }

}

export const eventData = new EventData()