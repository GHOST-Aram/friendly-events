import { Request, Response, NextFunction } from "express"
export class HTTPErrors{

    public handleUnknownUrls = ( req: Request, res: Response, next: NextFunction ) =>{
        res.status(404).json('Resource not found' )
        
    }

    public handleServerErrors = ( 
        err:Error, req: Request, res: Response, next: NextFunction) =>{
            if(err){
                if (err instanceof SyntaxError){
                    if(/JSON/i.test(err.message)){
                        res.status(400).json("Bad JSON format")
                    } else{
                        res.status(500).json(err.message)
                    }
                    console.log(err.message)
                } else{
                    res.status(500).json('Unexpected server error.')
                    console.log(`Name ${err.name}, Message:${err.message}`)
                    console.log(`Error Stack \n ${err.stack}`)
                }
            }
    }
}

export const httpErrors = new HTTPErrors()