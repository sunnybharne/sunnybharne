import Socials from "./components/socials";
import Skills from "./components/skills";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-8">
        <Header />
        <Socials />
        <Skills />
    </div>
  );
}
