export const checkAdmin = (user: any): boolean =>{
    return user.userGroup === 'superuser'
}