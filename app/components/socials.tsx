import React from "react";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope, FaFile } from "react-icons/fa6";

const Socials: React.FC = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub className="w-6 h-6" />,
      url: "https://github.com/sunnybharne",
      ariaLabel: "Visit my GitHub profile"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-6 h-6" />,
      url: "https://www.linkedin.com/in/sunnybharne",
      ariaLabel: "Visit my LinkedIn profile"
    },
    {
      name: "Twitter",
      icon: <FaXTwitter className="w-6 h-6" />,
      url: "https://twitter.com/sunnybharne",
      ariaLabel: "Follow me on Twitter"
    },
    {
      name: "Email",
      icon: <FaEnvelope className="w-6 h-6" />,
      url: "mailto:sunny.bharne@outlook.com",
      ariaLabel: "Send me an email"
    },
    {
      name: "Resume",
      icon: <FaFile className="w-6 h-6" />,
      url: "YOUR_ONEDRIVE_RESUME_LINK_HERE",
      ariaLabel: "View my resume"
    }
  ];

  return (
    <div className="flex gap-4">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.ariaLabel}
          className="p-2 text-gray-400 hover:text-white bg-gray-900/50 hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default Socials;
