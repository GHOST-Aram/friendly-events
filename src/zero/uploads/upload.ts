import multer, { Multer, StorageEngine } from 'multer'

class FileUploader {

    private storage: StorageEngine
    public uploader: Multer

    constructor(){
        this.storage = multer.memoryStorage()
        this.uploader = multer({ storage: this.storage })
    }

    public  uploadSingleFile = (name: string) =>{
        return this.uploader.single(name)
    }

    public uploadMultipleFiles = (listName: string) =>{
        return this.uploader.array(listName)
    }
}


const fileUploader = new FileUploader()
export default fileUploader