import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
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
        <PracticeProjects />
        <Contact />
      </main>
    </>
  );
}
