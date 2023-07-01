import bcrypt from "bcryptjs";
import RegisterUserModel from "../models/registerUser.js";
import fs from "fs";
import Loginuser from "../models/Login.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PDFDocument, StandardFonts } from "pdf-lib";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const renameFile = (file) => {
  const { originalname, path } = file;
  const parts = originalname?.split(".");
  const ext = parts.length > 1 ? parts[parts.length - 1] : "";
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  return newPath;
};

export const registerUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);

    // Move the uploaded files to a designated directory
    const imageFilePath = renameFile(req.files["image"][0]);
    const fileFilePath = renameFile(req.files["file"][0]);

    const user = await RegisterUserModel.create({
      name,
      email,
      password: hashedPassword,
      image: imageFilePath,
      file: fileFilePath,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await RegisterUserModel.findOne({ email });
    if (!userDoc) {
      // User not found
      return res.status(404).json("User not found");
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ email, id: userDoc._id }, SECRET_KEY, {}, (err, token) => {
        if (err) {
          throw err;
        }
        res.cookie("token", token);
        res.json({
          id: userDoc._id,
          email,
        });
      });
    } else {
      // Invalid credentials
      res.status(400).json("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occurred");
  }
};
export const logout = async (req, res) => {
    res.cookie("token", "").json("ok");
  };

export const getPostData = async (req, res) => {
  const postData = await RegisterUserModel.find({})
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(postData);
};
export const downloadPdf = async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await RegisterUserModel.findById(id);
    if (!postDoc) {
      // Post not found
      return res.status(404).json("Post not found");
    }

    // Read the PDF file content
    const pdfContent = fs.readFileSync(postDoc.file);

    // Set the appropriate headers for the response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${postDoc.file}`
    );

    // Send the PDF file as the response
    res.send(pdfContent);
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occurred");
  }
};

export const getSinglePdfData = async (req, res) => {
  const { id } = req.params;
  const postDoc = await RegisterUserModel.findById(id);
  res.json(postDoc);
};

export const updatePdf = async (req, res) => {
  const { id } = req.params;
  const { name, education, address } = req.body;

  try {
    const postDoc = await RegisterUserModel.findById(id);
    if (!postDoc) {
      // Post not found
      return res.status(404).json("Post not found");
    }

    const existingPdfBytes = fs.readFileSync(postDoc.file);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();
    const lastPage = pages[pages.length - 1];

    const { width, height } = lastPage.getSize();
    const tableWidth = width - 100;
    const tableHeight = 100;
    const tableX = 50;
    const tableY = height - 150;

    const table = lastPage.createTable({
      x: tableX,
      y: tableY,
      width: tableWidth,
      height: tableHeight,
      borderWidth: 1,
    });

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const textHeight = 20;

    const nameCell = table.getCell(0, 0);
    nameCell.addParagraph(name).setFont(helveticaFont).setFontSize(12);

    const educationCell = table.getCell(0, 1);
    educationCell
      .addParagraph(education)
      .setFont(helveticaFont)
      .setFontSize(12);

    const addressCell = table.getCell(0, 2);
    addressCell.addParagraph(address).setFont(helveticaFont).setFontSize(12);

    lastPage.drawTable(table);

    const modifiedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(postDoc.file, modifiedPdfBytes);

    res.status(200).json({ message: "PDF updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occurred");
  }
};
