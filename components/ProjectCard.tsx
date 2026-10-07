import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import { GithubIcon } from "./BrandIcons";
import { LeafGlyph } from "./Botanical";

const SPAN_CLASSES: Record<NonNullable<Project["span"]>, string> = {
  lg: "sm:col-span-2 sm:row-span-2",
  md: "sm:col-span-1 sm:row-span-2",
  sm: "sm:col-span-1 sm:row-span-1",
};

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  "pre-launch": "Pre-launch",
  "in-development": "In development",
  private: "Private",
};

export function ProjectCard({ project }: { project: Project }) {
  const spanClass = project.span ? SPAN_CLASSES[project.span] : "";

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden border border-border bg-background-elevated/60 p-6 transition-shadow hover:shadow-[0_0_0_1px_var(--accent)] focus-within:shadow-[0_0_0_1px_var(--accent)] ${spanClass}`}
      style={{ borderRadius: "2rem 0.5rem 2rem 0.5rem" }}
    >
      {project.image && (
        <div className="relative -mx-6 -mt-6 mb-5 overflow-hidden border-b border-border">
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            width={1200}
            height={720}
            className="aspect-video w-full object-cover object-top grayscale-[35%] transition-[filter] duration-300 group-hover:grayscale-0"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background-elevated/80 via-transparent to-transparent" />
        </div>
      )}

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {project.name}
          </h3>
          <span
            className={`flex shrink-0 items-center gap-1.5 border border-border bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${
              project.status === "live" ? "text-accent" : "text-muted"
            }`}
          >
            <LeafGlyph className="h-3 w-3" />
            {STATUS_LABEL[project.status]}
          </span>
        </div>

        <p className="mt-2 text-sm font-medium text-muted">{project.pitch}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted/80">
          {project.description}
        </p>
      </div>

      <div className="relative mt-6">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              {project.name} live demo
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {project.extraLinks?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
            >
              {project.name} {link.label.toLowerCase()}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
            >
              <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {project.name} source code
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {project.sourcePrivate && (
            <span className="inline-flex items-center gap-1 text-sm text-muted/60">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              Private repo
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
