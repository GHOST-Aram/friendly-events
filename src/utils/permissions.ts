import { userGroup } from "./user-group/user-group"

class Permission{
    public allowAdmin = (user: any): boolean =>{
       return userGroup.isAdmin(user)
    }
    
    public allowEventOrganizer = (user: any) =>{
       return userGroup.isOrganizer(user)
    }

    public allowVenueHost = (user: any) =>{
        return userGroup.isHost(user)
    }

    public allowOrganizerOrAdmin = (user: any) =>{
        return userGroup.isOrganizer(user) || userGroup.isAdmin(user)
    }

    public allowHostOrAdmin = (user: any) =>{
        return userGroup.isHost(user) || userGroup.isAdmin(user)
    }
}

export const permission = new Permission()
