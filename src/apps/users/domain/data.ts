import { hash } from "bcrypt"
import { createFileBuffer } from "../../../z-library/uploads/file-buffer"
import { User } from "../data-access/model"

class UserData{
    public formatData = async(updateDoc: any, file: Express.Multer.File): Promise<User> =>{
        const { fullName, email, password, userGroup } = updateDoc

        const userData = { fullName, email, userGroup, password: await hash(password, 10) }

        return file ? { ...userData, profilePicture: createFileBuffer(file) } : userData  
    }
}

export const domainData = new UserData()