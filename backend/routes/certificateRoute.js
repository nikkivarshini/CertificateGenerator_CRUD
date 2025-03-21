const express = require("express");
const { generateCertificate, sendCertificateEmail, bulkGenerateCertificates } = require("../controllers/certificateController");
const upload = require("../services/fileUpload"); 

const router = express.Router();

router.post("/generate", generateCertificate);

router.post("/send-email", sendCertificateEmail);

router.post("/bulk-generate", upload.single("file"), bulkGenerateCertificates);

module.exports = router;
