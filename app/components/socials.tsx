import React from "react";
import Image from "next/image";

const Socials: React.FC = () => {
  return (
    <div className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 border border-current px-4 py-2 hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)] transition-colors"
        href="https://github.com/sunnybharne"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/github.svg"
          alt="github icon"
          width={24}
          height={24}
        />
        Github
      </a>
      <a
        className="flex items-center gap-2 border border-current px-4 py-2 hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)] transition-colors"
        href="https://www.linkedin.com/in/sunnybharne"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/linkedin.svg"
          alt="linkedIn icon"
          width={24}
          height={24}
        />
       LinkedIn
      </a>
    </div>
  );
};

export default Socials;
