import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="shell py-10 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-2">
            <p>Grown in Lagos.</p>
            <p className="small text-ink-soft">© 2026 {profile.name}</p>
          </div>

          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/accessibility"
                className="link inline-flex min-h-11 items-center"
              >
                Accessibility statement
              </Link>
            </li>
            <li>
              <Link
                href="/accessibility-audit"
                className="link inline-flex min-h-11 items-center"
              >
                Accessibility audits
              </Link>
            </li>
          </ul>

          <div className="flex flex-col gap-1">
            <p lang="ar" dir="rtl" className="font-arabic text-left text-3xl leading-snug">
              إن مع العسر يسرا
            </p>
            <p className="small text-ink-soft">With hardship comes ease.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
