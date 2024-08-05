import { hash } from "bcrypt"
import { createFileBuffer } from "../../../z-library/uploads"
import { uniqueObjectkeys, User } from "../data-access/model"
import { Response, Request, NextFunction } from "../../../z-library/types"
import { getDataFromRequest, RequestData } from "../../../z-library/request"
import { DomainData } from "../../../z-library/domain-data"
import { userGroup } from "../../../utils/user-group/user-group"
import { createObjectFromKeys } from "../../../utils/data-object/data-object"

class UserData implements DomainData{
    public createUniqueSearchDocument = (inputData: any): {} => {
        const uniqueSearchDoc = createObjectFromKeys(uniqueObjectkeys, inputData)
        return uniqueSearchDoc
    }
    
    public aggregateInputDocument = (reqData: RequestData): User  =>{
        const { file, reqBody } = reqData
        const userData = file ? {...reqBody, profilePicture: createFileBuffer(file) } : reqBody

        return userData   
    }

    public encyptPassword = async( updateDoc: any ): Promise<User> =>{
        return { ...updateDoc, password: await hash(updateDoc.password, 10) }  
    }

    public allowOwnerOrAdmin = (req: Request, res: Response, next: NextFunction) =>{

        const {currentUserId, user, referenceId } = getDataFromRequest(req)

        if(currentUserId === referenceId || userGroup.isAdmin(user)){
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