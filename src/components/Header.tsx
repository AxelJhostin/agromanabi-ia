"use client";

export default function Header() {
  return (
    <header className="relative overflow-hidden border-b border-[#2e5a3e] bg-gradient-to-r from-[#163524] via-[#204530] to-[#2b5a3e] text-[#f6f2e6] shadow-lg">
      <div className="pointer-events-none absolute -left-8 top-[-34px] h-24 w-24 rounded-full bg-[#7ca574]/25 blur-2xl sm:h-28 sm:w-28" />
      <div className="pointer-events-none absolute -right-10 bottom-[-38px] h-28 w-28 rounded-full bg-[#f2e3b1]/20 blur-2xl sm:h-32 sm:w-32" />

      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4 md:px-6 md:py-5">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3 md:gap-4">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#f7e8be]/50 bg-gradient-to-br from-[#f8e7b6] to-[#d3be84] shadow-md sm:h-12 sm:w-12 sm:rounded-2xl md:h-14 md:w-14">
            <span className="text-sm font-black tracking-tight text-[#1f3f2b] sm:text-base md:text-lg">AM</span>
            <span className="absolute -bottom-1 -right-1 rounded-full border border-[#2f6b3f] bg-[#f4f0df] px-1 py-0.5 text-[8px] font-semibold uppercase text-[#2f6b3f] sm:px-1.5 sm:text-[9px]">
              IA
            </span>
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight text-[#f8f4e8] sm:text-xl md:text-2xl">
              AgroManabí IA
            </h1>
            <p className="truncate text-xs font-medium text-[#d4e4d2] sm:text-sm">
              Jipijapa · Manabí · Ecuador
            </p>
          </div>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#9ac186] bg-[#2f6b3f]/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#f3f7ef] shadow-sm backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d9f99d] shadow-[0_0_8px_rgba(217,249,157,0.8)] sm:h-2 sm:w-2" />
          <span className="hidden sm:inline">Asistente activo</span>
          <span className="sm:hidden">Activo</span>
        </span>
      </div>
    </header>
  );
}
