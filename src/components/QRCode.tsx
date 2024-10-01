// components/QRCodeGenerator.js
import QRCode from 'qrcode.react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRef } from 'react';
import Image from "next/image"
import html2canvas from 'html2canvas';

interface QRCodeGeneratorProps {
  uid: string; // Ensure this is properly typed
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ uid }) => {
  const url = `https://isrc.org.in/profile/:${uid}`; 
  const cardRef = useRef(null);
  const imageUrl = '/img/isrc-b.png'; // Replace with your image URL

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current);
        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'qrcode-card.png';
        link.click();
      } catch (error) {
        console.error('Error capturing the card:', error);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card
            ref={cardRef}
            className="p-4 border-0 shadow-lg rounded-lg"
            style={{ backgroundColor: '#f8f9fa' }}
          >
            <Card.Body className="text-center">
              <Card.Title className="mb-4 font-weight-bold" style={{ fontSize: '1.25rem', color: '#333' }}>
                QR Code for ISRC Profile
              </Card.Title>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <QRCode
                  value={url}
                  size={150}
                  fgColor="#0D1028"
                  bgColor="#ffffff"
                  style={{
                    width: '150px',
                    maxWidth: '100%',
                    borderRadius: '8px',
                  }}
                />
                <Image
                  src={imageUrl}
                  alt="Center Image"
                  width={100} // Provide width
                  height={100} // Provide height
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                  }}
                />
              </div>
              <Card.Text className="mt-3 font-weight-light" style={{ color: '#555' }}>
                Event Qr Code
              </Card.Text>
            </Card.Body>
          </Card>
          <Button
            className='mt-3'
            onClick={handleDownload}
            variant="primary"
            style={{ fontSize: '1rem' }}
          >
            Download Card
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default QRCodeGenerator;
