"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formStyles = {
  formContainer: {
    maxWidth: '800px',
    margin: 'auto',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    marginBottom: '20px'
  },
  formLabel: {
    fontWeight: 'bold',
    fontSize: '1rem'
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
  pageCount: {
    textAlign: 'center' as 'center',
    marginBottom: '20px',
    fontSize: '1.25rem',
    color: '#333'
  },
  thankYouContainer: {
    maxWidth: '800px',
    margin: 'auto',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    padding: '40px',
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    textAlign: 'center' as 'center',
    marginTop: '60px',
    marginBottom: '60px',
  },
  thankYouTitle: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '20px',
    fontWeight: '600',
  },
  thankYouText: {
    fontSize: '1.125rem',
    color: '#34495e',
    marginBottom: '20px',
  },
  thankYouSubText: {
    fontSize: '1rem',
    color: '#7f8c8d',
  },
  buttonLink: {
    marginTop: '20px',
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#FF2D55',
    borderRadius: '8px',
    textDecoration: 'none',
  }
};

const initialFormState = {
    name: '',
    phone: '',
    email: '',
    collegeName: '',
    courseName: '',
    yearOfStudy: '',
    residentialLocation: '',
    role: ''
  };
  
  export default function InternshipForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(initialFormState);
    const [isSubmittedintern, setisSubmittedintern] = useState(false);
    const totalSteps = 2;
  
    useEffect(() => {
      const storedData = localStorage.getItem('internshipFormData');
      const storedSubmissionStatus = localStorage.getItem('isSubmittedintern');
      if (storedData) {
        setFormData(JSON.parse(storedData));
      }
      if (storedSubmissionStatus === 'true') {
        setisSubmittedintern(true);
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('internshipFormData', JSON.stringify(formData));
    }, [formData]);
  
    useEffect(() => {
      localStorage.setItem('isSubmittedintern', JSON.stringify(isSubmittedintern));
    }, [isSubmittedintern]);
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
  
    const validateStep = (currentStep: number): boolean => {
      switch (currentStep) {
        case 1:
          return !!formData.name && !!formData.phone && !!formData.email;
        case 2:
          return !!formData.collegeName && !!formData.courseName && !!formData.yearOfStudy && !!formData.residentialLocation && !!formData.role;
        default:
          return false;
      }
    };
  
    const handleNext = () => {
      if (validateStep(step)) {
        setStep(prevStep => prevStep + 1);
      } else {
        toast.error('Please fill all required fields before proceeding.');
      }
    };
  
    const handlePrevious = () => setStep(prevStep => prevStep - 1);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/intern-form/submit-internship-form`, { formData });
        toast.success('Application submitted successfully!');
        setisSubmittedintern(true);
        localStorage.removeItem('internshipFormData');
        localStorage.setItem('isSubmittedintern', 'true');
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Error submitting form. Please try again.');
      }
    };
  
    if (isSubmittedintern) {
      return (
        <>
          <Navbar />
          <PageBanner
            pageTitle="Thank You"
            homePageUrl="/"
            homePageText="Home"
            activePageText="Thank You"
            bgImg="/images/main-bg2.webp"
            shortText="" // Provide a value for the missing prop
          />
          <div style={formStyles.thankYouContainer}>
            <h2 style={formStyles.thankYouTitle}>Thank You, {formData.name}!</h2>
            <p style={formStyles.thankYouText}>Your application has been submitted successfully.</p>
            <p style={formStyles.thankYouSubText}>We appreciate your time and effort in filling out this form. The results will be announced soon.</p>
          </div>
          <Footer />
          <ToastContainer />
        </>
      );
    }
  
    return (
      <>
        <Navbar />
        <PageBanner
          pageTitle="Internship Application"
          homePageUrl="/"
          homePageText="Home"
          activePageText="Internship Application"
          bgImg="/images/main-bg2.webp"
          shortText="" // Provide a value for the missing prop
        />
        <div className="container my-5">
          <div className="card" style={formStyles.formContainer}>
            <form onSubmit={handleSubmit}>
              <div style={formStyles.pageCount}>
                <span>Page {step} of {totalSteps}</span>
              </div>
              {step === 1 && (
                <div style={formStyles.card}>
                  <h2 className="mb-4">Personal Information</h2>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label" style={formStyles.formLabel}>Full Name: <span className='text-danger'>*</span></label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label" style={formStyles.formLabel}>Phone: <span className='text-danger'>*</span></label>
                    <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={formStyles.formLabel}>Email ID: <span className='text-danger'>*</span></label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required />
                  </div>
                  <button type="button" className="btn btn-primary" style={formStyles.button} onClick={handleNext}>Next</button>
                </div>
              )}
              {step === 2 && (
                <div style={formStyles.card}>
                  <h2 className="mb-4">Academic Information</h2>
                  <div className="mb-3">
                    <label htmlFor="collegeName" className="form-label" style={formStyles.formLabel}>College Name: <span className='text-danger'>*</span></label>
                    <input type="text" className="form-control" id="collegeName" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="Enter your college name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="courseName" className="form-label" style={formStyles.formLabel}>Course Name: <span className='text-danger'>*</span></label>
                    <input type="text" className="form-control" id="courseName" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="Enter your course name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="yearOfStudy" className="form-label" style={formStyles.formLabel}>Year of Study: <span className='text-danger'>*</span></label>
                    <input type="text" className="form-control" id="yearOfStudy" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} placeholder="Enter your year of study" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="residentialLocation" className="form-label" style={formStyles.formLabel}>Residential Location: <span className='text-danger'>*</span></label>
                    <input type="text" className="form-control" id="residentialLocation" name="residentialLocation" value={formData.residentialLocation} onChange={handleChange} placeholder="Enter your residential location" required />
                  </div>
                  <div className="mb-3">
  <label htmlFor="role" className="form-label" style={formStyles.formLabel}>
    Role: <span className='text-danger'>*</span>
  </label>
  <select
    className="form-control"
    id="role"
    name="role"
    value={formData.role}
    onChange={handleChange}
    required
  >
    <option value="" disabled>Select your role</option> {/* Placeholder option */}
    <option value="HR">HR</option>
    <option value="Sales (On Field)">Sales (On Field)</option>
    <option value="Outreach Coordinator">Outreach Coordinator</option>
    <option value="Marketing">Marketing</option>
  </select>
</div>
                  <button type="button" className="btn btn-secondary" style={formStyles.button} onClick={handlePrevious}>Previous</button>
                  <button type="submit" className="btn btn-primary" style={formStyles.button}>Submit</button>
                </div>
              )}
            </form>
          </div>
        </div>
        <Footer />
        <ToastContainer />
      </>
    );
  }