import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const buf = Buffer.alloc(11 * 1024 * 1024, "a"); // 11MB
const stream = cloudinary.uploader.upload_stream(
  { resource_type: "auto" },
  (err, res) => {
    if (err) console.error("AUTO stream error:", err.message);
    else console.log("AUTO stream success:", res.secure_url);
  }
);
stream.end(buf);
