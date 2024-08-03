class UserGroup{
    public isAdmin = (user: any) =>{
        return /superuser/.test(user.userGroup)
    }

    public isOrganizer = (user: any) =>{
        return /organizer/.test(user.userGroup)
    }

    public isHost = (user: any) =>{
        return /host/.test(user.userGroup)
    }

    public isAttendee = (user: any) =>{
        return /attendee/.test(user.userGroup)
    }
}

export const userGroup = new UserGroup()