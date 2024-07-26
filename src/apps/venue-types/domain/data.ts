import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { T } from "../data-access/model"

class DomainData{
    public includeFile = (inputData: any, file: Express.Multer.File): T => {
        return { ...in``, graphic: createFileBuffer(file) } 
    }
}

export const eventData = new DomainData()