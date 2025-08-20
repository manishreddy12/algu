import React from 'react'
import AddTestcases from './AddTestcases'
import axios from 'axios';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Changeroles } from './Changeroles';
export const Admin = () => {

    const [pcode, setPcode] = useState("");
    // Delete all solutions
    const handleDeleteAllSolutions = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post("http://localhost:4000/deleteSolutions",{
                    pcode: pcode
                },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            console.log(res);
            
            if (res) {
                alert("All solutions deleted successfully!");
            } else {
                alert("Failed to delete solutions");
            }
        } catch (err) {
            console.error(err);
            alert("Error while deleting solutions");
        }
    };

    // Delete a problem by pcode
    const handleDeleteProblem = async () => {
        if (!pcode) {
            alert("Please enter a problem code");
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`http://localhost:4000/deleteproblem`, {
                    pcode: pcode
                },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            if (res.ok) {
                alert(`Problem ${pcode} deleted successfully!`);
                setPcode(""); // reset input
            } else {
                alert("Failed to delete problem");
            }
        } catch (err) {
            console.error(err);
            alert("Error while deleting problem");
        }
    };



    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-4">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
                    <Changeroles></Changeroles>
                    {/* Delete All Solutions Button */}
                    <button
                        onClick={handleDeleteAllSolutions}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Delete All Solutions
                    </button>

                    {/* Problem Code + Delete Button */}
                    <div className="flex items-center gap-4 mt-6">
                        <input
                        type="text"
                        placeholder="Enter problem code"
                        value={pcode}
                        onChange={(e) => setPcode(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                        onClick={handleDeleteProblem}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                        Delete Problem
                        </button>
                    </div>
                </div>
                <AddTestcases />
            </main>
            <Footer />
        </div>
    )
}
