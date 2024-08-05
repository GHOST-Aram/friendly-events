import { GenericController } from "../../../z-library/bases";
import { DataAccess } from "../data-access/data-access";

export class Controller extends GenericController<DataAccess>{
    constructor (dataAccess: DataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }
 
}

