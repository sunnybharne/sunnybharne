import React from "react";
import Image from "next/image";

const Socials: React.FC = () => {
  return (
    <div className="flex gap-2">

      <a
        className="flex items-center gap-1 border border-current px-3 py-1"
        href="https://github.com/sunnybharne"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/github.svg"
          alt="Github icon"
          width={22}
          height={22}
        />
        Github
      </a>

      <a
        className="flex items-center gap-1 border border-current px-3 py-1"
        href="https://www.linkedin.com/in/sunnybharne"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/linkedin.svg"
          alt="LinkedIn icon"
          width={20}
          height={20}
        />
        LinkedIn
      </a>

      <a
        className="flex items-center gap-1 border border-current px-3 py-1"
        href="https://www.linkedin.com/in/sunnybharne"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/linkedin.svg"
          alt="x icon"
          width={20}
          height={20}
        />
       X 
      </a>

      <a
        className="flex items-center gap-1 border border-current px-3 py-1"
        href="https://www.linkedin.com/in/sunnybharne"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/linkedin.svg"
          alt="Email icon"
          width={20}
          height={20}
        />
        Email
      </a>

      <a
        className="flex items-center gap-1 border border-current px-3 py-1"
        href="https://www.linkedin.com/in/sunnybharne"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/linkedin.svg"
          alt="Email icon"
          width={20}
          height={20}
        />
        Resume
      </a>

    </div>
  );
};

export default Socials;
