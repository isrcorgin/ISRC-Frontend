"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "./data/blogPosts";

const Sidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedPost, setSelectedPost] = useState<null | typeof blogPosts[0]>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(results.slice(0, 6)); // Limit to 6 posts
  };

  const openPopup = (post: typeof blogPosts[0]) => {
    setSelectedPost(post);
  };

  const closePopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPost(null);
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="sidebar">
        <div className="widget widget_search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <i className="icofont-search"></i>
            </button>
          </form>
        </div>

        <div className="widget widget_recent_entries">
          <h3 className="widget-title">Search Results</h3>
          <ul>
            {filteredPosts.slice(0, 6).map(post => (
              <li key={post.id}>
                <Link href="#" onClick={() => openPopup(post)}>
                  <Image
                    src={post.imageSrc}
                    alt={post.altText}
                    width={800}
                    height={550}
                  />
                </Link>
                <h5>
                  <Link href="#" onClick={() => openPopup(post)}>{post.title}</Link>
                </h5>
                <p className="date">{post.date}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="widget widget_categories">
          <h3 className="widget-title">Categories</h3>
          <ul>
            <li><Link href="#">Robotics</Link></li>
            <li><Link href="#">STEM Education</Link></li>
            <li><Link href="#">International Competitions</Link></li>
            <li><Link href="#">Engineering</Link></li>
            <li><Link href="#">Technology</Link></li>
            <li><Link href="#">Innovation</Link></li>
            <li><Link href="#">Workshops</Link></li>
            <li><Link href="#">Teams</Link></li>
            <li><Link href="#">Global Events</Link></li>
          </ul>
        </div>
        
        <div className="widget widget_tag_cloud">
          <h3 className="widget-title">Tags</h3>
          <div className="tagcloud">
            <Link href="#">ISRC 2024</Link>
            <Link href="#">Robotics</Link>
            <Link href="#">STEM</Link>
            <Link href="#">Innovation</Link>
            <Link href="#">Competition</Link>
            <Link href="#">Engineering</Link>
            <Link href="#">Technology</Link>
            <Link href="#">Teams</Link>
            <Link href="#">Global Event</Link>
            <Link href="#">Mumbai</Link>
            <Link href="#">Workshops</Link>
            <Link href="#">Networking</Link>
            <Link href="#">Learning</Link>
            <Link href="#">Future</Link>
            <Link href="#">Challenges</Link>
            <Link href="#">Robotics Challenges</Link>
          </div>
        </div>
        
        {selectedPost && (
          <div className="popup" onClick={closePopup}>
            <div className="popup-content" onClick={handlePopupClick}>
              <h2>{selectedPost.title}</h2>
              <Image
                src={selectedPost.imageSrc}
                alt={selectedPost.altText}
                width={800}
                height={550}
              />
              <div
                className="popup-text"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .sidebar {
          padding: 20px;
        }
        .widget {
          margin-bottom: 20px;
        }
        .widget-title {
          font-size: 1.5rem;
          margin-bottom: 15px;
          font-weight: bold;
        }
        .form-control {
          width: calc(100% - 40px);
          display: inline-block;
          margin-right: -4px;
        }
        button {
          padding: 6px 12px;
          background: #007bff;
          border: none;
          color: white;
          cursor: pointer;
        }
        .widget_recent_entries img {
          width: 100%;
          height: auto;
        }
        .date {
          color: #999;
          font-size: 0.875rem;
        }
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .popup-content {
          background: white;
          padding: 20px;
          max-width: 800px;
          width: 100%;
          max-height: 80vh; /* Maximum height of 80% of the viewport height */
          overflow-y: auto; /* Enable vertical scrolling if content exceeds max-height */
          border-radius: 8px;
          position: relative;
        }
        .popup-content::-webkit-scrollbar {
          display: none; /* Hide scrollbar line for WebKit-based browsers */
        }
      `}</style>
    </>
  );
};

export default Sidebar;
