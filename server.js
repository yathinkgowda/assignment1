const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 3000;

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/expressFormDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  resume: String,
});

const Form = mongoose.model("Form", formSchema);


const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
https://github.com/yathinkgowda/portfolio
// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/app.html");
});

app.post("/submit", upload.single("resume"), async (req, res) => {
  try {
    const { "first-name": firstName, "last-name": lastName, "mobile-number": phoneNumber, email } = req.body;

    const formData = new Form({
      firstName,
      lastName,
      phoneNumber,
      email,
      resume: req.file ? "/uploads/" + req.file.filename : "",
    });

    await formData.save();

    res.status(200).json({ message: "Form submitted successfully!", data: formData });

  } catch (error) {
    res.status(500).json({ error: "Error submitting form", details: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
