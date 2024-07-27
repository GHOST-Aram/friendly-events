import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { EventCategory } from "../data-access/model"
import { RequestData } from "../../../z-library/request/request-data"

class CategoryData{
    public createInputDocument = (reqData: RequestData): EventCategory =>{
        const { reqBody, file, currentUserId } = reqData
        const inputData: EventCategory = { ...reqBody, createdBy: currentUserId }
        const categoryData = file ? this.includeFile(inputData, file) : inputData

        return categoryData
    }

    public includeFile = (inputData: any, file: Express.Multer.File): EventCategory => {
        return { ...inputData, graphic: createFileBuffer(file) }
    }

}

export const domainData = new CategoryData()