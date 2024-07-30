import { VenueCategory, VenueCategoryModel } from "../../data-access/model"
import { MockDataAccess } from "../../../../z-library/testing"

export class VenueCategoryDAL extends MockDataAccess<VenueCategoryModel, VenueCategory>{
    
    constructor(model: VenueCategoryModel, validData: Object){
        super(model, validData)
    }

}