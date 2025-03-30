import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <div className="flex flex-row p-8">
        <Image
          src="/sunny.png"
          alt="Sunny Bharne profile picture"
          width={150}
          height={150}
        />
      <div className="flex flex-col justify-center p-8">
        <p>SUNNY BHARNE</p>
        <p>Senior Azure Developer</p>
      </div>
    </div>
  );
};

export default Header;

