import Link from "next/link";
import { Content, Section } from "./Section";

const LABEL = [
  { key: "Standard", value: "WCAG 2.1 AA" },
  { key: "Method", value: "keyboard, NVDA, axe-core" },
  { key: "Report", value: "severity-ranked PDF" },
];

export function AuditsTeaser() {
  return (
    <Section id="audits" label="Sunlight" heading="Accessibility audits">
      <Content className="mt-6">
        <div className="sheet grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:items-start">
          <div>
            <p>
              I audit websites against WCAG 2.1 AA by hand, with a keyboard and
              the NVDA screen reader, backed by an automated scan. You get a
              severity-ranked report with fix guidance for every issue.
              It&apos;s built for agencies shipping US public-sector sites ahead
              of the ADA Title II deadlines.
            </p>
            <p className="mt-6">
              <Link href="/accessibility-audit" className="btn-primary">
                See audit packages
              </Link>
            </p>
          </div>
          <div className="label-block">
            <dl>
              {LABEL.map((row) => (
                <div key={row.key} className="contents">
                  <dt>{row.key}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Content>
    </Section>
  );
}
