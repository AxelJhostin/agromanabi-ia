"use client";

type QuickActionsProps = {
  onSelect: (value: string) => void;
  disabled?: boolean;
};

type QuickActionKind = "price" | "season" | "pest" | "crop";

type QuickAction = {
  label: string;
  hint: string;
  kind: QuickActionKind;
};

const QUICK_ACTIONS: readonly QuickAction[] = [
  {
    label: "Precio del cacao",
    hint: "Mercado local y variaciones",
    kind: "price",
  },
  {
    label: "Temporada de siembra",
    hint: "Fechas sugeridas por clima",
    kind: "season",
  },
  {
    label: "Plagas del café",
    hint: "Señales y manejo preventivo",
    kind: "pest",
  },
  {
    label: "Cultivos recomendados",
    hint: "Opciones según la zona",
    kind: "crop",
  },
];

function QuickActionIcon({ kind }: { kind: QuickActionKind }) {
  if (kind === "price") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18" />
        <path d="M16 7.5a4 4 0 0 0-4-2 4 4 0 0 0 0 8 4 4 0 0 1 0 8 4 4 0 0 1-4-2" />
      </svg>
    );
  }

  if (kind === "season") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <path d="M3 10h18" />
        <rect x="3" y="4" width="18" height="17" rx="2" />
      </svg>
    );
  }

  if (kind === "pest") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="m5 5 3 3" />
        <path d="m16 16 3 3" />
        <path d="m16 8 3-3" />
        <path d="m5 19 3-3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20h16" />
      <path d="M6 20V8l6-4 6 4v12" />
      <path d="M9 20v-5h6v5" />
    </svg>
  );
}

export default function QuickActions({ onSelect, disabled = false }: QuickActionsProps) {
  return (
    <div className="w-full">
      <div className="space-y-2">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => onSelect(action.label)}
            disabled={disabled}
            className="group flex w-full items-center gap-3 rounded-2xl border border-[#d7ceb6] bg-[#fffdf5] px-3 py-3 text-left transition hover:-translate-y-0.5 hover:bg-[#f1ead2] focus:outline-none focus:ring-2 focus:ring-[#3d7c48] focus:ring-offset-1 focus:ring-offset-[#f7f2df] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#c7bb9d] bg-[#ede4c9] text-[#2f6b3f] transition group-hover:bg-[#e2d8b8]">
              <QuickActionIcon kind={action.kind} />
            </span>

            <span className="min-w-0">
              <span className="block text-sm font-semibold text-[#294933]">{action.label}</span>
              <span className="block text-xs text-[#5d7056]">{action.hint}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}