import Link from "next/link";

const footerColumns = [
  {
    title: "PRODUCTS",
    links: ["Scale Data Engine", "Scale GenAI Platform", "Scale Donovan"],
  },
  {
    title: "COMPANY",
    links: ["About", "Careers", "Security", "Terms", "Privacy", "Modern Slavery Statement"],
  },
  {
    title: "RESOURCES",
    links: ["Blog", "Contact Us", "Events", "Documentation", "Guides", "Community", "Research"],
  },
  {
    title: "GUIDES",
    links: [
      "Data Labeling",
      "ML Model Training",
      "Diffusion Models",
      "Guide to AI for eCommerce",
      "Computer Vision Applications",
      "Large Language Models",
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#0d0d0d]">
      <div className="section-shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr_1fr_1.2fr_auto]">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs tracking-[0.2em] text-zinc-400">{column.title}</h3>
              <ul className="mt-4 space-y-2.5 text-[1rem] leading-6 text-zinc-300">
                {column.links.map((item) => (
                  <li key={item}>
                    <Link href="#" className="transition-colors hover:text-zinc-100">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs tracking-[0.2em] text-zinc-400">FOLLOW US</h3>
            <div className="mt-5 flex items-center gap-3 text-zinc-300">
              <Link
                href="#"
                aria-label="X"
                className="rounded-full border border-white/12 p-2 transition hover:border-white/24 hover:text-zinc-100"
              >
                <span className="inline-block w-4 text-center text-sm leading-none">X</span>
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="rounded-full border border-white/12 p-2 transition hover:border-white/24 hover:text-zinc-100"
              >
                <span className="inline-block w-4 text-center text-sm leading-none">f</span>
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="rounded-full border border-white/12 p-2 transition hover:border-white/24 hover:text-zinc-100"
              >
                <span className="inline-block w-4 text-center text-[0.72rem] leading-none">in</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/8 pt-6 text-sm text-zinc-400 md:flex md:items-center md:justify-between">
          <p>Copyright © 2026 Scale AI, Inc. All rights reserved.</p>
          <Link href="/legal" className="mt-3 inline-block transition-colors hover:text-zinc-200 md:mt-0">
            Terms of Use & Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
