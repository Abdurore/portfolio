import { experience, profile } from "@/data/profile";
import { Content, Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" label="Rings" heading="Experience">
      <ol className="timeline mt-10">
        {experience.map((e) => (
          <li key={e.title}>
            <p className="timeline-date">{e.dates}</p>
            <div className="timeline-body">
              <h3>{e.title}</h3>
              {e.org ? <p className="small mt-1 text-ink-soft">{e.org}</p> : null}
              {e.note ? <p className="small mt-1 text-ink-soft">{e.note}</p> : null}
              <p className="mt-2">{e.description}</p>
              {e.link ? (
                <p className="mt-1">
                  <a
                    href={e.link.href}
                    className="link inline-flex min-h-6 items-center"
                  >
                    {e.link.label}
                  </a>
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <Content className="mt-16">
        <h3>Credentials</h3>
        <ul className="mt-3 list-disc pl-5">
          {profile.credentials.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Content>
    </Section>
  );
}
