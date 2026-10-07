import { profile } from "@/data/profile";
import { Reveal, RevealGroup } from "./Reveal";
import { GrowthLine } from "./GrowthLine";
import { LeafGlyph } from "./Botanical";

const CREDENTIAL_LABEL: Record<"earned" | "in-progress", string> = {
  earned: "Earned",
  "in-progress": "In progress",
};

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-20">
      <Reveal className="relative">
        <GrowthLine />
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-accent">[03]</span> Rings
        </p>
        <h2 className="mt-3 flex items-center gap-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Where the time actually went.
          <LeafGlyph className="leaf-sprout h-5 w-5 shrink-0 text-accent" />
        </h2>
      </Reveal>

      <RevealGroup
        as="ol"
        className="mt-10 flex flex-col gap-6 border-l border-border pl-6"
      >
        {profile.experience.map((item) => (
          <li key={item.title} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-accent" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <span className="font-mono text-xs text-muted">{item.org}</span>
              {item.period && (
                <span className="font-mono text-xs text-muted">
                  {item.period}
                </span>
              )}
            </div>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </li>
        ))}
      </RevealGroup>

      <h3 className="mt-14 font-mono text-xs uppercase tracking-widest text-muted">
        Credentials
      </h3>
      <RevealGroup as="ul" className="mt-4 flex flex-wrap gap-2">
        {profile.credentials.map((cred) => (
          <li
            key={cred.name}
            className="flex items-center gap-2 border border-border bg-background-elevated/60 px-3 py-1.5 font-mono text-xs text-muted"
          >
            {cred.name}
            <span
              className={
                cred.status === "earned" ? "text-accent" : "text-muted"
              }
            >
              {CREDENTIAL_LABEL[cred.status]}
            </span>
          </li>
        ))}
      </RevealGroup>
    </section>
  );
}
