"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
  createdAt: number;
};

type ChatApiResponse = {
  reply?: string;
  error?: string;
};

type QueuedMessage = {
  id: number;
  text: string;
};

type ChatBoxProps = {
  queuedMessage?: QueuedMessage | null;
  onLoadingChange?: (isLoading: boolean) => void;
};

const TIME_FORMATTER = new Intl.DateTimeFormat("es-EC", {
  hour: "2-digit",
  minute: "2-digit",
});

function createMessage(role: ChatMessage["role"], text: string): ChatMessage {
  return {
    role,
    text,
    createdAt: Date.now(),
  };
}

const INITIAL_BOT_MESSAGE: ChatMessage = createMessage(
  "bot",
  "Hola, soy AgroManabí IA. Puedo ayudarte con precios referenciales, temporadas de siembra, plagas comunes y cuidados de cultivos en Manabí."
);

function parseChatApiResponse(data: unknown): ChatApiResponse | null {
  if (typeof data !== "object" || data === null) {
    return null;
  }

  const record = data as { reply?: unknown; error?: unknown };

  return {
    reply: typeof record.reply === "string" ? record.reply : undefined,
    error: typeof record.error === "string" ? record.error : undefined,
  };
}

function formatTimestamp(value: number): string {
  return TIME_FORMATTER.format(value);
}

export default function ChatBox({ queuedMessage = null, onLoadingChange }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const lastQueuedMessageIdRef = useRef<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isInitialView = messages.length === 1 && messages[0]?.role === "bot";

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  const sendMessage = useCallback(
    async (customMessage?: string) => {
      if (isLoading) return;

      const isCustomMessage = typeof customMessage === "string";
      const rawMessage = isCustomMessage ? customMessage : input;
      const message = rawMessage.trim();

      if (!message) return;

      setMessages((prev) => [...prev, createMessage("user", message)]);

      if (!isCustomMessage) {
        setInput("");
      }

      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        const rawData: unknown = await res.json();
        const data = parseChatApiResponse(rawData);

        const fallback = res.ok
          ? "No se recibió respuesta del asistente."
          : "No se pudo obtener una respuesta en este momento.";

        const botText = data?.reply?.trim() || data?.error?.trim() || fallback;
        setMessages((prev) => [...prev, createMessage("bot", botText)]);
      } catch {
        setMessages((prev) => [
          ...prev,
          createMessage("bot", "Ocurrió un error al enviar tu mensaje."),
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading]
  );

  useEffect(() => {
    if (!queuedMessage) return;
    if (lastQueuedMessageIdRef.current === queuedMessage.id) return;

    lastQueuedMessageIdRef.current = queuedMessage.id;
    void sendMessage(queuedMessage.text);
  }, [queuedMessage, sendMessage]);

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    event.preventDefault();
    void sendMessage();
  }

  return (
    <section className="flex h-full min-h-[58vh] flex-col overflow-hidden rounded-xl border border-[#d8d0b9] bg-[#f8f2df] shadow-sm sm:min-h-[62vh] sm:rounded-2xl lg:min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5 md:px-6">
        <div className="flex min-h-full flex-col">
          {isInitialView ? (
            <div className="mx-auto mb-3 max-w-2xl rounded-2xl border border-[#e4dbc3] bg-[#f5edd7]/80 px-4 py-4 text-center sm:mb-4 sm:px-5 sm:py-5">
              <p className="inline-flex items-center rounded-full border border-[#d5c9ab] bg-[#f9f3df] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#3f5f44] sm:px-3 sm:text-xs">
                Orientación agrícola local
              </p>
              <h2 className="mt-2.5 text-lg font-semibold text-[#24402d] sm:mt-3 sm:text-xl md:text-2xl">
                Bienvenido a AgroManabí IA
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#536a54] sm:text-sm">
                Haz consultas prácticas sobre café, cacao, maíz y paja toquilla para apoyar tus
                decisiones del día a día en Manabí.
              </p>
            </div>
          ) : null}

          <div className={`space-y-3 pb-2 sm:space-y-4 ${isInitialView ? "" : "mt-auto lg:mt-0"}`}>
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";

              return (
                <div
                  key={`${msg.role}-${msg.createdAt}-${index}`}
                  className={`flex items-end gap-2 ${isUser ? "flex-row-reverse justify-start" : "justify-start"}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold sm:h-9 sm:w-9 sm:text-xs ${
                      isUser
                        ? "border border-[#8fb49a] bg-[#2f6b3f] text-[#f3f8ef]"
                        : "border border-[#c8bea4] bg-[#f0e7cb] text-[#2d5137]"
                    }`}
                  >
                    {isUser ? "Tú" : "AI"}
                  </div>

                  <div className="max-w-[90%] sm:max-w-[84%]">
                    <div
                      className={`rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm sm:px-4 sm:py-2.5 sm:text-sm ${
                        isUser
                          ? "rounded-br-md bg-[#2f6b3f] text-[#f4faef]"
                          : "rounded-bl-md border border-[#d8cfb6] bg-[#fffaf0] text-[#2f4f37]"
                      }`}
                    >
                      {msg.text}
                    </div>

                    <p
                      className={`mt-1 text-[11px] ${
                        isUser ? "text-right text-[#6d846f]" : "text-left text-[#7a8a74]"
                      }`}
                    >
                      {formatTimestamp(msg.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}

            {isLoading ? (
              <div className="flex items-end gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c8bea4] bg-[#f0e7cb] text-[11px] font-bold text-[#2d5137] sm:h-9 sm:w-9 sm:text-xs">
                  AI
                </div>

                <div>
                  <div className="rounded-2xl rounded-bl-md border border-[#d8cfb6] bg-[#fffaf0] px-4 py-2.5 shadow-sm">
                    <span className="inline-flex items-center gap-1 text-[#6c7d64]">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6d8b6d] [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6d8b6d] [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6d8b6d]" />
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#7a8a74]">AgroManabí IA está escribiendo...</p>
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="border-t border-[#e1d6bb] bg-[#f8f2df] p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:p-4 sm:pb-4">
        <div className="rounded-xl border border-[#d8cdb0] bg-[#fbf6e7] p-1.5 sm:p-2">
          <div className="flex items-center gap-2">
            <input
              className="flex-1 rounded-xl border border-transparent bg-transparent px-2.5 py-2 text-sm text-[#24402d] placeholder:text-[#7d8e77] focus:outline-none focus:ring-2 focus:ring-[#3d7c48] disabled:cursor-not-allowed disabled:opacity-60 sm:px-3"
              value={input}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Escribe tu pregunta sobre cultivos..."
              disabled={isLoading}
            />

            <button
              type="button"
              onClick={() => void sendMessage()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#2f6b3f] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#255c34] focus:outline-none focus:ring-2 focus:ring-[#2f6b3f] disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2 sm:px-4 sm:text-sm"
              disabled={isLoading}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
              </svg>
              <span>{isLoading ? "Enviando..." : "Enviar"}</span>
            </button>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2 px-1 text-[11px] text-[#788971] sm:text-xs">
          <span>Presiona Enter para enviar</span>
          <span className="hidden sm:inline">Impulsado por Gemini AI</span>
        </div>
      </div>
    </section>
  );
}
