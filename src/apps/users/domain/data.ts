import { hash } from "bcrypt"
import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { User } from "../data-access/model"

class UserData{

    public includeFile = (updateDoc: any, file: Express.Multer.File): User => {
        return { ...updateDoc, profilePicture: createFileBuffer(file) }
    }

    public encyptPassword = async( updateDoc: any ): Promise<User> =>{
        return { ...updateDoc, password: await hash(updateDoc.password, 10) }  
    }
}

export const domainData = new UserData()