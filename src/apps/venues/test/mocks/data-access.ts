import { Paginator } from "../../../../z-library/HTTP/http-response"
import { 
    HydratedVenueDoc, 
    Venue, 
    VenueModel
} from "../../data-access/model"
import { DataAccess } from "../../data-access/data-access"
import { validData } from "./raw-data"
import { HydratedDocument } from "mongoose"
import { jest } from "@jest/globals"

const ID_OF_EXISTING_DOCUMENT = '64c9e4f2df7cc072af2ac9e4'

export class VenuesDAL extends DataAccess{
    
    constructor(model: VenueModel){
        super(model)
    }

    public createNew = jest.fn(async(data: Venue): Promise<HydratedVenueDoc> =>{
            const Venue = new this.model(data)  
            return Venue
        }
    )

    public findByReferenceId = jest.fn(async(refId: string):Promise<HydratedVenueDoc | null> =>{
        return this.documentOrNull(refId)
    })

    private documentOrNull = (id: string) =>{
        if(id === ID_OF_EXISTING_DOCUMENT){
            return new this.model(validData)  
        } 
        return null
    }

    public findWithPagination = jest.fn(async(paginator: Paginator): Promise<HydratedDocument<Venue>[]> =>{
        return this.createMockUsersArray(paginator.limit)
    })

    private createMockUsersArray = (limit: number) =>{

        const mockUsers: HydratedVenueDoc[] = []

        let userCount = 0
        while(userCount < limit){
            mockUsers.push(new this.model(validData))

            userCount ++
        }

        return mockUsers
    }

    public findByOrganizerId = jest.fn(async(organizerId: string, paginator: Paginator
        ): Promise<HydratedVenueDoc[]>=>{
        return this.createMockUsersArray(paginator.limit)
    })

    public findByIdAndUpdate = jest.fn(async(id: string, updateDoc: any):Promise<HydratedDocument<Venue> | null> =>{
        return this.documentOrNull(id)
    })

    public findByIdAndDelete = async(id: string): Promise<HydratedDocument<Venue> | null> =>{
        return this.documentOrNull(id)
    }
}
