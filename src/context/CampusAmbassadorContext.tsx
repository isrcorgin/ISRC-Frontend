"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Loading from '@/app/loading';

interface SocialLink {
  iconName: string;
  url: string;
}

interface SpeakersMember {
  image: string;
  name: string;
  designation: string;
  socialLinks: SocialLink[];
}

interface CampusAmbassadorData {
  id: string;
  imageUrl: string;
  linkedInLink: string;
  name: string;
  place: string;
}

interface FirebaseResponse {
  [key: string]: CampusAmbassadorData;
}

interface SpeakersContextType {
  speakersMembers: SpeakersMember[];
  internationalSpeakersMembers: SpeakersMember[];
}

// Cache settings
const CAMPUS_CACHE_KEY = 'campusAmbassadors';
const INTERNATIONAL_CACHE_KEY = 'internationalAmbassadors';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const SpeakersContext = createContext<SpeakersContextType | undefined>(undefined);

const SpeakersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [speakersMembers, setSpeakerMembers] = useState<SpeakersMember[]>([]);
  const [internationalSpeakersMembers, setInternationalSpeakersMembers] = useState<SpeakersMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const shuffleArray = (array: SpeakersMember[]): SpeakersMember[] => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const fetchCampusAmbassadors = async () => {
    try {
      const cachedData = localStorage.getItem(CAMPUS_CACHE_KEY);
      const cacheTimestamp = localStorage.getItem(`${CAMPUS_CACHE_KEY}_timestamp`);
      const currentTime = new Date().getTime();

      if (cachedData && cacheTimestamp && (currentTime - parseInt(cacheTimestamp)) < CACHE_TTL) {
        return JSON.parse(cachedData);
      } else {
        const response = await axios.get<FirebaseResponse>(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/admin/all-campus-ambassadors`);
        const data = response.data;
        const membersArray: SpeakersMember[] = Object.values(data).map((item: CampusAmbassadorData) => ({
          image: item.imageUrl,
          name: item.name,
          designation: item.place,
          socialLinks: [
            {
              iconName: "icofont-linkedin",
              url: item.linkedInLink,
            },
          ],
        }));

        localStorage.setItem(CAMPUS_CACHE_KEY, JSON.stringify(membersArray));
        localStorage.setItem(`${CAMPUS_CACHE_KEY}_timestamp`, currentTime.toString());
        return membersArray;
      }
    } catch (error) {
      throw new Error('Error fetching campus ambassadors.');
    }
  };

  const fetchInternationalAmbassadors = async () => {
    try {
      const cachedData = localStorage.getItem(INTERNATIONAL_CACHE_KEY);
      const cacheTimestamp = localStorage.getItem(`${INTERNATIONAL_CACHE_KEY}_timestamp`);
      const currentTime = new Date().getTime();

      if (cachedData && cacheTimestamp && (currentTime - parseInt(cacheTimestamp)) < CACHE_TTL) {
        return JSON.parse(cachedData);
      } else {
        const response = await axios.get<FirebaseResponse>(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/admin/all-international-campus-ambassadors`);
        const data = response.data;
        const membersArray: SpeakersMember[] = Object.values(data).map((item: CampusAmbassadorData) => ({
          image: item.imageUrl,
          name: item.name,
          designation: item.place,
          socialLinks: [
            {
              iconName: "icofont-linkedin",
              url: item.linkedInLink,
            },
          ],
        }));

        localStorage.setItem(INTERNATIONAL_CACHE_KEY, JSON.stringify(membersArray));
        localStorage.setItem(`${INTERNATIONAL_CACHE_KEY}_timestamp`, currentTime.toString());
        return membersArray;
      }
    } catch (error) {
      throw new Error('Error fetching international campus ambassadors.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const campusAmbassadors = await fetchCampusAmbassadors();
        setSpeakerMembers(shuffleArray(campusAmbassadors));

        const internationalAmbassadors = await fetchInternationalAmbassadors();
        setInternationalSpeakersMembers(shuffleArray(internationalAmbassadors));
      } catch (error: any) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <SpeakersContext.Provider value={{ speakersMembers, internationalSpeakersMembers }}>
      {children}
    </SpeakersContext.Provider>
  );
};

const useSpeakers = (): SpeakersContextType => {
  const context = React.useContext(SpeakersContext);
  if (context === undefined) {
    throw new Error('useSpeakers must be used within a SpeakersProvider');
  }
  return context;
};

export { SpeakersProvider, useSpeakers };
