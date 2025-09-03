// backend/routes/schools.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  addSchoolToDB,
  getSchoolsFromDB,
} from "../controllers/schoolController.js";

const router = express.Router();
const __dirname = path.resolve();

// ✅ Ensure upload folder exists
const uploadDir = path.join(__dirname, "public/schoolImages");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Add a school (with image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, address, city, state, contact, email_id } = req.body;
    const image = req.file ? req.file.filename : null;

    await addSchoolToDB({
      name,
      address,
      city,
      state,
      contact,
      email_id,
      image,
    });

    res.json({ message: "School added successfully" });
  } catch (err) {
    console.error("❌ Error saving school:", err);
    res.status(500).json({ message: "Error saving school" });
  }
});

// ✅ Get all schools
router.get("/", async (req, res) => {
  try {
    const schools = await getSchoolsFromDB();
    res.json(schools);
  } catch (err) {
    console.error("❌ Error fetching schools:", err);
    res.status(500).json({ message: "Error fetching schools" });
  }
});

export default router;
