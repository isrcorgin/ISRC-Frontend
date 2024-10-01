"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";

const YOUTUBE_API_KEY = "AIzaSyD9udESHNgOF-sNvasi4hc3etuaOKy8t3E"; // Replace with your API key

interface VideoDetail {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  publishedAt: string;
  tags: string[];
}

interface VideoDetailPageProps {
  params: {
    id: string;
  };
}

const socialMediaMap: Record<string, { label: string, color: string }> = {
  'instagram.com': { label: 'Instagram', color: '#E4405F' },
  'facebook.com': { label: 'Facebook', color: '#4267B2' },
  'linkedin.com': { label: 'LinkedIn', color: '#0077b5' },
  'isrc.org.in': { label: 'ISRC', color: '#ff6600' },
};

const VideoDetailPage: React.FC<VideoDetailPageProps> = ({ params }) => {
  const { id } = params;
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchVideoDetail = async () => {
      const url = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${id}&part=snippet,contentDetails,statistics`;

      try {
        const response = await axios.get(url);
        const videoData = response.data.items[0].snippet;

        const videoDetail = {
          id: response.data.items[0].id,
          title: videoData.title,
          thumbnail: videoData.thumbnails.high.url,
          description: videoData.description,
          publishedAt: videoData.publishedAt,
          tags: videoData.tags || [],
        };

        setVideo(videoDetail);
      } catch (error) {
        console.error("Error fetching video details", error);
      }
    };

    fetchVideoDetail();
  }, [id]);

  const renderDescriptionWithLinks = (description: string) => {
    const urlRegex = /(\bhttps?:\/\/\S+\b)/g;
    const parts = description.split(urlRegex);
    return parts.map((part, index) => {
      const matchedSocialMedia = Object.keys(socialMediaMap).find(key => part.includes(key));

      if (urlRegex.test(part) && matchedSocialMedia) {
        const { label, color } = socialMediaMap[matchedSocialMedia];

        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color, textDecoration: "none", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", backgroundColor: "#f0f0f0", display: "inline-block", margin: "0.25rem" }}
          >
            {label}
          </a>
        );
      }
      return part;
    });
  };

  if (!video) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle="ISRC Video"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="ISRC Video"
        bgImg="/images/main-bg2.webp"
      />
      <div className="container mt-5">
        <div className="card mb-5 shadow-lg" style={{ maxWidth: "800px", margin: "auto" }}>
          <div
            className="card-img-top position-relative"
            onClick={() => setShowVideo(true)}
            style={{ cursor: "pointer", position: 'relative' }}
          >
            {showVideo ? (
              <iframe
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${video.id}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={800}
                  height={450}
                  className="rounded"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  className="position-absolute top-50 start-50 translate-middle"
                  style={{
                    fontSize: "4rem",
                    color: "#FF2D55", // Pink color for play icon
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  ▶
                </div>
              </>
            )}
          </div>
          <div className="card-body">
            <h2 className="card-title" style={{ fontSize: "2rem", fontWeight: "bold", color: "#333", marginBottom: "1rem" }}>
              {video.title}
            </h2>
            <p className="card-text" style={{ color: "#666", marginBottom: "1rem" }}>
              {renderDescriptionWithLinks(video.description)}
            </p>
            <p className="card-text mb-4">
              <small className="text-muted">Published on: {new Date(video.publishedAt).toLocaleDateString()}</small>
            </p>
            {video.tags.length > 0 && (
              <div className="mb-4">
                <h5 style={{ fontWeight: "bold", color: "#FF2D55", marginBottom: "0.5rem" }}>Tags:</h5>
                <ul className="list-inline">
                  {video.tags.map((tag, index) => (
                    <li
                      key={index}
                      className="list-inline-item badge bg-pink me-2"
                      style={{ fontSize: "1rem", backgroundColor: "#FF2D55", color: "#fff", padding: "0.5rem 1rem", borderRadius: "0.25rem", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", transition: "background-color 0.3s" }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="card-footer text-muted mt-4" style={{ borderTop: "1px solid #ddd", paddingTop: "1rem" }}>
              <p className="mb-0">For more details and updates, subscribe to our <a href="/newsletter" className="text-pink">newsletter</a> or follow us on <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-pink">Twitter</a>.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .bg-pink {
          background-color: #FF2D55;
          color: white;
          margin:3px;
        }
        .text-pink {
          color: #FF2D55;
        }
        .text-pink:hover {
          text-decoration: underline;
        }
        .btn-pink {
          background-color: #FF2D55;
          color: white;
          border: none;
        }
        .btn-pink:hover {
          background-color: #E6007E;
          color: white;
        }
        .card:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .card-img-top:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
};

export default VideoDetailPage;
