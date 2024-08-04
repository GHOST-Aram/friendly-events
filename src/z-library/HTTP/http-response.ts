import { Response, Request } from "express"
import { HydratedDocument } from "mongoose"
import { Paginator } from "./types"

export class HttpResponse{

    public microserviceName: string

    constructor(microserviceName: string){
        this.microserviceName = microserviceName
    }

    public respondWithMethodNotAllowed = (req: Request, res: Response) =>{
        res.status(405).json('Method not allowed' )
    }

    public respondWithConflict = (res: Response) =>{
        res.status(409).json('Document already exists')
    }

    public respondWithCreatedResource = (resource: any, res: Response) =>{
        res.location(`/${this.microserviceName}/${resource._id.toString()}`)
        res.status(201).json(resource)
    }

    public respondWithFoundResource = ( resource: Object[]| Object, res: Response) =>{
            res.status(200).json(resource)
    }

    public paginate = (req: Request): Paginator =>{
        const paginator = {
            skipDocs: 0,
            limit: 10
        }

        try {
            const page = Math.abs(Number(req.query.page)) || 1
            const limit = Math.abs(Number(req.query.limit))

            if(page && limit){
                paginator.skipDocs = (page - 1) * limit
                paginator.limit = limit
            }
        } catch (error) {
            console.log(error)
        }   

        return paginator
    }

    public respondWithNotFound = (res: Response) =>{
        res.status(404).json('Not Found')
    }

    public respondWithModifiedResource = (item: HydratedDocument<any>, res: Response) =>{
        res.location(`/${this.microserviceName}/${item._id.toString()}`)
        res.status(200).json(item)
    } 

    public respondWithUpdatedResource = (resource: HydratedDocument<any>, res: Response) =>{
        res.location(`/${this.microserviceName}/${resource._id.toString()}`)
        res.status(200).json(resource)
    }

    public respondWithDeletedResource = (id: string, res: Response) =>{
        res.status(200).json(id)
    }

    public respondWithForbidden = (res: Response, reason?:string) =>{
        res.status(403).json( `Forbidden. ${ reason ? reason : ''}` )
    }

    public respondWithUnauthorised = (res: Response, reason?: string) =>{
        res.status(401).json(`Unauthorised. ${reason}` )
    }

    public respondWithToken = (token: string, res: Response) =>{
        res.status(200).json({ token })
    }
}