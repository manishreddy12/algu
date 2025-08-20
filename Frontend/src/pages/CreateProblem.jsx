import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const CreateProblem = () => {
    const [pname, setPname] = useState('');
    const [pcode, setPcode] = useState('');
    const [pstatement, setpstatement] = useState('');
    const [pdifficulty, setPdifficulty] = useState('');
    const [newExampleText, setNewExampleText] = useState('{"input": "3 4", "expectedOutput": "-1", "isSample": true}');
    const [examples, setExamples] = useState([]);

    const navigate = useNavigate();

    const checkUser = () => {
        const role = localStorage.getItem('role');
        if (role === 'user') {
            alert('You are unauthorized!');
            navigate(-1); // Navigates to the previous page
        }
    };

    useEffect(() => {
        checkUser();
    }, []); // Call checkUser when component mounts

    const addExamples = () => {
        try {
            const newItem = JSON.parse(newExampleText);
            setExamples(prev => [...prev, newItem]);
            setNewExampleText(''); // optional: clear textarea after adding
        } catch (error) {
            alert("Invalid JSON format");
        }
    };

    // const token = localStorage.getItem('token');
    // axios.post('', {
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //     }
    // })
    //     .then(response => console.log(response.data))
    //     .catch(error => console.error(error));

    // const handleSubmit = async () => {
    //     try {
    //         const responseRun = await axios.post("http://localhost:4000/createProblem", {
    //             pname: pname,
    //             pcode: pcode,
    //             pstatement: pstatement,
    //             pdifficulty: pdifficulty,
    //             examples: examples
    //         },);
    //         console.log("response is " + responseRun);
    //     }
    //     catch (err) {
    //         console.log("Error" + err);
    //     }
    // };

    const token = localStorage.getItem('token');
    // axios.post('http://localhost:4000/your-endpoint', null, {
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //     }
    // })
    //     .then(response => console.log(response.data))
    //     .catch(error => console.error(error));

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const responseRun = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/createProblem`,
                { pname, pcode, pstatement, pdifficulty, examples },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );
            console.log("response is", responseRun.data);
            alert(responseRun.data.message);
        } catch (err) {
            console.log("Error", err);
        }
    };


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className='flex-1 p-4'>
                <div className="my-6">
                    <label className="block mb-1 font-semibold text-gray-700" htmlFor="pcode-textarea">
                        Problem Name
                    </label>
                    <textarea
                        id="pcode-textarea"
                        value={pname}
                        onChange={(e) => setPname(e.target.value)}
                        className="flex-1 w-full p-4 font-mono text-sm outline-none resize-none border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
                        placeholder="Enter your code here..."
                        rows={2}
                    />
                </div>
                <div className="my-6">
                    <label className="block mb-1 font-semibold text-gray-700" htmlFor="pcode-textarea">
                        Problem Code
                    </label>
                    <textarea
                        id="pcode-textarea"
                        value={pcode}
                        onChange={(e) => setPcode(e.target.value)}
                        className="flex-1 w-full p-4 font-mono text-sm outline-none resize-none border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
                        placeholder="Enter your code here..."
                        rows={2}
                    />
                </div>

                <div className="my-6">
                    <label className="block mb-1 font-semibold text-gray-700" htmlFor="pstatement-textarea">
                        Problem Statement
                    </label>
                    <textarea
                        id="pstatement-textarea"
                        value={pstatement}
                        onChange={(e) => setpstatement(e.target.value)}
                        className="flex-1 w-full p-4 font-mono text-sm outline-none resize-none border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
                        placeholder="Enter the problem statement here..."
                        rows={6}
                    />
                </div>
                <div className="my-6">
                    <label className="block mb-1 font-semibold text-gray-700" htmlFor="pstatement-textarea">
                        Problem Difficulty
                    </label>
                    <textarea
                        id="pstatement-textarea"
                        value={pdifficulty}
                        onChange={(e) => setPdifficulty(e.target.value)}
                        className="flex-1 w-full p-4 font-mono text-sm outline-none resize-none border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
                        placeholder="Enter the problem statement here..."
                        rows={6}
                    />
                </div>


                <div className="my-6">
                    <label htmlFor="new-example-textarea" className="block mb-1 font-semibold text-gray-700">
                        Add new Example (JSON format)
                    </label>
                    <textarea
                        id="new-example-textarea"
                        value={newExampleText}
                        onChange={(e) => setNewExampleText(e.target.value)}
                        placeholder='Enter example in JSON, e.g. {"input": "3 4", "expectedOutput": "-1", "isSample": true}'
                        rows={4}
                        className="flex-1 w-full p-4 font-mono text-sm outline-none resize-none border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
                    />
                </div>

                <button onClick={addExamples} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Add example
                </button>

                <div className="my-6">
                    <label htmlFor="examples-list" className="block mb-1 font-semibold text-gray-700">
                        All Examples
                    </label>
                    <ul id="examples-list" className="list-disc ml-6">
                        {examples.length === 0 && <li>No examples added yet.</li>}
                        {examples.map((ex, idx) => (
                            <li key={idx}>
                                Input: <code>{ex.input}</code>, Expected Output: <code>{ex.expectedOutput}</code>, Sample: {ex.isSample ? "Yes" : "No"}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CreateProblem;