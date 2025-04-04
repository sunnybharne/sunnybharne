import Skills from "./components/skills";
import Header from "./components/header";
import Projects from "./components/projects";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Header />
        <Skills />
        <section id="projects" className="py-20">
          <Projects />
        </section>
      </main>
      <Footer />
    </div>
  );
}
