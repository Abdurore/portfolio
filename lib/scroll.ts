/** Smooth-scroll to a section, unless the user wants less motion. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.getAttribute("data-still") === "true";
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}
