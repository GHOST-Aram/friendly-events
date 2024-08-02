import { DomainData } from "../../../z-library/domain-data"
import { createFileBuffer } from "../../../z-library/uploads"
import { Venue } from "../data-access/model"
import { RequestData } from "../../../z-library/request"

class VenueData implements DomainData{
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