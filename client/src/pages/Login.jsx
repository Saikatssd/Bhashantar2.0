import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful");
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      const errorCode = error.code;
      let errorMessage;
  
      switch (errorCode) {
        case 'auth/invalid-email':
          errorMessage = "Email not found.";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Too many login attempts. Please try again later.";
          break;
        
        case 'auth/invalid-credential': 
          errorMessage = "Invalid email or password.";
          break;
      }
  
      if (!errorMessage) {
        errorMessage = "An error occurred. Please check your network connection.";
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center">
      <div className="">
        <div className="hidden sm:mb-1 sm:flex sm:justify-center">
          <div className="">
            <a href="#" className="font-bold text-3xl text-indigo-600">
              <img src="/logo.png" alt="Bhashantaar Logo" style={{ height: '13rem', width: 'auto' }} />
            </a>
          </div>
        </div>
        <h2 className="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md indent-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md indent-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button  type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Log in
            </button>
          </div>
        </form>
        <p className="mt-8 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Contact Us
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;


