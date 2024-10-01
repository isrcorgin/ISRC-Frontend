import React from 'react';

const competitionData = [
  { grade: '5th to 8th', topics: ['Path Following', 'Water Boat'] },
  { grade: '9th to 12th', topics: ['Path Following', 'Maze Solver'] },
  { grade: '1st Year Onward', topics: ['Path Following', 'Line Following', 'Drone'] },
];

const CompetitionTable = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Grade Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Competition Topics</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {competitionData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <ul>
                    {item.topics.map((topic, idx) => (
                      <li key={idx}>{topic}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompetitionTable;
