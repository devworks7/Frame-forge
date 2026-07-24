import { handleUpload } from '@vercel/blob/client';

export default async function handler(req: any, res: any) {
  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // You can verify auth here if needed
        return {
          allowedContentTypes: ['application/pdf'],
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Here you can save the blob URL to a database if necessary
      },
    });
    return res.status(200).json(jsonResponse);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
