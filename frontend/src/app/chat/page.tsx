'use client';
import { SiteNav } from '@/components/site-nav';
import { ChatShell } from '@/components/chat-ui';

export default function ChatPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-20 sm:pt-24">
        <ChatShell />
      </main>
    </>
  );
}