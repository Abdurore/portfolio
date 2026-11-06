import { alsoBuilt, projects } from "@/data/projects";
import { Content, Section } from "./Section";
import { Specimen } from "./Specimen";

export function Work() {
  const [euphorium, jaayorun, ...rest] = projects;
  return (
    <Section id="work" label="Branches" heading="Selected work">
      <Content className="mt-10 flex flex-col gap-6">
        <Specimen project={euphorium} large />
        <Specimen project={jaayorun} large />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {rest.map((p) => (
            <Specimen key={p.slug} project={p} />
          ))}
        </div>

        <div className="mt-4 border-t border-rule pt-6">
          <h3>Also built</h3>
          <p className="mt-2">
            <strong className="font-medium">{alsoBuilt.name}.</strong>{" "}
            {alsoBuilt.description} {alsoBuilt.builtWith.join(", ")}.{" "}
            {alsoBuilt.note}.
          </p>
        </div>
      </Content>
    </Section>
  );
}
