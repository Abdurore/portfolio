import { EMAIL, profile } from "@/data/profile";
import { Content, Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" label="Clearing" heading="Get in touch">
      <Content className="mt-6">
        <p>
          Hiring, or have something worth building? Email{" "}
          <a href={`mailto:${EMAIL}`} className="link">
            {EMAIL}
          </a>
          .
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
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
