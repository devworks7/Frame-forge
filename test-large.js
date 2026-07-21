import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.uploader.upload_large("dummy-11mb.pdf", { resource_type: "raw", chunk_size: 6000000 }, (err, res) => {
  if (err) console.error("LARGE error:", err.message);
  else console.log("LARGE success:", res.secure_url);
});

