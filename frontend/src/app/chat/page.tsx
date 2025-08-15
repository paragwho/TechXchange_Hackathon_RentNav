"use client";
import { SiteNav } from "@/components/site-nav";
import { WaveStrip, ChatShell } from "@/components/chat-ui";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();
  return (
    <>
      <SiteNav />
      <main className="pt-20 sm:pt-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 py-1">
            <button onClick={() => router.push("/")} aria-label="Go back" className="rounded-full size-10 grid place-items-center hover:bg-slate-900/5 dark:hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/></svg>
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">Chat with watsonx</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Ask anything about rentals, rights & more</p>
            </div>
          </div>
        </div>
        <WaveStrip />
        <ChatShell />
      </main>
    </>
  );
}
