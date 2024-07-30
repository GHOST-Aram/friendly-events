const formatImageDataToBase64 = (image: {
        name: string,
        data: Buffer,
        contentType: string,
        _id?: string
    }) =>{

        return {
            id: image._id,
            name: image.name,
            data: image.data.toString('base64'),
            contentType: image.contentType
    }
}

export default formatImageDataToBase64