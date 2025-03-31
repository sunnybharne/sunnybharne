import Socials from "./components/socials";
import Skills from "./components/skills";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="grid gap-2 md:gap-12 justify-center py-2 md:py-50">
      <Header />
      <Skills />
    </div>
  );
}
