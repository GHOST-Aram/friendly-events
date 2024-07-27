import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { EventCategory } from "../data-access/model"

class CategoryData{
    public includeFile = (inputData: any, file: Express.Multer.File): EventCategory => {
        return { ...inputData, graphic: createFileBuffer(file) }
    }
}

export const domainData = new CategoryData()