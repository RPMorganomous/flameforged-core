import type { ReactElement } from "react";
import ConsoleLayout from "./layouts/ConsoleLayout";
import { SessionProvider } from "./modules/sessions/SessionContext";
import { InvocationProvider } from "./modules/invocation/InvocationContext";
import { CodexProvider } from "./modules/codex/CodexContext";
import { ScrollProvider } from "./modules/scroll/ScrollContext";
import { PersonaProvider } from "./modules/persona/PersonaContext";
import { GPUProvider } from "./modules/gpu/GPUContext";
import { CohesionProvider } from "./modules/cohesion/CohesionContext";

export default function App(): ReactElement {
    return (
        <SessionProvider>
            <InvocationProvider>
                <CodexProvider>
                    <ScrollProvider>
                        <PersonaProvider>
                            <GPUProvider>
                                <CohesionProvider>
                                    <ConsoleLayout />
                                </CohesionProvider>
                            </GPUProvider>
                        </PersonaProvider>
                    </ScrollProvider>
                </CodexProvider>
            </InvocationProvider>
        </SessionProvider>
    );
}