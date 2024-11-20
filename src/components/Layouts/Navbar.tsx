"use client";

import React, { useState, useEffect, useContext, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthContext, { AuthContextType } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FlagIcon } from "react-flag-kit";
import { Modal } from "react-bootstrap";
import { usePathname } from "next/navigation";

// Define the type for menu items to handle React nodes in labels
interface MenuItemType {
  label: React.ReactNode;
  link: string;
  subItems?: MenuItemType[];
  pdfUrl?: string;
}

// Simple debounce function
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

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
        link: "/campus-ambassador/",
      },
      {
        label: "International Campus Amb.",
        link: "/international-campus-ambassador",
      },
      {
        label: "STEM & Robotics Amb.",
        link: "/stem-ambassador/",
      },
    ],
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
    ],
  },
  {
    label: (
      <span style={{ display: "inline-block", textAlign: "center" }}>
        {"Olympiad"}
        <br />
      </span>
    ),
    link: "/gio-event",
    subItems: [
      {
        label: "Registration",
        link: "/gio-event",
      },
      {
        label: "View Profile",
        link: "/gio-event",
      },
      {
        label: "Syllabus",
        link: "#",
        subItems: [
          { label: "5th Std", link: "/rules/syllabus/5TH.pdf", pdfUrl: "/rules/syllabus/5TH.pdf" },
          { label: "6th Std", link: "/rules/syllabus/6TH.pdf", pdfUrl: "/rules/syllabus/6TH.pdf" },
          { label: "7th Std", link: "/rules/syllabus/7TH.pdf", pdfUrl: "/rules/syllabus/7TH.pdf" },
          { label: "8th Std", link: "/rules/syllabus/8TH.pdf", pdfUrl: "/rules/syllabus/8TH.pdf" },
          { label: "9th Std", link: "/rules/syllabus/9TH.pdf", pdfUrl: "/rules/syllabus/9TH.pdf" },
          { label: "10th Std", link: "/rules/syllabus/10TH.pdf", pdfUrl: "/rules/syllabus/10TH.pdf" },
        ],
      },
    ],
  },
  {
    label: (
      <span style={{ display: "inline-block", textAlign: "center" }}>
        {"Verify Certificate"}
      </span>
    ),
    link: "/verify",
  },
  {
    label: (
      <span style={{ display: "inline-block", textAlign: "center" }}>
        {"Awards"}
      </span>
    ),
    link: "/Awards",
    // subItems: [
    //   {
    //     label: "Teachers Form",
    //     link: "/teachers-form",
    //   },
    // ],
  },
];

// MenuItem component
const MenuItem: React.FC<{
  label: React.ReactNode;
  link: string;
  subItems?: MenuItemType[];
  pdfUrl?: string;
  onClick?: React.MouseEventHandler; // Generalized onClick type
}> = ({ label, link, subItems, pdfUrl, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfSrc, setPdfSrc] = useState("");
  const pathname = usePathname();

  const toggleSubMenu: React.MouseEventHandler = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleShowPdf = (pdfUrl: string) => {
    setPdfSrc(pdfUrl);
    setShowPdf(true);
  };

  const handleClose = () => {
    setShowPdf(false);
    setPdfSrc("");
  };

  // Determine if the current link is active
  const isActive = pathname === link;

  return (
    <li className={`nav-item${subItems ? " dropdown" : ""}`}>
      <Link
        href={link}
        className={`nav-link${subItems ? " dropdown-toggle" : ""} ${
          isActive ? "active" : ""
        }`}
        data-bs-toggle={subItems ? "dropdown" : ""}
        onClick={onClick || (subItems ? toggleSubMenu : undefined)}
      >
        {label}
      </Link>
      {subItems && (
        <ul
          className={`dropdown-menu${isOpen ? " show" : ""}`}
          style={{ display: isOpen ? "block" : "none", width: "22vw" }}
        >
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
          <embed src={pdfSrc} type="application/pdf" width="100%" height="800px" />
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
  const pathname = usePathname();

  // Toggle the mobile menu
  const toggleNavbar = () => {
    setMenu(!menu);
  };

  // Debounced scroll handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    debounce(() => {
      const elementId = document.getElementById("navbar");
      if (window.scrollY > 170) {
        elementId?.classList.add("is-sticky");
      } else {
        elementId?.classList.remove("is-sticky");
      }
    }, 100),
    []
  );

  useEffect(() => {
    // Function to read token from local storage
    const fetchTokenFromLocalStorage = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken ? JSON.parse(storedToken) : null);
    };

    // Initial load of token
    fetchTokenFromLocalStorage();

    // Add scroll event listener
    document.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Function to handle Registration and View Profile clicks
  const handleRegistrationClick: React.MouseEventHandler = (event) => {
    event.preventDefault();
    if (token) {
      if (teamRegister) {
        // Redirect to "/gio-event" if logged in and registered
        router.push("/gio-event");
      } else {
        // Redirect to registration form if logged in but not registered
        router.push("/gio-event"); // Update to the actual registration page if different
      }
    } else {
      // Redirect to login page if not logged in
      router.push("/auth/login");
    }
  };

  // Function to render authentication buttons
  const renderAuthButtons = () => {
    if (token) {
      if (teamRegister) {
        return (
          <ul style={{ display: "flex", gap: "10px" }}>
            <li>
              <Link href="/profile" className="btn btn-primary">
                PROFILE
              </Link>
            </li>
            <li>
              <button onClick={logout} className="btn btn-danger">
                Logout
              </button>
            </li>
          </ul>
        );
      } else {
        return (
          <ul style={{ display: "flex", gap: "10px" }}>
            <li>
              <button className="btn btn-primary" onClick={handleRegistrationClick}>
                Register
              </button>
            </li>
            <li>
              <button onClick={logout} className="btn btn-danger">
                Logout
              </button>
            </li>
          </ul>
        );
      }
    } else {
      return (
        <Link href="/auth/login" className="btn btn-primary">
          Register/Login
        </Link>
      );
    }
  };

  // Navbar classes
  const classOne = menu
    ? "collapse navbar-collapse mean-menu"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <div id="navbar" className="elkevent-nav">
      <nav className="navbar navbar-expand-lg navbar-light" style={{ maxHeight: "90px" }}>
        <div className="container">
          <Link href="/" className="navbar-brand">
            <Image src="/img/isrc-b.png" alt="logo" width={180} height={58} />
          </Link>

          <button
            onClick={toggleNavbar}
            className={classTwo}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={menu}
            aria-label="Toggle navigation"
          >
            <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </button>

          <div className={classOne} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              {menuItems(token).map((menuItem, index) => (
                <MenuItem
                  key={index}
                  {...menuItem}
                  onClick={
                    // Check if the menuItem or any of its subItems have the labels "Registration" or "View Profile"
                    ((): React.MouseEventHandler | undefined => {
                      const checkLabel = (item: MenuItemType): boolean => {
                        if (typeof item.label === "string") {
                          return item.label === "Registration" || item.label === "View Profile";
                        } else if (React.isValidElement(item.label)) {
                          // If label is a React element, you might need a different approach
                          // Here, we assume it's not "Registration" or "View Profile"
                          return false;
                        }
                        return false;
                      };

                      if (checkLabel(menuItem)) {
                        return handleRegistrationClick;
                      }

                      return undefined;
                    })()
                  }
                />
              ))}
            </ul>

            {/* others-options */}
            <div className="others-option">{renderAuthButtons()}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
