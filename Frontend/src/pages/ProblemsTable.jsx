import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const ProblemsTable = () => {
  // const problems = [
  //   { name: "Two Sum", pdifficulty: "Easy", solved: true },
  //   { name: "Add Two Numbers", pdifficulty: "Medium", solved: false },
  //   { name: "Longest Substring Without Repeating Characters", pdifficulty: "Medium", solved: true },
  //   { name: "Median of Two Sorted Arrays", pdifficulty: "Hard", solved: false },
  //   { name: "Palindrome Number", pdifficulty: "Easy", solved: true },
  //   { name: "Reverse Integer", pdifficulty: "Medium", solved: false },
  //   { name: "String to Integer (atoi)", pdifficulty: "Medium", solved: true },
  //   { name: "Container With Most Water", pdifficulty: "Medium", solved: false },
  //   { name: "3Sum", pdifficulty: "Medium", solved: true },
  //   { name: "Regular Expression Matching", pdifficulty: "Hard", solved: false },
  // ];
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);  // ✅ correct

  useEffect(() => {
    const handleProblems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/problems');
        console.log("Fetched data is " + response.data);
        setProblems(response.data);
      }
      catch (err) {
        console.log("Error fetching problems", err);
      }
    };
    handleProblems();
  }, []
  )

  const getProblem=(pcode) => {
    navigate(`/problem/${pcode}`)
  }

  return (
    <div className="overflow-x-auto m-10">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                Problem Name
                <svg className="w-4 h-4 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                </svg>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                pDifficulty
                <svg className="w-4 h-4 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                </svg>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                Pcode
                <svg className="w-4 h-4 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {problems.map((problem, index) => (
            <tr onClick={()=>getProblem(problem.pcode)} key={index}>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                {problem.pname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${problem.pdifficulty === "Easy" ? "bg-green-100 text-green-800" :
                    problem.pdifficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"}`}>
                  {problem.pdifficulty}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                {problem.pcode}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap">
                {problem.solved ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Solved
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    Unsolved
                  </span>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemsTable;