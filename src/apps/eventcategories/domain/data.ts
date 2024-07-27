import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { EventCategory } from "../data-access/model"
import { RequestData } from "../../../z-library/request/request-data"
import { DomainData } from "../../../z-library/bases/domain-data"

class CategoryData implements DomainData{
    public createInputDocument = (reqData: RequestData): EventCategory =>{
        const { reqBody, file, currentUserId } = reqData
        const inputData: EventCategory = { ...reqBody, createdBy: currentUserId }
        const categoryData = file ? { ...inputData, graphic: createFileBuffer(file) } : inputData

        return categoryData
    }
}

export const domainData = new CategoryData()