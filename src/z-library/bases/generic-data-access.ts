import { Model } from "mongoose";
import { Paginator } from "../http";
import { Accessible } from "./accessible";
import { HydratedDocument } from "mongoose";

export class GenericDataAccess<T extends Model<any>, RawData> implements Accessible {

    public model: T

    constructor(model: T){
        this.model = model
    }
    
    public createNew = (data: RawData): Promise<HydratedDocument<RawData>> =>{
        return this.model.create(data)
    }

    public findByCreatorId = async(creatorId: string, paginator:Paginator
        ):Promise<HydratedDocument<RawData>[]> =>{
        return await this.model.find({ createdBy: creatorId }).skip(paginator.skipDocs)
            .limit(paginator.limit)
    }

    public findByReferenceId = async(refId: string)
        : Promise<HydratedDocument<RawData> | null> =>{
        return await this.model.findById(refId)
    }

    public findByName = async(name: string) =>{
        return await this.model.findOne({ name })
    }

    public findBySearchDocument = async(searchDoc: any, paginator: Paginator) =>{
        return await this.model.find(searchDoc).skip(paginator.skipDocs).limit(paginator.limit)
        .collation({ locale:'en', strength: 2 })
    }

    public findWithPagination = async(paginator: Paginator): Promise<HydratedDocument<RawData>[]> => {
        return await this.model.find().skip(paginator.skipDocs).limit(paginator.limit)
    }

    public findByIdAndUpdate = async(id: string, updateDoc: any)
        :Promise<HydratedDocument<RawData> | null> =>{
        return await this.model.findByIdAndUpdate(id, updateDoc, { new: true })
    }

    public findByIdAndDelete = async(id: string)
        : Promise<HydratedDocument<RawData> | null> =>{
        return await this.model.findByIdAndDelete(id)
    }

}