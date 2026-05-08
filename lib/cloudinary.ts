import {v2 as cloudinary} from "cloudinary";
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

});

export const uploadImage = async (base64Image:string)=>{
    try{
        const uploadResponse=await cloudinary.uploader.upload(base64Image,{
            folder:"zenith_os_avatars",
        });
        return uploadResponse.secure_url;
    }catch(error){
        console.log("Cloudinary Upkoad Error:" , error);
        return null;
    }
};