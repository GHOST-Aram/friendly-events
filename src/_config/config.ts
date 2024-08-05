import { zero } from "../zero/zero"
import { ConnectionPool } from "../zero/db"
import { dbUri, secretOrKey, PORT } from "../_environment"

zero.initializePayloadParsers()
zero.allowCrossOriginResourceSharing()
zero.setUpSecurityMiddleware()
zero.logRequestsandResponses()

let connectionPool: ConnectionPool

try {
    
    if(dbUri){
        connectionPool = new ConnectionPool(dbUri)
        
        const authDbConnection = connectionPool.getInitialConnection()
        
        if(secretOrKey){
            zero.setUpAuthenticator(secretOrKey, authDbConnection)
        } else {
           throw new Error('Authentication Secret Key is Undefined In Environment variables.')
        }
    } else {
        throw new Error('Database Connection String not Found found in Environment Variables')
    }
   
} catch (error: any) {
    console.warn(error.message)
}

zero.listenToRequests(PORT,'')

export { connectionPool, zero }

