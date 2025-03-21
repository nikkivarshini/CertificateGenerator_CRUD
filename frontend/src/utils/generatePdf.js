// src/utils/generatePDF.js
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import CertificateTemplate from '../components/certificateTemplate';

export const generatePDF = (name, course, date) => {
  // Create a new div to render the CertificateTemplate
  const certificateElement = document.createElement('div');
  const certificateMarkup = ReactDOMServer.renderToString(
    <CertificateTemplate name={name} course={course} date={date} />
  );
  certificateElement.innerHTML = certificateMarkup;

  // Use html2canvas to render the component into an image
  html2canvas(certificateElement, {
    useCORS: true, // Allow cross-origin images (if any)
    allowTaint: true, // Allow tainted content
    logging: true, // Enable logging for debugging
    scrollX: 0,
    scrollY: 0,
    width: certificateElement.offsetWidth,
    height: certificateElement.offsetHeight,
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    // Create a new jsPDF instance
    const doc = new jsPDF();
    doc.addImage(imgData, 'PNG', 10, 10, 180, 250); // Adjust width and height to fit your design
    doc.save('certificate.pdf');
  }).catch((error) => {
    console.error('Error during html2canvas rendering:', error);
  });
};
