'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/95 backdrop-blur-sm border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#14B8A6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">Deadman Vault</span>
            <span className="text-white font-bold text-xl sm:hidden">DV</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-[#5EEAD4] transition-colors">
              Home
            </a>
            <a href="#features" className="text-gray-300 hover:text-[#5EEAD4] transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-300 hover:text-[#5EEAD4] transition-colors">
              About
            </a>
          </nav>

          {/* Wallet Connect Button */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:block px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#14B8A6] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
              Connect Wallet
            </button>
            <button className="sm:hidden px-3 py-2 bg-gradient-to-r from-[#3B82F6] to-[#14B8A6] text-white rounded-lg font-medium">
              Connect
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1E293B]">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-300 hover:text-[#5EEAD4] transition-colors">
                Home
              </a>
              <a href="#features" className="text-gray-300 hover:text-[#5EEAD4] transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-300 hover:text-[#5EEAD4] transition-colors">
                About
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
