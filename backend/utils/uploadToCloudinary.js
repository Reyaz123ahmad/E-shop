const File=require('../model/Product')
const cloudinary=require('cloudinary').v2



// file upload on clodinary and server


// function isFileTypeSupported(type,supportedTypes){
//     return supportedTypes.includes(type)
// }

async function uploadFileToCloudinary(file,folder,quality,width,height) { //quality width aur height attribute se image size reduce hua
    const options={folder};

    console.log('temp file path',file.tempFilePath)
    if(quality){
        options.quality=quality
    }
    if(width){
        options.width=width
    }
    if(height){
        options.height=height
    }
    options.resource_type='auto'
    return await cloudinary.uploader.upload(file.tempFilePath,options)
    
}

module.exports={
    uploadFileToCloudinary,
    // isFileTypeSupported
}