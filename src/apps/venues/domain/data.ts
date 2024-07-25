import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { Venue } from "../data-access/model"

class VenueData{
    public formatInput = (inputData: any, files: Express.Multer.File[]): Venue => {
        const venueData: Venue = inputData

        if(Array.isArray(files) && files.length){
            const pictures = files.map(file => createFileBuffer(file))
            return {...venueData, pictures } 
        }

        return venueData
    }
}

export const domainData = new VenueData()