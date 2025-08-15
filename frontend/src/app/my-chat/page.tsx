import { SiteNav } from "@/components/site-nav";
import { TiltCard } from "@/components/cards";
import Link from "next/link";

const conversations = [
  { id: 1, title: "Bangalore 2BHK under 25k", preview: "Listings near Indiranagar…", date: "Aug 12, 2025" },
  { id: 2, title: "Tenant eviction rules", preview: "Section 106 & notice…", date: "Aug 9, 2025" },
  { id: 3, title: "Pune pet-friendly flats", preview: "Kothrud, Baner options…", date: "Aug 3, 2025" },
  { id: 4, title: "Documents required", preview: "Aadhaar, PAN, address…", date: "Jul 29, 2025" },
];

export default function MyChatPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-24 mx-auto max-w-7xl px-4">
        <header className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">My Chat</h2>
          <p className="text-slate-600 dark:text-slate-400">Pick up where you left off.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {conversations.map((c) => (
            <TiltCard key={c.id}>
              <div className="p-5" role="button">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{c.preview}</p>
                <p className="mt-3 text-xs text-slate-500">{c.date}</p>
                <Link className="mt-4 inline-block text-sm text-sky-600 hover:underline" href="/chat">Open conversation →</Link>
              </div>
            </TiltCard>
          ))}
        </div>
      </main>
    </>
  );
}
