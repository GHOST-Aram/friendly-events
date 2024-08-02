import { EventCategory, CategoryModel } from "../../data-access/model"
import { MockDataAccess } from '../../../../z-library/testing'

export class CategoriesDAL extends MockDataAccess<CategoryModel, EventCategory>{
    
    constructor(model: CategoryModel, validData: Object){
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
