import express, { Application } from "express"
import { authenticator } from "../z-library/auth/auth"
import { Server } from "../z-library/server/server"
import { Connection } from "../z-library/db/connection"
import 'dotenv/config'

const app: Application = express()
const server = new Server(app)

server.useJSONPayloads()
server.allowCrossOriginResourceSharing()
server.enforceSecurity()
server.logRequestsandResponses()

const dbUri = process.env.USERSDB_URI
const secretOrKey = process.env.TOKEN_SECRET
let connection: Connection

try {
    
    if(dbUri){
        connection = new Connection(dbUri)
        
        const authDbConnection = connection.getInitial()
        
        if(secretOrKey){
            authenticator.configureStrategy(secretOrKey, authDbConnection)
            authenticator.initialize(app)
        } else {
           throw new Error(
                'Authentication Secret Key is Undefined. '
                +'Please provide all of them in enviroment variables')
        }
    }
     else {
        throw new Error('Database Connection String not Found')
    }
   
} catch (error: any) {
    console.log(error.message)
}

const PORT = Number(process.env.PORT) || 8000
server.listenToRequests(PORT,'')

export { app, connection }

