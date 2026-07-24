import { upload } from '@vercel/blob/client';
import fs from 'fs';

async function test() {
  const dummyFile = new Blob(["test content"], { type: "application/pdf" });
  dummyFile.name = "test.pdf";
  
  try {
    const blob = await upload("test.pdf", dummyFile, {
      access: 'public',
      handleUploadUrl: 'http://localhost:3000/api/blob-upload',
    });
    console.log("Success:", blob);
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
