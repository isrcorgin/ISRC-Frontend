import React, { useState, useRef, useContext } from 'react';
import { Modal, Button, Card, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import QRCodeGenerator from './QRCode';
import axios from 'axios';
import AuthContext, { AuthContextType } from '@/context/AuthContext';
import { toast } from 'react-toastify'; // Import react-toastify

interface Member {
  name: string;
  age: string;
  email: string;
  phone: string;
  WhatsApp: string;
  isCaptain: boolean;
  profileImageUrl?: string;
}

interface Mentor {
  name: string;
  age: string;
  email: string;
  phone: string;
  WhatsApp: string;
}

interface competitionTopic {
  ageGroup: string;
  topic: string;
  category: string;
}

interface TeamData {
  teamName: string;
  country: string;
  competitionTopic: competitionTopic;
  mentor: Mentor;
  members: Member[];
}

interface ProfileViewProps {
  team: TeamData;
  uid: string;
  paymentStatus: string;
  amountDue: number;
  onCompletePayment: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ team, uid, paymentStatus, amountDue, onCompletePayment }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useContext(AuthContext) as AuthContextType;
  const router = useRouter();

  const handleShowModal = (member: Member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedMember) {
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append('profileImage', file);
        formData.append('memberName', selectedMember.name);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/upload-profile-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          toast.success('Profile image updated successfully'); // Replace alert with toast
          setSelectedMember({
            ...selectedMember,
            profileImageUrl: response.data.downloadURL,
          });
        } else {
          toast.error('Failed to update profile image'); // Replace alert with toast
        }
      } catch (error) {
        console.error('Error uploading profile image:', error);
        toast.error('An error occurred while uploading the profile image.'); // Replace alert with toast
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
        <div className="card-header" style={{ backgroundColor: '#0D1028', color: 'white' }}>
          <h2 className="card-title">Team Profile</h2>
        </div>
        <div className="card-body">
          {/* Payment Status Section */}
          <div className="alert alert-info text-center mb-4">
            {paymentStatus === 'pending' || paymentStatus === 'failed' ? (
              <>
                <span>Your payment process is pending. Please complete the payment of. </span>
                <span
                  onClick={onCompletePayment}
                  style={{ marginTop: '10px', height: "50px", width: "100px", cursor: "pointer", fontSize: "16px", textDecoration: "underline", fontWeight: "600", color: "black" }}
                >
                  Click Here to Pay {amountDue}
                </span>
              </>
            ) : paymentStatus === 'completed' ? (
              <span>Your payment is completed. Thank you!</span>
            ) : (
              <span>No payment status available.</span>
            )}
          </div>

          <h3 className="mb-4" style={{ color: '#0D1028' }}>General Information</h3>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <Card className="text-center mb-4 border-0 rounded-3 shadow-sm hover-card">
                <Card.Body>
                  <Card.Title>Team Name</Card.Title>
                  <Card.Text>{team.teamName}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="text-center mb-4 border-0 rounded-3 shadow-sm hover-card">
                <Card.Body>
                  <Card.Title>Country</Card.Title>
                  <Card.Text>{team.country}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className='row'>
            <div className="col-md-4">
              <Card className="text-center mb-4 border-0 rounded-3 shadow-sm hover-card">
                <Card.Body>
                  <Card.Title>Age Group</Card.Title>
                  <Card.Text>{team.competitionTopic.ageGroup}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="text-center mb-4 border-0 rounded-3 shadow-sm hover-card">
                <Card.Body>
                  <Card.Title>Category</Card.Title>
                  <Card.Text>{team.competitionTopic.category}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="text-center mb-4 border-0 rounded-3 shadow-sm hover-card">
                <Card.Body>
                  <Card.Title>Topic</Card.Title>
                  <Card.Text>{team.competitionTopic.topic}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          <h3 className="mb-4" style={{ color: '#0D1028' }}>Mentor/Coach Details</h3>
          <Card className="mb-4 border-0 rounded-3 shadow-sm hover-card">
            <Card.Body>
              <Card.Title>{team.mentor.name}</Card.Title>
              <Card.Text><strong>Age:</strong> {team.mentor.age}</Card.Text>
              <Card.Text><strong>Email:</strong> {team.mentor.email}</Card.Text>
              <Card.Text><strong>Phone Number:</strong> {team.mentor.phone}</Card.Text>
              <Card.Text><strong>WhatsApp Number:</strong> {team.mentor.WhatsApp}</Card.Text>
            </Card.Body>
          </Card>

          <h3 className="mb-4" style={{ color: '#0D1028' }}>Team Members</h3>
          <div className="row">
            {team.members.map((member, index) => (
              <div key={index} className="col-md-4 mb-4">
                <Card
                  className="border-0 rounded-3 shadow hover-card"
                  onClick={() => handleShowModal(member)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={member.profileImageUrl || '/img/isrc.png'}
                      alt="Profile Image"
                      style={{
                        height: '150px',
                        width: '150px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '2px solid #FF2D55',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        marginBottom: '10px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    />
                    {member.isCaptain ? <Card.Text className='text-center' style={{ color: "black", fontSize: "large" }}><strong>Captain</strong></Card.Text> : <Card.Text style={{ opacity: "0" }}>captain</Card.Text>}
                    <Card.Title>{member.name}</Card.Title>
                    <Card.Text><strong>Age:</strong> {member.age}</Card.Text>
                    <Card.Text><strong>Phone Number:</strong> {member.phone}</Card.Text>
                    <Card.Text><strong>WhatsApp Number:</strong> {member.WhatsApp}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          {
            paymentStatus === "pending" || paymentStatus === "failed" ? <></> : <>
              <h3 className="mb-4 text-center" style={{ color: '#0D1028' }}>Team QR</h3>
              <div className="text-center mb-4">
                <QRCodeGenerator uid={uid} />
              </div>
            </>
          }
          {/* Support WhatsApp Button */}
          <div className="text-center mb-4">
            <Button 
              variant="success" 
              onClick={() => window.open('https://whatsapp.com/channel/0029Vadja4D0G0Xqm9N1kM3w ', '_blank')}
              style={{ marginBottom: '10px' }}
            >
              Join Whatsapp Group For Event Update
            </Button>
          </div>
        </div>
      </div>

      {selectedMember && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#DC3545', color: 'white' }}>
            <Modal.Title>Member Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Img
                variant="top"
                src={selectedMember.profileImageUrl || '/img/isrc.png'}
                style={{ 
                  height: '150px', 
                  width: '150px', 
                  objectFit: 'cover', 
                  borderRadius: '50%', 
                  border: '2px solid #FF2D55', 
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                  marginBottom: '20px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }} 
              />
              <Card.Body>
                <Card.Title>{selectedMember.name}</Card.Title>
                <Card.Text><strong>Age:</strong> {selectedMember.age}</Card.Text>
                <Card.Text><strong>Email:</strong> {selectedMember.email}</Card.Text>
                <Card.Text><strong>Phone Number:</strong> {selectedMember.phone}</Card.Text>
                <Card.Text><strong>WhatsApp Number:</strong> {selectedMember.WhatsApp}</Card.Text>
                <Card.Text><strong>Captain:</strong> {selectedMember.isCaptain ? 'Yes' : 'No'}</Card.Text>
              </Card.Body>
            </Card>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload New Profile Image</Form.Label>
              <Form.Control
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={uploading}
              />
              {uploading && <div className="text-center mt-3">Uploading...</div>}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ProfileView;
