import Socials from "./components/socials";
import Skills from "./components/skills";
import Header from "./components/header";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Header />
        <Socials />
        <Skills />
      </main>
    </div>
  );
}
