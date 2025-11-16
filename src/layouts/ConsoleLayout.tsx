import CommandCenter from "@/components/CommandCenter";
import { useNavigate, useLocation } from "react-router-dom";
import { useCohesion } from "@/modules/cohesion/CohesionContext";

export function ConsoleLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { runTest, result } = useCohesion();

    const tabs = [
        { name: "Summon Triss", path: "/summon" },
        { name: "Codex Vault", path: "/codex" },
        { name: "Scrolls", path: "/scrolls" },
        { name: "Scroll Injector", path: "/scroll-injector" },
        { name: "Persona Tools", path: "/persona" },
        { name: "Session Archiver", path: "/session-archiver" },
        { name: "Settings", path: "/settings" },
        { name: "GPU Connect", path: "/gpu" },
    ];

    return (
        <div className="flex flex-col h-screen w-full text-zinc-100 bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a]">
            {/* Wrapper for Sidebar and Main */}
            <div className="flex flex-1 min-h-0">
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0 flex flex-col p-6 gap-2 bg-zinc-950/70 shadow-[inset_-1px_0_4px_rgba(255,100,0,0.15)]">
                    {tabs.map(({ name, path }) => (
                        <button
                            key={name}
                            onClick={() => navigate(path)}
                            className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 shadow-md ${
                                location.pathname === path
                                    ? "bg-orange-600 text-white shadow-orange-500/50 hover:bg-orange-700"
                                    : "bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700 hover:shadow-zinc-600/50"
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </aside>

                {/* Main */}
                <main className="flex flex-col flex-1 min-h-0">
                    {/* Header */}
                    <header className="p-4 bg-gradient-to-r from-orange-900/30 to-transparent text-center text-xl font-semibold text-orange-400 shadow-[0_0_15px_rgba(255,100,0,0.2)]">
                        🔥 FlameForged Command Center
                    </header>

                    {/* Content */}
                    <div
                        className="flex-1 overflow-hidden py-6 bg-gradient-to-b from-[#111] to-[#1a1a1a] text-zinc-200"
                        style={{
                            paddingLeft: "4rem",
                            paddingRight: "2rem",
                        }}
                    >
                        <CommandCenter activeTab={tabs.find(t => t.path === location.pathname)?.name || "Summon Triss"} />
                    </div>

                </main>
            </div>

            {/* Footer */}
            <footer className="flex-none bg-zinc-950/70 text-center text-sm py-3 text-zinc-500">
                <div className="flex items-center justify-center gap-4">
                    <span>FlameForged Core v0.0.1 — System Online</span>
                    <button
                        onClick={runTest}
                        className="px-4 py-1 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded text-white text-xs font-semibold transition-all"
                    >
                        Run Cohesion Test
                    </button>
                    {result && (
                        <span className="text-green-400 text-xs">✓ {result}</span>
                    )}
                </div>
            </footer>
        </div>
    );
}

export default ConsoleLayout;