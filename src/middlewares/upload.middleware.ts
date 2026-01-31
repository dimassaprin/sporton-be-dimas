import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqeSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqeSuffix + path.extname(file.originalname))
    },
})

const fileFilter = (req:any, file:Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else{
        cb(new Error("Hanya gambar yang boleh"));
    }
}

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 5 * 1024 * 1024} // maksimal 5 MB
});