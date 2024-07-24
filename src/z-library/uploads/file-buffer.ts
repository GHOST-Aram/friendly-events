export const createFileBuffer = (file:Express.Multer.File) =>{
    return {
            name: `${Date.now()}_${file.originalname}`,
            data: file.buffer,
            contentType: file.mimetype
        }
}