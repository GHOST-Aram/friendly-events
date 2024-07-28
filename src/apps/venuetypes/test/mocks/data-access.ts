import { VenueCategory, VenueCategoryModel } from "../../data-access/model"
import { MockDataAccess } from "../../../../z-library/testing/mocks/data-access"

export class VenueCategoryDAL extends MockDataAccess<VenueCategoryModel, VenueCategory>{
    
    constructor(model: VenueCategoryModel, validData: Object){
        super(model, validData)
    }

}