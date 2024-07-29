import { DomainData, RequestData } from "../../../z-library/types"
import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { Venue } from "../data-access/model"

class VenueData implements DomainData{
    public createInputDocument = (reqData: RequestData) => {
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