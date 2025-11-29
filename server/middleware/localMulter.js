import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/cabins/");
  },
  filename(req, file, cb) {
    cb(null, `cabin-${Date.now()}-${file.originalname}`);
  },
});

const locallyUpload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 1,
  },
});

export default locallyUpload;
