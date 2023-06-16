const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("tmp");

const storage = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newName = `${uniquePrefix}_${file.originalname}`;
        cb(null, newName);
    }
});

const upload = multer({
    storage,
});

module.exports = upload;
