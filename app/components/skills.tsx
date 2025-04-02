import React from "react";
import Image from "next/image";

const Skills: React.FC = () => {
  return (
    <>
    <div className="flex p-8">
      <div className="row-start-3 flex gap-[16px] flex-wrap items-center">
        <a
          className="flex items-center gap-2 border border-current px-3 py-1 font-mono"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/azure.svg"
            alt="azure icon"
            width={20}
            height={20}
          />
         Microsoft Azure
        </a>

        <a
          className="flex items-center gap-2 border border-current px-3 py-1 font-mono"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/bicep.svg"
            alt="bicep icon"
            width={20}
            height={20}
          />
        Bicep IAC
        </a>

        <a
          className="flex items-center gap-2 border border-current px-3 py-1 font-mono"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/devops.svg"
            alt="azure devops icon"
            width={20}
            height={20}
          />
         Azure Devops
        </a>

        <a
          className="flex items-center gap-2 border border-current px-3 py-1 font-mono"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/pipelines.svg"
            alt="azure pipelines icon"
            width={20}
            height={20}
          />
        Azure Pipelines
        </a>

      </div>

    </div>
    </>

  );
};

export default Skills
