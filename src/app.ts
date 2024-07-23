import { app } from "./config/config";
import { usersRouter } from "./apps/users/app";
import { authRouter } from "./apps/authenticator/app";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { eventsRouter } from "./apps/eventz/app";


try {
    app.use('/auth', authRouter)
    app.use('/users', usersRouter)
    app.use('/events', eventsRouter)
    
} catch (error:any) {
    console.log("Error occured while configuring routes: \n", error.message)
}


app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)