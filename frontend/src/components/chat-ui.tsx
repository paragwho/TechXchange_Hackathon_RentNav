"use client";
import { useEffect, useRef, useState } from "react";

export function WaveStrip() {
  return (
    <div className="relative h-20 sm:h-28">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden>
        <path
          fill="currentColor"
          className="text-sky-500/20 dark:text-sky-400/20"
          d="M0,64L60,64C120,64,240,64,360,96C480,128,600,192,720,192C840,192,960,128,1080,112C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>
    </div>
  );
}

export function ChatShell() {
  const [messages, setMessages] = useState<{ id: number; role: "user"|"bot"; text: string }[]>([
    { id: 1, role: "bot", text: "Hi! I’m watsonx. Ask me about rentals, tenant rights, or neighborhoods." },
  ]);
  const [input, setInput] = useState("");
  const viewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    viewRef.current?.scrollTo({ top: viewRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { id: Date.now(), role: "user", text: userText }]);

    // Call dummy API
    try {
      const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ message: userText }) });
      const data = await res.json();
      setMessages((m) => [...m, { id: Date.now() + 1, role: "bot", text: data.reply }]);
    } catch (e) {
      setMessages((m) => [...m, { id: Date.now() + 1, role: "bot", text: "(Demo) Error calling API, but here's an echo: " + userText }]);
    }
    setInput("");
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div
        ref={viewRef}
        className="mt-6 h-[58vh] md:h-[62vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur p-4 overflow-y-auto scroll-smooth"
        role="log" aria-live="polite"
      >
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${m.role === "user" ? "bg-sky-600 text-white rounded-br-md" : "bg-slate-100 dark:bg-slate-800 rounded-bl-md"}`}>
                {m.text.split("\n").map((line, i) => (
                  <p key={i} className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form className="mt-4 flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <label htmlFor="chat-input" className="sr-only">Type your message</label>
        <textarea
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
          className="flex-1 resize-none min-h-[3rem] max-h-40 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent p-3 focus:outline-none"
        />
        <button type="submit" className="h-11 px-5 rounded-xl bg-sky-600 text-white hover:opacity-90">Send</button>
      </form>
    </div>
  );
}
