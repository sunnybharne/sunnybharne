import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-2" >
        <Image
          className="rounded-xl justify-self-end"
          src="/sunny.png"
          alt="Sunny Bharne profile picture"
          width={120}
          height={120}
        />
        <div className="flex flex-col justify-end">
          <h1 className="justify-self-end text-2xl tracking-wide text-blue-600 dark:text-sky-400 underline decoration-pink-500">SUNNY BHARNE</h1>
          <p className="text-sm">Senior Azure Developer</p>
          <p className="text-sm">OP Financial group</p>
        </div>
    </div>
  );
};

export default Header;

