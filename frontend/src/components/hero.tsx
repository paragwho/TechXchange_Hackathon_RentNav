'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function Hero() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = useMemo(() => [
    "Ask watsonx about rental house nearby",
    "Ask watsonx about legal rights of tenants",
    "Find budget-friendly flats in your city",
    "What documents do I need to rent?",
  ], []);

  useEffect(() => {
    const iv = setInterval(() => setPlaceholderIndex((i) => (i + 1) % placeholders.length), 3000);
    return () => clearInterval(iv);
  }, [placeholders.length]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden"
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }}
    >
      <motion.div style={{ rotateX, rotateY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-400/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-purple-400/20 blur-3xl" />
        <motion.div
          className="absolute inset-0"
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundImage: "radial-gradient(60rem_40rem_at_20%_20%,rgba(14,165,233,.12),transparent),radial-gradient(40rem_24rem_at_80%_60%,rgba(139,92,246,.12),transparent)" }}
        />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 py-28 sm:py-36 lg:py-44 grid place-items-center">
        <div className="flex flex-col items-center text-center gap-8 w-full">
          <div className="relative select-none">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
              <span className="inline-block [text-shadow:0_2px_0_#00000010,0_8px_24px_rgba(2,6,23,.15)]">RentNav</span>
            </h1>
            <div aria-hidden className="absolute inset-0 -z-10 translate-y-2 blur-sm opacity-20 dark:opacity-30">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold">RentNav</h1>
            </div>
          </div>
          <SearchBar placeholders={placeholders} placeholderIndex={placeholderIndex} />
        </div>
      </div>
    </section>
  );
}

function SearchBar({ placeholders, placeholderIndex }: { placeholders: string[]; placeholderIndex: number }) {
  const [value, setValue] = useState("");
  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  const startNewChat = () => {
    if (value.trim()) {
      router.push(`/chat?prompt=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startNewChat();
      }}
      className="w-full max-w-3xl"
    >
      <div className="rounded-2xl shadow-[0_12px_40px_-12px_rgba(2,6,23,.25)] ring-1 ring-slate-900/5 dark:ring-white/10 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="flex items-end gap-2 p-3 sm:p-4">
          <label htmlFor="query" className="sr-only">Search</label>
          <textarea
            id="query"
            ref={areaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholders[placeholderIndex]}
            className="flex-1 resize-none border-0 bg-transparent focus-visible:ring-0 focus:outline-none text-base sm:text-lg leading-relaxed min-h-[3.25rem]"
            aria-multiline
          />
          <button type="submit" className="shrink-0 rounded-xl h-11 px-4 inline-flex items-center gap-2 bg-sky-600 text-white hover:opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M21 21l-4.35-4.35m2.6-6.15a8.25 8.25 0 11-16.5 0 8.25 8.25 0 0116.5 0z"/></svg>
            <span>Search</span>
          </button>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Tip: Paste multi-line questions. Press Enter for new line, Shift+Enter to submit.</p>
    </form>
  );
}
