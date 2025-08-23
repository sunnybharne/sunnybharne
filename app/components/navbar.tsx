'use client';

import { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname === '/') {
        // Update active section based on scroll position only on home page
        const sections = ['skills', 'projects'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        setActiveSection(current || '');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = () => {
    // You can replace this URL with your actual resume URL
    window.open('/resume.pdf', '_blank');
  };

  const handleTechDocsClick = () => {
    window.open('https://sunnybharne.github.io/tech-notes/', '_blank');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="group flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:bg-gray-800/30"
          >
            <FaHome className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
          </Link>
          <div className="flex items-center gap-1">
            {['Skills', 'Projects'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${activeSection === item.toLowerCase()
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/30'
                  }
                `}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                )}
              </button>
            ))}
            <button
              onClick={handleTechDocsClick}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-300 hover:text-blue-400 hover:bg-gray-800/30"
            >
              TechDocs
            </button>
            <button
              onClick={handleResumeClick}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-300 hover:text-blue-400 hover:bg-gray-800/30"
            >
              Resume
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 