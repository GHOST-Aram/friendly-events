import { Paginator } from "../../../../z-library/HTTP/http-response"
import { 
    HydratedEventDoc, 
    Event, 
    EventModel
} from "../../data-access/model"
import { EventsDataAccess } from "../../data-access/data-access"
import { validData } from "./raw-data"
import { HydratedDocument } from "mongoose"
import { jest } from "@jest/globals"

const ID_OF_EXISTING_DOCUMENT = '64c9e4f2df7cc072af2ac9e4'

export class EventsDAL extends EventsDataAccess{
    
    constructor(model: EventModel){
        super(model)
    }

    public createNew = jest.fn(async(eventData: Event): Promise<HydratedEventDoc> =>{
            const event = new this.model(eventData)  
            return event
        }
    )

    public findByReferenceId = jest.fn(async(refId: string):Promise<HydratedEventDoc | null> =>{
        return this.documentOrNull(refId)
    })

    public findByCreatorId = async(creatorId: string, paginator: Paginator): Promise<HydratedDocument<Event>[]> =>{
        return this.createMockDocsArray(paginator.limit)
    };

    private documentOrNull = (id: string) =>{
        if(id === ID_OF_EXISTING_DOCUMENT){
            return new this.model({...validData, createdBy: '64c9e4f2df7cc072af2ac8a4'})  
        } 
        return null
    }

    public findWithPagination = jest.fn(async(paginator: Paginator): Promise<HydratedDocument<Event>[]> =>{
        return this.createMockDocsArray(paginator.limit)
    })

    private createMockDocsArray = (limit: number) =>{

        const docs: HydratedEventDoc[] = []

        let userCount = 0
        while(userCount < limit){
            docs.push(new this.model(validData))

            userCount ++
        }

        return docs
    }

    public findByOrganizerId = jest.fn(async(organizerId: string, paginator: Paginator
        ): Promise<HydratedEventDoc[]>=>{
        return this.createMockDocsArray(paginator.limit)
    })

    public findByIdAndUpdate = jest.fn(async(id: string, updateDoc: any):Promise<HydratedDocument<Event> | null> =>{
        return this.documentOrNull(id)
    })

    public findByIdAndDelete = async(id: string): Promise<HydratedDocument<Event> | null> =>{
        return this.documentOrNull(id)
    }
}
