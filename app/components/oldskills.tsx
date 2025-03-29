import React from "react";
import Image from "next/image";

const Oldskills: React.FC = () => {
  return (
    <>
      <div className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/sunnybharne"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="github icon"
            width={36}
            height={36}
          />
         Azure 
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/sunnybharne"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin.svg"
            alt="linkedIn icon"
            width={26}
            height={26}
          />
         Azure Devops
        </a>
      </div>
    </>
  );
};

export default Oldskills;
