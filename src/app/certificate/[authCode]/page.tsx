"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } from "pdf-lib";
import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import Loading from "@/app/loading";

const CertificatePage = () => {
  const { authCode } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [certificateData, setCertificateData] = useState<any>(null);
  const [pdfSize, setPdfSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const fetchCertificate = async (authCode: string) => {
      if (!authCode) return;

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/verify-certificate`, { authCode });
        const { authCode: fetchedAuthCode,Date, type, campusAmbassador, date, school, academicYear, awardedOn, description, name, year } = response.data.data;
        setCertificateData(response.data.data);

        // Determine the correct PDF path based on the type
        const pdfPath = type === "st" ? "/certificate/STUDENT.pdf" :
                        type === "stw" ? "/certificate/workshopwinner.pdf" :
                        type === "ed" ? "/certificate/Inspringeducatoraward.pdf" : 
                        type === "SEC" ? "/certificate/ISRC_LINKEDIN_CERTIFICATE.pdf": 
                        type === "eaw" ? "/certificate/engineerAwardWinner.pdf": 
                        type === "eap" ? "/certificate/engineerAwardParticipate.pdf":
                        "/certificate/ISRC Institutional Membership.pdf";

        const existingPdfBytes = await fetch(pdfPath).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const [firstPage] = pdfDoc.getPages();

        // Get the size of the PDF page
        const { width, height } = firstPage.getSize();
        setPdfSize({ width, height });

        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const helveticabold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const cmToPoints = (cm: number) => cm * 28.35;
        const customColor = rgb(38 / 255, 70 / 255, 65 / 255);

        const drawWrappedText = (
          page: PDFPage,
          text: string,
          x: number,
          y: number,
          maxWidth: number,
          font: PDFFont,
          size: number,
          color: ReturnType<typeof rgb>
        ) => {
          const words = text.split(' ');
          let line = '';
          let lineHeight = size * 1.2; // Adjust line height for spacing
          let currentY = y;

          for (const word of words) {
            const testLine = line + (line ? ' ' : '') + word;
            const testWidth = font.widthOfTextAtSize(testLine, size);

            if (testWidth > maxWidth) {
              // Calculate the width of the line and adjust x position to center
              const lineWidth = font.widthOfTextAtSize(line, size);
              page.drawText(line, {
                x: x + (maxWidth - lineWidth) / 2, // Center the text
                y: currentY,
                size,
                font,
                color
              });
              line = word;
              currentY -= lineHeight;
            } else {
              line = testLine;
            }
          }

          // Draw the last line
          const lineWidth = font.widthOfTextAtSize(line, size);
          page.drawText(line, {
            x: x + (maxWidth - lineWidth) / 2, // Center the text
            y: currentY,
            size,
            font,
            color
          });
        };

        const drawCertificateText = (type: string) => {
          switch (type) {
            case "st":
              const pageWidth = firstPage.getWidth();
              const maxWidth = 600; // Adjust width based on your PDF design
              const initialY = 204.2;
              const text = description || '';
        
              // Wrap and draw the description text
              drawWrappedText(firstPage, text, (pageWidth - maxWidth) / 2, initialY, maxWidth, helveticaFont, 17, customColor);
        
              firstPage.drawText(year || '', {
                x: 479.6,
                y: 100,
                size: 13,
                font: helveticabold,
                color: rgb(0.847, 0.702, 0.314),
              });
        
              firstPage.drawText(awardedOn || '', {
                x: 340.5,
                y: 81.3,
                size: 18,
                font: helveticaFont,
                color: customColor,
              });
        
              firstPage.drawText(authCode || '', {
                x: 340.5,
                y: 127.3,
                size: 18,
                font: helveticaFont,
                color: customColor,
              });
        
              const campusText = name || '';
              const textWidth = helveticaFont.widthOfTextAtSize(campusText, 34);
              firstPage.drawText(campusText, {
                x: (pageWidth - textWidth) / 2,  // Centers the text on the x-axis
                y: 248.5,
                size: 34,
                font: helveticaFont,
                color: rgb(0.847, 0.702, 0.314), // lightyellow
              });
              break;
        
            case "in":
              // Positions for the "in" certificate type
              if (fetchedAuthCode) {
                firstPage.drawText(fetchedAuthCode, {
                  x: cmToPoints(24.75),
                  y: height - cmToPoints(6.05),
                  size: 11,
                  font: helveticabold,
                  color: rgb(1, 1, 1),
                });
        
                firstPage.drawText(fetchedAuthCode, {
                  x: cmToPoints(11.27),
                  y: height - cmToPoints(23.98),
                  size: 15,
                  font: helveticaFont,
                  color: customColor,
                });
              }
        
              firstPage.drawText(school || '', {
                x: cmToPoints(5.92),
                y: height - cmToPoints(12.55),
                size: 26,
                font: helveticabold,
                color: customColor,
              });
              firstPage.drawText(academicYear || '', {
                x: cmToPoints(11.65),
                y: height - cmToPoints(15.43),
                size: 18,
                font: helveticaFont,
                color: customColor,
              });
              firstPage.drawText(date || '', {
                x: cmToPoints(10.67),
                y: height - cmToPoints(22.3),
                size: 19,
                font: helveticaFont,
                color: customColor,
              });
              firstPage.drawText(campusAmbassador || '', {
                x: cmToPoints(22.65),
                y: height - cmToPoints(23.93),
                size: 14,
                font: helveticaFont,
                color: customColor,
              });
              break;
        
            case "stw":
              const pageWidths = firstPage.getWidth();
              const maxWidths = 600; // Adjust width based on your PDF design
              const initialYs = 204.2;
              const texts = description || '';  // Initialize the 'text' variable properly here
        
              // Wrap and draw the description text
              drawWrappedText(firstPage, texts, (pageWidths - maxWidths) / 2, initialYs, maxWidths, helveticaFont, 17, customColor);
        
              firstPage.drawText(year || '', {
                x: 479.6,
                y: 100,
                size: 13,
                font: helveticabold,
                color:                rgb(0.847, 0.702, 0.314),
              });
        
              firstPage.drawText(awardedOn || '', {
                x: 340.5,
                y: 81.3,
                size: 18,
                font: helveticaFont,
                color: customColor,
              });
        
              firstPage.drawText(authCode || '', {
                x: 340.5,
                y: 127.3,
                size: 18,
                font: helveticaFont,
                color: customColor,
              });
        
              const campusTexts = name || '';
              const textWidths = helveticaFont.widthOfTextAtSize(campusTexts, 34);
              firstPage.drawText(campusTexts, {
                x: (pageWidths - textWidths) / 2,  // Centers the text on the x-axis
                y: 248.5,
                size: 34,
                font: helveticaFont,
                color: rgb(0.847, 0.702, 0.314), // lightyellow
              });
              break;
        
              case "ed":
                // Center the name text on the page
                if (name) {
                  const nameTextWidth = helveticabold.widthOfTextAtSize(name, 20);
                  const pageCenter = firstPage.getWidth() / 2;
                  const nameXPosition = pageCenter - nameTextWidth / 2;
              
                  firstPage.drawText(name, {
                    x: nameXPosition,  // Center the name text
                    y: height - 282,   // Adjust y position as needed
                    size: 20,
                    font: helveticabold,
                    color: customColor,
                  });
                }
              
                // No centering for the authCode, keep it as it is
                firstPage.drawText(authCode || '', {
                  x: 260.5,          // Original x position
                  y: height - 668,   // Original y position
                  size: 18,
                  font: helveticaFont,
                  color: customColor,
                });

                firstPage.drawText(awardedOn || '', {
                  x: 276.5,          // Original x position for topic
                  y: height - 468,   // Adjusted y position for topic (below authCode)
                  size: 18,
                  font: helveticabold,
                  color: rgb(0,0,0),
                });
                break;

              case "eap":
                if (name) {
                  const nameTextWidth = helveticabold.widthOfTextAtSize(name, 20);
                  const pageCenter = firstPage.getWidth() / 2;
                  const nameXPosition = pageCenter - nameTextWidth / 2;
              
                  firstPage.drawText(name, {
                    x: nameXPosition,  // Center the name text
                    y: height - 300,   // Adjust y position as needed
                    size: 25,
                    font: helveticabold,
                    color: customColor,
                  });
                }
              
                // No centering for the authCode, keep it as it is
                firstPage.drawText(authCode || '', {
                  x: 261,          // Original x position
                  y: height - 687,   // Original y position
                  size: 15,
                  font: helveticaFont,
                  color: customColor,
                });

                break;
                case "SEC":
                  if (name) {
                    const nameTextWidth = helveticabold.widthOfTextAtSize(name, 20);
                    const pageCenter = firstPage.getWidth() / 2;
                    const nameXPosition = pageCenter - nameTextWidth / 2;
                
                    firstPage.drawText(name, {
                      x: nameXPosition,  // Center the name text
                      y: height - 250,   // Adjust y position as needed
                      size: 25,
                      font: helveticabold,
                      color: customColor,
                    });
                  }
                
                  // No centering for the authCode, keep it as it is
                  firstPage.drawText(authCode || '', {
                    x: 350,          // Original x position
                    y: height - 724,   // Original y position
                    size: 15,
                    font: helveticaFont,
                    color: customColor,
                  });
                  firstPage.drawText(Date || '', {
                    x: 273.5,
                    y: 295.3,
                    size: 22,
                    font: helveticabold,
                    color: customColor,
                  });
  
                  break;
              
                case "eaw":
                  if (name) {
                    const nameTextWidth = helveticabold.widthOfTextAtSize(name, 20);
                    const pageCenter = firstPage.getWidth() / 2;
                    const nameXPosition = pageCenter - nameTextWidth / 2;
                
                    firstPage.drawText(name, {
                      x: nameXPosition + 40,  // Center the name text
                      y: height - 360,   // Adjust y position as needed
                      size: 30,
                      font: helveticabold,
                      color: rgb(0,0,0),
                    });
                  }
                
                  // No centering for the authCode, keep it as it is
                  firstPage.drawText(authCode || '', {
                    x: 325,          // Original x position
                    y: height - 725,   // Original y position
                    size: 15,
                    font: helveticaFont,
                    color: rgb(0,0,0),
                  });

                  break;

        
            default:
              console.warn(`Unsupported certificate type: ${type}`);
              break;
          }
        };

        drawCertificateText(type);

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        setPdfUrl(pdfUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching certificate:", error);
        setLoading(false);
      }
    };

    fetchCertificate(authCode as string);
  }, [authCode]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Certificate.pdf";
    link.click();
  };

  if (loading) return <Loading />;

  // Create a filtered version of the certificate data excluding 'type'
  const filteredCertificateData = certificateData
    ? Object.entries(certificateData).reduce((acc, [key, value]) => {
        if (key !== 'type') acc[key] = value;
        return acc;
      }, {} as Record<string, any>)
    : null;

  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Certificate"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="Certificate"
        bgImg="/images/main-bg2.webp"
      />

      <div className="container my-5 px-3">
        <div className="text-center mb-4">
          <h1 className="mb-3">Certificate</h1>
          {pdfUrl ? (
            <div className="certificate-container">
              <iframe
                src={pdfUrl}
                className="pdf-viewer"
                title="Certificate"
              ></iframe>
              <div className="mt-4">
              <p className="mb-0 text-dark fs-4 fw-bold">
              🎉 Proud of your achievement? <br />
              Show it off and <a href="https://g.page/r/CT3KgmMruLDAEBM/review" target="_blank" rel="noopener noreferrer" className="text-danger text-decoration-none">share your success with a Google review!</a> 🌟
              </p>
              </div>
              <button
                onClick={handleDownload}
                className="btn-download mt-4"
              >
                Download PDF
              </button>
            </div>
          ) : (
            <p className="text-danger">Unable to load certificate.</p>
          )}
        </div>
        <div className="mt-4">
          {filteredCertificateData && (
            <div className="card mb-4 p-3">
              <div className="card-body">
                <h2 className="card-title mb-3">Certificate Details</h2>
                {Object.entries(filteredCertificateData).map(([key, value]) => (
                  <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value}</p>
                ))}
              </div>
            </div>
          )}
          <div className="card p-3">
            <div className="card-body">
              <p>
                This certificate is issued to recognize the achievements and contributions of the recipient. The details mentioned above are verified and valid as of the issuance date. For further verification or inquiries, please contact the issuing institution directly.
              </p>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
          }

          h1 {
              font-family: 'Poppins', sans-serif;
              font-weight: 600;
              color: #0E1B4D;
          }

          h2 {
              font-family: 'Poppins', sans-serif;
              font-weight: 500;
              color: #0E1B4D;
          }

          p {
              font-family: 'Poppins', sans-serif;
              color: #383838;
          }

          .btn-download {
            background-color: #FF2D55;
            color: #fff;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .btn-download:hover {
            background-color: #e6244c;
          }

          .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out;
          }

          .card:hover {
            transform: translateY(-5px);
          }

          .certificate-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            margin-top: 20px;
          }

          .pdf-viewer {
            width: 100%;
            max-width: ${pdfSize ? (pdfSize.width / 1.25) + 'px' : '1200px'};  /* Doubled width */
            height: ${pdfSize ? (pdfSize.height / 1.25) + 'px' : '120vh'};  /* Doubled height */
            border: none;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            animation: fadeIn 1s ease-in-out;
          }

          @media (max-width: 768px) {
            .btn-download {
                            width: 100%;
              font-size: 14px;
              padding: 8px 16px;
            }

            .pdf-viewer {
              width: 100%;
              height: 80vh; /* Adjust height for smaller screens */
            }
          }
        `}</style>

      </div>

      <Footer />
    </>
  );
};

export default CertificatePage;


