'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Helper to generate a unique ID
const uniqueId = () => `id_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;

// Define types for our data
interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

// Hook to manage conversations in localStorage
function useConversations() {
  const [conversations, setConversations] = useState<Record<string, Conversation>>({});
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const savedData = localStorage.getItem('chat-conversations');
    const savedConvs: Record<string, Conversation> = savedData ? JSON.parse(savedData) : {};
    setConversations(savedConvs);

    const convId = searchParams.get('id');
    const prompt = searchParams.get('prompt');

    if (prompt) {
      const newId = uniqueId();
      const newConversation: Conversation = {
        id: newId,
        title: prompt.substring(0, 30),
        messages: [{ id: uniqueId(), role: 'user', text: prompt }],
      };
      const updatedConvs = { ...savedConvs, [newId]: newConversation };
      setConversations(updatedConvs);
      setActiveConvId(newId);
      router.replace(`/chat?id=${newId}`);
    } else if (convId && savedConvs[convId]) {
      setActiveConvId(convId);
    } else if (Object.keys(savedConvs).length > 0) {
      const firstConvId = Object.keys(savedConvs)[0];
      setActiveConvId(firstConvId);
      router.replace(`/chat?id=${firstConvId}`);
    } else {
      startNewConversation();
    }
  }, []);

  useEffect(() => {
    if (Object.keys(conversations).length > 0) {
      localStorage.setItem('chat-conversations', JSON.stringify(conversations));
    } else {
        localStorage.removeItem('chat-conversations');
    }
  }, [conversations]);

  const startNewConversation = () => {
    const newId = uniqueId();
    const newConversation: Conversation = {
      id: newId,
      title: 'New Chat',
      messages: [],
    };
    setConversations(prev => ({ ...prev, [newId]: newConversation }));
    setActiveConvId(newId);
    router.push(`/chat?id=${newId}`);
  };

  const updateConversation = (convId: string, updatedMessages: Message[]) => {
    const updatedConv = { ...conversations[convId], messages: updatedMessages };
    if (updatedMessages.length === 1 && updatedMessages[0].role === 'user') {
      updatedConv.title = updatedMessages[0].text.substring(0, 30);
    }
    setConversations(prev => ({ ...prev, [convId]: updatedConv }));
  };

  const deleteConversation = (convId: string) => {
    const updatedConversations = { ...conversations };
    delete updatedConversations[convId];
    setConversations(updatedConversations);

    if (activeConvId === convId) {
      const remainingIds = Object.keys(updatedConversations);
      if (remainingIds.length > 0) {
        const newActiveId = remainingIds[0];
        setActiveConvId(newActiveId);
        router.push(`/chat?id=${newActiveId}`);
      } else {
        startNewConversation();
      }
    }
  };

  const renameConversation = (convId: string, newTitle: string) => {
    const updatedConv = { ...conversations[convId], title: newTitle };
    setConversations(prev => ({ ...prev, [convId]: updatedConv }));
  };

  return { conversations, activeConvId, setActiveConvId, startNewConversation, updateConversation, deleteConversation, renameConversation };
}

function ConversationList({ conversations, activeConvId, setActiveConvId, startNewConversation, deleteConversation, renameConversation }: any) {
  const router = useRouter();
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const handleRename = (convId: string) => {
    renameConversation(convId, renameValue);
    setRenamingId(null);
  };

  return (
    <div className="w-full md:w-64 lg:w-72 bg-slate-100 dark:bg-slate-800 p-3 flex flex-col">
      <button onClick={startNewConversation} className="mb-4 w-full rounded-lg bg-sky-600 text-white h-10 hover:opacity-90">
        + New Chat
      </button>
      <div className="flex-1 overflow-y-auto">
        {Object.values(conversations).map((conv: any) => (
          <div
            key={conv.id}
            onClick={() => {
              setActiveConvId(conv.id);
              router.push(`/chat?id=${conv.id}`);
            }}
            className={`group flex justify-between items-center p-3 rounded-lg cursor-pointer text-sm truncate ${activeConvId === conv.id ? 'bg-sky-200 dark:bg-sky-700' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
            {renamingId === conv.id ? (
              <input
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onBlur={() => handleRename(conv.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleRename(conv.id)}
                className="bg-transparent w-full"
                autoFocus
              />
            ) : (
              <span className="flex-1 truncate">{conv.title}</span>
            )}
            <div className="flex items-center opacity-0 group-hover:opacity-100">
                <button onClick={(e) => { e.stopPropagation(); setRenamingId(conv.id); setRenameValue(conv.title); }} className="ml-2 text-blue-500">Rename</button>
                <button onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); }} className="ml-2 text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatArea({ conversation, onMessageSend }: any) {
  const [input, setInput] = useState('');
  const viewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    viewRef.current?.scrollTo({ top: viewRef.current.scrollHeight, behavior: 'smooth' });
  }, [conversation?.messages]);

  const sendMessage = async (messageText?: string) => {
    const isInitialPrompt = !!messageText;
    const text = messageText || input.trim();
    if (!text || !conversation) return;

    const userMessage: Message = { id: uniqueId(), role: 'user', text };

    const messagesWithUser = isInitialPrompt
      ? conversation.messages
      : [...conversation.messages, userMessage];

    if (!isInitialPrompt) {
      onMessageSend(messagesWithUser);
    }
    
    setInput('');

    try {
      const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: text }) });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botMessage: Message = { id: uniqueId(), role: 'bot', text: data.reply };
      onMessageSend([...messagesWithUser, botMessage]);
    } catch (e) {
      const errorMessage: Message = { id: uniqueId(), role: 'bot', text: 'Error calling API' };
      onMessageSend([...messagesWithUser, errorMessage]);
    }
  };

  useEffect(() => {
    if (conversation && conversation.messages.length === 1 && conversation.messages[0].role === 'user') {
      sendMessage(conversation.messages[0].text);
    }
  }, [conversation]);

  if (!conversation) {
    return <div className="flex-1 p-4">Select or start a new conversation.</div>;
  }

  return (
    <div className="flex-1 flex flex-col p-4">
      <div ref={viewRef} className="flex-1 overflow-y-auto mb-4 space-y-4">
        {conversation.messages.map((m: Message) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${m.role === 'user' ? 'bg-sky-600 text-white rounded-br-md' : 'bg-slate-100 dark:bg-slate-800 rounded-bl-md'}`}>
              <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form className="flex items-end gap-2" onSubmit={e => { e.preventDefault(); sendMessage(); }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message…"
          className="flex-1 resize-none min-h-[3rem] max-h-40 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent p-3 focus:outline-none"
        />
        <button type="submit" className="h-11 px-5 rounded-xl bg-sky-600 text-white hover:opacity-90">Send</button>
      </form>
    </div>
  );
}

export function ChatShell() {
  const { conversations, activeConvId, setActiveConvId, startNewConversation, updateConversation, deleteConversation, renameConversation } = useConversations();

  const handleMessageSend = (updatedMessages: Message[]) => {
    if (activeConvId) {
      updateConversation(activeConvId, updatedMessages);
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex">
      <ConversationList
        conversations={conversations}
        activeConvId={activeConvId}
        setActiveConvId={setActiveConvId}
        startNewConversation={startNewConversation}
        deleteConversation={deleteConversation}
        renameConversation={renameConversation}
      />
      <ChatArea
        conversation={activeConvId ? conversations[activeConvId] : null}
        onMessageSend={handleMessageSend}
      />
    </div>
  );
}