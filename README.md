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

This system allows creation various groups of users including event hosts, event attendees and superusers (aka admins). Find more about the Users app in the [documentation](https://github.com/GHOST-Aram/friendly-docs/blob/main/users/users.md).