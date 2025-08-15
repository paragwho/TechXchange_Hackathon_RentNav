"use client";
import { SiteNav } from "@/components/site-nav";
import { TiltCard } from "@/components/cards";
import { useState } from "react";
import { PdfDialog } from "@/components/pdf-dialog";

const docs = [
  { id: 1, title: "Model Tenancy Act (India) – Summary PDF", path: "/pdfs/model-tenancy-act-summary.pdf" },
  { id: 2, title: "Security Deposit Rules – State-wise", path: "/pdfs/security-deposit-rules.pdf" },
  { id: 3, title: "Notice Periods & Eviction – Quick Guide", path: "/pdfs/notice-eviction-guide.pdf" },
  { id: 4, title: "Maintenance Responsibilities – Landlord vs Tenant", path: "/pdfs/maintenance-landlord-tenant.pdf" },
];

export default function LegalPage() {
  const [active, setActive] = useState<{title: string, path: string} | null>(null);
  return (
    <>
      <SiteNav />
      <main className="pt-24 mx-auto max-w-7xl px-4">
        <header className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">Legal Rights Library</h2>
          <p className="text-slate-600 dark:text-slate-400">Trusted references about tenant rights & rental law.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {docs.map((d) => (
            <TiltCard key={d.id}>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{d.title}</h3>
                <button className="mt-4 rounded-xl bg-sky-600 text-white px-4 h-10 hover:opacity-90" onClick={() => setActive({title: d.title, path: d.path})}>
                  Open PDF
                </button>
              </div>
            </TiltCard>
          ))}
        </div>

        {active && <PdfDialog title={active.title} src={active.path} onClose={() => setActive(null)} />}
      </main>
    </>
  );
}
