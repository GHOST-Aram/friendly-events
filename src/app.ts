import { app, server } from "./_config/config";
import { usersRouter } from "./apps/users/app";
import { authRouter } from "./apps/authenticator/app";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { eventsRouter } from "./apps/eventz/app";
import { venuesRouter } from "./apps/venues/app";
import { categoriesRouter } from "./apps/eventcategories/app";
import { venueTypesRouter } from "./apps/venuetypes/app";
import { URLMetadata } from "./z-library/types";

const urlsData: URLMetadata[] = [
    { path: '/auth', router: authRouter },
    { path: '/users', router: usersRouter },
    { path: '/events', router: eventsRouter },
    { path: '/venues', router: venuesRouter },
    { path: '/venue-types', router: venueTypesRouter },
    { path: '/event-categories', router: categoriesRouter },
]

try {
    server.configureUrls(urlsData)
    
} catch (error:any) {
    console.warn("Error occured while configuring routes: ", error.message)
}


app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)