import { Venue, VenueModel} from "../../data-access/model"
import { MockDataAccess } from "../../../../zero/testing"

export class VenuesDAL extends MockDataAccess<VenueModel, Venue>{
    
    constructor(model: VenueModel, validData: Object){
        super(model, validData)
    }
}
