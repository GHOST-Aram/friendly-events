import { hash } from "bcrypt"
import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { User } from "../data-access/model"
import { RequestData, DomainData } from "../../../z-library/types"
import { getDataFromRequest } from "../../../z-library/request/request-data"
import { Response, Request, NextFunction } from "express"

class UserData implements DomainData{
    
    public createInputDocument = (reqData: RequestData): User  =>{
        const { file, reqBody } = reqData
        const userData = file ? {...reqBody, profilePicture: createFileBuffer(file) } : reqBody

        return userData   
    }

    public encyptPassword = async( updateDoc: any ): Promise<User> =>{
        return { ...updateDoc, password: await hash(updateDoc.password, 10) }  
    }

    public allowDocumentOwner = (req: Request, res: Response, next: NextFunction) =>{

        const {currentUserId, referenceId } = getDataFromRequest(req)

        if(currentUserId !== referenceId){
            res.status(403).json(`Forbidden. Users cannot alter other users \' documents}`)
        } else{
            next()
        }
    }

}

export const domainData = new UserData()