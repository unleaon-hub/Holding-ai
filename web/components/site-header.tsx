import Link from "next/link";

const navLinks = [
  { href: "/magic", label: "Как работает" },
  { href: "/prices", label: "Тарифы" },
  { href: "/dashboard", label: "Дашборд" },
  { href: "/blog", label: "Блог" },
  { href: "/legal", label: "Документы" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0d0d0d]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="text-sm font-medium tracking-[0.18em] text-white transition-opacity hover:opacity-90"
        >
          AI SITE ENGINE
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/start"
          className="rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/14 hover:shadow-[0_0_0_5px_rgba(255,255,255,0.07)]"
        >
          Начать
        </Link>
      </div>
    </header>
  );
}
