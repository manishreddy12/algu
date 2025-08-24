import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';

import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';



const OjLayout = () => {
  const { pcode } = useParams(); // ✅ Get pcode from URL
  const [problem, setProblem] = useState(null);
  const [activeTab, setActiveTab] = useState('code');
  const [leftWidth, setLeftWidth] = useState('50%');
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const [code, setCode] = useState('');
  const [inp, setInp] = useState('');
  const [output, setOutput] = useState('');
  const [aiReview, setAireview] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [dateTime, setDateTime] = useState('');
  const [statusRes, setStatusres] = useState('false');

  const getLanguageExtension = (language) => {
    switch (language) {
      case 'cpp':
        return cpp();
      case 'py':
        return python();
      case 'js':
      default:
        return javascript();
    }
  };

  useEffect(() => {
    const loadProblem = async () => {
      try {
        // const response = await axios.get(`http://localhost:4000/readProblem/${pcode}`);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/readProblem/${pcode}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log("Fetched data is", response.data.problem);
        setProblem(response.data.problem);
      } catch (err) {
        console.error("Error occurred", err);
      }
    };
    loadProblem();
  }, [pcode]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(`${newLeftWidth}%`);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleSubmit = async () => {

    // setOutput("Running test cases...\n\nTest case 1: Passed\nInput: [2,7,11,15], 9\nOutput: [0,1]\nExpected: [0,1]");
    try {
      const responseRun = await axios.post(`${import.meta.env.VITE_COMPILER_URL}/submit`, {
        language: language,
        code: code,
        pcode: pcode
      },
        {
          headers: {
            'Content-Type': 'application/json' // VERY important
          }
        });
      // console.log("Requested to run code" + code + language);
      setOutput(responseRun.data);
      // console.log("response is " + responseRun.data.success + responseRun.data.output);
      setOutput(responseRun.data.output);
      updateStatus();
    }
    catch (err) {
      console.log("Error" + err);
    }
  };

 useEffect(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    setDateTime(`${timeStr}, ${dateStr}`);
  }, [output]);
  // const customTimeFormat = () => {

  //   // return <div>{dateTime}</div>;
  // };


  const updateStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const new_res = statusRes;
      console.log("update statis : "+dateTime+new_res);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/updatestatus`, {
        "usertoken": token,
        "pcode": pcode,
        "subTime": dateTime,
        "subResult": new_res
      });
    }
    catch(err){
      console.log("error while updating status"+err);
    }
  };



  const handleRun = async () => {

    // setOutput("Running test cases...\n\nTest case 1: Passed\nInput: [2,7,11,15], 9\nOutput: [0,1]\nExpected: [0,1]");
    try {
      const responseRun = await axios.post(`${import.meta.env.VITE_COMPILER_URL}/run`, {
        language: language,
        code: code,
        input: inp
      },
        {
          headers: {
            'Content-Type': 'application/json' // VERY important
          }
        });
      // console.log("Requested to run code" + code + language + inp);
      setOutput(responseRun.data);
      // console.log("response is " + responseRun.data.success + responseRun.data.output);
      setOutput(responseRun.data.output);
    }
    catch (err) {
      console.log("Error" + err);
    }
  };

  const handleReview = async () => {
    try {
      const responseRun = await axios.post(`${import.meta.env.VITE_COMPILER_URL}/ai-review`, {
        code: code
      },);
      // console.log("Requested AI review" + code);
      setAireview(responseRun.data);
      console.log("response is " + responseRun);
      // setOutput(responseRun.data.output);
    }
    catch (err) {
      console.log("Error" + err);
    }
  }
  if (!problem) {
    return <div className="p-4 text-gray-600">Loading problem...</div>;
  }

  return (
    <div ref={containerRef} className="flex h-screen w-full overflow-hidden relative">
      {/* Problem Panel (Left) */}
      <div className="h-full overflow-auto p-4 bg-white" style={{ width: leftWidth }}>
        <h1 className="text-2xl font-bold mb-2">{problem.pname || "Untitled Problem"}</h1>
        <span className={`inline-block px-2 py-1 text-xs rounded-md mb-4 ${problem.pdifficulty === 'Easy' ? 'bg-green-100 text-green-800' :
          problem.pdifficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
          {problem.pdifficulty || "Difficulty Not Set"}
        </span>

        <div className="prose max-w-none">
          <p className="mb-4">{problem.statement || "No description available."}</p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Example:</h3>
          <div className="bg-gray-50 p-4 rounded-md my-2">
            {problem.examples && problem.examples.length > 0 ? (
              <>
                <p className="font-medium">Example 1:</p>
                <p>Input: <code>{problem.examples[0].input}</code></p>
                <p>Output: <code>{problem.examples[0].expectedOutput}</code></p>
                {/* <p>Explanation: {problem.examples[0].explanation}</p> */}
              </>
            ) : (
              <p>No examples provided.</p>
            )}
          </div>
        </div>
      </div>

      {/* Resizable Splitter */}
      <div className="w-1 bg-gray-200 hover:bg-blue-500 cursor-col-resize" onMouseDown={handleMouseDown} />

      {/* Code/Verdict Panel (Right) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden" style={{ width: `calc(100% - ${leftWidth} - 4px)` }}>
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'code' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'verdict' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('verdict')}
          >
            Verdict
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'code' ? (
            <div className="h-full flex flex-col">
              <div className="p-2 border-b border-gray-200 bg-gray-50">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="cpp">C++</option>
                  <option value="py">Python</option>
                  <option value="js">JavaScript</option>
                </select>

                <button
                  onClick={handleSubmit}
                  className="ml-2 px-4 py-1 bg-blue-500 text-white text-sm rounded"
                >
                  Submit
                </button>
                <button
                  onClick={handleRun}
                  className="ml-2 px-4 py-1 bg-blue-500 text-white text-sm rounded"
                >
                  Run
                </button>
              </div>

              
              <div className="flex-1 overflow-auto rounded-md border min-h-0">
                <CodeMirror
                  value={code}
                  height="100%" // Set CodeMirror's height to fill the container
                  extensions={[getLanguageExtension(language)]}
                  onChange={setCode}
                  placeholder={`Write your ${language.toUpperCase()} code here...`}
                />
              </div>

            </div>
          ) : (
            // <div className="h-full p-4 overflow-auto bg-gray-50 font-mono text-sm whitespace-pre">
            //   <div>
            //     <h3>Enter your Input here</h3>
            //     <textarea
            //     value={inp}
            //     onChange={(e) => setInp(e.target.value)}
            //     className="flex-1 w-full h-auto p-4 font-mono text-sm outline-none resize-none"
            //     placeholder="Enter your input here..."
            //   />
            //   <div className="m-2">{output || "Run your code to see the verdict"}</div>
            //   </div>
            // </div>
            <div className="h-full p-4 overflow-auto bg-gray-50 font-mono text-sm space-y-4">
              <h3 className="text-base font-semibold text-gray-700">Code Execution</h3>
              <div className="flex space-x-2">
                <div><button
                  onClick={handleRun}
                  className="ml-2 px-4 py-1 bg-blue-500 text-white text-sm rounded"
                >
                  Run
                </button></div>
                <button
                  onClick={handleSubmit}
                  className="ml-2 px-4 py-1 bg-blue-500 text-white text-sm rounded"
                >
                  Submit
                </button>
                <div><button
                  onClick={handleReview}
                  className="ml-2 px-4 py-1 bg-blue-500 text-white text-sm rounded"
                >
                  AI Review
                </button></div>
              </div>
              {/* Input Section */}
              <div className="space-y-2">
                <label htmlFor="inputArea" className="text-gray-600 font-medium">Input</label>
                <textarea
                  id="inputArea"
                  value={inp}
                  onChange={(e) => setInp(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter custom input..."
                />
              </div>

              {/* Output Section */}
              <div className="space-y-2">
                <label className="text-gray-600 font-medium">Output</label>
                <div className="w-full min-h-[100px] max-h-48 overflow-auto bg-white border border-gray-300 rounded-lg p-3 whitespace-pre-wrap">
                  {output ? output : "Run your code to see the verdict"}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-600 font-medium">AI Review</label>
                <div className="w-full min-h-[100px] max-h-48 overflow-auto bg-white border border-gray-300 rounded-lg p-3 whitespace-pre-wrap">
                  {aiReview ? aiReview : "Run your code to see the verdict"}
                </div>
              </div>
            </div>

          )}
        </div>
      </div>
    </div>
  );
};

export default OjLayout;
