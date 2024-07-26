import { Paginator } from "../../../../z-library/HTTP/http-response"
import { 
    HydratedVenueType, 
    VenueType, 
    VenueTypeModel
} from "../../data-access/model"
import { DataAccess } from "../../data-access/data-access"
import { validData } from "./raw-data"
import { HydratedDocument } from "mongoose"
import { jest } from "@jest/globals"

const ID_OF_EXISTING_DOCUMENT = '64c9e4f2df7cc072af2ac9e4'

export class VenueTypeDAL extends DataAccess{
    
    constructor(model: VenueTypeModel){
        super(model)
    }

    public createNew = jest.fn(async(data: VenueType): Promise<HydratedVenueType> =>{
            const venueType = new this.model(data)  
            return venueType
        }
    )

    public findByCreatorId = jest.fn(async(creator: string, paginator: Paginator
    ): Promise<HydratedVenueType[]>=>{
    return this.createDocsArray(paginator.limit)
})

    public findByReferenceId = jest.fn(async(refId: string):Promise<HydratedVenueType | null> =>{
        return this.documentOrNull(refId)
    })

    private documentOrNull = (id: string) =>{
        if(id === ID_OF_EXISTING_DOCUMENT){
            return new this.model(validData)  
        } 
        return null
    }

    public findWithPagination = jest.fn(async(paginator: Paginator): Promise<HydratedDocument<VenueType>[]> =>{
        return this.createDocsArray(paginator.limit)
    })

    private createDocsArray = (limit: number) =>{

        const mockDocs: HydratedVenueType[] = []

        let userCount = 0
        while(userCount < limit){
            mockDocs.push(new this.model(validData))

            userCount ++
        }

        return mockDocs
    }

    public findByOrganizerId = jest.fn(async(organizerId: string, paginator: Paginator
        ): Promise<HydratedVenueType[]>=>{
        return this.createDocsArray(paginator.limit)
    })

    public findByIdAndUpdate = jest.fn(async(id: string, updateDoc: any):Promise<HydratedDocument<VenueType> | null> =>{
        return this.documentOrNull(id)
    })

    public findByIdAndDelete = async(id: string): Promise<HydratedDocument<VenueType> | null> =>{
        return this.documentOrNull(id)
    }
}
