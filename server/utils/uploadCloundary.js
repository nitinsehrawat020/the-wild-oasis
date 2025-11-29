import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloundary = async (image, folder) => {
  const buffer = image?.buffer;

  if (!buffer) {
    throw new Error("No image buffer found");
  }

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: `The Wild Owsis/${folder}` },
        (error, uploadResult) => {
          if (error) {
            console.error("cloudinmary image upload error:", Log.error(msg));
            return reject(error);
          }
          return resolve(uploadResult);
        }
      )
      .end(buffer);
  });
  return uploadImage;
};

export default uploadImageCloundary;
