"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyBxTXH_hPw4BGenl6EsbvnRJIQC5_5cWBQ"; // Replace with your API key
const CHANNEL_ID = "UCuFZ9HpUqvVsoqptmKA5Dig"; // Your channel ID
const MAX_RESULTS = 50; // Number of videos to fetch
const INITIAL_VIDEOS_PER_PAGE = 12; // Number of videos to show on the first page
const VIDEOS_PER_PAGE = 9; // Number of videos to show per page from the second page

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  publishedAt: string;
  tags: string[];
}

const Ytvideo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [latestVideos, setLatestVideos] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<{ id: string; title: string }[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const fetchYouTubeVideos = async () => {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;

    try {
      const response = await axios.get(url);
      const fetchedVideos = response.data.items.map((item: any) => ({
        id: item.id.videoId || '', // Ensure id is always defined
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        tags: item.snippet.tags || [],
      }));

      setVideos(fetchedVideos);
      setFilteredVideos(fetchedVideos);
      setLatestVideos(fetchedVideos.slice(0, 8)); // Get the latest 8 videos for the sidebar
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching YouTube videos:", error.response?.data);
        console.error("Status code:", error.response?.status);
      } else if (error instanceof Error) {
        console.error("Error fetching YouTube videos:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  const fetchYouTubePlaylists = async () => {
    const url = `https://www.googleapis.com/youtube/v3/playlists?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&maxResults=50`;

    try {
      const response = await axios.get(url);
      const fetchedPlaylists = response.data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
      }));
      setPlaylists(fetchedPlaylists);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching YouTube playlists:", error.response?.data);
        console.error("Status code:", error.response?.status);
      } else if (error instanceof Error) {
        console.error("Error fetching YouTube playlists:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  const fetchPlaylistVideos = async (playlistId: string) => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${playlistId}&part=snippet&maxResults=${MAX_RESULTS}`;

    try {
      const response = await axios.get(url);
      const fetchedVideos = response.data.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        tags: [], // No tags available in playlist items response
      }));
      setVideos(fetchedVideos);
      setFilteredVideos(fetchedVideos);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching playlist videos:", error.response?.data);
        console.error("Status code:", error.response?.status);
      } else if (error instanceof Error) {
        console.error("Error fetching playlist videos:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchYouTubeVideos();
    fetchYouTubePlaylists();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = videos.filter(video =>
      video.title.toLowerCase().includes(term)
    );
    setFilteredVideos(filtered);
    setCurrentPage(1);
  };

  const handleTabChange = (playlistId: string) => {
    setSelectedPlaylist(playlistId);
    fetchPlaylistVideos(playlistId);
  };

  const totalPages = Math.ceil((filteredVideos.length - (currentPage === 1 ? 0 : INITIAL_VIDEOS_PER_PAGE)) / VIDEOS_PER_PAGE) + (currentPage === 1 ? 1 : 0);
  
  const startIndex = currentPage === 1 ? 0 : (currentPage - 2) * VIDEOS_PER_PAGE + INITIAL_VIDEOS_PER_PAGE;
  const currentPosts = currentPage === 1 
    ? filteredVideos.slice(0, INITIAL_VIDEOS_PER_PAGE) 
    : filteredVideos.slice(startIndex, startIndex + VIDEOS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="main-content">
        <div className="container">
          <div className="tabs">
            <ul className="nav">
              <li className="nav-item">
                <button
                  className={`nav-link ${selectedPlaylist === null ? "active" : ""}`}
                  onClick={() => {
                    setSelectedPlaylist(null);
                    fetchYouTubeVideos(); // Fetch all videos if no playlist is selected
                  }}
                >
                  All Videos
                </button>
              </li>
              {playlists.map(playlist => (
                <li key={playlist.id} className="nav-item">
                  <button
                    className={`nav-link ${selectedPlaylist === playlist.id ? "active" : ""}`}
                    onClick={() => handleTabChange(playlist.id)}
                  >
                    {playlist.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="search-bar">
            <form onSubmit={(e) => e.preventDefault()} className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Search Videos..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button type="submit" className="search-button">
                <i className="icofont-search"></i>
              </button>
            </form>
          </div>
          
          <div className="video-grid">
            <div className="row">
              {currentPosts.map((video) => (
                video.id ? (
                  <div key={video.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="card">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        className="card-img-top"
                        width={400}
                        height={225}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{video.title}</h5>
                        <p className="card-text">{video.description}</p>
                        <a
                          href={`https://www.youtube.com/watch?v=${video.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          Watch Video
                        </a>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
            <div className="row">
              <div className="col-12">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          
          <div className="latest-posts">
            <h2 className="widget-title">Latest Videos</h2>
            <div className="row">
              {latestVideos.map((video) => (
                video.id ? (
                  <div key={video.id} className="col-lg-3 col-md-4 mb-4">
                    <div className="latest-video-card">
                      <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="latest-video-link">
                        <div className="latest-video-thumbnail">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            layout="responsive"
                            width={150}
                            height={100}
                          />
                        </div>
                        <h5>{video.title.length > 15 ? `${video.title.substring(0, 15)}...` : video.title}</h5>
                        <p className="date">{new Date(video.publishedAt).toLocaleDateString()}</p>
                      </a>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-content {
          margin: 0 auto;
          padding: 20px;
          max-width: 1200px;
        }
        .tabs {
          margin-bottom: 20px;
        }
        .nav {
          display: flex;
          border-bottom: 2px solid #ddd;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .nav-item {
          margin-right: 10px;
        }
        .nav-link {
          display: block;
          padding: 10px 20px;
          margin: 0;
          border: 1px solid transparent;
          border-radius: 4px;
          color: #333;
          background-color: #f8f9fa;
          text-align: center;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
        }
        .nav-link.active {
          background-color: #FF2D55;
          color: white;
          border-color: #FF2D55;
        }
        .nav-link:hover {
          background-color: #FF2D55;
          color: white;
        }
        .search-bar {
          margin-bottom: 20px;
          text-align: center;
        }
        .form-control {
          width: calc(100% - 100px);
          display: inline-block;
          margin-right: -4px;
        }
        .search-button {
          background: #FF2D55;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 1rem;
        }
        .search-button i {
          font-size: 1rem;
        }
        .video-grid {
          margin-bottom: 30px;
        }
        .card {
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .card-img-top {
          width: 100%;
          height: 225px;
          object-fit: cover;
        }
        .card-body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 15px;
          height: auto;
        }
        .card-title {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .card-text {
          font-size: 0.9rem;
          color: #333;
          margin-bottom: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .latest-posts {
          margin-top: 40px;
        }
        .latest-posts .widget-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
          font-weight: bold;
        }
        .latest-video-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          padding: 10px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .latest-video-card:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .latest-video-link {
          text-decoration: none;
          color: inherit;
        }
        .latest-video-thumbnail {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .latest-video-card h5 {
          font-size: 0.9rem;
          margin: 5px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          text-align: center;
        }
        .latest-video-card p.date {
          font-size: 0.75rem;
          color: #999;
          text-align: center;
        }
        .pagination .page-link {
          background: #FF2D55; /* Pink background */
          color: white;
          border: none;
        }
        .pagination .page-item.active .page-link {
          background: #E6007E; /* Darker pink background */
          border-color: #E6007E;
        }
        .pagination .page-item.disabled .page-link {
          background: #e9ecef;
          color: #6c757d;
        }

        /* Responsive Design */
        @media (max-width: 767px) {
          .card-img-top {
            height: 180px;
          }
          .card-body {
            height: auto; /* Remove fixed height on smaller screens */
          }
          .main-content {
            padding: 10px;
          }
          .search-bar {
            margin-bottom: 15px;
          }
          .latest-posts {
            margin-top: 20px;
          }
          .latest-video-card {
            flex-direction: column;
            align-items: center;
            padding: 5px;
          }
          .latest-video-thumbnail {
            height: auto;
            max-width: 100%;
          }
          .latest-video-card h5 {
            font-size: 0.8rem;
            margin: 5px 0;
          }
        }
      `}</style>
    </>
  );
};

export default Ytvideo;
