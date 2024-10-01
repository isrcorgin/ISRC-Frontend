"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/components/Blog/data/blogPosts';
import { useState } from 'react';

import Navbar from '@/components/Layouts/Navbar';
import Footer from '@/components/Layouts/Footer';
import PageBanner from '@/components/Common/PageBanner';

interface BlogPost {
  id: number;
  imageSrc: string;
  altText: string;
  link: string;
  tag: string;
  date: string;
  title: string;
  content: string; // Ensure content is a string
}

interface Props {
  params: {
    id: string;
  };
}

const PostPage = ({ params }: Props) => {
  const postId = parseInt(params.id, 10);
  const post = blogPosts.find(post => post.id === postId);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [showPopup, setShowPopup] = useState<null | BlogPost>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results.slice(0, 6)); // Limit to 6 posts
  };

  const handlePostClick = (post: BlogPost) => {
    setShowPopup(post);
  };

  const handlePopupClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPopup(null);
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Function to get three random posts
  const getRandomPosts = (currentPost: BlogPost) => {
    if (!currentPost) return [];
    
    // Filter out the current post
    const otherPosts = blogPosts.filter(post => post.id !== currentPost.id);
    
    // Shuffle and select 3 random posts
    const shuffledPosts = otherPosts.sort(() => 0.5 - Math.random());
    return shuffledPosts.slice(0, 3);
  };

  if (!post) {
    notFound(); // Redirects to the 404 page if post not found
    return null; // Optional, as notFound() will handle the response
  }

  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle="Blog"
        shortText=""
        homePageUrl="/"
        homePageText="ISRC Blog"
        activePageText="Blog Post"
        bgImg="/images/main-bg2.webp"
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <button
              className="btn btn-primary mb-4"
              onClick={() => window.history.back()}
            >
              <i className="icofont-arrow-left"></i> Back
            </button>
            <div className="card shadow-lg border-0 rounded-lg overflow-hidden mb-4">
              <Image
                src={post.imageSrc}
                alt={post.altText}
                width={800}
                height={450}
                className="card-img-top"
                style={{ borderRadius: "0.5rem" }}
              />
              <div className="card-body">
                <span className="date d-block mb-3 text-muted">{post.date}</span>
                <h1 className="card-title mb-4">{post.title}</h1>
                <div
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="widget widget_search mb-4">
              <form onSubmit={handleSearch} className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn btn-primary ms-2">
                  <i className="icofont-search"></i>
                </button>
              </form>
            </div>
            <div className="widget widget_recent_entries mb-4">
              <h3 className="widget-title">Latest Posts</h3>
              <ul className="list-unstyled">
                {filteredPosts.slice(0, 6).map(post => (
                  <li key={post.id} className="mb-3">
                    <Link href={`/post/${post.id}`} className="text-decoration-none text-dark d-flex align-items-center">
                      <div className="me-3">
                        <Image
                          src={post.imageSrc}
                          alt={post.altText}
                          width={120}
                          height={90}
                          className="img-fluid rounded"
                        />
                      </div>
                      <div>
                        <h5 className="mb-1">{post.title}</h5>
                        <p className="date mb-0 text-muted">{post.date}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
       
            <div className="widget widget_related_posts">
              <h3 className="widget-title">Related Posts</h3>
              <ul className="list-unstyled">
                {getRandomPosts(post).map(post => (
                  <li key={post.id} className="mb-3">
                    <Link href={`/post/${post.id}`} className="text-decoration-none text-dark d-flex align-items-center">
                      <div className="me-3">
                        <Image
                          src={post.imageSrc}
                          alt={post.altText}
                          width={120}
                          height={90}
                          className="img-fluid rounded"
                        />
                      </div>
                      <div>
                        <h5 className="mb-1">{post.title}</h5>
                        <p className="date mb-0 text-muted">{post.date}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {showPopup && (
          <div className="popup" onClick={handlePopupClose}>
            <div className="popup-content" onClick={handlePopupClick}>
              <h2 className="popup-title">{showPopup.title}</h2>
              <Image
                src={showPopup.imageSrc}
                alt={showPopup.altText}
                width={800}
                height={550}
                className="popup-image"
              />
              <div
                className="popup-text"
                dangerouslySetInnerHTML={{ __html: showPopup.content }}
              />
              <button className="btn btn-secondary" onClick={handlePopupClose}>
                Close
              </button>
            </div>
          </div>
        )}

        <style jsx>{`
          .card {
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 0.5rem;
            overflow: hidden;
          }
          .card-img-top {
            border-bottom: 1px solid #e0e0e0;
          }
          .card-title {
            font-size: 2.5rem;
            font-weight: bold;
            color: #333333;
          }
          .card-text {
            font-size: 1.125rem;
            line-height: 1.6;
            color: #555555;
          }
          .btn-primary {
            background-color: #007bff;
            border: none;
            border-radius: 0.3rem;
            transition: background-color 0.3s;
          }
          .btn-primary:hover {
            background-color: #0056b3;
          }
          .btn-secondary {
            background-color: #6c757d;
            border: none;
            border-radius: 0.3rem;
            transition: background-color 0.3s;
          }
          .btn-secondary:hover {
            background-color: #5a6268;
          }
          .date {
            font-size: 1rem;
            color: #6c757d;
          }
          .widget-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }
          .widget_recent_entries img {
            width: 100%;
            height: auto;
          }
          .tagcloud {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .tagcloud a {
            display: inline-block;
            padding: 0.5rem 1rem;
            margin: 0.2rem;
            background: #f1f1f1;
            border-radius: 1.5rem;
            color: #333;
            text-decoration: none;
            font-size: 0.875rem;
            transition: background 0.3s, color 0.3s;
          }
          .tagcloud a:hover {
            background: #007bff;
            color: #fff;
          }
          .popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }
          .popup-content {
            background: #ffffff;
            border-radius: 0.5rem;
            padding: 2rem;
            max-width: 80%;
            max-height: 80%;
            overflow-y: auto;
            position: relative;
          }
          .popup-title {
            font-size: 1.75rem;
            margin-bottom: 1rem;
          }
          .popup-image {
            border-radius: 0.5rem;
            max-width: 100%;
            height: auto;
          }
          .popup-text {
            font-size: 1rem;
            line-height: 1.6;
            color: #555555;
          }
          .popup-close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: #6c757d;
            color: #ffffff;
            border: none;
            border-radius: 0.3rem;
            padding: 0.5rem 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .popup-close-btn:hover {
            background-color: #5a6268;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default PostPage;
