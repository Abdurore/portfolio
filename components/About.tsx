import { profile } from "@/data/profile";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" label="Roots" heading="About">
      <div className="grid-12 mt-6">
        <div className="lg:col-[3/span_5]">
          {/* TODO(abdul): edit this paragraph into your own voice. */}
          <p>
            I&apos;m a third-year Mechatronics Engineering student at LASUSTECH,
            with a minor in Computer Software and Media Applications,
            graduating in 2028. I taught myself web development and have been
            building for over two years. Engineering school shaped how I work:
            I want to understand the whole system before I change one part of
            it. I&apos;m currently learning cloud infrastructure and machine
            learning. Away from the keyboard: plants, trees, and Liverpool.{" "}
            <abbr title="You'll Never Walk Alone">YNWA</abbr>.
          </p>
        </div>

        {/* Skills mounted as a specimen label in the right-hand columns. */}
        <div className="label-block mt-10 lg:col-[8/span_4] lg:mt-0">
          <h3 className="mb-4">Skills</h3>
          <dl>
            {profile.skillGroups.map((g) => (
              <div key={g.label} className="contents">
                <dt>{g.label}</dt>
                <dd>{g.skills.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
