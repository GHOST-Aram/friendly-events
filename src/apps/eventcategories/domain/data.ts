import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { EventCategory } from "../data-access/model"
import { RequestData } from "../../../z-library/request/request-data"
import { DomainData } from "../../../z-library/bases/domain-data"

class CategoryData implements DomainData{
    public createInputDocument = (reqData: RequestData): EventCategory =>{
        const { reqBody, file, currentUserId } = reqData
        const inputData: EventCategory = { ...reqBody, createdBy: currentUserId }
        const categoryData = file ? this.includeFile(inputData, file) : inputData

        return categoryData
    }

    private includeFile = (inputData: any, file: Express.Multer.File): EventCategory => {
        return { ...inputData, graphic: createFileBuffer(file) }
    }

}

export const domainData = new CategoryData()