import { siztim } from "../zero/siztim"
import { ConnectionPool } from "../zero/db"
import { dbUri, secretOrKey, PORT } from "../_environment"

siztim.initializePayloadParsers()
siztim.allowCrossOriginResourceSharing()
siztim.setUpSecurityMiddleware()
siztim.logRequestsandResponses()

let connectionPool: ConnectionPool

try {
    
    if(dbUri){
        connectionPool = new ConnectionPool(dbUri)
        
        const authDbConnection = connectionPool.getInitialConnection()
        
        if(secretOrKey){
            siztim.setUpAuthenticator(secretOrKey, authDbConnection)
        } else {
           throw new Error('Authentication Secret Key is Undefined In Environment variables.')
        }
    } else {
        throw new Error('Database Connection String not Found found in Environment Variables')
    }
   
} catch (error: any) {
    console.warn(error.message)
}

siztim.listenToRequests(PORT,'')

export { connectionPool, siztim }

