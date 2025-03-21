const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

function encodeImageToBase64(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
}

const academyBase64 = encodeImageToBase64(path.join(__dirname, '../assets/academy.svg'));
const operationsBase64 = encodeImageToBase64(path.join(__dirname, '../assets/operations.jpeg'));
const signBase64 = encodeImageToBase64(path.join(__dirname, '../assets/sign.jpeg'));

exports.generatePDF = async (name, course, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Render the certificate HTML
      const certificateHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Certificate of Participation</title>
          <style>
            body {
              display: flex;
              font-family: "Roboto", "Helvetica", "Arial", sans-serif;
              height: 100vh;
              justify-content: center;
              align-items: center;
              background-color: #ffffff;
              margin: 0;
            }
            .main-container {
              padding: 70px;
              width: 900px;
              text-align: center;
              background-color: #ffffff;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              position: relative;
              overflow: hidden;
            }
            .certificate-container {
              padding: 50px;
              width: 800px;
              text-align: center;
              background-color: #f6fbff;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              position: relative;
              border-radius: 16px;
              z-index: 1;
            }
            .title {
              color: #2c3e50;
              font-weight: bold;
              margin-bottom: 10px;
              font-size: 52px;
            }
            .sub-title {
              color: grey;
              font-size: 20px;
            }
            .participant-name {
              color: #2c3e50;
              text-transform: uppercase;
              font-weight: bold;
              font-size: 28px;
              margin-bottom: 10px;
            }
            .event-details {
              color: grey;
              font-size: 22px;
            }
            .highlight {
              font-weight: 700;
              font-size: 22px;
              color: #2c3e50;
            }
            .footer {
              display: flex;
              justify-content: space-between;
              margin-top: 60px;
              padding: 0 20px;
            }
            .date,
            .sign {
              text-align: center;
              color: grey;
            }
            .sign img {
              width: 150px;
              height: auto;
              margin-top: -30px;
            }
            .logos {
              display: flex;
              justify-content: space-between;
              margin-bottom: -30px;
              margin-top: -20px;
            }
            .logos img {
              height: 60px;
              object-fit: cover;
            }

            .twelve-point-burst {
              position: relative;
              width: 80px;
              height: 80px;
            }
            .twelve-point-burst-main,
            .twelve-point-burst-30,
            .twelve-point-burst-60 {
              width: 60px;
              height: 60px;
              background-color: #a3916b;
              position: absolute;
              top: 0;
              left: 0;
            }
            .twelve-point-burst-30 {
              transform: rotate(30deg);
            }
            .twelve-point-burst-60 {
              transform: rotate(60deg);
            }

            .bottom-left1 {
              position: relative;
              z-index: 2;
            }
            .bottom-left1-main,
            .bottom-left1-30,
            .bottom-left1-60 {
              width: 125px;
              height: 125px;
              background-color: #039754;
              border-radius: 5px;
              position: absolute;
              bottom: -75px;
              left: -90px;
            }
            .bottom-left1-30 {
              transform: rotate(30deg);
            }
            .bottom-left1-60 {
              transform: rotate(60deg);
            }

            .bottom-left2 {
              position: relative;
              z-index: 3;
            }
            .bottom-left2-main,
            .bottom-left2-30,
            .bottom-left2-60 {
              width: 100px;
              height: 100px;
              background-color:  #0367ED;
              border-radius: 5px;
              position: absolute;
              bottom: -90px;
              left: 5px;
            }
            .bottom-left2-30 {
              transform: rotate(30deg);
            }
            .bottom-left2-60 {
              transform: rotate(60deg);
            }

            .top-right1 {
              position: relative;
              z-index: 2;
            }
            .top-right1-main,
            .top-right1-30,
            .top-right1-60 {
              width: 125px;
              height: 125px;
              background-color: #039754;
              border-radius: 5px;
              position: absolute;
              top: -90px;
              right: -90px;
            }
            .top-right1-30 {
              transform: rotate(30deg);
            }
            .top-right1-60 {
              transform: rotate(60deg);
            }

            .top-right2 {
              position: relative;
              z-index: 3;
            }
            .top-right2-main,
            .top-right2-30,
            .top-right2-60 {
              width: 100px;
              height: 100px;
              background-color:  #0367ED;
              border-radius: 5px;
              position: absolute;
              top: -100px;
              right: 0px;
            }
            .top-right2-30 {
              transform: rotate(30deg);
            }
            .top-right2-60 {
              transform: rotate(60deg);
            }

            .bottom-left-back {
              position: relative;
              z-index: 0;
            }
            .bottom-left-back-main,
            .bottom-left-back-30,
            .bottom-left-back-60 {
              width: 60px;
              height: 60px;
              background-color: #cc6d29;
              border-radius: 5px;
              position: absolute;
              left: -30px;
              bottom: 100px;
            }
            .bottom-left-back-30 {
              transform: rotate(30deg);
            }
            .bottom-left-back-60 {
              transform: rotate(60deg);
            }

            .top-right-back {
              position: relative;
              z-index: 0;
            }
            .top-right-back-main,
            .top-right-back-30,
            .top-right-back-60 {
              width: 60px;
              height: 60px;
              background-color: #cc6d29;
              border-radius: 5px;
              position: absolute;
              top: 100px;
              right: -30px;
            }
            .top-right-back-30 {
              transform: rotate(30deg);
            }
            .top-right-back-60 {
              transform: rotate(60deg);
            }
          </style>
        </head>

        <body>
          <div class="main-container">
            <div
              style="
                height: 200px;
                width: 200px;
                background-color:  #0367ED;
                top: -60px;
                left: -60px;
                position: absolute;
                z-index: 0;
                border-radius: 50%;
              "
            ></div>
            <div class="top-right-back">
              <div class="top-right-back-main"></div>
              <div class="top-right-back-30"></div>
              <div class="top-right-back-60"></div>
            </div>
            <div class="top-right1">
              <div class="top-right1-main"></div>
              <div class="top-right1-30"></div>
              <div class="top-right1-60"></div>
            </div>
            <div class="top-right2">
              <div class="top-right2-main"></div>
              <div class="top-right2-30"></div>
              <div class="top-right2-60"></div>
            </div>
            <div class="certificate-container">
              <div class="logos">
                <img
                  src="data:image/png;base64,${operationsBase64}"
                  alt="Operations Logo"
                  style="width: 200px; height: 100px"
                />
                <img src="data:image/svg+xml;base64,${academyBase64}" alt="Academy Logo" />
              </div>
              <h1 class="title">Certificate Of Participation</h1>
              <p class="sub-title">This Certificate Is Proudly Presented to</p>
              <h2 class="participant-name">${name}</h2>
              <p class="event-details">
                for his participation in the
                <span class="highlight">${course}</span>
              </p>
              <p class="event-details">Seminar Event</p>
              <div class="footer">
                <div class="date">
                  <p>${date}</p>
                  <p>Date</p>
                </div>
                <div class="twelve-point-burst">
                  <div class="twelve-point-burst-main"></div>
                  <div class="twelve-point-burst-30"></div>
                  <div class="twelve-point-burst-60"></div>
                </div>
                <div class="sign">
                  <img src="data:image/png;base64,${signBase64}" alt="Signature" />
                </div>
              </div>
            </div>
            <div class="bottom-left-back">
              <div class="bottom-left-back-main"></div>
              <div class="bottom-left-back-30"></div>
              <div class="bottom-left-back-60"></div>
            </div>
            <div class="bottom-left1">
              <div class="bottom-left1-main"></div>
              <div class="bottom-left1-30"></div>
              <div class="bottom-left1-60"></div>
            </div>
            <div class="bottom-left2">
              <div class="bottom-left2-main"></div>
              <div class="bottom-left2-30"></div>
              <div class="bottom-left2-60"></div>
            </div>
            <div
              style="
                height: 200px;
                width: 200px;
                background-color: #0367ED;
                bottom: -60px;
                right: -60px;
                position: absolute;
                z-index: 0;
                border-radius: 50%;
              "
            ></div>
          </div>
        </body>
      </html>
            `;

      await page.setContent(certificateHTML);

      // Capture the certificate as a PDF
      const pdfPath = path.join(__dirname, `../../certificates/${name}_certificate.pdf`);
      await page.pdf({ path: pdfPath, format: "A4", printBackground: true ,landscape: true });

      await browser.close();

      resolve(pdfPath);
    } catch (error) {
      reject(error);
    }
  });
};
