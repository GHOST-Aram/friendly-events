import { DomainData } from "../../../z-library/bases/domain-data"
import { RequestData } from "../../../z-library/request/request-data"
import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { Event } from "../data-access/model"

class EventData implements DomainData{
    public createInputDocument = (reqData: RequestData): Event => {
        const { reqBody, currentUserId, file } = reqData
        const inputData = {...reqBody, organizer: currentUserId }
        
        const eventData = file ? { ...inputData, graphic: createFileBuffer(file) } : inputData

        return eventData
    }

}

export const eventData = new EventData()