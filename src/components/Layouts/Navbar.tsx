"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthContext, { AuthContextType } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FlagIcon } from "react-flag-kit";
import { Modal } from 'react-bootstrap';

// Define the type for menu items to handle React nodes in labels
interface MenuItemType {
  label: React.ReactNode;
  link: string;
  subItems?: MenuItemType[];
  pdfUrl?: string;
}

// Menu data with submenus for Blog and Video
const menuItems = (token: string | null): MenuItemType[] => [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About",
    link: "/about-us/",
  },
  {
    label: (
      <>
        Ambassador
      </>
    ),
    link: "#",
    subItems: [
      {
        label: (
          <>
            Campus Amb <FlagIcon code="IN" size={15} />
          </>
        ),
        link: "/campus-ambassador/"
      },
      {
        label: "International Campus Amb.",
        link: "/international-campus-ambassador"
      },
      {
        label: "STEM & Robotics Amb.",
        link: "/stem-ambassador/"
      }
    ]
  },
  {
    label: (
      <>
        MEDIA
      </>
    ),
    link: "#",
    subItems: [
      {
        label: "Video",
        link: "/video",
      },
      {
        label: "Blog",
        link: "/blog",
      },
      {
        label: "Event",
        link: "/event",
      },
    ]
  },
  {
    label: (
      <span style={{ display: 'inline-block', textAlign: 'center' }}>
        {'Olympiad'}<br/>
      </span>
    ),
    link: "/gio-event",
    subItems: [
      {
        label: "Syllabus",
        link: "#",
        subItems: [
          { label: "5th Std", link: "#", pdfUrl: "/rules/syllabus/5TH.pdf" },
          { label: "6th Std", link: "#", pdfUrl: "/rules/syllabus/6TH.pdf" },
          { label: "7th Std", link: "#", pdfUrl: "/rules/syllabus/7TH.pdf" },
          { label: "8th Std", link: "#", pdfUrl: "/rules/syllabus/8TH.pdf" },
          { label: "9th Std", link: "#", pdfUrl: "/rules/syllabus/9TH.pdf" },
          { label: "10th Std", link: "#", pdfUrl: "/rules/syllabus/10TH.pdf" },
        ]
      },
      {
        label: "Registration",
        link: "/gio-event",
      },
    ]
  },
  {
    label: (
      <span style={{ display: 'inline-block', textAlign: 'center' }}>
        {'Verify Certificate'}<br/>
      </span>
    ),
    link: "/verify",
  },
];

// MenuItem component
const MenuItem: React.FC<{
  label: React.ReactNode;
  link: string;
  subItems?: MenuItemType[];
  pdfUrl?: string;
}> = ({ label, link, subItems, pdfUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfSrc, setPdfSrc] = useState('');

  const toggleSubMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleShowPdf = (pdfUrl: string) => {
    setPdfSrc(pdfUrl);
    setShowPdf(true);
  };

  const handleClose = () => {
    setShowPdf(false);
    setPdfSrc('');
  };

  return (
    <li className={`nav-item${subItems ? ' dropdown' : ''}`}>
      <Link
        href={link}
        className={`nav-link${subItems ? ' dropdown-toggle' : ''}`}
        data-bs-toggle={subItems ? 'dropdown' : ''}
        onClick={subItems ? toggleSubMenu : pdfUrl ? (e) => {
          e.preventDefault();
          handleShowPdf(pdfUrl);
        } : undefined}
      >
        {label}
      </Link>
      {subItems && (
        <ul className={`dropdown-menu${isOpen ? ' show' : ''}`} style={{ display: isOpen ? 'block' : 'none', width: '22vw' }}>
          {subItems.map((subItem, index) => (
            <li key={index}>
              <MenuItem {...subItem} />
            </li>
          ))}
        </ul>
      )}
      <Modal show={showPdf} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>PDF Viewer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <embed
            src={pdfSrc}
            type="application/pdf"
            width="100%"
            height="800px"
          />
        </Modal.Body>
      </Modal>
    </li>
  );
};

// Navbar component
const Navbar: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [menu, setMenu] = useState(true);
  const router = useRouter();
  const { teamRegister, logout } = useContext(AuthContext) as AuthContextType;

  // Toggle the mobile menu
  const toggleNavbar = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    // Function to read token from local storage
    const fetchTokenFromLocalStorage = () => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken ? JSON.parse(storedToken) : null);
    };

    // Initial load of token
    fetchTokenFromLocalStorage();

    // Add scroll event listener
    const handleScroll = () => {
      const elementId = document.getElementById("navbar");
      if (window.scrollY > 170) {
        elementId?.classList.add("is-sticky");
      } else {
        elementId?.classList.remove("is-sticky");
      }
    };

    document.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Navbar classes
  const classOne = menu ? "collapse navbar-collapse mean-menu" : "collapse navbar-collapse show";
  const classTwo = menu ? "navbar-toggler navbar-toggler-right collapsed" : "navbar-toggler navbar-toggler-right";

  return (
    <div id="navbar" className="elkevent-nav">
      <nav className="navbar navbar-expand-lg navbar-light" style={{ maxHeight: "90px" }}>
        <div className="container">
          <Link href="/" className="navbar-brand">
            <Image
              src="/img/isrc-b.png"
              alt="logo"
              width={180}
              height={58}
            />
          </Link>

          <button
            onClick={toggleNavbar}
            className={classTwo}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </button>

          <div className={classOne} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              {menuItems(token).map((menuItem, index) => (
                <MenuItem key={index} {...menuItem} />
              ))}
            </ul>

            {/* others-options */}
            <div className="others-option">
              {token ? (
                teamRegister ? (
                  <ul style={{ display: "flex", gap: "10px" }}>
                    <li>
                      <Link href="/profile" className="btn btn-primary">
                        PROFILE
                      </Link>
                    </li>
                    <li>
                      <button onClick={logout} className="btn btn-primary">
                        LOGOUT
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul style={{ display: "flex", gap: "10px" }}>
                    <li>
                      <Link href="/team-register" className="btn btn-primary">
                        REGISTER
                      </Link>
                    </li>
                    <li>
                      <button onClick={logout} className="btn btn-primary">
                        LOGOUT
                      </button>
                    </li>
                  </ul>
                )
              ) : (
                <ul>
                  <li>
                    <Link href="/auth/login" className="btn btn-primary">
                      Login
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
