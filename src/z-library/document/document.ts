import { HydratedDocument } from "mongoose"

export class Document{
    public exists = (doc: HydratedDocument<any> | null ):boolean =>{
        return Boolean(doc)
    }
    
    public isCreatedByCurrentUser = (creatorId: string, currentUserId: string ) =>{
        return currentUserId === creatorId
    }
}

const document = new Document()

export default document