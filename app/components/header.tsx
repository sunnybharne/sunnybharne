import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (

    <div className="flex gap-2" >
        <Image
          className="rounded-xl"
          src="/sunny.png"
          alt="Sunny Bharne profile picture"
          width={120}
          height={120}
        />
        <div className="flex flex-col justify-end" >
          <h1 className="text-2xl tracking-wide text-blue-600 dark:text-sky-400 underline decoration-pink-500">SUNNY BHARNE</h1>
          <div>
            <p className="text-sm">Senior Azure Developer</p>
            <p className="text-sm">OP Financial group</p>
          </div>
        </div>
    </div>
  );
};

export default Header;

