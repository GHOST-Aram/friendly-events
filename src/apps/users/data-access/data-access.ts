import { GenericDataAccess } from "../../../z-library/bases"
import { HydratedUserDoc, User, UserModel } from "./model"
import { Paginator } from "../../../z-library/types"

export class UsersDAL extends GenericDataAccess<UserModel, User>{
    constructor (model : UserModel){
        super(model)
    }
    
    public findByEmail = async(email: string): Promise<HydratedUserDoc | null> =>{
        return await this.model.findOne({ email })
    }

    public findByReferenceId = async(refId: string) =>{
        return await this.model.findById(refId, { password: 0 })
    }

    public findWithPagination = async(paginator: Paginator)
    : Promise<HydratedUserDoc[]> => {
        return await this.model.find({}, { password: 0 }).skip(paginator.skipDocs)
            .limit(paginator.limit)
    }
}