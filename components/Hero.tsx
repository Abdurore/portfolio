import Image from "next/image";
import { profile } from "@/data/profile";
import { AlmondBranch } from "./AlmondBranch";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="section !pt-10 !pb-8 lg:!pt-16">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:grid-rows-[auto_auto_1fr] lg:gap-x-6 lg:gap-y-8">
          <div className="lg:col-span-7 lg:row-start-1">
            <h1 id="hero-heading">{profile.name}</h1>
            <p className="mt-3 font-serif text-2xl italic text-ink-soft">
              {profile.handle}
            </p>
            <p className="mt-6 text-lg">{profile.lede}</p>
          </div>

          {/* The portrait is mounted as a specimen. A tropical almond branch
              is pressed under it, paper tape holds the top corners, and the
              label overlaps the bottom-left corner on desktop (it sits
              underneath on mobile). */}
          <div className="relative mx-auto w-full max-w-[420px] lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:mx-0 lg:mb-32 lg:self-start lg:justify-self-end">
            <div className="settle-sheet relative">
              <AlmondBranch className="absolute left-0 top-0 z-0 origin-top-left translate-x-12 scale-50 sm:translate-x-0 sm:scale-100" />
              <div className="sheet relative z-10">
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
              </div>
              <span className="tape tape-left" aria-hidden="true" />
              <span className="tape tape-right" aria-hidden="true" />
            </div>

            <p className="settle-label mt-4 font-serif text-[15px] italic text-ink-soft lg:absolute lg:right-0 lg:top-[calc(100%+12px)] lg:mt-0">
              Terminalia catappa, Lagos
            </p>

            <div className="label-block settle-label mt-4 lg:absolute lg:-bottom-32 lg:-left-16 lg:z-30 lg:mt-0 lg:w-[19rem]">
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
