import { GenericDataAccess } from "../../../z-library/bases"
import { EventCategory, CategoryModel } from "./model";

export class DataAccess extends GenericDataAccess<CategoryModel, EventCategory>{
    public findByName = async(name: string) =>{
        return await this.model.findOne({ name })
    }
}