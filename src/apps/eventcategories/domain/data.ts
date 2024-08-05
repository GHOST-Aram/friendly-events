import { createFileBuffer } from "../../../zero/uploads"
import { EventCategory, uniqueObjectkeys } from "../data-access/model"
import { DomainData } from "../../../zero/domain-data"
import { RequestData } from "../../../zero/request"
import { createObjectFromKeys } from "../../../utils/data-object/data-object"

class CategoryData implements DomainData{
    public createUniqueSearchDocument = (inputData: any) => {
        const uniqueSearchDoc = createObjectFromKeys(uniqueObjectkeys, inputData)
        return uniqueSearchDoc
    }

    public aggregateInputDocument = (reqData: RequestData): EventCategory =>{
        const { reqBody, file, currentUserId } = reqData
        const inputData: EventCategory = { ...reqBody, createdBy: currentUserId }
        const categoryData = file ? { ...inputData, graphic: createFileBuffer(file) } : inputData

        return categoryData
    }
}

export const domainData = new CategoryData()