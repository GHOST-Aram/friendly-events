import {Request} from "express"

const getDataFromRequest = (req: Request): RequestData =>{
    const referenceId = req.params.id
    const reqBody = req.body
    const user:any = req.user
    const file = req.file as Express.Multer.File
    const files = req.files as Express.Multer.File[]
    const currentUserId: string = user ? user._id.toString() : ''
    const query = req.query

    return { referenceId, reqBody, user, file, files, currentUserId, query }
}
export interface RequestData{
    referenceId: string
    reqBody: any 
    user:any
    currentUserId: string
    file: Express.Multer.File
    files: Express.Multer.File[]
    query: any
}
export default getDataFromRequest    