import { About } from "@/components/About";
import { Audits } from "@/components/Audits";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { PracticeProjects } from "@/components/PracticeProjects";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col">
        <Hero />
        <About />
        <FeaturedProjects />
        <Audits />
        <Experience />
        <PracticeProjects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
