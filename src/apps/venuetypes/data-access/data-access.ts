import { GenericDataAccess } from "../../../z-library/bases"
import { VenueCategory, VenueCategoryModel } from "./model";

export class DataAccess extends GenericDataAccess<VenueCategoryModel, VenueCategory>{

    public findByName = async(name: string) =>{
        return await this.model.findOne({ name })
    }
}