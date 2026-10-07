import { practiceProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal, RevealGroup } from "./Reveal";
import { GrowthLine } from "./GrowthLine";
import { LeafGlyph } from "./Botanical";

export function PracticeProjects() {
  return (
    <section id="practice" className="relative mx-auto max-w-5xl px-6 py-20">
      <Reveal className="relative">
        <GrowthLine />
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-accent">[04]</span> Seedlings
        </p>
        <h2 className="mt-3 flex max-w-xl items-center gap-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Smaller builds, sharp focus.
          <LeafGlyph className="leaf-sprout h-5 w-5 shrink-0 text-accent" />
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {practiceProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </RevealGroup>
    </section>
  );
}
