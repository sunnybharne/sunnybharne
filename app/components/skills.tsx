import React from "react";
import Image from "next/image"; // Bring back Image import

// Remove react-icons import
// import { SiAzure, SiBicep, SiAzuredevops, SiAzurepipelines } from "react-icons/si";

const Skills: React.FC = () => {
  return (
    <>
      <p className="text-1xl font-bold border-b border-current pb-1 mb-4">Skills</p>
      <p className="text-1xl mb-4">2024-2025</p>
      <div className="row-start-3 flex gap-[16px] flex-wrap items-center justify-center">
        {/* Microsoft Azure - Reverted to Image */}
        <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded bg-white shadow-sm">
          <Image
            aria-hidden
            src="/azure.svg"
            alt="Azure icon"
            width={20} // Consistent size
            height={20}
            className="object-contain" // Ensure aspect ratio is maintained
          />
          <span className="font-mono text-sm">Microsoft Azure</span>
        </div>

        {/* Bicep IAC - Reverted to Image */}
        <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded bg-white shadow-sm">
          <Image
            aria-hidden
            src="/bicep.svg"
            alt="Bicep icon"
            width={20}
            height={20}
            className="object-contain"
          />
          <span className="font-mono text-sm">Bicep IAC</span>
        </div>

        {/* Azure DevOps - Reverted to Image */}
        <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded bg-white shadow-sm">
          <Image
            aria-hidden
            src="/devops.svg"
            alt="Azure DevOps icon"
            width={20}
            height={20}
            className="object-contain"
          />
          <span className="font-mono text-sm">Azure DevOps</span>
        </div>

        {/* Azure Pipelines - Reverted to Image */}
        <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded bg-white shadow-sm">
          <Image
            aria-hidden
            src="/pipelines.svg"
            alt="Azure Pipelines icon"
            width={20}
            height={20}
            className="object-contain"
          />
          <span className="font-mono text-sm">Azure Pipelines</span>
        </div>
      </div>
      {/*<p className="text-1xl">2015-2024</p>
      <p className="text-1xl">2015-2024</p>
      <p className="text-1xl">2015-2024</p>
      <p className="text-1xl">2015-2024</p>*/}
    </>
  );
};

export default Skills;
