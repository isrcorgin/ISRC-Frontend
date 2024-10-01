'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface RawDataItem {
  gradeLevel: string;
  topic: string;
  image: string;
}

const EventListTable: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const rawData: RawDataItem[] = [
    { gradeLevel: '10-14 years', topic: 'Robo Track', image: '/img/topic/path2.jpg' },
    { gradeLevel: '10-14 years', topic: 'Water Boat', image: '/img/topic/boat.jpg' },
    { gradeLevel: '10-14 years', topic: 'Innovation', image: '/img/ino/innovation.jpeg' },
    { gradeLevel: '15-18 years', topic: 'Robo Track', image: '/img/topic/path2.webp' },
    { gradeLevel: '15-18 years', topic: 'Maze Solver', image: '/img/topic/maze.png' },
    { gradeLevel: '15-18 years', topic: 'Water Boat', image: '/img/topic/boat.jpg' },
    { gradeLevel: '15-18 years', topic: 'Innovation', image: '/img/ino/innovation.jpeg' },
    { gradeLevel: '19-22 years', topic: 'Robo Track', image: '/img/topic/path3.avif' },
    { gradeLevel: '19-22 years', topic: 'Line Following', image: '/img/topic/line.jpg' },
    { gradeLevel: '19-22 years', topic: 'Drone', image: '/img/topic/drone.webp' },
    { gradeLevel: '19-22 years', topic: 'Maze Solver', image: '/img/topic/maze.png' },
    { gradeLevel: '19-22 years', topic: 'Innovation', image: '/img/ino/innovation.jpeg' },
  ];

  // Type for groupedData
  interface GroupedData {
    [key: string]: RawDataItem[];
  }

  const groupedData: GroupedData = rawData.reduce((acc: GroupedData, item) => {
    if (!acc[item.gradeLevel]) {
      acc[item.gradeLevel] = [];
    }
    acc[item.gradeLevel].push(item);
    return acc;
  }, {});

  const handleMouseEnter = (image: string) => {
    setPreviewImage(image);
  };

  const handleMouseLeave = () => {
    setPreviewImage(null);
  };

  return (
    <div className="tableContainer">
      <h2 className="heading">Event List</h2>
      <div className="previewArea">
        {previewImage && (
          <div className="preview">
            <Image height={200} width={200} src={previewImage} alt="Preview" />
          </div>
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Age Group</th>
            <th>Competition Topics</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((gradeLevel, gradeIndex) => (
            groupedData[gradeLevel].map((item, topicIndex) => (
              <tr key={`${gradeIndex}-${topicIndex}`}>
                {topicIndex === 0 && (
                  <td
                    rowSpan={groupedData[gradeLevel].length}
                    className="gradeLevelCell"
                  >
                    {gradeLevel}
                  </td>
                )}
                <td
                  className="topicCell"
                  onMouseEnter={() => handleMouseEnter(item.image)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.topic}
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .tableContainer {
          margin-top: 50px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        .heading {
          color: #FFFFFF;
          font-weight: 700;
          text-align: center;
          margin-bottom: 30px;
          background-color: #FF2D55;
          padding: 15px;
          border-radius: 8px;
        }
        .previewArea {
          position: absolute;
          top: 70px; /* Adjust this value to position the preview area correctly */
          left: 0;
          width: 100%;
          text-align: center;
          pointer-events: none; /* Allow clicks through the preview */
          z-index: 10; /* Ensure preview is on top */
        }
        .preview {
          display: inline-block;
          background: white;
          border: 1px solid #ddd;
          padding: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          max-width: 300px;
          z-index: 10;
        }
        .preview img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 60px; /* Ensure space for preview area */
        }
        .table th, .table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        .table th {
          background-color: #0D1028;
          color: white;
        }
        .table tr:nth-child(even) {
          background-color: #f4f4f4;
        }
        .table tr:hover {
          background-color: #e1e1e1;
        }
        .gradeLevelCell {
          background-color: #f4f4f4;
          vertical-align: middle;
          text-align: center;
          font-weight: 600;
        }
        .topicCell {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default EventListTable;
