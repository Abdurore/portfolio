import Image from "next/image";
import { profile } from "@/data/profile";
import { Sprig } from "./Sprig";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="section !pt-10 lg:!pt-16">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-8">
          <div className="lg:col-span-7 lg:row-start-1">
            <h1 id="hero-heading">{profile.name}</h1>
            <p className="mt-3 font-serif text-2xl italic text-ink-soft">
              {profile.handle}
            </p>
            <p className="mt-6 text-lg">{profile.lede}</p>
          </div>

          {/* Portrait mounted as a specimen: the label overlaps its
              bottom-left corner on desktop and sits underneath on mobile. */}
          <div className="relative mx-auto w-full max-w-[420px] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:mb-20 lg:max-w-none">
            <div className="sheet settle-sheet relative lg:max-w-[420px]">
              <Image
                src="/headshot-v5.jpg"
                alt="Portrait of Abdulhameed Oreagba, smiling slightly."
                width={960}
                height={1280}
                preload
                fetchPriority="high"
                sizes="(min-width: 468px) 372px, calc(100vw - 90px)"
                className="h-auto w-full"
              />
              <Sprig className="pointer-events-none absolute -right-5 -top-12 h-44 w-24" />
            </div>
            <div className="label-block settle-label mt-4 lg:absolute lg:-bottom-20 lg:-left-12 lg:mt-0 lg:w-[19rem]">
              <dl>
                {profile.specimen.map((row) => (
                  <div key={row.key} className="contents">
                    <dt>{row.key}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:col-span-7 lg:row-start-2">
            <a href="#work" className="btn-primary">
              See my work
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="link inline-flex min-h-11 items-center"
            >
              Download résumé (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
