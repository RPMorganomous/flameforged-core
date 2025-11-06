import React from "react";

export function ConsoleLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] text-zinc-100 flex flex-col relative">
            {/* Header */}
            <header className="relative z-10 border-b border-zinc-800 bg-zinc-950/70 backdrop-blur-sm p-4 text-center text-xl font-semibold tracking-wide shadow-[0_0_10px_rgba(255,60,0,0.25)]">
                🔥 FlameForged Command Center
            </header>

            {/* Main Layout */}
            <div className="flex flex-1 w-full overflow-hidden relative z-0 pt-[1px]">
                <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-start p-8 space-y-4 flex-shrink-0">
                    {["Summon Triss", "Codex Vault", "Scrolls", "Persona Tools", "Settings", "GPU Connect"].map(
                        (tab) => (
                            <button
                                key={tab}
                                className="text-left px-4 py-3 rounded-md bg-zinc-950/40 border border-zinc-800 hover:border-orange-500 hover:text-orange-400 transition-all duration-200"
                            >
                                {tab}
                            </button>
                        )
                    )}
                </aside>

                <main className="flex-1 p-6 overflow-y-auto min-h-0">
                    {children}
                </main>
            </div>

            {/* Footer */}
            <footer className="z-10 border-t border-zinc-800 bg-zinc-950/70 text-center text-sm py-2 text-zinc-500">
                FlameForged Core v0.0.1 — System Online
            </footer>
        </div>
    );
}
