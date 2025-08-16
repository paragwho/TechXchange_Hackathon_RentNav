'use client';
import { SiteNav } from '@/components/site-nav';
import { TiltCard } from '@/components/cards';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Conversation {
  id: string;
  title: string;
  messages: any[];
}

export default function MyChatPage() {
  const [conversations, setConversations] = useState<Record<string, Conversation>>({});
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('chat-conversations');
    if (savedData) {
      setConversations(JSON.parse(savedData));
    }
  }, []);

  const handleRename = (convId: string) => {
    const updatedConv = { ...conversations[convId], title: renameValue };
    const updatedConversations = { ...conversations, [convId]: updatedConv };
    setConversations(updatedConversations);
    localStorage.setItem('chat-conversations', JSON.stringify(updatedConversations));
    setRenamingId(null);
  };

  const deleteConversation = (convId: string) => {
    const updatedConversations = { ...conversations };
    delete updatedConversations[convId];
    setConversations(updatedConversations);
    localStorage.setItem('chat-conversations', JSON.stringify(updatedConversations));
  };

  return (
    <>
      <SiteNav />
      <main className="pt-24 mx-auto max-w-7xl px-4">
        <header className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">Chats</h2>
          <p className="text-slate-600 dark:text-slate-400">Pick up where you left off.</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Object.values(conversations).map((c) => (
            <TiltCard key={c.id}>
              <div className="p-5 flex flex-col h-full">
                {renamingId === c.id ? (
                  <input
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={() => handleRename(c.id)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRename(c.id)}
                    className="bg-transparent w-full text-lg font-semibold"
                    autoFocus
                  />
                ) : (
                  <h3 className="text-lg font-semibold flex-1">{c.title}</h3>
                )}
                <div className="mt-4 flex justify-between items-center">
                  <Link className="text-sm text-sky-600 hover:underline" href={`/chat?id=${c.id}`}>Open chat</Link>
                  <div>
                    <button onClick={() => { setRenamingId(c.id); setRenameValue(c.title); }} className="text-sm text-blue-500 hover:underline mr-2">Rename</button>
                    <button onClick={() => deleteConversation(c.id)} className="text-sm text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </main>
    </>
  );
}