import { Paginator } from "../../../../z-library/HTTP/http-response"
import { 
    HydratedUserDoc, 
    User, 
    UserModel
} from "../../data-access/model"
import { jest } from "@jest/globals"
import { UsersDAL as UsersDataAccess } from "../../data-access/data-access"

const ID_OF_EXISTING_DOCUMENT = '64c9e4f2df7cc072af2ac9e4'

export class UsersDAL extends UsersDataAccess{
    
    constructor(model: UserModel){
        super(model)
    }
    public createNew = jest.fn(

        async(userData: User): Promise<HydratedUserDoc> =>{

            const mockUser = new this.model(userData)  
            return mockUser
        }
    )

    public findByReferenceId = jest.fn(

        async(userID: string): Promise<HydratedUserDoc | null> =>{

            if(userID === ID_OF_EXISTING_DOCUMENT){
                const mockFoundUser = new this.model({
                    fullName: 'John Doe',
                    password: 'redxdterewfwefwe',
                    email: 'johndoe@gmail.com',
                    userGroup: 'superuser'
                })

                return mockFoundUser

            } else return null
        }
    )

    public findByEmail = jest.fn(

        async(email: string): Promise<HydratedUserDoc | null> =>{

            const existingDocumentEmail = 'existingEmail@gmail.com'

            if(email === existingDocumentEmail){

                const mockDocumentWithExistingEmail =  new this.model({
                    fullName: 'John Doe',
                    password: 'redxdterewfwefwe',
                    email: 'existingEmail@gmail.com'
                })

                return mockDocumentWithExistingEmail

            } else return null
        }
    )
    
    public findWithPagination = jest.fn(
        
        async( pagination: Paginator): Promise<HydratedUserDoc[]> =>{

            const mockUsers =  this.createMockUsersArray(pagination.limit)
            return mockUsers
        }
    )

    private createMockUsersArray = (limit: number) =>{

        const mockUsers: HydratedUserDoc[] = []

        let userCount = 0
        while(userCount < limit){
            mockUsers.push(new this.model({
                password: 'redxdterewfwefwe',
                fullName: 'Doe Doe',
                email: 'johnDoes@gmail.com'
            }))

            userCount ++
        }

        return mockUsers
    }
   
    public findByIdAndDelete = jest.fn(

        async(userId: string): Promise<HydratedUserDoc | null> =>{

            if(userId === ID_OF_EXISTING_DOCUMENT){
                const mockDeletedUserDoc =  new this.model({
                    password: 'redxdterewfwefwe',
                    fullName: 'Doe Doe',
                    email: 'johndoe@gmail.com'
                })

                return mockDeletedUserDoc

            } else return null
        }
    )

    public findByIdAndUpdate = jest.fn(

        async(userId: string): Promise<HydratedUserDoc | null> =>{

            if(userId === ID_OF_EXISTING_DOCUMENT){
                const mockUpdatedUserDoc =  new this.model({
                    password: 'redxdterewfwefwe',
                    fullName: 'Doe Doe',
                    email: 'johndoe@gmail.com'
                })

                return mockUpdatedUserDoc

            } else return null
        }
    )  
}
