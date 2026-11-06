import Link from "next/link";
import { Content, Section } from "./Section";

export function AuditsTeaser() {
  return (
    <Section id="audits" label="Sunlight" heading="Accessibility audits">
      <Content className="mt-6">
        <p>
          I audit websites against WCAG 2.1 AA by hand, with a keyboard and the
          NVDA screen reader, backed by an automated scan. You get a
          severity-ranked report with fix guidance for every issue. It&apos;s
          built for agencies shipping US public-sector sites ahead of the ADA
          Title II deadlines.
        </p>
        <p className="mt-6">
          <Link href="/accessibility-audit" className="btn-primary">
            See audit packages
          </Link>
        </p>
      </Content>
    </Section>
  );
}
