import multer from 'multer'

const storage = multer.memoryStorage();
  
const upload = multer({ storage });

export const uploadSingleFile = (name: string) =>{
    return upload.single(name)
}

export const uploadMultipleFiles = (listName: string) =>{
    return upload.array(listName)
}