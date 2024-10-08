import { EventCategory, CategoryModel } from "../../data-access/model"
import { MockDataAccess } from '../../../../zero/testing'

export class CategoriesDAL extends MockDataAccess<CategoryModel, EventCategory>{
    
    constructor(model: CategoryModel, validData: Object){
        super(model, validData)
    }
}
