export const createObjectFromKeys = (keys: string[], dataObject: any) =>{
   const object:any = {} 

   keys.forEach((path) =>{
        object[path] = dataObject[path]
   })

   return object
}