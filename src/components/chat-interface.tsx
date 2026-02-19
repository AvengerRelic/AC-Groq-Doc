"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User, Loader2, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
    role: "user" | "bot";
    content: string;
}

interface ChatInterfaceProps {
    fileId: string;
    fileName: string;
}

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { getChatResponse, getMessages } from "@/actions/knowledgebase-actions";

export function ChatInterface({ fileId, fileName }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [deepSearch, setDeepSearch] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Load initial messages
    useEffect(() => {
        const loadHistory = async () => {
            const history = await getMessages(fileId);
            if (history && history.length > 0) {
                // Convert DB messages to UI format
                setMessages(history.map((m: any) => ({
                    role: m.role as "user" | "bot",
                    content: m.content
                })));
            } else {
                // Default welcome message if no history
                setMessages([{ role: "bot", content: `Hello! I'm ready to answer questions about "${fileName}".` }]);
            }
        };
        loadHistory();
        setInput("");
        setDeepSearch(false);
    }, [fileId, fileName]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setInput("");
        setLoading(true);

        try {
            // Use Server Action directly
            const result = await getChatResponse(fileId, userMessage, deepSearch);

            if (result.error) {
                throw new Error(result.error);
            }

            setMessages(prev => [...prev, { role: "bot", content: result.answer || "No response." }]);
        } catch (error: any) {
            console.error("Chat error details:", error);
            setMessages(prev => [...prev, { role: "bot", content: `Error: ${error.message || "Failed to connect"}` }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full min-h-0">
            {/* Deep Search Toggle Bar */}
            <div className="px-4 pb-2 flex items-center justify-end border-b border-white/5 bg-black/10">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="deep-search"
                        checked={deepSearch}
                        onCheckedChange={setDeepSearch}
                    />
                    <Label htmlFor="deep-search" className={`text-xs font-medium cursor-pointer ${deepSearch ? 'text-primary' : 'text-slate-400'}`}>
                        Deep Search {deepSearch ? "(ON)" : "(OFF)"}
                    </Label>
                </div>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 pb-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                            <div className={`
                                h-8 w-8 rounded-full flex items-center justify-center shrink-0
                                ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}
                            `}>
                                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>
                            <div className={`
                                p-3 rounded-lg max-w-[80%] text-sm
                                ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none"
                                }
                            `}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                                <Bot className="h-4 w-4" />
                            </div>
                            <div className="bg-white/5 border border-white/10 p-3 rounded-lg rounded-tl-none">
                                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="p-4 border-t border-white/10 bg-black/20 mt-auto">
                <form onSubmit={handleSend} className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={deepSearch ? "Ask a detailed question (Deep Search active)..." : "Ask a question about this document..."}
                        className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-primary"
                        disabled={loading}
                    />
                    <Button type="submit" disabled={loading || !input.trim()}>
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                </form>
            </div>
        </div>
    );
}
