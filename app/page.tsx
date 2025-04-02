import Skills from "./components/skills";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Header />
      <Skills />
    </div>
  );
}
