class Permission{
    public allowAdmin = (user: any): boolean =>{
       return user.userGroup === 'superuser'
    }
    
    public allowEventOrganizer = (user: any) =>{
        return user.userGroup === 'organizer'
    }

    public allowEventHost = (user: any) =>{
        return user.userGroup === 'host'
    }

    public allowOrganizerOrAdmin = (user: any) =>{
        return /^(organizer|superuser)$/.test(user.userGroup)
    }

    public allowHostOrAdmin = (user: any) =>{
        return /^(host|superuser)$/.test(user.userGroup)
    }
}

export const permission = new Permission()
