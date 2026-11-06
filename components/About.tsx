import { profile } from "@/data/profile";
import { Content, Section } from "./Section";

export function About() {
  return (
    <Section id="about" label="Roots" heading="About">
      <Content className="mt-6">
        {/* TODO(abdul): edit this paragraph into your own voice. */}
        <p>
          I&apos;m a third-year Mechatronics Engineering student at LASUSTECH,
          with a minor in Computer Software and Media Applications, graduating
          in 2028. I taught myself web development and have been building for
          over two years. Engineering school shaped how I work: I want to
          understand the whole system before I change one part of it.
          I&apos;m currently learning cloud infrastructure and machine
          learning. Away from the keyboard: plants, trees, and Liverpool.{" "}
          <abbr title="You'll Never Walk Alone">YNWA</abbr>.
        </p>

        <h3 className="mt-10">Skills</h3>
        <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-[max-content_1fr]">
          {profile.skillGroups.map((g) => (
            <div key={g.label} className="contents">
              <dt className="text-ink-soft">{g.label}</dt>
              <dd>{g.skills.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Content>
    </Section>
  );
}
