import React from 'react'
import AddTestcases from './AddTestcases'
import axios from 'axios';
import { useState } from 'react';
import Header from './Header';
export const Admin = () => {

    const [pcode, setPcode] = useState("");
    // Delete all solutions
    const handleDeleteAllSolutions = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post("/http://localhost:4000/deleteSolutions",{
                    pcode: pcode
                },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            if (res.ok) {
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
            const res = await axios.post(`/http://localhost:4000/deleteproblem`, {
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
        <>
            <Header></Header>
            <div>
                <h2>Admin Panel</h2>

                <button onClick={handleDeleteAllSolutions} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Delete All Solutions
                </button>

                <div style={{ marginTop: "20px" }}>
                    <input
                        type="text"
                        placeholder="Enter problem code"
                        value={pcode}
                        onChange={(e) => setPcode(e.target.value)}
                    />
                    <button onClick={handleDeleteProblem} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Delete Problem
                    </button>
                </div>
            </div>
            <AddTestcases></AddTestcases>
        </>
    )
}
