import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function CommandCenter() {
    return (
        <div className="w-full h-full bg-gradient-to-b from-zinc-950 to-black text-zinc-100 p-8 border-4 border-red-600">
            <h1 className="text-3xl font-bold mb-6 text-center">
                🔥 FlameForged Command Center
            </h1>

            <Tabs defaultValue="summon" className="max-w-4xl mx-auto">
                <TabsList className="grid grid-cols-6 gap-4 mt-10 mb-6">
                    <TabsTrigger value="summon">Summon Triss</TabsTrigger>
                    <TabsTrigger value="codex">Codex Vault</TabsTrigger>
                    <TabsTrigger value="scrolls">Scrolls</TabsTrigger>
                    <TabsTrigger value="persona">Persona Tools</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="gpu">GPU Connect</TabsTrigger>
                </TabsList>

                <TabsContent value="summon" className="mt-6 text-center">
                    <p>Triss awaits your call...</p>
                </TabsContent>
                <TabsContent value="codex" className="mt-6 text-center">
                    <p>Accessing Codex Vault...</p>
                </TabsContent>
                <TabsContent value="scrolls" className="mt-6 text-center">
                    <p>Review sacred Scrolls...</p>
                </TabsContent>
                <TabsContent value="persona" className="mt-6 text-center">
                    <p>Persona configuration tools coming soon.</p>
                </TabsContent>
                <TabsContent value="settings" className="mt-6 text-center">
                    <p>System preferences and themes.</p>
                </TabsContent>
                <TabsContent value="gpu" className="mt-6 text-center">
                    <p>GPU connection utilities loading...</p>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default CommandCenter