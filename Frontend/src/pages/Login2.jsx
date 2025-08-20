import React, { use } from 'react';
import { useNavigate } from "react-router-dom";
import codeview from '../assets/codeview.png'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';

const Login2 = () => {
    const [gotoHome, setgotoHome] = useState(false)
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [err, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            navigate('/home');
        }
    }, [success, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Sending formData:", formData);
            // respone = await axios.post('http://localhost:4000/login', formData);
            const response = await axios.post(
                'http://localhost:4000/login',
                {
                    username: formData.username,
                    password: formData.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json' // VERY important
                    }
                }
            );
            const token = response?.data?.token;
            const role = response?.data?.role;
            if (!token) throw new Error("No token in response");
            console.log(token);
            console.log(role);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            setSuccess("Login successful!");
            setError('');
            setgotoHome(true);
        }
        catch (err) {
            setError(err.response.data.message || err.response.data || "Something went wring");
            setSuccess('');
        }
    }
    return (
        <section className="h-screen w-screen flex">
            {/* Left Side - Login Form (Centered) */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="text-center">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={codeview}
                            alt="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"

                        />
                        <h2 className="mt-10 text-2xl font-bold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10">
                        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder='username'
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <p className="font-semibold text-indigo-600 hover:text-indigo-500 inline">

                                <Link to={'/signup'}>
                                    Sign Up
                                </Link>
                            </p>
                        </p>
                        <div className="mt-10 text-center text-sm text-gray-500">
                            {err && <p style={{ color: 'red' }}>{err}</p>}
                            {success && <p style={{ color: 'red' }}>{success}</p>}
                        </div>
                        {gotoHome && (
                            <div>
                                <Link to="/home">Go Home</Link>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block lg:w-1/2">
                <img
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
                    alt="Decorative background"
                />
            </div>
        </section>
    );
};

export default Login2;

// import React, { use } from 'react';
// import codeview from '../assets/codeview.png'
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import { useState } from 'react';
// import Footer from './Footer';

// const Login2 = () => {
//     const [gotoHome, setgotoHome] = useState(false)
//     const [formData, setFormData] = useState({ username: '', password: '' });
//     const [err, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             console.log("Sending formData:", formData);
//             // respone = await axios.post('http://localhost:4000/login', formData);
//             const response = await axios.post(
//                 'http://localhost:4000/login',
//                 {
//                     username: formData.username,
//                     password: formData.password
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json' // VERY important
//                     }
//                 }
//             );
//             const token = response?.data?.token;
//             if (!token) throw new Error("No token in response");

//             localStorage.setItem('token', token);
//             setSuccess("Login successful!");
//             setError('');
//             setgotoHome(true);
//         }
//         catch (err) {
//             setError(err.response.data.message || err.response.data || "Something went wring");
//             setSuccess('');
//         }
//     }
//     return (
//         <section className="h-screen w-screen flex">
//             {/* Left Side - Login Form (Centered) */}
//             <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8 bg-gray-50">
//                 <div className="w-full max-w-md">
//                     <div className="text-center">
//                         <img
//                             className="mx-auto h-10 w-auto"
//                             src={codeview}
//                             alt="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"

//                         />
//                         <h2 className="mt-10 text-2xl font-bold text-gray-900">
//                             Sign in to your account
//                         </h2>
//                     </div>

//                     <div className="mt-10">
//                         <form className="space-y-6" onSubmit={handleSubmit} method="POST">
//                             <div>
//                                 <label htmlFor="username" className="block text-sm font-medium text-gray-900">
//                                     Email address
//                                 </label>
//                                 <div className="mt-2">
//                                     <input
//                                         name="username"
//                                         type="text"
//                                         placeholder='username'
//                                         value={formData.username}
//                                         onChange={handleChange}
//                                         required
//                                         className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <div className="flex items-center justify-between">
//                                     <label htmlFor="password" className="block text-sm font-medium text-gray-900">
//                                         Password
//                                     </label>
//                                     <div className="text-sm">
//                                         <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                                             Forgot password?
//                                         </a>
//                                     </div>
//                                 </div>
//                                 <div className="mt-2">
//                                     <input
//                                         name="password"
//                                         type="password"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         required
//                                         className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <button
//                                     type="submit"
//                                     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                                 >
//                                     Sign in
//                                 </button>
//                             </div>
//                         </form>

//                         <p className="mt-10 text-center text-sm text-gray-500">
//                             Not a member?{' '}
//                             <p className="font-semibold text-indigo-600 hover:text-indigo-500 inline">

//                                 <Link to={'/signup'}>
//                                     Sign Up
//                                 </Link>
//                             </p>
//                         </p>
//                         <div className="mt-10 text-center text-sm text-gray-500">
//                             {err && <p style={{ color: 'red' }}>{err}</p>}
//                             {success && <p style={{ color: 'red' }}>{success}</p>}
//                         </div>
//                         {gotoHome && (
//                             <div>
//                                 <Link to="/home">Go Home</Link>
//                             </div>
//                         )}

//                     </div>
//                 </div>
//             </div>

//             {/* Right Side - Image */}
//             <div className="hidden lg:block lg:w-1/2">
//                 <img
//                     className="h-full w-full object-cover"
//                     src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
//                     alt="Decorative background"
//                 />
//             </div>
//         </section>
//     );
// };

// export default Login2;