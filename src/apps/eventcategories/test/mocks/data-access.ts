import { Paginator } from "../../../../z-library/HTTP/http-response"
import { 
    HydratedCategoryDoc, 
    EventCategory, 
    CategoryModel
} from "../../data-access/model"
import { DataAccess } from "../../data-access/data-access"
import { validData } from "./raw-data"
import { HydratedDocument } from "mongoose"
import { jest } from "@jest/globals"

const ID_OF_EXISTING_DOCUMENT = '64c9e4f2df7cc072af2ac9e4'

export class CategoriesDAL extends DataAccess{
    
    constructor(model: CategoryModel){
        super(model)
    }

    public createNew = jest.fn(async(data: EventCategory): Promise<HydratedCategoryDoc> =>{
            const EventCategory = new this.model(data)  
            return EventCategory
        }
    )

    public findByReferenceId = jest.fn(async(refId: string):Promise<HydratedCategoryDoc | null> =>{
        return this.documentOrNull(refId)
    })

    private documentOrNull = (id: string) =>{
        if(id === ID_OF_EXISTING_DOCUMENT){
            return new this.model(validData)  
        } 
        return null
    }

    public findWithPagination = jest.fn(async(paginator: Paginator): Promise<HydratedCategoryDoc[]> =>{
        return this.createMockDocsArray(paginator.limit)
    })

    private createMockDocsArray = (limit: number) =>{

        const mockDocs: HydratedCategoryDoc[] = []

        let userCount = 0
        while(userCount < limit){
            mockDocs.push(new this.model(validData))

            userCount ++
        }

        return mockDocs
    }

    public findByCreatorId = jest.fn(async(creatorId: string, paginator: Paginator
        ): Promise<HydratedCategoryDoc[]>=>{
        return this.createMockDocsArray(paginator.limit)
    })

    public findByIdAndUpdate = jest.fn(async(id: string, updateDoc: any):Promise<HydratedDocument<EventCategory> | null> =>{
        return this.documentOrNull(id)
    })

    public findByIdAndDelete = async(id: string): Promise<HydratedDocument<EventCategory> | null> =>{
        return this.documentOrNull(id)
    }
}
