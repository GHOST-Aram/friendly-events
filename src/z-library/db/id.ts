import mongoose from "mongoose";

const createObjectId = (hexId: string) =>{
    return  new mongoose.Types.ObjectId(hexId)
}

export default createObjectId