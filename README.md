# Friendly Events

This project is the Backend software for an events listing and booking platform. The following sketch shows an overview of the architecture of the system:

```
|- node_modules
|- src
|    |- _config(system configs)
|    |- apps
|        |- authenticator
|           |- controller
|           |- data-access
|           |- domain
|           |- test
|           |- urls
|           - app.ts
|        |- eventcategories
|        |- eventz
|        |- users
|        |- venues
|        |- venuetypes
|    |- utils
|    |- zero (the system library)
|    - _environment.ts (import-export for environment varriables)
|    - app.ts
|
|- package.json
|- package-lock.json
|- tsconfig.json
```

The system is decoupled into the following apps:

#### 1. Authenticator [*View Code*](./src/apps/authenticator/)
The authenticator acts as an authorization service for the platform. It allows or denies access to various groups of users. Visit the [authenticator documentation](https://github.com/GHOST-Aram/friendly-docs/blob/main/authentication/authentication.md) for guidance on how to take advantage of this app.

#### 2. Users [*View Code*](./src/apps/users/)
The Users app provides endpoints for the following actions:
- Registering new users
- Retrieving users information
- Updating user information
- Deleting user information

The Users application allows creation various groups of users including event organizers, event attendees and superusers (aka admins). Find more about the Users app in the [documentation](https://github.com/GHOST-Aram/friendly-docs/blob/main/users/users.md).

#### 3. Events [*View Code*](./src/apps/eventz/)
The events app allows event organizers create and manage listings of events. The App allows users of different groups to do the following:
- Event organizers can create new event listings
- All users can retrieve events listings based on:
    * Event id,
    * All Events with pagination
    * Search queries with event properties

- Event organizers can update event information
- Event organizers can delete events from listings

Visit the [Events documentation](https://github.com/GHOST-Aram/friendly-docs/blob/main/eventz/events.md) to learn how you can intergrate this application with your client app.


#### 4. Event Categories [*View code*](./src/apps/eventcategories/)
Events can be grouped into various categories including music, sports etc. The event categories app allows event organizers and admins to create the distinct groups under which events can fall.
See more in the [Event Categories docs](https://github.com/GHOST-Aram/friendly-docs/blob/main/eventcategories/eventcategories.md)

#### 5. Venues [*View Code*](./src/apps/venues/)
Venues app manages the list of available event venues. Venue hosts -- owners or manager -- can create, update or delete venue listings through this app. All users including anonymous users can veiw lists of venues on this plaform.

Visit the [venues endpoints documentation](https://github.com/GHOST-Aram/friendly-docs/blob/main/venues/venues.md) for a guide on how to integrate venues app with your client app.

#### 6. Venue Types [*View Code*](./src/apps/venuetypes/)
The venue types app in the system is used for creating, reading and managing various groups under which venues can be classified. Venues can be anything from stadium, theatre, cinema hall etc. Its important to have them grouped under various types in the system. Find out more about venue types in [venue types documentation](https://github.com/GHOST-Aram/friendly-docs/blob/main/venue-types/venue-types.md)

