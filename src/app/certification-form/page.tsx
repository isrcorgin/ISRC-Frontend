"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import Navbar from "@/components/Layouts/Navbar";
import Head from 'next/head';

// Convert the imported image to a URL
const bannerImageUrl = "/img/sumersinghbanner.jpg";

// Styles for the modal
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    borderRadius: '8px',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    width: '90%',
    backgroundColor: '#f9f9f9',
    zIndex: 1050,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1040,
  }
};

// Styles for the form
const formStyles = {
  formContainer: {
    maxWidth: '800px',
    margin: 'auto',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    marginTop: '30px',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    marginBottom: '20px',
  },
  banner: {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: '15px',
    borderRadius: '12px 12px 0 0',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.25rem',
    backgroundImage: `url(${bannerImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '30vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formLabel: {
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  requiredLabel: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'red'
  },
  button: {
    margin: '5px',
    fontSize: '1rem'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px 0',
    padding: '20px'
  },
  select: {
    borderRadius: '4px',
    borderColor: '#ddd',
    padding: '0.375rem 0.75rem'
  }
};

const initialFormState = {
    name: '',
    number: '',
    whatsapp: '',
    email: '',
    linkedIn: '',
    instagram: ''
  };
  
  export default function ContentForm() {
    const [formData, setFormData] = useState(initialFormState);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [copyWhatsapp, setCopyWhatsapp] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
  
    // Check local storage on component mount
    useEffect(() => {
      const isSubmitted = localStorage.getItem('certificationSubmitted') === 'true';
      setFormSubmitted(isSubmitted);
    }, []);
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
  
      if (type === 'checkbox') {
        const input = e.target as HTMLInputElement;
        setCopyWhatsapp(input.checked);
        setFormData(prevData => ({
          ...prevData,
          whatsapp: input.checked ? prevData.number : ''
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      }
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/certificationForm/submit-certification-form`, { formData });
  
        // Set local storage to indicate form has been submitted
        localStorage.setItem('certificationSubmitted', 'true');
        setFormSubmitted(true);
        
        toast.success('Details submitted successfully!');
        setModalIsOpen(true);
        setCopyWhatsapp(false);
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Error submitting form. Please try again.');
      }
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
    return (
      <>
        <Head>
          <title>Submission Form</title>
          <meta name="description" content="Submit your details." />
          <meta name="keyword" content='Submission, ISRC' />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="Submission Form" />
          <meta property="og:description" content="Submit your details." />
          <meta property="og:image" content={bannerImageUrl} />
          <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
          <meta property="og:type" content="website" />
        </Head>
        <Navbar />
        <PageBanner 
          pageTitle="Certification"
          shortText=""
          homePageUrl=""
          homePageText="Home"
          activePageText="Certification"
          bgImg="/images/sumer-bg.jpg"
        />
        <div style={formStyles.formContainer}>
          <div className="banner">
            {/* Banner content here if needed */}
          </div>
          
          {!formSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div style={formStyles.card}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" style={formStyles.formLabel}>Full Name <span style={formStyles.requiredLabel}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={formStyles.formLabel}>Email <span style={formStyles.requiredLabel}>*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="number" className="form-label" style={formStyles.formLabel}>Phone Number <span style={formStyles.requiredLabel}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="Enter your number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="whatsapp" className="form-label" style={formStyles.formLabel}>WhatsApp Number <span style={formStyles.requiredLabel}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Enter your WhatsApp number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="checkbox"
                    id="copyWhatsapp"
                    name="copyWhatsapp"
                    checked={copyWhatsapp}
                    onChange={handleChange}
                  />
                  <label htmlFor="copyWhatsapp" style={{ marginLeft: '8px' }}>
                    Same as Phone Number
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="linkedIn" className="form-label" style={formStyles.formLabel}>LinkedIn (Share your handle if you'd like to be tagged)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="linkedIn"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    placeholder="Enter your LinkedIn profile URL"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="instagram" className="form-label" style={formStyles.formLabel}>Instagram (Share your handle if you'd like to be tagged)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="Enter your Instagram profile URL"
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={formStyles.button}>Submit</button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h3>You have already submitted the form!</h3>
              <p>Thank you for your submission.</p>
            </div>
          )}
        </div>
  
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <h2 style={{ marginTop: 0, marginBottom: '10px', color: '#333' }}>Submission Received</h2>
          <p style={{ color: '#555' }}>Thank you, <strong>{formData.name}</strong>. Your submission has been received successfully.</p>
          <p style={{ color: '#555' }}>We appreciate your interest and will review your form promptly. If you have any further questions or need assistance, please do not hesitate to reach out to us.</p>
          <p><a style={{ color: '#FF2D55', fontSize: "17px" }} href="https://g.page/r/CT3KgmMruLDAEBM/review">Rate your experience with ISRC 🌟🌟🌟🌟🌟</a></p>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <button onClick={closeModal} className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Close</button>
          </div>
        </Modal>
  
        <ToastContainer />
        <Footer />
  
        <style jsx>{`
          .banner {
            background-color: transparent;
            color: #fff;
            padding: 15px;
            border-radius: 12px 12px 0 0;
            text-align: center;
            margin-bottom: 20px;
            font-size: 1.25rem;
            background-image: url(${bannerImageUrl});
            background-size: cover;
            background-position: center;
            height: 32vh; 
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
  
          @media (max-width: 768px) {
            .banner {
              height: 20vh; 
              font-size: 1.125rem; 
            }
          }
  
          @media (max-width: 480px) {
            .banner {
              height: 13vh; 
              font-size: 1rem; 
            }
          }
        `}</style>
      </>
    );
  }