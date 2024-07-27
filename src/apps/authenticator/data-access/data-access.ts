import  { HydratedDocument } from "mongoose"
import { connectionPool } from "../../../_config/config"




export class DataAccess{
  
    public findUserByEmail = async(email: string): Promise<HydratedDocument<any> | null> =>{
        const authDbConnection = connectionPool.switchConnection('users')
        
        return await authDbConnection.db.collection('users').findOne({ email })
    }    
}
