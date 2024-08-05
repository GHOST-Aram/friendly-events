import { createFileBuffer } from "../../../z-library/uploads"
import { EventCategory, uniqueObjectkeys } from "../data-access/model"
import { DomainData } from "../../../z-library/domain-data"
import { RequestData } from "../../../z-library/request"
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