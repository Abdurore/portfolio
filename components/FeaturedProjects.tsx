import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ScrollReveal, ScrollRevealGroup } from "./ScrollReveal";

export function FeaturedProjects() {
  return (
    <section id="featured" className="relative mx-auto max-w-5xl px-6 py-20">
      <ScrollReveal>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-accent">[02]</span> Featured Projects
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Full products, real backends, real users.
        </h2>
      </ScrollReveal>

      <ScrollRevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:auto-rows-[minmax(0,auto)] sm:items-start">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ScrollRevealGroup>
    </section>
  );
}
