import { Paginator } from "../../../../z-library/HTTP/http-response"
import { HydratedUserDoc, User, UserModel } from "../../data-access/model"
import { jest } from "@jest/globals"
import { MockDataAccess } from "../../../../z-library/testing/mocks/data-access"


export class UsersDAL extends MockDataAccess<UserModel, User>{
    
    constructor(model: UserModel, validData: Object){
        super(model, validData)
    }

    public findByReferenceId = jest.fn(async(userID: string): Promise<HydratedUserDoc | null> =>{

        if(userID === this.ID_OF_EXISTING_DOCUMENT){
            const mockFoundUser = new this.model(this.validData)

            return mockFoundUser

        } else return null
    })

    public findByEmail = jest.fn(async(email: string): Promise<HydratedUserDoc | null> =>{

        const existingDocumentEmail = 'existingEmail@gmail.com'

        if(email === existingDocumentEmail){
            return new this.model(this.validData)
        } else return null
    })
    
    public findWithPagination = jest.fn(async( pagination: Paginator): Promise<HydratedUserDoc[]> =>{
        return this.createMockUsersArray(pagination.limit)
    })

    private createMockUsersArray = (limit: number) =>{

        let userCount = 0
        const mockUsers: HydratedUserDoc[] = []

        while(userCount < limit){
            mockUsers.push(new this.model(this.validData))
            userCount ++
        }

        return mockUsers
    }
}
