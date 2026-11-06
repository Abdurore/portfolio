import type { ReactNode } from "react";

/**
 * Homepage section scaffold: the botanical name sits quietly beside the h2
 * (margin column on desktop, inline after the text below 1024px; always
 * aria-hidden), and the section padding lives in .section and nowhere else.
 */
export function Section({
  id,
  label,
  heading,
  children,
}: {
  id: string;
  label?: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="section">
      <div className="shell">
        <div className="grid-12">
          {label ? (
            <p className="margin-label col-margin" aria-hidden="true">
              {label}
            </p>
          ) : null}
          <h2 id={`${id}-heading`} className="col-content">
            {heading}
            {/* Below 1024px the botanical name follows the h2 text inline.
                aria-hidden keeps it out of the heading's accessible name. */}
            {label ? (
              <span className="margin-label-inline" aria-hidden="true">
                {label}
              </span>
            ) : null}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

/** Content that sits in columns 3-11, under the h2. */
export function Content({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="grid-12">
      <div className={`col-content ${className}`}>{children}</div>
    </div>
  );
}
