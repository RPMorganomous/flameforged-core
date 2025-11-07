import { motion, AnimatePresence } from "framer-motion";
interface CommandCenterProps {
    activeTab: string;
}

export default function CommandCenter({ activeTab }: CommandCenterProps) {
    const renderContent = () => {
        switch (activeTab) {
            case "Summon Triss":
                return (
                    <>
                        <h2 className="text-xl font-semibold text-orange-400">🔥 Summon Triss</h2>
                        <p className="text-zinc-400">Triss awaits your command. Initialize summoning protocols.</p>
                    </>
                );
            case "Codex Vault":
                return (
                    <>
                        <h2 className="text-xl font-semibold text-orange-400">📜 Codex Vault</h2>
                        <p className="text-zinc-400">Accessing sacred archives... Please wait.</p>
                    </>
                );
            case "Scrolls":
                return (
                    <>
                        <h2 className="text-xl font-semibold text-orange-400">📖 Scrolls</h2>
                        <p className="text-zinc-400">Review or inscribe new sacred texts here.</p>
                    </>
                );
            case "Persona Tools":
                return (
                    <>
                        <h2 className="text-xl font-semibold text-orange-400">🧠 Persona Tools</h2>
                        <p className="text-zinc-400">Configure, test, and deploy personality frameworks.</p>
                    </>
                );
            case "Settings":
                return (
                    <>
                        <h2 className="text-xl font-semibold text-orange-400">⚙️ Settings</h2>
                        <p className="text-zinc-400">Adjust environment parameters and user preferences.</p>
                    </>
                );
            case "GPU Connect":
                return (
                    <>
                        <h2 className="text-xl font-semibold text-orange-400">💻 GPU Connect</h2>
                        <p className="text-zinc-400">Connect to the GPU nodes and monitor system performance.</p>
                    </>
                );
            default:
                return (
                    <>
                        <h2 className="text-xl font-semibold text-orange-400">Triss awaits your call...</h2>
                        <p className="text-zinc-400">Choose a function from the sidebar to begin.</p>
                    </>
                );
        }
    };

    return (
        <div className="relative overflow-hidden min-h-[200px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col gap-2"
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}