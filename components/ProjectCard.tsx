"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import { revealItemVariants } from "./ScrollReveal";
import { GithubIcon } from "./BrandIcons";

const SPAN_CLASSES: Record<NonNullable<Project["span"]>, string> = {
  lg: "sm:col-span-2 sm:row-span-2",
  md: "sm:col-span-1 sm:row-span-2",
  sm: "sm:col-span-1 sm:row-span-1",
};

export function ProjectCard({ project }: { project: Project }) {
  const spanClass = project.span ? SPAN_CLASSES[project.span] : "";

  return (
    <motion.div
      variants={revealItemVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-background-elevated/60 p-6 ${spanClass}`}
    >
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_var(--mx,50%)_var(--my,0%),rgba(22,163,74,0.18),transparent_70%)]" />
      <div
        className="absolute inset-0"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty(
            "--mx",
            `${e.clientX - rect.left}px`
          );
          e.currentTarget.style.setProperty(
            "--my",
            `${e.clientY - rect.top}px`
          );
        }}
      />

      {project.image && (
        <div className="relative -mx-6 -mt-6 mb-5 overflow-hidden border-b border-border">
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            width={1200}
            height={720}
            className="aspect-video w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background-elevated/80 via-transparent to-transparent" />
        </div>
      )}

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {project.name}
          </h3>
          {project.liveUrl && (
            <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-accent-lime">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-lime" />
              </span>
              Live
            </span>
          )}
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
              className="rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted"
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
              className="inline-flex items-center gap-1 font-mono text-sm font-medium text-foreground transition-colors hover:text-accent-cyan"
            >
              Live Demo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {project.extraLinks?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-sm text-muted transition-colors hover:text-accent-cyan"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-sm text-muted transition-colors hover:text-foreground"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              Source
            </a>
          )}
          {project.sourcePrivate && (
            <span className="inline-flex items-center gap-1 font-mono text-sm text-muted/60">
              <Lock className="h-3.5 w-3.5" />
              Private repo
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
