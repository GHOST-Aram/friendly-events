export const allowAdmin = (user: any): boolean =>{
    return user.userGroup === 'superuser'
}