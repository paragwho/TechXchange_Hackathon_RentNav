import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";

export default function Page() {
  return (
    <>
      <SiteNav />
      <main className="pt-20 sm:pt-24">
        <Hero />
        <footer className="mt-24 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Rent Housing Navigator</p>
            <div className="flex items-center gap-4">
              <a className="hover:underline" href="/legal-rights-library">Legal Rights Library</a>
              <a className="hover:underline" href="/how-it-works">How It Works</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
