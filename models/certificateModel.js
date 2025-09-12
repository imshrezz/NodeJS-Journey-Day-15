const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

if (!fs.existsSync("certificates")) fs.mkdirSync("certificates");

function generateCertificate({ name, course, date }, index = "") {
  const customSize = [993, 768]; // width x height
  const doc = new PDFDocument({ size: customSize });
  const filename = `${name.replace(/\s+/g, "_")}${
    index !== "" ? `_${index}` : ""
  }.pdf`;
  const filePath = path.join("certificates", filename);

  doc.pipe(fs.createWriteStream(filePath));

  const [width, height] = customSize;

  // Set background image
  doc.image(path.join(__dirname, "../Certificatetemplate.jpg"), 0, 0, {
    width,
  });

  // Manual line spacing
  const lineSpacing = 60;
  const topMargin = 40; // <-- Extra space above first line

  // Calculate vertical starting position with top margin
  const blockHeight = lineSpacing * 5;
  let y = (height - blockHeight) / 2 + topMargin;

  // Line 1
  doc
    .font("Times-Italic")
    .fontSize(26)
    .fillColor("#000")
    .text("This is to certify that", 0, y, {
      align: "center",
      width,
    });
  y += lineSpacing;

  // Line 2
  doc.font("Times-Bold").fontSize(30).text(`Mr./Miss. ${name}`, 0, y, {
    align: "center",
    width,
  });
  y += lineSpacing;

  // Line 3
  doc
    .font("Times-Italic")
    .fontSize(26)
    .text("has successfully completed the course:", 0, y, {
      align: "center",
      width,
    });
  y += lineSpacing;

  // Line 4
  doc
    .font("Times-Bold")
    .fontSize(30)
    .text(course || "[Course Name]", 0, y, {
      align: "center",
      width,
    });
  y += lineSpacing;

  // Line 5
  doc
    .font("Times-Roman")
    .fontSize(24)
    .text(`Date of Completion: ${date}`, 0, y, {
      align: "center",
      width,
    });

  doc.end();
  return filePath;
}

module.exports = {
  generateCertificate,
};
