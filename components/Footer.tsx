import { profile } from "@/data/profile";
import { MonsteraLeaf } from "./Botanical";

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-4xl px-6 pb-16 pt-8 text-center">
      <MonsteraLeaf
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-2 left-1/2 h-24 w-24 -translate-x-1/2 text-border opacity-50"
      />
      <div className="relative border-t border-border pt-8">
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
