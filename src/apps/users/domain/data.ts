import { hash } from "bcrypt"
import { createFileBuffer } from "../../../z-library/uploads"
import { User } from "../data-access/model"
import { Response, Request, NextFunction } from "../../../z-library/types"
import { getDataFromRequest, RequestData } from "../../../z-library/request"
import { DomainData } from "../../../z-library/domain-data"

class UserData implements DomainData{
    
    public aggregateInputDocument = (reqData: RequestData): User  =>{
        const { file, reqBody } = reqData
        const userData = file ? {...reqBody, profilePicture: createFileBuffer(file) } : reqBody

        return userData   
    }

    public encyptPassword = async( updateDoc: any ): Promise<User> =>{
        return { ...updateDoc, password: await hash(updateDoc.password, 10) }  
    }

    public allowDocumentOwner = (req: Request, res: Response, next: NextFunction) =>{

        const {currentUserId, referenceId } = getDataFromRequest(req)

        if(currentUserId === referenceId){
            next()
        } else{
            res.status(403).json(`Forbidden. Users cannot alter other users \' documents}`)
        }
    }

    public createMinizedUserObject = (user: any): MinimizedUserData =>{
        return { ...user, password: undefined }
    }
}

interface MinimizedUserData{
    fullName: string
    email: string
    userGroup: string
    _id: string
}

export const domainData = new UserData()