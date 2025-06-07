import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import s3 from "../services/s3Service";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/upload",
  upload.single("file"),
  async (req: express.Request, res: express.Response): Promise<void> => {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    const key = `${uuidv4()}-${file.originalname}`;

    try {
      const result = await s3
        .upload({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      res.json({ url: result.Location });
    } catch (err) {
      console.error("S3 upload error:", err);
      res.status(500).json({ error: "Failed to upload to S3" });
    }
  }
);

export default router;
