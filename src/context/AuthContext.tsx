"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define the type for the Auth context
export type AuthContextType = {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<string>;
  logout: () => void;
  teamRegister: boolean;
  setTeamRegister: (value: boolean) => void;
  teamTotalPrice: number;
  setTeamTotalPrice: (value: number) => void;
};

// Create context with a default value of null
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [teamRegister, setTeamRegister] = useState<boolean>(false); // Initialize as boolean
  const [teamTotalPrice, setTeamTotalPrice] = useState(2400);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    } else {
      setToken(null);
    }
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token from local storage
        const tokenString = localStorage.getItem("token");

        if(tokenString)
        {
        // Parse the token if it is a JSON string
        const token = JSON.parse(tokenString);

        // Make the API request with the token in the headers
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/user-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        const data = response.data;

        if (data.user.teamRegistered) {
          localStorage.setItem("registered", JSON.stringify(true));
          setTeamRegister(true); // Update context state
        }
        else{
          localStorage.setItem("registered", JSON.stringify(false));
          setTeamRegister(false)
        }
        }

      } catch (error: any) {
        console.error(error);
    };
  }
    fetchData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/login`, {
        email,
        password,
      });
      const data = response.data;
      if (data.emailVerified) {
        // Email is verified, proceed with login
        setToken(data.token);
        localStorage.setItem("token", JSON.stringify(data.token));
        return true; // Indicate successful login and email verification
      } else {
        // Email is not verified
        return false; // Indicate email verification is needed
      }
      
    } catch (error: any) {
      throw new Error("Invalid email or password");
    }
  };
  

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/register`, {
        email,
        password,
      });
      const data = response.data;  
      // Store the token and registration status
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("registered", JSON.stringify(true));
  
      // Return the message to be shown on the frontend
      return data.message; // Assumes the backend returns a message
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("registered");
    router.push("/"); // Redirect to homepage
  };

  return (
    <AuthContext.Provider value={{ token, login, register, teamRegister, setTeamRegister, teamTotalPrice, setTeamTotalPrice, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;