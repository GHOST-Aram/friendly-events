import { VenueCategory, VenueCategoryModel } from "../../data-access/model"
import { MockDataAccess } from "../../../../z-library/testing"

export class VenueCategoryDAL extends MockDataAccess<VenueCategoryModel, VenueCategory>{
    
    constructor(model: VenueCategoryModel, validData: any){
        super(model, validData)
    }

    public findByName = async(name: string) =>{

        if(name === 'Existing'){
            return new this.model({
                name: 'Existing', 
                description: this.validData.description
            })
        }

        return null
    }
}