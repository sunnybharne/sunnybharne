import React from "react";
import Image from "next/image";

const Skills: React.FC = () => {
  const skills = [
    {
      name: "Microsoft Azure",
      icon: "/azure.svg",
      alt: "azure icon"
    },
    {
      name: "Bicep IAC",
      icon: "/bicep.svg",
      alt: "bicep icon"
    },
    {
      name: "Azure DevOps",
      icon: "/devops.svg",
      alt: "azure devops icon"
    },
    {
      name: "Azure Pipelines",
      icon: "/pipelines.svg",
      alt: "azure pipelines icon"
    }
  ];

  return (
    <section id="skills" className="py-12 w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Skills
        </h2>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Technologies and tools I work with
        </p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group flex flex-col items-center justify-center p-3 hover:bg-gray-800/30 rounded-lg transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-sm group-hover:bg-blue-500/20 transition-colors duration-300"></div>
                <Image
                  src={skill.icon}
                  alt={skill.alt}
                  width={24}
                  height={24}
                  className="relative group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-2 text-xs font-medium text-gray-400 group-hover:text-gray-200 transition-colors duration-200 line-clamp-1">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
