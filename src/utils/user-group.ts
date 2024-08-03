class UserGroup{
    public isAdmin = (user: any) =>{
        return /superuser/.test(user.userGroup)
    }
}

export const userGroup = new UserGroup()