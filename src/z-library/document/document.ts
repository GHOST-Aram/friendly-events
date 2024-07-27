import { HydratedDocument } from "mongoose"

class Document{
    public exists = (doc: HydratedDocument<any> | null ):boolean =>{
        return Boolean(doc)
    }
    
    public isCreatedByCurrentUser = (creatorId: string, currentUserId: string ) =>{
        return currentUserId === creatorId
    }
}

export const document = new Document()