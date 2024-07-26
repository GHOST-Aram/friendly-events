import { app } from "./_config/config";
import { usersRouter } from "./apps/users/app";
import { authRouter } from "./apps/authenticator/app";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { eventsRouter } from "./apps/eventz/app";
import { venuesRouter } from "./apps/venues/app";
import { categoriesRouter } from "./apps/categories/app";


try {
    app.use('/auth', authRouter)
    app.use('/users', usersRouter)
    app.use('/events', eventsRouter)
    app.use('/venues', venuesRouter)
    app.use('/categories', categoriesRouter)
    
} catch (error:any) {
    console.warn("Error occured while configuring routes: ", error.message)
}


app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)