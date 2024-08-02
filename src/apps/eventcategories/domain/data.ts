import { createFileBuffer } from "../../../z-library/uploads"
import { EventCategory } from "../data-access/model"
import { DomainData } from "../../../z-library/types"
import { RequestData } from "../../../z-library/request"

class CategoryData implements DomainData{
    public aggregateInputDocument = (reqData: RequestData): EventCategory =>{
        const { reqBody, file, currentUserId } = reqData
        const inputData: EventCategory = { ...reqBody, createdBy: currentUserId }
        const categoryData = file ? { ...inputData, graphic: createFileBuffer(file) } : inputData

        return categoryData
    }
}

export const domainData = new CategoryData()