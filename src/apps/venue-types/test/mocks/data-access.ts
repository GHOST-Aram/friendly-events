import { Paginator } from "../../../../z-library/HTTP/http-response"
import { 
    HydratedDoc, 
    T, 
    TModel
} from "../../data-access/model"
import { DataAccess } from "../../data-access/data-access"
import { validData } from "./raw-data"
import { HydratedDocument } from "mongoose"
import { jest } from "@jest/globals"

const ID_OF_EXISTING_DOCUMENT = '64c9e4f2df7cc072af2ac9e4'

export class MockDataAccess extends DataAccess{
    
    constructor(model: TModel){
        super(model)
    }

    public createNew = jest.fn(async(data: T): Promise<HydratedDoc> =>{
            const T = new this.model(data)  
            return T
        }
    )

    public findByReferenceId = jest.fn(async(refId: string):Promise<HydratedDoc | null> =>{
        return this.documentOrNull(refId)
    })

    private documentOrNull = (id: string) =>{
        if(id === ID_OF_EXISTING_DOCUMENT){
            return new this.model(validData)  
        } 
        return null
    }

    public findWithPagination = jest.fn(async(paginator: Paginator): Promise<HydratedDocument<T>[]> =>{
        return this.createMockUsersArray(paginator.limit)
    })

    private createMockUsersArray = (limit: number) =>{

        const mockUsers: HydratedDoc[] = []

        let userCount = 0
        while(userCount < limit){
            mockUsers.push(new this.model(validData))

            userCount ++
        }

        return mockUsers
    }

    public findByOrganizerId = jest.fn(async(organizerId: string, paginator: Paginator
        ): Promise<HydratedDoc[]>=>{
        return this.createMockUsersArray(paginator.limit)
    })

    public findByIdAndUpdate = jest.fn(async(id: string, updateDoc: any):Promise<HydratedDocument<T> | null> =>{
        return this.documentOrNull(id)
    })

    public findByIdAndDelete = async(id: string): Promise<HydratedDocument<T> | null> =>{
        return this.documentOrNull(id)
    }
}
