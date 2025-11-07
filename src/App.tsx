import { Routes, Route, Navigate } from "react-router-dom";
import ConsoleLayout from "@/layouts/ConsoleLayout"; // ✅ use default import & alias

import SummonTriss from "@/modules/SummonTriss";
import CodexVault from "@/modules/CodexVault";
import Scrolls from "@/modules/Scrolls";
import PersonaTools from "@/modules/PersonaTools";
import Settings from "@/modules/Settings";
import GpuConnect from "@/modules/GpuConnect";

export default function App() {
    return (
        <ConsoleLayout>
            <Routes>
                <Route path="/" element={<Navigate to="/summon" />} />
                <Route path="/summon" element={<SummonTriss />} />
                <Route path="/codex" element={<CodexVault />} />
                <Route path="/scrolls" element={<Scrolls />} />
                <Route path="/persona" element={<PersonaTools />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/gpu" element={<GpuConnect />} />
            </Routes>
        </ConsoleLayout>
    );
}