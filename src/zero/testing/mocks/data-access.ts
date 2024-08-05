import { Paginator} from "../../HTTP/types"
import { Accessible } from "../../bases/accessible"
import { HydratedDocument } from "mongoose"
import { jest } from "@jest/globals"
import { Model } from "mongoose"


export class MockDataAccess<T extends Model<any>, RawData> implements Accessible{
    
    public ID_OF_EXISTING_DOCUMENT = '64c9e4f2df7cc072af2ac9e4'
    public model:T
    public validData: any 

    constructor(model: T, validData: any){
        this.model = model
        this.validData = validData
    }

    public findExistingDocument = async(searchDoc: {}) =>{

        let existingDocument:any = null
        
        for(const key in searchDoc){
            if(/existing/gi.test((searchDoc as any )[key])){
                existingDocument = new this.model(this.validData)
                break 
            }
        }

        return existingDocument
    }

    public createNew = jest.fn(async(data: RawData): Promise<HydratedDocument<RawData>> =>{
            const document = new this.model(data)  
            return document
        }
    )

    public findByReferenceId = jest.fn(async(refId: string):Promise<HydratedDocument<RawData> | null> =>{
        return this.documentOrNull(refId)
    })

    public documentOrNull = (id: string) =>{
        if(id === this.ID_OF_EXISTING_DOCUMENT){
            return new this.model({...this.validData, createdBy: '64c9e4f2df7cc072af2ac8a4'})  
        } 
        return null
    }

    public findBySearchDocument = async(searchDoc: any, paginator: Paginator) =>{

        return this.createDocsArray(paginator.limit,

            //Include the data in the search document for verifaction in tests 
            {...this.validData, ...searchDoc }
        )
    }

    public findWithPagination = jest.fn(async(paginator: Paginator): Promise<HydratedDocument<RawData>[]> =>{
        return this.createDocsArray(paginator.limit)
    })

    public createDocsArray = (limit: number, doc?:{}) =>{

        const mockDocs: HydratedDocument<RawData>[] = []

        let userCount = 0
        while(userCount < limit){
            mockDocs.push(new this.model( doc ? doc: this.validData))

            userCount ++
        }

        return mockDocs
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

    public findByCreatorId = jest.fn(async(creatorId: string, paginator: Paginator
        ): Promise<HydratedDocument<RawData>[]>=>{
        return this.createDocsArray(paginator.limit)
    })

    public findByIdAndUpdate = jest.fn(async(id: string, updateDoc: any):Promise<HydratedDocument<RawData> | null> =>{
        return this.documentOrNull(id)
    })

    public findByIdAndDelete = async(id: string): Promise<HydratedDocument<RawData> | null> =>{
        return this.documentOrNull(id)
    }
}
