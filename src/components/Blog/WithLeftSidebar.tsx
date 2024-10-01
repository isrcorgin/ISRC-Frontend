"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { blogPosts } from "./data/blogPosts"; // Import the blogPosts data

// Define the BlogPost type
interface BlogPost {
  id: number;
  imageSrc: string;
  altText: string;
  link: string;
  tag: string;
  date: string;
  title: string;
  content: string; // Content as HTML string
}

const postsPerPage = 6;

const WithLeftSidebar: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Calculate the total number of pages
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  // Calculate the posts to display based on the current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="blog-area ptb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 d-none d-lg-block">
              <Sidebar />
            </div>
            <div className="col-lg-8">
              <div className="row">
                {currentPosts.map((post: BlogPost) => (
                  <div key={post.id} className="col-lg-6 col-md-6">
                    <div className="single-blog-post">
                      <div className="blog-image">
                        <Image
                          src={post.imageSrc}
                          alt={post.altText}
                          width={800}
                          height={550}
                        />
                        <div className="post-tag">
                          <Link href={post.link}>{post.tag}</Link>
                        </div>
                      </div>
                      <div className="blog-post-content">
                        <span className="date">{post.date}</span>
                        <h3>{post.title}</h3>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: post.content.split(" ").slice(0, 20).join(" ") + "..."
                          }}
                        ></p>
                        <Link
                          href={`/post/${post.id}`}
                          className="read-more-btn"
                        >
                          Read More <i className="icofont-double-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-lg-12 col-md-12">
                  <div className="pagination-area">
                    <nav aria-label="Page navigation">
                      <ul className="pagination justify-content-center">
                        <li className="page-item">
                          <Link
                            className="page-link"
                            href="#"
                            onClick={() =>
                              handlePageChange(Math.max(currentPage - 1, 1))
                            }
                          >
                            <i className="icofont-double-left"></i>
                          </Link>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <li key={index + 1} className="page-item">
                            <Link
                              className={`page-link ${
                                currentPage === index + 1 ? "active" : ""
                              }`}
                              href="#"
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </Link>
                          </li>
                        ))}
                        <li className="page-item">
                          <Link
                            className="page-link"
                            href="#"
                            onClick={() =>
                              handlePageChange(Math.min(currentPage + 1, totalPages))
                            }
                          >
                            <i className="icofont-double-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block d-lg-none">
              <button className="btn btn-primary" onClick={toggleSidebar}>
                Toggle Sidebar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`mobile-sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/* You can add content for the mobile sidebar here */}
      </div>

      <style jsx>{`
        .read-more-btn {
          display: inline-flex;
          align-items: center;
          color: #007bff;
          text-decoration: none;
          font-weight: 600;
        }
        .read-more-btn i {
          margin-left: 5px;
        }
        .mobile-sidebar {
          position: fixed;
          bottom: -100%;
          left: 0;
          right: 0;
          background-color: #fff;
          z-index: 999;
          height: 100%;
          transition: bottom 0.3s ease;
          overflow-y: auto;
          padding: 20px;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        }
        .mobile-sidebar.open {
          bottom: 0;
        }
      `}</style>
    </>
  );
};

export default WithLeftSidebar;
