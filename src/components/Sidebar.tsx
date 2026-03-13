"use client";

import QuickActions from "./QuickActions";

type SidebarProps = {
  onQuickActionSelect: (value: string) => void;
  quickActionsDisabled?: boolean;
};

type CropItem = {
  name: string;
  price: string;
  harvest: string;
  zone: string;
};

const MANABI_CROPS: readonly CropItem[] = [
  {
    name: "Café Robusta",
    price: "$42–48/qq",
    harvest: "Jun–Sep",
    zone: "Jipijapa",
  },
  {
    name: "Cacao Fino",
    price: "$95–110/qq",
    harvest: "Ene–Mar",
    zone: "Manabí",
  },
  {
    name: "Maíz",
    price: "$15–18/qq",
    harvest: "May–Jul",
    zone: "Interior",
  },
  {
    name: "Paja Toquilla",
    price: "Artesanal",
    harvest: "Todo el año",
    zone: "Montecristi",
  },
];

export default function Sidebar({
  onQuickActionSelect,
  quickActionsDisabled = false,
}: SidebarProps) {
  return (
    <aside className="w-full space-y-3 lg:h-full lg:space-y-4 lg:overflow-y-auto lg:pr-1">
      <section className="rounded-2xl border border-[#d8d0b9] bg-[#f7f2df] p-3 shadow-sm sm:p-4">
        <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2f6b3f] text-[#f7f2df]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m13 2-8 11h6l-1 9 9-12h-6l1-8Z" />
            </svg>
          </span>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#3f5f44]">
            Consultas rápidas
          </h3>
        </div>

        <QuickActions onSelect={onQuickActionSelect} disabled={quickActionsDisabled} />
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#2f6b3f] bg-gradient-to-br from-[#1c412d] via-[#255538] to-[#2f6b3f] p-3 text-[#ecf7eb] shadow-md sm:p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#b6d6ba] sm:text-xs">
          Temporada actual
        </p>
        <p className="mt-1.5 text-lg font-semibold sm:mt-2 sm:text-xl">Temporada Húmeda</p>
        <p className="mt-2 rounded-xl border border-[#7ea685]/35 bg-[#f6f2e6]/10 p-2.5 text-xs leading-relaxed text-[#d8ead6] sm:p-3 sm:text-sm">
          Ideal para siembra de maíz y cacao. Atento a hongos en café.
        </p>
      </section>

      <section className="rounded-2xl border border-[#d8d0b9] bg-[#f7f2df] p-3 shadow-sm lg:hidden">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#3f5f44]">
              Cultivos de Manabí
            </h3>
            <span className="inline-flex items-center rounded-full border border-[#d2c8ad] bg-[#fff9e8] px-2 py-0.5 text-[11px] font-semibold text-[#48624a]">
              Ver
            </span>
          </summary>

          <ul className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {MANABI_CROPS.map((crop) => (
              <li
                key={crop.name}
                className="min-w-[180px] rounded-xl border border-[#d9cfb5] bg-[#fffdf4] p-3 shadow-[0_1px_0_rgba(63,95,68,0.08)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-[#23422f]">{crop.name}</p>
                  <span className="rounded-full border border-[#b8cfb3] bg-[#e9f3e6] px-2 py-0.5 text-[11px] font-semibold text-[#2f6b3f]">
                    {crop.price}
                  </span>
                </div>

                <p className="mt-2 text-[11px] text-[#5d7056]">
                  Cosecha: <span className="font-semibold text-[#3f5f44]">{crop.harvest}</span>
                </p>
                <p className="mt-0.5 text-[11px] text-[#5d7056]">Zona: {crop.zone}</p>
              </li>
            ))}
          </ul>
        </details>
      </section>

      <section className="hidden rounded-2xl border border-[#d8d0b9] bg-[#f7f2df] p-4 shadow-sm lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#3f5f44]">
          Cultivos de Manabí
        </h3>

        <ul className="mt-3 space-y-3">
          {MANABI_CROPS.map((crop) => (
            <li
              key={crop.name}
              className="rounded-xl border border-[#d9cfb5] bg-[#fffdf4] p-3 shadow-[0_1px_0_rgba(63,95,68,0.08)]"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-[#23422f]">{crop.name}</p>
                <span className="rounded-full border border-[#b8cfb3] bg-[#e9f3e6] px-2 py-0.5 text-xs font-semibold text-[#2f6b3f]">
                  {crop.price}
                </span>
              </div>

              <p className="mt-2 text-xs text-[#5d7056]">
                Cosecha: <span className="font-semibold text-[#3f5f44]">{crop.harvest}</span>
              </p>
              <p className="mt-0.5 text-xs text-[#5d7056]">Zona: {crop.zone}</p>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
