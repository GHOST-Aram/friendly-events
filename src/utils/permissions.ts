class Permission{
    public allowAdmin = (user: any): boolean =>{
       return user.userGroup === 'superuser'
    }
    
    public allowEventOrganizer = (user: any) =>{
        return user.userGroup === 'organizer'
    }
}

export const permission = new Permission()
