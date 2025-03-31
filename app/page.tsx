import Socials from "./components/socials";
import Skills from "./components/skills";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-8 gap-8">
      <Header />
      <Socials />
      <h1 className="border-2">section2</h1>
      <h1 className="border-2">section3</h1>
      <h1 className="border-2">section3</h1>
    </div>
  );
}
