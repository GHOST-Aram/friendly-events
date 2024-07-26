class Permission{
    public allowAdmin = (user: any): boolean =>{
       return user.userGroup === 'superuser'
    }
    
    public allowEventOrganizer = (user: any) =>{
        return user.userGroup === 'organizer'
    }

    public allowEventHost = (user: any) =>{// Event hosts are owners of venues
        return user.userGroup === 'host'
    }

    public allowOrganizerOrAdmin = (user: any) =>{
        const userGroup = user.userGroup
        return userGroup === 'organizer' || userGroup ===  'superuser'
    }
}

export const permission = new Permission()
