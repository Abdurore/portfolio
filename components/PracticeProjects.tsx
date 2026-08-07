import { practiceProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ScrollReveal, ScrollRevealGroup } from "./ScrollReveal";

export function PracticeProjects() {
  return (
    <section id="practice" className="relative mx-auto max-w-5xl px-6 py-20">
      <ScrollReveal>
        <p className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
          03 / Practice Projects
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Smaller builds, sharp focus.
        </h2>
      </ScrollReveal>

      <ScrollRevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {practiceProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ScrollRevealGroup>
    </section>
  );
}
