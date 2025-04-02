import React from "react";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";

const Socials: React.FC = () => {
  return (
    <div className="flex gap-3 text-xl">
      <a href="https://github.com/sunnybharne" target="_blank" rel="noopener noreferrer">
        <FaGithub aria-hidden />
      </a>
      <a href="https://www.linkedin.com/in/sunnybharne" target="_blank" rel="noopener noreferrer">
        <FaLinkedin aria-hidden />
      </a>
      <a href="https://twitter.com/sunnybharne" target="_blank" rel="noopener noreferrer">
        <FaXTwitter aria-hidden />
      </a>
      <a href="mailto:sunny.bharne@outlook.com">
        <FaEnvelope aria-hidden />
      </a>
    </div>
  );
};

export default Socials;
