import React from "react";
import Image from "next/image";

const Skills: React.FC = () => {
  return (
    <div className="flex p-8 gap-4">
        <a
          className="flex p-8 gap-4"
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
          className="flex p-8 gap-4"
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
          className="flex p-8 gap-4"
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
          className="flex p-8 gap-4"
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
  );
};

export default Skills
