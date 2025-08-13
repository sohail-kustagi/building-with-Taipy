import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Stock Explorer</h3>
            <p className="text-gray-400">Built with React, FastAPI, and MongoDB</p>
          </div>
          <div className="text-gray-400 text-sm">
            © 2024 Stock Explorer. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;