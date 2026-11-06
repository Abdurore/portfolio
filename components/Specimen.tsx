import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Project } from "@/data/projects";
import { JaayorunPlate } from "./JaayorunPlate";

const LARGE_SIZES = "(min-width: 1024px) 796px, calc(100vw - 90px)";
const SMALL_SIZES =
  "(min-width: 1024px) 365px, (min-width: 640px) calc(100vw - 114px), calc(100vw - 90px)";

/** Whether the project has anything to show in an image area. */
function hasVisual(project: Project) {
  if (project.slug === "jaayorun") return true; // drawn plate, no screenshot
  const img = project.image;
  // No file yet means no image area at all (never a blank box).
  return !!img && existsSync(join(process.cwd(), "public", img.src));
}

function Visual({ project, large }: { project: Project; large: boolean }) {
  const frame =
    "relative flex aspect-[16/10] items-center justify-center overflow-hidden border border-rule bg-paper";

  if (project.slug === "jaayorun") {
    return (
      <div className={`${frame} p-4`}>
        <JaayorunPlate />
      </div>
    );
  }

  const img = project.image!;
  return (
    <div className={frame}>
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        sizes={large ? LARGE_SIZES : SMALL_SIZES}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

/** A project mounted as a specimen: image, description, and a label block. */
export function Specimen({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const titleId = `${project.slug}-title`;
  const visual = hasVisual(project);
  return (
    <article className="sheet" aria-labelledby={titleId}>
      <h3 id={titleId}>{project.name}</h3>
      {visual ? (
        <div className="mt-4">
          <Visual project={project} large={large} />
        </div>
      ) : null}

      <div
        className={
          large && visual
            ? "mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]"
            : visual
              ? "mt-6 flex flex-col gap-6"
              : "mt-4 flex flex-col gap-6"
        }
      >
        <div>
          <p>{project.description}</p>
          {project.architecture ? (
            <p className="small mt-4 text-ink-soft">{project.architecture}</p>
          ) : null}
        </div>

        <div className={`label-block ${large && visual ? "self-start" : "w-full"}`}>
          <dl>
            {project.role ? (
              <>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </>
            ) : null}
            <dt>Built with</dt>
            <dd>{project.builtWith.join(", ")}</dd>
            <dt>Status</dt>
            <dd>{project.status}</dd>
            <dt>Links</dt>
            <dd>
              {project.links.length > 0 ? (
                <ul className="m-0 list-none p-0">
                  {project.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="link inline-flex min-h-6 items-center"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                project.linksNote
              )}
            </dd>
          </dl>
        </div>
      </div>
    </article>
  );
}
