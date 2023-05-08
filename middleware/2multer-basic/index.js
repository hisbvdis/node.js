// ===========================================================================
// 0. IMPORT
// ===========================================================================
import express from "express";
import cors from "cors";
import multer from "multer";



// ===========================================================================
// 1. EXPRESS APPLICATION
// ===========================================================================
const app = express();
app.use(cors());
app.listen(3000);



// ===========================================================================
// 2. MULTER CONFIG
// ===========================================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "/images"),
  filename: (req, file, cb) => cb(null, `${new Date().toISOString().replace(/:/g, "-")}-${file.originalname}`)
})

const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ fileFilter, storage });



// ===========================================================================
// 3. ROUTING
// ===========================================================================
app.post("/upload/", upload.single(), (req, res) => {
  res.send("OK");
})
