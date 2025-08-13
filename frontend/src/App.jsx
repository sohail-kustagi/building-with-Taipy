import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header user={user} onSignOut={handleSignOut} />
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<Home user={user} onSignIn={handleSignIn} />} 
            />
            <Route 
              path="/dashboard" 
              element={<Dashboard user={user} />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
