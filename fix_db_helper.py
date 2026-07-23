import re

with open('api/utils/db-helper.ts', 'r') as f:
    content = f.read()

custom_storage = """// Cloudinary Multer Storage Engine
export const cloudinaryStorage = {
  _handleFile: function (req: any, file: any, cb: any) {
    try {
      const client = getCloudinary();
      const cleanName = path.parse(file.originalname).name.replace(/[^a-zA-Z0-9]/g, "_");
      const uniqueSuffix = crypto.randomBytes(4).toString("hex");
      const publicId = `ff_${cleanName}_${uniqueSuffix}`;

      const isPdf = file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf");
      const resourceType = isPdf ? "raw" : "auto";

      const uploadStream = client.uploader.upload_chunked_stream(
        {
          folder: "frameforge",
          resource_type: resourceType,
          public_id: publicId,
          chunk_size: 5000000 // 5MB chunks
        },
        (error: any, result: any) => {
          if (error) {
            cb(error);
          } else {
            cb(null, {
              secure_url: result.secure_url,
              public_id: result.public_id,
              size: result.bytes,
              duration: result.duration
            });
          }
        }
      );
      file.stream.pipe(uploadStream);
    } catch (err) {
      cb(err);
    }
  },
  _removeFile: function (req: any, file: any, cb: any) {
    cb(null);
  }
};
"""

content = content.replace("// Helper function to upload buffer to Cloudinary (no disk usage in serverless)", custom_storage + "\n// Helper function to upload buffer to Cloudinary (no disk usage in serverless)")

with open('api/utils/db-helper.ts', 'w') as f:
    f.write(content)
