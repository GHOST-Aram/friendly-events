import { GenericDataAccess } from "../../../zero/bases"
import { HydratedUserDoc, User, UserModel } from "./model"
import { Paginator } from "../../../zero/http"

export class UsersDAL extends GenericDataAccess<UserModel, User>{
    constructor (model : UserModel){
        super(model)
    }

    public createNew = async (data: User) => {
        const user:any = await this.model.create(data)
        user.password = undefined

        return user
    }
    
    public findByEmail = async(email: string): Promise<HydratedUserDoc | null> =>{
        return await this.model.findOne({ email })
    }

    public findByReferenceId = async(refId: string) =>{
        return await this.model.findById(refId, { password: 0 })
    }

    public findByIdAndUpdate = async(id: string, updateDoc: any)
        :Promise<HydratedUserDoc | null> =>{
        return await this.model.findByIdAndUpdate(id, updateDoc, { new: true, select: '-password' })
    }

    public findWithPagination = async(paginator: Paginator)
    : Promise<HydratedUserDoc[]> => {
        return await this.model.find({}, { password: 0 }).skip(paginator.skipDocs)
            .limit(paginator.limit)
    }
}