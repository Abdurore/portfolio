import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { PracticeProjects } from "@/components/PracticeProjects";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <FeaturedProjects />
        <Experience />
        <PracticeProjects />
        <Contact />
      </main>
    </>
  );
}
