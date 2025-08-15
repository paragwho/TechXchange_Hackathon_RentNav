import { SiteNav } from "@/components/site-nav";
import { TiltCard } from "@/components/cards";

const steps = [
  { id: 1, title: "Describe your need", desc: "Tell watsonx about your budget, location & must-haves.", icon: "🔎" },
  { id: 2, title: "Get curated insights", desc: "We blend listings with legal context for safer renting.", icon: "📚" },
  { id: 3, title: "Know your rights", desc: "Quick access to documents and state-specific rules.", icon: "⚖️" },
  { id: 4, title: "Save & resume", desc: "Your chats auto-save. Pick any past thread to continue.", icon: "💾" },
];

export default function HowPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-24 mx-auto max-w-7xl px-4">
        <header className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">How It Works</h2>
          <p className="text-slate-600 dark:text-slate-400">Four simple steps to smarter renting.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {steps.map((s, idx) => (
            <TiltCard key={s.id}>
              <div className="p-5">
                <div className="flex items-center gap-3 text-lg font-semibold">
                  <span className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 size-8">{s.icon}</span>
                  <span>{idx + 1}. {s.title}</span>
                </div>
                <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </main>
    </>
  );
}
