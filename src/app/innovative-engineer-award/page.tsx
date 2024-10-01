"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import { generateUniqueCode } from '@/utils/generateUniqueCode';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications


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
  select: {
    borderRadius: '4px',
    borderColor: '#ddd',
    padding: '0.375rem 0.75rem'
  },
  pageCount: {
    textAlign: 'center' as const,
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
    textAlign: 'center' as const,
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
  fullName: '',
  institution: '',
  course: '',
  yearOfStudy: '',
  branch: '',
  customBranch: '',
  studentId: '',
  phone: '',
  whatsapp: '',
  email: '',
  socialMediaLinkedin: '',
  socialMediaInstagram: '',
  socialMediaFacebook: '',
  instSocialMedia: '',
  problemDesc: '',
  motivation: '',
  solutionDesc: '',
  personalGrowth: '',
  advice: '',
  authCode: generateUniqueCode("ER"),
  type: "eap"
};

export default function Form() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormState);
  const [showCustomBranch, setShowCustomBranch] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 2;
  
  // Retrieve data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    const storedSubmissionStatus = localStorage.getItem('isSubmitted');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
    if (storedSubmissionStatus === 'true') {
      setIsSubmitted(true);
    }
  }, []);
  
  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // Save submission status to localStorage
  useEffect(() => {
    localStorage.setItem('isSubmitted', JSON.stringify(isSubmitted));
  }, [isSubmitted]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
      if (name === 'branch' && value === 'Other') {
        setShowCustomBranch(true);
      } else if (name === 'branch') {
        setShowCustomBranch(false);
      }
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
  };

  const validateStep = (currentStep: number): String | boolean => {
  
    switch (currentStep) {
      case 1:
        const step1Valid = formData.problemDesc && formData.solutionDesc
        return step1Valid;
      default:
        return false;
    }
  };
  
  const handleNext = () => {
    if (step === 1) {
      if (validateStep(step)) {
        setStep(prevStep => prevStep + 1);
      } else {
        toast.error('Please fill all required fields before proceeding.');
      }
    } else {
      // Logic for other steps if needed
      setStep(prevStep => prevStep + 1);
    }
  };
  

  const handlePrevious = () => setStep(prevStep => prevStep - 1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send form data to the API
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/forms/submit-form`, { formData });
  
      // Show success toast
      toast.success('Form submitted successfully!');
      setIsSubmitted(true); // Set isSubmitted to true to display thank you message and clear form data when submitted successfully
  
      localStorage.removeItem('formData');
      localStorage.setItem('isSubmitted', 'true');
    } catch (error) {
      console.error('Error submitting form:', error);
  
      // Show error toast
      toast.error('Error submitting form. Please try again.');
    }
  };
  
  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <PageBanner
          pageTitle="Thank You"
          shortText=""
          homePageUrl="/"
          homePageText="Home"
          activePageText="Thank You"
          bgImg="/images/main-bg2.webp"
        />
        <div style={formStyles.thankYouContainer}>
          <h2 style={formStyles.thankYouTitle}>Thank You, {formData.fullName}!</h2>
          <p style={formStyles.thankYouText}>Application ID: ISRC-009887263363</p>
          <p style={formStyles.thankYouText}>Your submission has been received successfully for <strong>Innovative Engineer Award</strong>.  Now Submit your Application ID. We appreciate your time and effort in filling out this form.</p>
          <p style={formStyles.thankYouSubText}>The results will be announced on <strong>15<sup>th</sup> September, 2024</strong>. We will review your submission and get back to you if there are any updates. Stay tuned for results!</p>
          <a style={formStyles.buttonLink}href={`https://wa.me/919594402916?text=Application%20ID:%20ISRC-009887263363`}>Submit Your Application ID</a>
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
        pageTitle="Innovative Engineer Award"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="Awards"
        bgImg="/images/main-bg2.webp"
      />
      
      <div className="container my-5">
        <div className="card" style={formStyles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div style={formStyles.pageCount}>
              <span>Page {step} of {totalSteps}</span>
            </div>
            <div>
        {/* Link to open the image in a new window */}
        <a 
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            window.open('/images/FormInstructions.jpg','_blank','width=800,height=600');
          }}
          style={{color: "red", cursor: "pointer", fontSize:"17px"}}
        >
          Instructions to fill the form
        </a>
      </div>
            {step === 1 && (
              <>
              <div style={formStyles.card}>
                <h2 className="mb-4">Problem Identification and Context</h2>
                <div className="mb-3">
                  <label htmlFor="problemDesc" className="form-label" style={formStyles.formLabel}>Describe the problem you are addressing: <span style={{color: "red"}} >*</span></label>
                  <textarea className="form-control" id="problemDesc" name="problemDesc" rows={3} value={formData.problemDesc} onChange={handleChange} placeholder="Provide a detailed description of the problem" required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="motivation" className="form-label" style={formStyles.formLabel}>Why is this problem important? What motivated you to work on this?</label>
                  <textarea className="form-control" id="motivation" name="motivation" rows={3} value={formData.motivation} onChange={handleChange} placeholder="Explain your motivation and the significance of the problem"></textarea>
                </div>
              </div>
              <div style={formStyles.card}>
                <h2 className="mb-4">Research and Solution</h2>
                  <div className="mb-3">
                      <label htmlFor="solutionDesc" className="form-label" style={formStyles.formLabel}>Describe your proposed solution: <span style={{color: "red"}} >*</span></label>
                      <textarea className="form-control" id="solutionDesc" name="solutionDesc" rows={3} value={formData.solutionDesc} onChange={handleChange} placeholder="Provide details about your solution" required></textarea>
                  </div>
                  </div>
                <div style={formStyles.card}>
                <h2 className="mb-4">Personal Reflection</h2>
                <div className="mb-3">
                  <label htmlFor="personalGrowth" className="form-label" style={formStyles.formLabel}>How has working on this project contributed to your personal growth? </label>
                  <textarea className="form-control" id="personalGrowth" name="personalGrowth" rows={3} value={formData.personalGrowth} onChange={handleChange} placeholder="Describe how this project has impacted your personal development"></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="advice" className="form-label" style={formStyles.formLabel}>What advice would you give to others working on similar projects?</label>
                  <textarea className="form-control" id="advice" name="advice" rows={3} value={formData.advice} onChange={handleChange} placeholder="Share any advice or tips you have for others working on similar projects"></textarea>
                </div>
                <button type="button" className="btn btn-primary" style={formStyles.button} onClick={handleNext}>Next</button>
              </div>
              </>
            )}
            {step === 2 && (
              <div style={formStyles.card}>
                <h2 className="mb-4">Personal and Academic Information</h2>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label" style={formStyles.formLabel}>Full Name:<span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="institution" className="form-label" style={formStyles.formLabel}>Institution/University Name: <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" id="institution" name="institution" value={formData.institution} onChange={handleChange} placeholder="Enter your institution/university name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="course" className="form-label" style={formStyles.formLabel}>Diploma/Degree<span className='text-danger'>*</span></label>
                  <select className="form-select" id="course" name="course" style={formStyles.select} value={formData.course} onChange={handleChange} required>
                    <option value="" disabled>Education Level</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Degree">Degree</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="branch" className="form-label" style={formStyles.formLabel}>Branch of Engineering: <span className='text-danger'>*</span></label>
                  <select className="form-select" id="branch" name="branch" style={formStyles.select} value={formData.branch} onChange={handleChange} required>
                    <option value="" disabled>Select your branch</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Chemical Engineering">Chemical Engineering</option>
                    <option value="Aerospace Engineering">Aerospace Engineering</option>
                    <option value="Biomedical Engineering">Biomedical Engineering</option>
                    <option value="Environmental Engineering">Environmental Engineering</option>
                    <option value="Industrial Engineering">Industrial Engineering</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Automotive Engineering">Automotive Engineering</option>
                    <option value="Other">Other</option>
                  </select>
                  {showCustomBranch && (
                    <div className="mt-2">
                      <label htmlFor="customBranch" className="form-label" style={formStyles.formLabel}>Please specify your branch: <span className='text-danger'>*</span></label>
                      <input type="text" className="form-control" id="customBranch" name="customBranch" value={formData.customBranch} onChange={handleChange} placeholder="Enter your branch of engineering" />
                    </div>
                  )}
                
                </div>
                <div className="mb-3">
                  <label htmlFor="yearOfStudy" className="form-label" style={formStyles.formLabel}>Current Year of Study: <span className='text-danger'>*</span></label>
                  <select className="form-select" id="yearOfStudy" name="yearOfStudy" style={formStyles.select} value={formData.yearOfStudy} onChange={handleChange} required>
                    <option value="" disabled>Select your Year</option>
                    {Array.from(Array(4).keys()).map(year => (
                      <option key={year} value={year + 1}>{year + 1} Year</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="studentId" className="form-label" style={formStyles.formLabel}>Student ID or Enrollment Number: <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" id="studentId" name="studentId" value={formData.studentId} onChange={handleChange} placeholder="Enter your student ID or enrollment number" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label" style={formStyles.formLabel}>Phone Number: <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="whatsapp" className="form-label" style={formStyles.formLabel}>WhatsApp Number: <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="Whatsapp Number" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={formStyles.formLabel}>Email Id: <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                </div>

                <div className="mb-3">
                  <label htmlFor="facebook" className="form-label" style={formStyles.formLabel}>Facebook Profile URL:</label>
                  <input type="url" className="form-control" id="facebook" name="socialMediaFacebook" value={formData.socialMediaFacebook} onChange={handleChange} placeholder="e.g., https://facebook.com/yourprofile" />
                </div>
                <div className="mb-3">
                  <label htmlFor="instagram" className="form-label" style={formStyles.formLabel}>Instagram Profile URL:</label>
                  <input type="url" className="form-control" id="instagram" name="socialMediaInstagram" value={formData.socialMediaInstagram} onChange={handleChange} placeholder="e.g., https://instagram.com/yourprofile" />
                </div>
                <div className="mb-3">
                  <label htmlFor="linkedin" className="form-label" style={formStyles.formLabel}>LinkedIn Profile URL:</label>
                  <input type="url" className="form-control" id="linkedin" name="socialMediaLinkedin" value={formData.socialMediaLinkedin} onChange={handleChange} placeholder="e.g., https://linkedin.com/in/yourprofile" />
                </div>
                <button type="button" className="btn btn-secondary" style={formStyles.button} onClick={handlePrevious}>Previous</button>
                <button type="submit" className="btn btn-primary" style={formStyles.button}>Submit</button>
              </div>
            )}

          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
