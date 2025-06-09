import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, resetPassword } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isForgotPassword) {
        await resetPassword(email);
        setSuccess('Password reset email sent! Check your inbox.');
        setEmail('');
      } else if (isSignUp) {
        await signUp(email, password);
        // Get the redirect path from location state or default to home
        const from = location.state?.from || '/';
        navigate(from);
      } else {
        await signIn(email, password);
        // Get the redirect path from location state or default to home
        const from = location.state?.from || '/';
        navigate(from);
      }
    } catch (err) {
      if (isForgotPassword) {
        setError('Failed to send reset email. Please check your email address.');
      } else {
        setError(isSignUp ? 'Failed to create account.' : 'Failed to sign in. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isForgotPassword ? 'Reset your password' : isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
            <CheckCircle size={18} />
            {success}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {!isForgotPassword && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pl-10"
                    placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              'Processing...'
            ) : isForgotPassword ? (
              <>
                <Mail size={18} />
                Send Reset Email
              </>
            ) : (
              <>
                <LogIn size={18} />
                {isSignUp ? 'Create Account' : 'Sign in'}
              </>
            )}
          </button>

          <div className="text-center space-y-2">
            {!isForgotPassword && !isSignUp && (
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-blue-600 hover:text-blue-800 font-medium block w-full"
              >
                Forgot your password?
              </button>
            )}
            
            {isForgotPassword ? (
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Back to Sign In
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;