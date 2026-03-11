"use client";

export default function Header() {
  return (
    <header className="relative overflow-hidden border-b border-[#2e5a3e] bg-gradient-to-r from-[#163524] via-[#204530] to-[#2b5a3e] text-[#f6f2e6] shadow-lg">
      <div className="pointer-events-none absolute -left-8 top-[-30px] h-28 w-28 rounded-full bg-[#7ca574]/25 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 bottom-[-40px] h-32 w-32 rounded-full bg-[#f2e3b1]/20 blur-2xl" />

      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-4 md:px-6 md:py-5">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f7e8be]/50 bg-gradient-to-br from-[#f8e7b6] to-[#d3be84] shadow-md md:h-14 md:w-14">
            <span className="text-base font-black tracking-tight text-[#1f3f2b] md:text-lg">AM</span>
            <span className="absolute -bottom-1 -right-1 rounded-full border border-[#2f6b3f] bg-[#f4f0df] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-[#2f6b3f]">
              IA
            </span>
          </div>

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[#f8f4e8] md:text-2xl">
              AgroManabí IA
            </h1>
            <p className="text-sm font-medium text-[#d4e4d2]">Jipijapa · Manabí · Ecuador</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-[#9ac186] bg-[#2f6b3f]/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#f3f7ef] shadow-sm backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#d9f99d] shadow-[0_0_8px_rgba(217,249,157,0.8)]" />
          Asistente activo
        </span>
      </div>
    </header>
  );
}