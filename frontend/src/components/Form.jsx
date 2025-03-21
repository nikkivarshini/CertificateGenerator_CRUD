import React, { useState } from 'react';
import CertificateTemplate from './certificateTemplate';
import './certificate.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import academy from '../assets/academy.svg'
const Form = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [pdfPath, setPdfPath] = useState("");
  const [isGenerating, setIsGenerating] = useState(false); 
  const [isBulkUploading, setIsBulkUploading] = useState(false); 
  const [isEmailSending, setIsEmailSending]=useState(false)
  const [showCertificate,setShowCertificate] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);


  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required!";
    }
    if (!course.trim()) {
      newErrors.course = "Course name is required!";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required!";
    }
    if (!date) {
      newErrors.date = "Date is required!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission to Generate Certificate
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsGenerating(true);  
  
    try {
      const response = await fetch('http://localhost:5000/api/certificates/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, course, date }),
      });
  
      const data = await response.json();
      console.log('Generated Certificate Response:', data); 
  
      if (data.message === 'Certificate generated successfully!' && data.pdfPath) {
        setPdfPath(data.pdfPath);
        setShowCertificate(true);
        console.log('PDF Path Set:', data.pdfPath); 
        toast.success('Certificate generated successfully!');
      } else {
        toast.error('Failed to generate certificate.');
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
      toast.error('Error generating the certificate.');
    } finally {
      setIsGenerating(false); 
    }
  };
  

  // Function to send the email with the generated PDF
  const handleSendEmail = async () => {
    if (!pdfPath) {
      alert('PDF path is missing! Generate the certificate first.');
      return;
    }
  
    // Convert absolute path to relative (if needed)
    const formattedPath = pdfPath.replace(/\\/g, '/'); // Replace Windows `\` with `/`
  
    console.log('Sending email with PDF Path:', formattedPath); // Debugging log
  
    setIsEmailSending(true);
  
    try {
      const response = await fetch('http://localhost:5000/api/certificates/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          pdfPath: formattedPath,
        }),
      });
  
      const data = await response.json();
      console.log('Email Send Response:', data); // Debugging log
  
      if (data.message === 'Certificate sent successfully!') {
        setIsEmailSending(true);
        toast.success('Certificate sent successfully!');
      } else {
        toast.error('Failed to send certificate.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Error sending certificate.');
    } finally {
      setIsEmailSending(false);
    }
  };
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);  // Store the file in state
    }
  };
  

  const handleBulkUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }
  
    setIsBulkUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:5000/api/certificates/bulk-generate", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      console.log("Response:", result);
      toast.success(result.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("File upload failed!");
    } finally {
      setIsBulkUploading(false);
    }
  };
  
  return (
    <div className={`form-certificate-container ${showCertificate ? 'show-certificate' : ''}`}>
      <ToastContainer />
      <form onSubmit={handleGenerate} className="certificate-form">
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <h2>Enter Certificate Details</h2>
        <img src={academy} alt='academy_logo' style={{width:'80px',height:'75px',marginTop:'-10px',padding:'10px'}}></img>
        </div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <label>Course:</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Course Name"
        />
        {errors.course && <p className="error">{errors.course}</p>}
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p className="error">{errors.date}</p>}
        <button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Certificate'}
        </button>
        <label>Upload Excel File:</label>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button type="button" onClick={handleBulkUpload} disabled={isBulkUploading}>
          {isBulkUploading ? "Processing..." : "Upload & Generate Certificates"}
        </button>
        
      </form>

      {showCertificate && (
        <div className="certificate-display">
          <CertificateTemplate name={name} course={course} date={date} />
          <button onClick={handleSendEmail} disabled={!pdfPath || isEmailSending}>
            {isEmailSending ? 'Sending...' : 'Send Certificate via Email'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
