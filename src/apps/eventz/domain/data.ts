import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { Event } from "../data-access/model"

class EventData{
    public formatData = (inputData: any, file: Express.Multer.File): Event => {
        const eventData: Event = inputData
        return file? { ...eventData, graphic: createFileBuffer(file) } : eventData
    }
}

export const eventData = new EventData()