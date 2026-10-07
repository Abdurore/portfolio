import { profile } from "@/data/profile";
import { Reveal, RevealGroup } from "./Reveal";
import { GrowthLine } from "./GrowthLine";
import { LeafGlyph } from "./Botanical";
import { TreeRingStat } from "./TreeRingStat";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-4xl px-6 py-28">
      <Reveal className="relative">
        <GrowthLine />
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-accent">[01]</span> Roots
        </p>
        <h2 className="mt-3 flex items-center gap-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Building products end-to-end, from UI to deployment.
          <LeafGlyph className="leaf-sprout h-5 w-5 shrink-0 text-accent" />
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.bio}
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted">
          {profile.education.degree} at {profile.education.school} (
          {profile.education.status}).
        </p>
      </Reveal>

      <RevealGroup className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
        {profile.stats.map((stat) => (
          <TreeRingStat key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </RevealGroup>

      <div className="mt-14 flex flex-col gap-6">
        {profile.skillGroups.map((group) => (
          <div key={group.label}>
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted/70">
              {group.label}
            </p>
            <RevealGroup className="mt-2 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-border bg-background-elevated/60 px-3.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-foreground"
                >
                  {skill}
                </span>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </section>
  );
}
