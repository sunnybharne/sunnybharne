import React from "react";
// Import icons from react-icons
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Socials: React.FC = () => {
  return (
    <div className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      {/* GitHub Link */}
      <a
        // Removed hover background/text change, adjusted padding/gap slightly
        className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:border-anime-blue transition-colors group"
        href="https://github.com/sunnybharne"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Use FaGithub icon, add base color, hover color, and transition */}
        <FaGithub className="w-6 h-6 text-gray-700 group-hover:text-anime-blue transition-colors" />
        Github
      </a>
      {/* LinkedIn Link */}
      <a
        // Removed hover background/text change, adjusted padding/gap slightly
        className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:border-anime-blue transition-colors group"
        href="https://www.linkedin.com/in/sunnybharne"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Use FaLinkedin icon, add base color, hover color, and transition */}
        <FaLinkedin className="w-6 h-6 text-gray-700 group-hover:text-anime-blue transition-colors" />
        LinkedIn
      </a>
    </div>
  );
};

export default Socials;
