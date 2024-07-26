import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { Venue } from "../data-access/model"

class VenueData{
    public includeFiles = (inputData: any, files: Express.Multer.File[]): Venue => {

        const pictures = files.map(file => createFileBuffer(file))
        return {...inputData, pictures } 
    }
}

export const domainData = new VenueData()