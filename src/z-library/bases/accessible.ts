import { HydratedDocument } from "mongoose"
import { Paginator } from "../http"

export interface Accessible{
    createNew:(data: any) => Promise<HydratedDocument<any>>
    findByReferenceId:(refId: string) => Promise<HydratedDocument<any> | null>
    findBySearchDocument: (searchDoc: any, paginator: Paginator) =>Promise<HydratedDocument<any>[]>
    findWithPagination: (paginator: Paginator) => Promise<HydratedDocument<any>[]>
    findByIdAndUpdate: (id: string, updateDoc: HydratedDocument<any>
        ) => Promise<HydratedDocument<any> | null>
    
    findByIdAndDelete: (id: string) => Promise<HydratedDocument<any> | null>
    findByCreatorId: (creatorId: string, paginator:Paginator) => 
            Promise<HydratedDocument<any>[]>
}