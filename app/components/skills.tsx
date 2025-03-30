import React from "react";
import Image from "next/image";

const Skills: React.FC = () => {
  return (
    <>
      <p className="text-1xl font-bold border-b border-current pb-1 mb-4">Skills</p>
      <p className="text-1xl mb-4">2024-2025</p>
      <div className="row-start-3 flex gap-[16px] flex-wrap items-center justify-center">
        {/* Microsoft Azure - Reverted to original link structure */}
        <a
          className="flex items-center gap-2 border border-current px-3 py-1 font-mono" // Original classes
          href="#" // Original href
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/azure.svg"
            alt="azure icon"
            width={20} // Consistent size
            height={20} // Consistent size
          />
         Microsoft Azure
        </a>

        <a
          className="flex items-center gap-2 border border-current px-3 py-1 font-mono"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/bicep.svg"
            alt="bicep icon"
            width={20} // Consistent size (already 20)
            height={20} // Consistent size (already 20)
          />
        Bicep IAC
        </a>

        <a
          className="flex items-center gap-2 border border-current px-3 py-1 font-mono"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/devops.svg"
            alt="azure devops icon"
            width={20} // Consistent size
            height={20} // Consistent size
          />
         Azure Devops
        </a>

        <a
          className="flex items-center gap-2 border border-current px-3 py-1 font-mono"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/pipelines.svg"
            alt="azure pipelines icon" // Adjusted alt text slightly
            width={20} // Consistent size (already 20)
            height={20} // Consistent size (already 20)
          />
        Azure Pipelines
        </a>

      </div>
    </>
  );
};

export default Skills;
