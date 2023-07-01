import express from 'express';
import { LoginUser, getPostData, registerUser, getSinglePdfData, downloadPdf, updatePdf, logout } from '../controllers/controller.js';
import multer from "multer";

// Set up the storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Create the multer instance with the storage configuration
const upload = multer({ storage: storage }).fields([
  { name: 'image' },
  { name: 'file' }
]);

const router = express.Router();

router.post("/register", upload, registerUser);
router.post("/login", LoginUser);
router.post("/logout",logout)
router.get("/pdfData", getPostData);
router.get("/pdfData/:id", getSinglePdfData);
router.get("/downloadPdf/:id", downloadPdf);
router.put("/updatePdf/:id", upload, updatePdf); // Add this route for updating the PDF

export default router;
