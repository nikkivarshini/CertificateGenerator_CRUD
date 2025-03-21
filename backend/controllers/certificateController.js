const { generatePDF } = require("../services/pdfGenerator");
const { sendEmail } = require("../services/emailService");
const xlsx = require("xlsx");

// Controller to generate a single certificate PDF
exports.generateCertificate = async (req, res) => {
  try {
    const { name, email, course, date } = req.body;

    const pdfPath = await generatePDF(name, course, date);
    
    res.status(200).json({
      message: "Certificate generated successfully!",
      pdfPath,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate certificate." });
  }
};

// Controller to send the generated certificate via email
exports.sendCertificateEmail = async (req, res) => {
  try {
    const { email, pdfPath } = req.body;

    if (!email || !pdfPath) {
      return res.status(400).json({ error: "Missing email or PDF path." });
    }

    await sendEmail(email, pdfPath);

    res.status(200).json({ message: "Certificate sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send certificate." });
  }
};

const formatExcelDate = (excelDate) => {
  if (typeof excelDate === 'number') {
    const date = new Date((excelDate - 25569) * 86400 * 1000);  
    return date.toLocaleDateString('en-GB');  
  }
  return excelDate; 
};

// Controller to handle bulk generation of certificates
exports.bulkGenerateCertificates = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded." });

    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const row of data) {
      const formattedDate = formatExcelDate(row.Date);

      const pdfPath = await generatePDF(row.Name, row.Course, formattedDate); 
      await sendEmail(row.Email, pdfPath);
    }

    res.status(200).json({ message: "Bulk certificates sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to process bulk certificates." });
  }
};
