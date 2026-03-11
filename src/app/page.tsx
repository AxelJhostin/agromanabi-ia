"use client";

import { useRef, useState } from "react";
import ChatBox from "@/components/ChatBox";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type QueuedMessage = {
  id: number;
  text: string;
} | null;

export default function Home() {
  const [queuedMessage, setQueuedMessage] = useState<QueuedMessage>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const queuedIdRef = useRef(0);

  function handleQuickActionSelect(value: string) {
    if (isChatLoading) return;

    queuedIdRef.current += 1;
    setQueuedMessage({ id: queuedIdRef.current, text: value });
  }

  return (
    <main className="h-screen overflow-hidden bg-[#f3eedc] text-[#1f3e2c]">
      <div className="flex h-full flex-col">
        <div className="sticky top-0 z-20 shrink-0">
          <Header />
        </div>

        <div className="mx-auto flex w-full max-w-[1280px] flex-1 min-h-0 flex-col gap-4 p-4 md:p-6 lg:flex-row">
          <section className="h-64 shrink-0 lg:h-full lg:w-[300px]">
            <Sidebar
              onQuickActionSelect={handleQuickActionSelect}
              quickActionsDisabled={isChatLoading}
            />
          </section>

          <section className="min-h-0 flex-1">
            <ChatBox queuedMessage={queuedMessage} onLoadingChange={setIsChatLoading} />
          </section>
        </div>
      </div>
    </main>
  );
}
