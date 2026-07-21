import re
with open("api/utils/db-helper.ts", "r") as f:
    text = f.read()

old_upload = """      const uploadStream = client.uploader.upload_stream(
        {
          folder: "frameforge",
          resource_type: "auto",
          public_id: publicId,
        },"""

new_upload = """      const uploadStream = client.uploader.upload_stream(
        {
          folder: "frameforge",
          resource_type: "auto",
          public_id: publicId,
          chunk_size: 10 * 1024 * 1024
        },"""

text = text.replace(old_upload, new_upload)

with open("api/utils/db-helper.ts", "w") as f:
    f.write(text)
