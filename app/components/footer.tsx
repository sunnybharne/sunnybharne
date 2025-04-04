'use client';

import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 mt-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-gray-400 text-sm">
          <div className="flex items-center space-x-1">
            <span>Built with</span>
            <FaHeart className="w-4 h-4 text-red-500 mx-1" />
            <span>using</span>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 mx-1"
            >
              Next.js
            </a>
            <span>and</span>
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 mx-1"
            >
              Tailwind CSS
            </a>
          </div>
          <p className="mt-2">© {currentYear} Sunny Bharne. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 