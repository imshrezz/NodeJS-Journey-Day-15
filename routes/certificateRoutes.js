// server/routes/certificateRoutes.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const { handleSingleGeneration } = require("../controllers/certificateController");

const router = express.Router();

router.post("/generate", handleSingleGeneration);

// Add download route
router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const certificatesDir = path.join(__dirname, "../certificates");
  const filePath = path.join(certificatesDir, filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Certificate file not found" });
  }

  // Set appropriate headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  // Stream the file
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);

  // Handle errors
  fileStream.on('error', (error) => {
    console.error('Error streaming file:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Error downloading certificate" });
    }
  });
});

module.exports = router;
