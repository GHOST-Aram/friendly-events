import { Paginator } from "../../../../z-library/HTTP/http-response"
import { 
    HydratedVenueCategory, 
    VenueCategory, 
    VenueCategoryModel
} from "../../data-access/model"
import { DataAccess } from "../../data-access/data-access"
import { validData } from "./raw-data"
import { HydratedDocument } from "mongoose"
import { jest } from "@jest/globals"

const ID_OF_EXISTING_DOCUMENT = '64c9e4f2df7cc072af2ac9e4'

export class VenueCategoryDAL extends DataAccess{
    
    constructor(model: VenueCategoryModel){
        super(model)
    }

    public createNew = jest.fn(async(data: VenueCategory): Promise<HydratedVenueCategory> =>{
            const venueCategory = new this.model(data)  
            return venueCategory
        }
    )

    public findByCreatorId = jest.fn(async(creator: string, paginator: Paginator
    ): Promise<HydratedVenueCategory[]>=>{
    return this.createDocsArray(paginator.limit)
})

    public findByReferenceId = jest.fn(async(refId: string):Promise<HydratedVenueCategory | null> =>{
        return this.documentOrNull(refId)
    })

    private documentOrNull = (id: string) =>{
        if(id === ID_OF_EXISTING_DOCUMENT){
            const data = {...validData, createdBy: '64c9e4f2df7cc072af2ac8a4'}
            const doc =  new this.model(data)  
            return doc
        } 
        return null
    }

    public findWithPagination = jest.fn(async(paginator: Paginator): Promise<HydratedDocument<VenueCategory>[]> =>{
        return this.createDocsArray(paginator.limit)
    })

    private createDocsArray = (limit: number) =>{

        const mockDocs: HydratedVenueCategory[] = []

        let userCount = 0
        while(userCount < limit){
            mockDocs.push(new this.model(validData))

            userCount ++
        }

        return mockDocs
    }

    public findByOrganizerId = jest.fn(async(organizerId: string, paginator: Paginator
        ): Promise<HydratedVenueCategory[]>=>{
        return this.createDocsArray(paginator.limit)
    })

    public findByIdAndUpdate = jest.fn(async(id: string, updateDoc: any):Promise<HydratedDocument<VenueCategory> | null> =>{
        return this.documentOrNull(id)
    })

    public findByIdAndDelete = async(id: string): Promise<HydratedDocument<VenueCategory> | null> =>{
        return this.documentOrNull(id)
    }
}
