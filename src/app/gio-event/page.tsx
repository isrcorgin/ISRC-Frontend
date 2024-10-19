"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import Navbar from "@/components/Layouts/Navbar";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import SimpleForm from "@/components/gio-profile/gioprofile";
import Select from 'react-select';
import countryList from 'react-select-country-list';

const bannerImageUrl = "/img/gio.avif";

// Expanded countryCodeMapping
const countryCodeMapping: { [key: string]: string } = {
  'Afghanistan': '+93',
  'Albania': '+355',
  'Algeria': '+213',
  'Andorra': '+376',
  'Angola': '+244',
  'Argentina': '+54',
  'Armenia': '+374',
  'Australia': '+61',
  'Austria': '+43',
  'Azerbaijan': '+994',
  'Bahamas': '+1-242',
  'Bahrain': '+973',
  'Bangladesh': '+880',
  'Barbados': '+1-246',
  'Belarus': '+375',
  'Belgium': '+32',
  'Belize': '+501',
  'Benin': '+229',
  'Bhutan': '+975',
  'Bolivia': '+591',
  'Bosnia and Herzegovina': '+387',
  'Botswana': '+267',
  'Brazil': '+55',
  'Brunei': '+673',
  'Bulgaria': '+359',
  'Burkina Faso': '+226',
  'Burundi': '+257',
  'Cambodia': '+855',
  'Cameroon': '+237',
  'Canada': '+1',
  'Cape Verde': '+238',
  'Central African Republic': '+236',
  'Chad': '+235',
  'Chile': '+56',
  'China': '+86',
  'Colombia': '+57',
  'Comoros': '+269',
  'Costa Rica': '+506',
  'Croatia': '+385',
  'Cuba': '+53',
  'Cyprus': '+357',
  'Czech Republic': '+420',
  'Denmark': '+45',
  'Djibouti': '+253',
  'Dominica': '+1-767',
  'Dominican Republic': '+1-809, +1-829, +1-849',
  'East Timor': '+670',
  'Ecuador': '+593',
  'Egypt': '+20',
  'El Salvador': '+503',
  'Equatorial Guinea': '+240',
  'Eritrea': '+291',
  'Estonia': '+372',
  'Eswatini': '+268',
  'Ethiopia': '+251',
  'Fiji': '+679',
  'Finland': '+358',
  'France': '+33',
  'Gabon': '+241',
  'Gambia': '+220',
  'Georgia': '+995',
  'Germany': '+49',
  'Ghana': '+233',
  'Greece': '+30',
  'Grenada': '+1-473',
  'Guatemala': '+502',
  'Guinea': '+224',
  'Guinea-Bissau': '+245',
  'Guyana': '+592',
  'Haiti': '+509',
  'Honduras': '+504',
  'Hungary': '+36',
  'Iceland': '+354',
  'India': '+91',
  'Indonesia': '+62',
  'Iran': '+98',
  'Iraq': '+964',
  'Ireland': '+353',
  'Israel': '+972',
  'Italy': '+39',
  'Jamaica': '+1-876',
  'Japan': '+81',
  'Jordan': '+962',
  'Kazakhstan': '+7',
  'Kenya': '+254',
  'Kiribati': '+686',
  'Korea, North': '+850',
  'Korea, South': '+82',
  'Kuwait': '+965',
  'Kyrgyzstan': '+996',
  'Laos': '+856',
  'Latvia': '+371',
  'Lebanon': '+961',
  'Lesotho': '+266',
  'Liberia': '+231',
  'Libya': '+218',
  'Liechtenstein': '+423',
  'Lithuania': '+370',
  'Luxembourg': '+352',
  'Madagascar': '+261',
  'Malawi': '+265',
  'Malaysia': '+60',
  'Maldives': '+960',
  'Mali': '+223',
  'Malta': '+356',
  'Marshall Islands': '+692',
  'Mauritania': '+222',
  'Mauritius': '+230',
  'Mexico': '+52',
  'Micronesia': '+691',
  'Moldova': '+373',
  'Monaco': '+377',
  'Mongolia': '+976',
  'Montenegro': '+382',
  'Morocco': '+212',
  'Mozambique': '+258',
  'Myanmar': '+95',
  'Namibia': '+264',
  'Nauru': '+674',
  'Nepal': '+977',
  'Netherlands': '+31',
  'New Zealand': '+64',
  'Nicaragua': '+505',
  'Niger': '+227',
  'Nigeria': '+234',
  'North Macedonia': '+389',
  'Norway': '+47',
  'Oman': '+968',
  'Pakistan': '+92',
  'Palau': '+680',
  'Panama': '+507',
  'Papua New Guinea': '+675',
  'Paraguay': '+595',
  'Peru': '+51',
  'Philippines': '+63',
  'Poland': '+48',
  'Portugal': '+351',
  'Qatar': '+974',
  'Romania': '+40',
  'Russia': '+7',
  'Rwanda': '+250',
  'Saint Kitts and Nevis': '+1-869',
  'Saint Lucia': '+1-758',
  'Saint Vincent and the Grenadines': '+1-784',
  'Samoa': '+685',
  'San Marino': '+378',
  'Sao Tome and Principe': '+239',
  'Saudi Arabia': '+966',
  'Senegal': '+221',
  'Serbia': '+381',
  'Seychelles': '+248',
  'Sierra Leone': '+232',
  'Singapore': '+65',
  'Slovakia': '+421',
  'Slovenia': '+386',
  'Solomon Islands': '+677',
  'Somalia': '+252',
  'South Africa': '+27',
  'Spain': '+34',
  'Sri Lanka': '+94',
  'Sudan': '+249',
  'Suriname': '+597',
  'Sweden': '+46',
  'Switzerland': '+41',
  'Syria': '+963',
  'Taiwan': '+886',
  'Tajikistan': '+992',
  'Tanzania': '+255',
  'Thailand': '+66',
  'Togo': '+228',
  'Tonga': '+676',
  'Trinidad and Tobago': '+1-868',
  'Tunisia': '+216',
  'Turkey': '+90',
  'Turkmenistan': '+993',
  'Tuvalu': '+688',
  'Uganda': '+256',
  'Ukraine': '+380',
  'United Arab Emirates': '+971',
  'United Kingdom': '+44',
  'United States': '+1',
  'Uruguay': '+598',
  'Uzbekistan': '+998',
  'Vanuatu': '+678',
  'Vatican City': '+379',
  'Venezuela': '+58',
  'Vietnam': '+84',
  'Yemen': '+967',
  'Zambia': '+260',
  'Zimbabwe': '+263',
};

interface ProfileData {
  country: {
    label: string;
    value: string;
  };
  email: string;
  isregisterd: boolean;
  name: string;
  number: string;
  payments: {
    [orderId: string]: {
      amount: number;
      canAttempt: boolean;
      currency: string;
      isPaid: boolean;
      orderId: string;
      paidAt: string;
      razorpay_order_id: string;
      razorpay_payment_id: string;
      receipt: string;
      status: string;
    };
  };
  mockRank: string;
  std: string;
  teacherNumber: string;
  useWhatsappNumber: boolean;
  whatsappNumber: string;
  globalRank:string,
  indianRank:string,
  stateRank:string,
  school: string,
}

interface FormData {
  name: string;
  email: string;
  number: string;
  whatsappNumber: string;
  teacherNumber: string;
  useWhatsappNumber: boolean;
  std: string;
  country: {
    label: string;
    value: string;
  } | null;
  school: string;
}

const initialFormState: FormData = {
  name: '',
  email: '',
  number: '',
  whatsappNumber: '',
  teacherNumber: '',
  useWhatsappNumber: false,
  std: '',
  country: null,
  school: ''
};


export default function UserForm() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [isSubmittedgio, setisSubmittedgio] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const router = useRouter();
  
  const countryOptions = countryList().getData();

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('token') || 'null');
  
    if (storedToken && storedToken !== 'null') {
      setIsLoggedIn(true);
  
      const storedSubmissionStatus = localStorage.getItem('isSubmittedgio');
      
      if (storedSubmissionStatus) {
        setisSubmittedgio(true);
        fetchProfileData();
      } else {
        checkRegistrationStatus(storedToken);
      }
    } else {
      router.push("/auth/login")
      toast.warn('You need to log in first to fill out the form.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const checkRegistrationStatus = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio-event/check-registration-status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.registered) {
        localStorage.setItem('isSubmittedgio', 'true');
        setisSubmittedgio(true);
        fetchProfileData();
      }
    } catch (error) {
      console.error('Error checking registration status:', error);
      toast.error('Error checking registration status. Please try again.');
    }
  };
  
  const fetchProfileData = async () => {
    const token = JSON.parse(localStorage.getItem('token') || 'null');
    if (token && token !== 'null') {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio-event/get-gio-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Error fetching profile. Please try again.');
      }
    } else {
      toast.error('No valid token found. Please log in again.');
      router.push('/auth/login');
    }
  };

  // Helper function to get country code
  const getCountryCode = (countryName: string | number): string => {
    return countryCodeMapping[countryName as keyof typeof countryCodeMapping] || '';
  };
  

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
  
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handler for country selection
  const handleCountryChange = (selectedOption: { label: string; value: string } | null) => {
    setFormData(prevData => ({
      ...prevData,
      country: selectedOption
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const token = JSON.parse(localStorage.getItem('token') || 'null');
  
    if (!token || token === 'null') {
      toast.error('You must be logged in to submit the form. Redirecting to login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio-event/submit-gio-form`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success('Form submitted successfully!');
  
      localStorage.setItem('isSubmittedgio', 'true');
      setisSubmittedgio(true);
  
      fetchProfileData();
  
      setFormData(initialFormState);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>School Competition Form</title>
        <meta name="description" content="Submit your details for Strategies." />
        <meta name="keywords" content='ISRC Master session, ISRC data security, SumerSInghRanjput, Last Moment tutorial, ISRC data usage,LMT ' />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="LinkedIn Internship Strategies Form" />
        <meta property="og:description" content="Submit your details for LinkedIn Internship Strategies." />
        <meta property="og:image" content={bannerImageUrl} />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar />
      <PageBanner 
        pageTitle="Olympiad"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="Olympiad"
        bgImg="/img/gio.avif"
      />
      <div className="max-w-3xl mx-auto p-6 mt-8 mb-8 bg-white rounded-lg shadow-md">
        {!isLoggedIn && (
          <div className="flex justify-center">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 w-full max-w-md text-center" role="alert">
              <p>You must log in to fill out the form.</p>
            </div>
          </div>
        )}
        {isSubmittedgio && profileData ? (          
          <SimpleForm profileData={profileData} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Fill in Your Details</h2>
            
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Country Selection */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country <span className="text-red-500">*</span>
              </label>
              <Select
                options={countryOptions}
                value={formData.country}
                onChange={handleCountryChange}
                placeholder="Select your country"
                className="mt-1"
                required
              />
            </div>

            {/* Phone Number with Country Code */}
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  {formData.country ? getCountryCode(formData.country.label) : '+Code'}
                </span>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="flex-1 block w-full border border-gray-300 rounded-r-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Use WhatsApp Number */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="useWhatsappNumber"
                name="useWhatsappNumber"
                checked={formData.useWhatsappNumber}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="useWhatsappNumber" className="ml-2 block text-sm text-gray-700">
                Same as Phone Number
              </label>
            </div>

            {/* WhatsApp Number */}
            {!formData.useWhatsappNumber && (
              <div>
                <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="Enter your WhatsApp number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            {/* Teacher's Phone Number */}
            <div>
              <label htmlFor="teacherNumber" className="block text-sm font-medium text-gray-700">
                Teacher's Phone Number
              </label>
              <input
                type="text"
                id="teacherNumber"
                name="teacherNumber"
                value={formData.teacherNumber}
                onChange={handleChange}
                placeholder="Enter teacher's phone number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Standard */}
            <div>
              <label htmlFor="std" className="block text-sm font-medium text-gray-700">
                Standard/Grade <span className="text-red-500">*</span>
              </label>
              <select
                id="std"
                name="std"
                value={formData.std}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select your standard</option>
                {[5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* School */}
            <div>
              <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                School <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="Enter your school name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#4f46e5', // Indigo-600 equivalent
                  color: '#ffffff',
                  padding: '10px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4338ca')} // Indigo-700 equivalent
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}
