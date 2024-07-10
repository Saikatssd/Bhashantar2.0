import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from "react-hot-toast";
import { handleSendPasswordResetEmail, handleSignIn } from '../utils/auth.jsx';

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await handleSignIn(email, password);
        toast.success("Login Successful");
      } catch (error) {
        // console.error("error", error);

        let message = "An error occurred. Please try again.";
        if (error.code) {
          switch (error.code) {
            case 'auth/invalid-credential': 
            message = "Invalid email or password.";
            break;
            case 'auth/invalid-email':
              message = "Email not found.";
              break;
            case 'auth/too-many-requests':
              message = "Too many login attempts. Please try again later.";
              break;
            case 'auth/user-not-found':
              message = "No user found with this email.";
              break;
            case 'auth/wrong-password':
              message = "Invalid email or password.";
              break;
            case 'auth/network-request-failed':
              message = "Check your Internet Connection.";
              break;
            default:
              message = error.message || message;
          }
        } else {
          message = error.message || message;
        }
        
        // setErrorMessage(message);
        toast.error(message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onForgotPassword = async () => {
    if (email) {
      try {
        await handleSendPasswordResetEmail(email);
        toast.success('Password reset email sent!');
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error('Please enter your email address first.');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center">
      {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
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
                <a href='#' onClick={onForgotPassword} className="font-semibold text-indigo-600 hover:text-indigo-500">
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
            <button type="submit" disabled={isSigningIn} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {isSigningIn ? 'Signing In...' : 'Sign In'}
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
