// const {uploadFileToCloudinary,isFileTypeSupported}=require('../utils/uploadToCloudinary')

// // image upload handler

// exports.imageUpload=async(req ,res)=>{
//     try{
//         // fetch the data from req body

//         const {name,tags,email}=req.body;
//         console.log('name ,tags,email printed',name,tags,email)
//         const file=req.files.imageFile
//         console.log(file)

//         // validation
        
//         const supportedTypes=['jpg','jpeg','png']
//         const fileType=file.name.split('.')[1].toLowerCase()
//         console.log('fileType',fileType)
//         if(!isFileTypeSupported(fileType,supportedTypes)){
//             return res.status(400).json({
//                 success:false,
//                 message:'File formate is not supported'
//             })

//         }

//         // if file format supported

//         console.log('uploading to codehelp')
//         const response= await uploadFileToCloudinary(file,'Codehelp')
//         console.log(response)

//         // now save the entry into db

//         const fileData=await File.create({
            
//             imageUrl:response.secure_url
//         })
//         res.json({
//             success:true,
//             data:fileData,
//             imageUrl:response.secure_url,
//             message:'Image successfully uploaded'
//         })
//     }catch(error){
//         console.log(error)
//         console.error(error)
//         return res.status(400).json({
//             success:false,
            
//             message:'something went wrong'
//         })
//     }
// }


// // video upload handler

// exports.videoUpload=async(req ,res)=>{
//     try{
//         // fetch the data from req body

//         const {name,tags,email}=req.body;
//         console.log('name ,tags,email printed',name,tags,email)
//         const file=req.files.videoFile
//         console.log(file)

//         // validation

//         const supportedTypes=['mp4', 'mov']
//         const fileType=file.name.split('.')[1].toLowerCase()
//         console.log('fileType',fileType)
//         if(!isFileTypeSupported(fileType,supportedTypes)){
//             return res.status(400).json({
//                 success:false,
//                 message:'File formate is not supported'
//             })

//         }

//         // if file format supported

//         console.log('uploading to codehelp')
//         const response= await uploadFileToCloudinary(file,'Codehelp')
//         console.log(response)

//         // now save the entry into db

//         const fileData=await File.create({
//             name,
//             tags,
//             email,
//             imageUrl:response.secure_url
//         })
//         res.json({
//             success:true,
//             data:fileData,
//             imageUrl:response.secure_url,
//             message:'Image successfully uploaded'
//         })
//     }catch(error){
//         console.log(error)
//         console.error(error)
//         return res.status(400).json({
//             success:false,
            
//             message:'something went wrong'
//         })
//     }
// }

// // imageSizeReducer handler

// exports.imageSizeReducer=async(req ,res)=>{
//     try{
//         // fetch the data from req body

//         const {name,tags,email}=req.body;
//         console.log('name ,tags,email printed',name,tags,email)
//         const file=req.files.imageFile
//         console.log(file)

//         // validation

//         const supportedTypes=['jpg','jpeg','png']
//         const fileType=file.name.split('.')[1].toLowerCase()
//         console.log('fileType',fileType)
//         if(!isFileTypeSupported(fileType,supportedTypes)){
//             return res.status(400).json({
//                 success:false,
//                 message:'File formate is not supported'
//             })

//         }

//         // if file format supported

//         console.log('uploading to codehelp')
//         const response= await uploadFileToCloudinary(file,'Codehelp',30,100,50) //quality width aur height attribute se image size reduce hua
//         console.log(response)

//         // now save the entry into db

//         const fileData=await File.create({
//             name,
//             tags,
//             email,
//             imageUrl:response.secure_url
//         })
//         res.json({
//             success:true,
//             data:fileData,
//             imageUrl:response.secure_url,
//             message:'Image successfully uploaded'
//         })
//     }catch(error){
//         console.log(error)
//         console.error(error)
//         return res.status(400).json({
//             success:false,
            
//             message:'something went wrong'
//         })
//     }
// }