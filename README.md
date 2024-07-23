# Friendly Events

This project houses the Backend software for an events listing and booking platform. The software is decoupled into the following apps:

#### 1. Authenticator
The authenticator acts as an authorization service for the platform. It allows or denies access to various groups of users. Visit the [authenticator documentation](https://github.com/GHOST-Aram/friendly-docs/blob/main/authentication/authentication.md) for guidance on how to take advantage of this app.

#### 2. Users
The Users app provides endpoints for the following actions:
- Registering new users
- Retrieving users information
- Updating user information
- Deleting user information

The Users application allows creation various groups of users including event organizers, event attendees and superusers (aka admins). Find more about the Users app in the [documentation](https://github.com/GHOST-Aram/friendly-docs/blob/main/users/users.md).

#### 3. Events
The events app allows event organizers create and manage listings of events. The App allows users of different groups to do the following:
- Event organizers can create new event listings
- All users can retrieve events listings based on:
    * Event id,
    * All Events with pagination
    * Events organizer's id
- Event organizers can update event information
- Event organizers can delete events from listings

Visit the [Events documentation](https://github.com/GHOST-Aram/friendly-docs/blob/main/events/events.md) to learn how you can intergrate this application with your client app.