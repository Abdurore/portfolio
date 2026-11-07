import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Project } from "@/data/projects";
import { JaayorunPlate } from "./JaayorunPlate";

const LARGE_SIZES = "(min-width: 1024px) 796px, calc(100vw - 90px)";
const SMALL_SIZES =
  "(min-width: 1024px) 365px, (min-width: 640px) calc(100vw - 114px), calc(100vw - 90px)";
// Wide sheet: the image sits in the left 5 of the sheet's 12 columns.
const WIDE_SIZES =
  "(min-width: 1024px) 318px, (min-width: 640px) calc(100vw - 114px), calc(100vw - 90px)";
// Portrait phone screenshots are never taller than this.
const PORTRAIT_MAX_HEIGHT = 480;

const present = (src: string) => existsSync(join(process.cwd(), "public", src));

/** Whether the project has anything to show in an image area. */
function hasVisual(project: Project) {
  if (project.slug === "jaayorun") return true; // drawn plate, no screenshot
  // A missing file means no image area at all (never a blank box).
  if (project.portraitImages?.length) {
    return project.portraitImages.every((i) => present(i.src));
  }
  return !!project.image && present(project.image.src);
}

function Visual({ project, sizes }: { project: Project; sizes: string }) {
  if (project.slug === "jaayorun") {
    return (
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border border-rule bg-paper p-4">
        <JaayorunPlate />
      </div>
    );
  }

  // Portrait phone screenshots: side by side, centred in the sheet, each at
  // most 480px tall, a 1px rule border, no device frame.
  if (project.portraitImages?.length) {
    return (
      <div className="flex justify-center gap-4">
        {project.portraitImages.map((img) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            sizes={`(min-width: 640px) ${Math.floor((PORTRAIT_MAX_HEIGHT * img.width) / img.height)}px, 45vw`}
            className="h-auto w-full border border-rule"
            style={{
              aspectRatio: `${img.width} / ${img.height}`,
              maxWidth: `min(calc(50% - 8px), ${Math.floor((PORTRAIT_MAX_HEIGHT * img.width) / img.height)}px)`,
            }}
          />
        ))}
      </div>
    );
  }

  const img = project.image!;
  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border border-rule bg-paper">
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        sizes={sizes}
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
  const wide = project.layout === "wide" && visual;
  const sizes = large ? LARGE_SIZES : wide ? WIDE_SIZES : SMALL_SIZES;

  const text = (
    <div>
      <p>{project.description}</p>
      {project.architecture ? (
        <p className="small mt-4 text-ink-soft">{project.architecture}</p>
      ) : null}
    </div>
  );
  const label = (
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
                  <a href={l.href} className="link inline-flex min-h-6 items-center">
                    {l.label}
                  </a>
                </li>
              ))}
              {project.linksNote ? <li>{project.linksNote}</li> : null}
            </ul>
          ) : (
            project.linksNote
          )}
        </dd>
      </dl>
    </div>
  );

  return (
    <article className="sheet" aria-labelledby={titleId}>
      <h3 id={titleId}>{project.name}</h3>

      {wide ? (
        // At >=1024px: image in the left 5 columns, text and label in the
        // right 7. Below that it stacks exactly like the other sheets.
        <div className="mt-4 lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <Visual project={project} sizes={sizes} />
          </div>
          <div className="mt-6 flex flex-col gap-6 lg:col-span-7 lg:mt-0">
            {text}
            {label}
          </div>
        </div>
      ) : (
        <>
          {visual ? (
            <div className="mt-4">
              <Visual project={project} sizes={sizes} />
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
            {text}
            {label}
          </div>
        </>
      )}
    </article>
  );
}
