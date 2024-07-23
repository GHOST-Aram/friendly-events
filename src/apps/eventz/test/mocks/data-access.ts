import { Paginator } from "../../../../z-library/HTTP/http-response"
import { 
    HydratedEventDoc, 
    Event, 
    EventModel
} from "../../data-access/model"
import { jest } from "@jest/globals"
import { EventsDataAccess } from "../../data-access/data-access"
import { validEventData } from "./raw-data"
import { HydratedDocument } from "mongoose"

const ID_OF_EXISTING_DOCUMENT = '64c9e4f2df7cc072af2ac9e4'

export class EventsDAL extends EventsDataAccess{
    
    constructor(model: EventModel){
        super(model)
    }

    public createNew = jest.fn(

        async(eventData: Event): Promise<HydratedEventDoc> =>{

            const event = new this.model(eventData)  
            return event
        }
    )

    public findByReferenceId = async(refId: string):Promise<HydratedEventDoc | null> =>{
        if(refId === ID_OF_EXISTING_DOCUMENT){
            return new this.model(validEventData)  
        } 
        return null
    }

    public findWithPagination = async (paginator: Paginator): Promise<HydratedDocument<Event>[]> =>{
        return this.createMockUsersArray(paginator.limit)
    }

    private createMockUsersArray = (limit: number) =>{

        const mockUsers: HydratedEventDoc[] = []

        let userCount = 0
        while(userCount < limit){
            mockUsers.push(new this.model(validEventData))

            userCount ++
        }

        return mockUsers
    }

    public findByOrgnizerId = async(organizerId: string, paginator: Paginator
        ): Promise<HydratedEventDoc[]>=>{
        return this.createMockUsersArray(paginator.limit)
    }
}
