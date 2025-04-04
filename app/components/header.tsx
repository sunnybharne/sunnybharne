import React from "react";
import Image from "next/image";
import Socials from "./socials";

const Header: React.FC = () => {
  return (
    <section className="py-16 w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
          <Image
            className="relative rounded-xl"
            src="/Sunny.png"
            alt="Sunny Bharne profile picture"
            width={150}
            height={150}
          />
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            SUNNY BHARNE
          </h1>
          <p className="text-xl text-gray-300 mb-2">Senior Azure Developer</p>
          <p className="text-lg text-gray-400 mb-4">OP Financial group</p>
          <Socials />
        </div>
      </div>
    </section>
  );
};

export default Header;

