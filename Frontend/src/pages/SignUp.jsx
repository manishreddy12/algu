import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import codeview from '../assets/codeview.png'
import axios from 'axios';
import { useState,useEffect } from 'react';


const SignUp = () => {
  const [gotoHome, setgotoHome] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [err, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  useEffect(() => {
          if (success) {
              navigate('/login');
          }
      }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending formData:", formData);
      // respone = await axios.post('http://localhost:4000/login', formData);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/signup`,
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          username: formData.username,
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            'Content-Type': 'application/json' // VERY important
          }
        }
      );
      const token = response?.data?.token;
      if (!token) throw new Error("No token in response");

      localStorage.setItem('token', token);
      setgotoHome(true);
      setSuccess("Login successful!");
      setError('');

    }
    catch (err) {
      setError(err.response.data.message || err.response.data || "Something went wring");
      setSuccess('');
    }
  }

  return (
    <section className="h-screen w-screen flex">
      {/* Left Side - Sign Up Form (Centered) */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center">
            <img
              className="mx-auto h-10 w-auto"
              src={codeview}
              alt="Company Logo"
            />
            <h2 className="mt-10 text-2xl font-bold text-gray-900">
              Create your account
            </h2>
          </div>

          <div className="mt-10">
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium text-gray-900">
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstname"
                      name="firstname"
                      onChange={handleChange}
                      type="text"
                      required
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>

            {/* <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
            </p> */}
            <div className="py-1.5 text-sm">
              <span>Already user? </span>
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
              <div className="mt-10 text-center text-sm text-gray-500">
                {err && <p className="text-red-600">{err}</p>}
                {success && <p className="text-green-600">{success}</p>}
              </div>

              {gotoHome && (
                <div className="mt-2">
                  <Link
                    to="/home"
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Go Home
                  </Link>
                </div>
              )}
            </div>

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

export default SignUp;