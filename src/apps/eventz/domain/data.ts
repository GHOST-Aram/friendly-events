import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { Event } from "../data-access/model"

class EventData{
    public includeFile = (inputData: any, file: Express.Multer.File): Event => {
        return { ...inputData, graphic: createFileBuffer(file) }
    }
}

export const eventData = new EventData()