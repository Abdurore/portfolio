import { EMAIL, profile } from "@/data/profile";
import { AlmondLeaf } from "./AlmondBranch";
import { Content, Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" label="Clearing" heading="Get in touch">
      <Content className="mt-6">
        <p>Hiring, or have something worth building?</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href={`mailto:${EMAIL}`} className="link contact-email">
            {EMAIL}
          </a>
          <AlmondLeaf className="h-12 w-[5.5rem] shrink-0" />
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-1">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="link inline-flex min-h-11 min-w-6 items-center">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Content>
    </Section>
  );
}
