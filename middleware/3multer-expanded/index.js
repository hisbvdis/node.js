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
// 2. MULTER CONFIGS
// ===========================================================================
// 2.1. USER PHOTOS
const uploadUserPhoto = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./images/userPhoto/`);
    },
    filename: (req, file, cb) => {
      cb(null, `${req.params.userID}.webp`);
    },
  }),
  limits: { fileSize: 1_000_000},
  fileFilter: (req, file, cb) => {
    if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

// 2.2. ITEM PHOTOS
const uploadItemPhoto = multer({
  storage: multer.diskStorage({
    destination: (req, files, cb) => {
      cb(null, `./images/itemPhoto/${req.params.itemType}/${req.params.itemID}/`)
    },
    filename: (req, file, cb) => {
      cb(null, `${req.params.itemID}-${Date.now()}.webp`);
    },
  }),
  limits: { fileSize: 1_000_000 },
  fileFilter: (req, file, cb) => {
    if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});



// ===========================================================================
// 3. ROUTING
// ===========================================================================
app.post("/upload/userPhoto/:userID", (req, res) => {
  // 3.1. ERROR HANDLING
  uploadUserPhoto.single("photo")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(404);
      res.send(err.code);
    } else {
      res.send("OK");
    }
  })
})

app.post("/upload/itemPhoto/:itemType/:itemID", (req, res) => {
  // 3.1. ERROR HANDLING
  uploadItemPhoto.array("photos")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(404);
      res.send(err.code);
    } else {
      res.send("OK");
    }
  })
})
