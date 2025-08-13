import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuthButton from '../components/GoogleAuthButton';

function Home({ user, onSignIn }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Stock Market Explorer
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore S&P 500 stock predictions with advanced machine learning models. 
            Get insights from Linear Regression, KNN, and RNN algorithms to make informed investment decisions.
          </p>
          
          {!user ? (
            <div className="flex flex-col items-center space-y-6">
              <GoogleAuthButton onSignIn={onSignIn} />
              <p className="text-gray-500">Sign in to access the dashboard and save your preferences</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-6">
              <p className="text-lg text-gray-700">Welcome back, {user.name}!</p>
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
            <p className="text-gray-600">Get up-to-date stock prices from Yahoo Finance</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Predictions</h3>
            <p className="text-gray-600">Advanced machine learning models for price forecasting</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Charts</h3>
            <p className="text-gray-600">Visualize trends with beautiful, interactive charts</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Exploring?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of investors using our platform to make better decisions
          </p>
          <Link
            to="/dashboard"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Explore Stocks Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;