import { GenericDataAccess } from "../../../z-library/bases/generic-data-access"
import { HydratedUserDoc, User, UserModel } from "./model"
import { Paginator } from "../../../z-library/HTTP/http-response"

export class UsersDAL extends GenericDataAccess<UserModel, User>{
    constructor (model : UserModel){
        super(model)
    }
    
    public findByEmail = async(email: string): Promise<HydratedUserDoc | null> =>{
        return await this.model.findOne({ email })
    }

    public findByReferenceId = async(refId: string):Promise<HydratedUserDoc | null> =>{
        return await this.model.findById(refId, { password: 0 })
    }

    public findWithPagination = async(paginator: Paginator)
    : Promise<HydratedUserDoc[]> => {
        return await this.model.find({}, { password: 0 }).skip(paginator.skipDocs)
            .limit(paginator.limit)
    }
}