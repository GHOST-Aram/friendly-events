import  { HydratedDocument } from "mongoose"
import { connection } from "../../../config/config"

const authDbConnection = connection.getInitial()


export class DataAccess{
  
    public findUserByEmail = async(email: string
        ): Promise<HydratedDocument<any> | null> =>{
       return await authDbConnection.db.collection('users').findOne({ email })
    }    
}
