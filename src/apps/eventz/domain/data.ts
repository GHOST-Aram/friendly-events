import { RequestData, DomainData } from "../../../z-library/types"
import { createFileBuffer } from "../../../z-library/uploads"
import { Event } from "../data-access/model"

class EventData implements DomainData{
    public aggregateInputDocument = (reqData: RequestData): Event => {
        const { reqBody, currentUserId, file } = reqData
        const inputData = {...reqBody, organizer: currentUserId }
        
        const eventData = file ? { ...inputData, graphic: createFileBuffer(file) } : inputData

        return eventData
    }

}

export const eventData = new EventData()