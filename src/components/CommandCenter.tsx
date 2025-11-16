import { motion, AnimatePresence } from "framer-motion";
import CodexVaultPanel from "./codex/CodexVaultPanel";
import SummonTriss from "@/modules/summon/SummonTriss";
import SessionArchiver from "./core/SessionArchiver";
import ScrollInjector from "./core/ScrollInjector";
import PersonaTools from "@/modules/persona/PersonaTools";
import GPUConnect from "@/modules/gpu/GPUConnect";

interface CommandCenterProps {
    activeTab: string;
}

export default function CommandCenter({ activeTab }: CommandCenterProps) {
    const renderContent = () => {
        switch (activeTab) {
            case "Summon Triss":
                return <SummonTriss />;
            case "Codex Vault":
                return <CodexVaultPanel />;
            case "Scrolls":
                return (
                    <>
                        <h2 className="text-xl font-semibold text-orange-400">📖 Scrolls</h2>
                        <p className="text-zinc-400">Review or inscribe new sacred texts here.</p>
                    </>
                );
            case "Scroll Injector":
                return <ScrollInjector />;
            case "Persona Tools":
                return <PersonaTools />;
            case "Session Archiver":
                return <SessionArchiver />;
            case "Settings":
                return (
                    <>
                        <h2 className="text-xl font-semibold text-orange-400">⚙️ Settings</h2>
                        <p className="text-zinc-400">Adjust environment parameters and user preferences.</p>
                    </>
                );
            case "GPU Connect":
                return <GPUConnect />;
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
                    className="relative flex flex-col gap-2 h-[90vh]"
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}