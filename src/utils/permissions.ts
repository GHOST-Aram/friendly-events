class Permission{
    public allowAdmin = (user: any): boolean =>{
       return user.userGroup === 'superuser'
    }
    
}

export const permission = new Permission()
