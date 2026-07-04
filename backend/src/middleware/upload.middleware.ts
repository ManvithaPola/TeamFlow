import multer from "multer";
import path from "path";
import fs from "fs";

// ==========================================
// CREATE UPLOADS FOLDER
// ==========================================

const uploadDir = path.join(
  process.cwd(),
  "uploads",
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ==========================================
// STORAGE
// ==========================================

const storage = multer.diskStorage({
  destination: (
    req,
    file,
    cb,
  ) => {
    cb(null, uploadDir);
  },

  filename: (
    req,
    file,
    cb,
  ) => {
    const unique =
      Date.now() +
      "-" +
      Math.round(
        Math.random() * 1e9,
      );

    cb(
      null,
      unique +
        path.extname(file.originalname),
    );
  },
});

// ==========================================
// FILE FILTER
// ==========================================

const fileFilter: multer.Options["fileFilter"] =
  (
    req,
    file,
    cb,
  ) => {
    cb(null, true);
  };

export default multer({
  storage,
  fileFilter,

  limits: {
    fileSize:
      20 * 1024 * 1024,
  },
});