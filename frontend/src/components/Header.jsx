import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, onSignOut }) {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Stock Explorer
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-blue-200">
            Dashboard
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Hello, {user.name}</span>
              <button
                onClick={onSignOut}
                className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
              >
                Sign Out
              </button>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

export default Header;