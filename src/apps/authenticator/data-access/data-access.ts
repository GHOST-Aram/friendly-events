import  { HydratedDocument } from "mongoose"
import { connection } from "../../../_config/config"




export class DataAccess{
  
    public findUserByEmail = async(email: string): Promise<HydratedDocument<any> | null> =>{
            const authDbConnection = connection.getInitial()
            
            return await authDbConnection.db.collection('users').findOne({ email })
    }    
}
