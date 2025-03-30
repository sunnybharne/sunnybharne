import Socials from "./components/socials";
import Skills from "./components/skills";
import Header from "./components/header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center sm:justify-start">
          <Image
            src="/sunny.png"
            alt="Sunny Bharne profile picture"
            width={150}
            height={150}
            className="rounded-full shadow-md"
            priority
          />
          <Header />
        </div>
        <Socials />
        <Skills />
      </main>
    </div>
  );
}
