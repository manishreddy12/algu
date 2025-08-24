import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from './Header';

const SubmissionTable = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/submissions`, {
          usertoken: localStorage.getItem('token')
        });
        // Assuming your data is inside `data` key of response
        setSubmissions(response.data.data || response.data);
      } catch (err) {
        console.log('Error fetching submissions', err);
      }
    };
    fetchSubmissions();
  }, []);

  // Format submissionTime for display
  const formatSubmissionTime = (time) => {
    // Check if time matches your formatted pattern "HH:mm, DD Month YYYY"
    const formattedPattern = /^\d{2}:\d{2}, \d{1,2} [A-Za-z]+ \d{4}$/;
    if (typeof time === 'string' && formattedPattern.test(time)) {
      return time; // Already formatted
    }
    // Otherwise parse and format
    const dateObj = new Date(time);
    if (isNaN(dateObj)) return time; // fallback if invalid date
    return dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ', ' +
      dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <>

      <Header></Header>
      <div className="overflow-x-auto m-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Problem Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submission Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Result
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.map((submission) => {
              const isSuccess = submission.result === "true" || submission.result === true;
              return (
                <tr key={submission._id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {submission.pCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {formatSubmissionTime(submission.submissionTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">
                    <span className={`px-2 inline-flex text-xs leading-5 rounded-full ${isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                      {isSuccess ? "Success" : "Failed"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SubmissionTable;
