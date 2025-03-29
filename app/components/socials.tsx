import React from "react";
import Image from "next/image"; // Add Image import back
// Remove react-icons import
// import { FaGithub, FaLinkedin } from "react-icons/fa";

const Socials: React.FC = () => {
  return (
    <div className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      {/* GitHub Link - Reverted to Image and matched Skills styling */}
      <a
        // Use styling consistent with Skills component
        className="flex items-center gap-2 border border-current px-3 py-1 font-mono"
        href="https://github.com/sunnybharne"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Use Image component with original SVG */}
        <Image
          aria-hidden
          src="/github.svg"
          alt="Github icon"
          width={22} // Increased size slightly
          height={22} // Increased size slightly
        />
        Github
      </a>
      {/* LinkedIn Link - Reverted to Image and matched Skills styling */}
      <a
        // Use styling consistent with Skills component
        className="flex items-center gap-2 border border-current px-3 py-1 font-mono"
        href="https://www.linkedin.com/in/sunnybharne"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Use Image component with original SVG */}
        <Image
          aria-hidden
          src="/linkedin.svg"
          alt="LinkedIn icon"
          width={20} // Keep LinkedIn size
          height={20} // Keep LinkedIn size
        />
        LinkedIn
      </a>
    </div>
  );
};

export default Socials;
