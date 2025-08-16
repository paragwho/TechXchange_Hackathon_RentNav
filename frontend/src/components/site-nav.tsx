"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, Home, MessageSquare, LibraryBig, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SiteNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const firstFocus = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    if (open) firstFocus.current?.focus();
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-2xl px-3 py-2 sm:px-4 sm:py-3 bg-transparent">
          <div className="flex items-center gap-2">
            <button
              aria-label="Open menu"
              className="rounded-full size-10 grid place-items-center hover:bg-slate-900/5 dark:hover:bg-white/10"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <Link href="/" className="font-semibold tracking-tight text-xl sm:text-2xl">
              RentNav
            </Link>
          </div>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-full size-10 grid place-items-center hover:bg-slate-900/5 dark:hover:bg-white/10"
          >
            {resolvedTheme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
            <motion.div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl p-4 flex flex-col gap-2"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="px-2 py-1 font-semibold text-lg">Menu</div>
              <div className="mt-2 flex flex-col gap-1">
                <DrawerLink refEl={firstFocus} href="/" icon={<Home className="size-5" />} label="Home" onClick={() => setOpen(false)} />
                <DrawerLink href="/my-chat" icon={<MessageSquare className="size-5" />} label="Chats" onClick={() => setOpen(false)} />
                <DrawerLink href="/legal-rights-library" icon={<LibraryBig className="size-5" />} label="Legal Rights Library" onClick={() => setOpen(false)} />
                <DrawerLink href="/how-it-works" icon={<Info className="size-5" />} label="How It Works" onClick={() => setOpen(false)} />
              </div>
              <div className="mt-auto text-xs text-slate-500 dark:text-slate-400 px-2">© {new Date().getFullYear()} RentNav</div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DrawerLink({ href, icon, label, onClick, refEl }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500"
      ref={refEl}
    >
      {icon}
      <span className="text-base">{label}</span>
    </Link>
  );
}
