import CommandCenter from "@/components/CommandCenter";
import { useNavigate, useLocation } from "react-router-dom";

export function ConsoleLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { name: "Summon Triss", path: "/summon" },
        { name: "Codex Vault", path: "/codex" },
        { name: "Scrolls", path: "/scrolls" },
        { name: "Persona Tools", path: "/persona" },
        { name: "Settings", path: "/settings" },
        { name: "GPU Connect", path: "/gpu" },
    ];

    return (
        <div className="flex flex-col h-screen w-full text-zinc-100 bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a]">
            {/* Wrapper for Sidebar and Main */}
            <div className="flex flex-1 min-h-0">
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0 flex flex-col p-6 gap-3 bg-zinc-950/70 shadow-[inset_-1px_0_4px_rgba(255,100,0,0.15)]">
                    {tabs.map(({ name, path }) => (
                        <button
                            key={name}
                            onClick={() => navigate(path)}
                            style={{ marginBottom: "0.75rem" }}
                            className={`w-full block px-4 py-3 rounded-md text-left transition-all duration-200 ${
                                location.pathname === path
                                    ? "bg-orange-500/20 text-orange-300 hover:bg-orange-500/25"
                                    : "bg-zinc-950/60 text-zinc-300 hover:text-orange-400 hover:bg-zinc-900/80"
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
                        className="flex-1 overflow-y-auto py-6 bg-gradient-to-b from-[#111] to-[#1a1a1a] text-zinc-200"
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
            <footer className="flex-none bg-zinc-950/70 text-center text-sm py-2 text-zinc-500">
                FlameForged Core v0.0.1 — System Online
            </footer>
        </div>
    );
}

export default ConsoleLayout;