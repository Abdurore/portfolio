import { profile } from "@/data/profile";
import { Fern, LogoMark, MonsteraLeaf } from "./Botanical";

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-4xl px-6 pb-16 pt-8 text-center">
      <MonsteraLeaf
        aria-hidden="true"
        className="foliage-sway pointer-events-none absolute -bottom-6 -left-10 hidden h-44 w-40 -rotate-12 text-fern opacity-[0.14] sm:block"
        style={{ transformOrigin: "50% 100%" }}
      />
      <Fern
        aria-hidden="true"
        className="foliage-sway pointer-events-none absolute -bottom-6 -right-6 hidden h-44 w-32 rotate-12 text-fern opacity-[0.14] sm:block"
        style={{ transformOrigin: "50% 100%", animationDelay: "-2s" }}
      />
      <div className="relative border-t border-border pt-8">
        <LogoMark id="footer-logo" className="mx-auto mb-4 h-8 w-8" />
        <p className="font-mono text-xs text-muted">
          Grown in Lagos — © {new Date().getFullYear()} {profile.name} (
          {profile.alias}).
        </p>
        <p className="mt-2 font-mono text-xs text-muted">
          <a href="/accessibility-audit" className="underline hover:text-accent">
            Accessibility audit service
          </a>
          {" · "}
          <a href="/accessibility" className="underline hover:text-accent">
            Accessibility statement
          </a>
        </p>
      </div>
    </footer>
  );
}
