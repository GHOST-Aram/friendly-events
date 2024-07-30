import { server } from "../z-library/server"
import { ConnectionPool } from "../z-library/db"
import 'dotenv/config'

server.useJSONPayloads()
server.allowCrossOriginResourceSharing()
server.enforceSecurity()
server.logRequestsandResponses()

const dbUri = process.env.USERSDB_URI
const secretOrKey = process.env.TOKEN_SECRET
let connectionPool: ConnectionPool

try {
    
    if(dbUri){
        connectionPool = new ConnectionPool(dbUri)
        
        const authDbConnection = connectionPool.getInitialConnection()
        
        if(secretOrKey){
            server.setUpAuthenticator(secretOrKey, authDbConnection)
        } else {
           throw new Error('Authentication Secret Key is Undefined In Environment variables.')
        }
    } else {
        throw new Error('Database Connection String not Found found in Environment Variables')
    }
   
} catch (error: any) {
    console.warn(error.message)
}

const PORT = Number(process.env.PORT) || 8000
server.listenToRequests(PORT,'')

export { connectionPool, server }

