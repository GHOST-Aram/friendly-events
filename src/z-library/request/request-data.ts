import {Request} from "express"
import { RequestData } from "../types"

export const getDataFromRequest = (req: Request): RequestData =>{
    const referenceId = req.params.id
    const reqBody = req.body
    const user:any = req.user
    const file = req.file as Express.Multer.File
    const files = req.files as Express.Multer.File[]
    const currentUserId: string = user ? user._id.toString() : ''

    return { referenceId, reqBody, user, file, files, currentUserId }
}