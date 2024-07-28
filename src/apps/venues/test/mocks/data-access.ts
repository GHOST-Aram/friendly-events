import { Venue, VenueModel} from "../../data-access/model"
import { MockDataAccess } from "../../../../z-library/testing/mocks/data-access"

export class VenuesDAL extends MockDataAccess<VenueModel, Venue>{
    
    constructor(model: VenueModel, validData: Object){
        super(model, validData)
    }
}
