import { Paginator } from "../../../z-library/HTTP/http-response"
import { GenericDataAccess } from "../../../z-library/bases/generic-data-access"
import { HydratedUserDoc, User, UserModel } from "./model"

export class UsersDAL extends GenericDataAccess<UserModel, User>{
    constructor (model : UserModel){
        super(model)
    }
    
    public findByEmail = async(email: string): Promise<HydratedUserDoc | null> =>{
        return await this.model.findOne({ email })
    }
}

