import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Mail, Phone, School, Globe, Flag as FlagIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from '../Layouts/Navbar';
import ReactCountryFlag from "react-country-flag";
import axios from 'axios';

// Define the ProfileData interface
interface ProfileData {
  name: string;
  email: string;
  number?: string;
  school: string;
  std: string;
  globalRank: string;
  mockRank: string;
  country: {
    label: string;
    value: string;
  };
}

const SimpleForm = ({ profileData }: { profileData: ProfileData }) => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [mockRank, setMockRank] = useState<string>('Attempt to see your ranking');
  const [globalRank, setGlobalRank] = useState<string>('Attempt to see your ranking');

  useEffect(() => {
    if (profileData) {
      // Initialize profile data
      setData({
        name: profileData.name || '',
        email: profileData.email || '',
        number: profileData.number,
        school: profileData.school || '',
        std: profileData.std || '',
        globalRank: profileData.globalRank || '',
        mockRank: profileData.mockRank || '',
        country: profileData.country || { label: '', value: '' },
      });
    }

    const token = JSON.parse(localStorage.getItem("token") || "null");

    // Fetch Mock Rank
    axios.get(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio-event/getMockRank`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Add token to Authorization header
      },
    })
      .then(response => {
        if (response.data && typeof response.data.rank === 'number') {
          setMockRank(response.data.rank.toString());
        } else {
          setMockRank('Attempt to see your ranking');
        }
      })
      .catch(error => {
        console.error('Error fetching mock rank:', error);
        setMockRank('Attempt to see your ranking');
      });

    // Global Rank is not fetched, we'll just show "Attempt to see your ranking"
  }, [profileData]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-lg">
          {/* Header Section with Background Gradient */}
          <div className="h-48 bg-gradient-to-r from-[#FF2D55] to-[#FF2D55]/80" />
          <CardHeader className="relative pb-0">
            <div className="absolute -top-24 left-6 right-6 px-6 py-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-[#FF2D55] mb-2">Global Innovation Olympiad</h2>
              <CardTitle className="text-2xl sm:text-3xl text-gray-800">
                {data ? data.name : 'Loading...'}
              </CardTitle>
              <p className="text-[#FF2D55] font-medium mt-1">Student</p>
            </div>
          </CardHeader>

          {/* Content Section */}
          <CardContent className="space-y-6 pt-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#FF2D55]" />
                    <span className="text-sm text-gray-600">
                      {data ? data.email : 'Loading...'}
                    </span>
                  </div>
                  
                  {data?.country && (
                    <div className="flex items-center gap-3">
                      <ReactCountryFlag
                        countryCode={data.country.value}
                        svg
                        style={{
                          width: '1.5em',
                          height: '1.5em',
                        }}
                        title={data.country.label}
                      />
                      <span className="text-sm text-gray-600">{data.country.label}</span>
                    </div>
                  )}

                  {data?.number && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#FF2D55]" />
                      <span className="text-sm text-gray-600">
                        {data.number}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <School className="w-5 h-5 text-[#FF2D55]" />
                    <span className="text-sm text-gray-600">
                      {data ? data.school : 'Loading...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Rankings</h3>
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 mb-6 md:mb-0">
                  <h3 className="text-md font-semibold text-gray-800 mb-2 text-center">GIO Mock Ranking</h3>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <FlagIcon className="w-6 h-6 text-[#FF2D55] mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">Mock Rank</p>
                    <Badge variant="secondary" className="mt-1">
                      <span className="text-sm font-medium">
                        {isNaN(Number(mockRank)) ? mockRank : <strong>#{mockRank}</strong>}
                      </span>
                    </Badge>
                  </div>
                  <div className="mt-4 text-center">
                    <Link href="/gio-event/instructions" passHref>
                      <button className="w-full md:w-auto bg-[#FF2D55] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#e02a4b] transition duration-300">
                        Mock Test
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="hidden md:block w-px bg-gray-300 mx-4"></div>

                <div className="flex-1 mt-6 md:mt-0">
                  <h3 className="text-md font-semibold text-gray-800 mb-2 text-center">GIO Global Ranking</h3>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Globe className="w-6 h-6 text-[#FF2D55] mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">Global Rank</p>
                    <Badge variant="secondary" className="mt-1">
                      <span className="text-sm font-medium">Attempt to see your ranking</span>
                    </Badge>
                  </div>
                  <div className="mt-4 text-center">
                    <Link href="/payment-gio" passHref>
                      <button className="w-full md:w-auto border border-[#FF2D55] text-[#FF2D55] px-6 py-2 rounded-lg shadow-md hover:bg-[#FF2D55] hover:text-white transition duration-300">
                        Live Test
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SimpleForm;
