"use client";

import React, { useEffect, useState } from 'react';
import ProfileView from '@/components/ProfileView';
import Navbar from '@/components/Layouts/Navbar';
import Footer from '@/components/Layouts/Footer';
import PageBanner from '@/components/Common/PageBanner';
import Loading from '../loading';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Member {
  name: string;
  age: string;
  email: string;
  phone: string;
  WhatsApp: string;
  profileImageUrl: string;
  isCaptain: boolean;
}

interface Mentor {
  name: string;
  age: string;
  email: string;
  WhatsApp: string;
  phone: string;
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

const ProfilePage: React.FC = () => {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [UID, setUID] = useState<string>("")
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [amountDue, setAmountDue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token from local storage
        const tokenString = localStorage.getItem("token");
        if (!tokenString) {
          router.push("/auth/login")
          return;
        }

        // Parse the token if it is a JSON string
        const token = JSON.parse(tokenString);

        // Make the API request with the token in the headers
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/user-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        // Ensure team data exists
        if (!data.user || !data.user.team) {
          throw new Error('Invalid data structure');
        }

        setTeamData(data.user.team);
        setUID(data.user.uid);
        setPaymentStatus(data.user.paymentStatus);
        setAmountDue(data.user.amountDue)

      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);


  const handleCompletePayment = () => {
    if (amountDue > 0) {
      router.push(`/payment`);
    }
  };

  if (loading) return <Loading/>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Profile"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="Profile"
        bgImg="/images/main-bg2.webp"
      />

      <div className="container mt-5">
        {teamData ? <ProfileView team={teamData} uid={UID} paymentStatus={paymentStatus} amountDue={amountDue} onCompletePayment={handleCompletePayment}  /> : <div>No team data available</div>}
      </div>
      <br /><br />
      <Footer />
    </>
  );
};

export default ProfilePage;
