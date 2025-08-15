"use client";
export function PdfDialog({ title, src, onClose }: { title: string, src: string, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl w-[90vw] max-w-4xl p-4 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">{title}</h3>
          <button className="text-sm opacity-80 hover:opacity-100" onClick={onClose}>Close</button>
        </div>
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <iframe src={src} className="w-full aspect-video" title={title} />
        </div>
      </div>
    </div>
  );
}
