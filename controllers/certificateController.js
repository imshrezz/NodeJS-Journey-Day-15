const fs = require("fs");
const path = require("path");
const { generateCertificate } = require("../models/certificateModel"); // Updated import

// Ensure certificates directory exists
const certificatesDir = path.join(__dirname, "../certificates");
if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir, { recursive: true });
}

const handleSingleGeneration = async (req, res) => {
  const { name, course, date } = req.body;

  if (!name || !course || !date) {
    return res
      .status(400)
      .json({ error: "Name, Course, and Date are required." });
  }

  try {
    const filePath = generateCertificate({ name, course, date });
    res.json({
      message: "Certificate generated successfully!",
      filename: path.basename(filePath),
    });
  } catch (error) {
    console.error("Error generating certificate:", error);
    res.status(500).json({ error: "Failed to generate certificate." });
  }
};

module.exports = {
  handleSingleGeneration,
};
