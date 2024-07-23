import mongoose from "mongoose";

export const createObjectId = (hexId: string) =>{
    return  new mongoose.Types.ObjectId(hexId)
}