import { DomainData } from "../../../zero/domain-data"
import { createFileBuffer } from "../../../zero/uploads"
import { Venue, uniqueObjectkeys } from "../data-access/model"
import { RequestData } from "../../../zero/request"
import { createObjectFromKeys } from "../../../utils/data-object/data-object"

class VenueData implements DomainData{
    public createUniqueSearchDocument = (inputData: any) => {
        const uniqueSearchDoc = createObjectFromKeys(uniqueObjectkeys, inputData)
        return uniqueSearchDoc
    }
    
    public aggregateInputDocument = (reqData: RequestData) => {
        const { reqBody, currentUserId, files } = reqData
        const inputData = { ...reqBody, createdBy: currentUserId }

        return files ? this.includeFiles(inputData, files) : inputData
    }

    private includeFiles = (inputData: any, files: Express.Multer.File[]): Venue => {

        const pictures = files.map(file => createFileBuffer(file))
        return {...inputData, pictures } 
    }
}

export const domainData = new VenueData()