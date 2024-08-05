import { GenericController } from "../../../zero/bases";
import { DataAccess } from "../data-access/data-access";

export class Controller extends GenericController<DataAccess>{
    constructor (dataAccess: DataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }
}

