//Decide which parts of user data should be stored in the JSON web token
export const createUserDataForAuth = (user: any) =>{
    return {
        email: user.email,
        fullName: user.fullName,
        userGroup: user.userGroup,
        id: user._id ? user._id.toString() : user.id,
    }
}