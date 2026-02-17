"use client";

import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Bot, Loader2, ChevronLeft, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ChatPage() {
    const { fileId } = useParams();
    const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userMsg, fileId }),
            });

            if (res.ok) {
                const data = await res.json();
                setMessages(prev => [...prev, { role: "bot", content: data.answer }]);
            } else {
                setMessages(prev => [...prev, { role: "bot", content: "Sorry, I encountered an error processing your question." }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: "bot", content: "An error occurred. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout role="user">
            <div className="flex flex-col h-[calc(100vh-140px)]">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/dashboard/user/knowledgebase">
                        <Button variant="ghost" size="icon" className="text-slate-400">
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center text-primary">
                            <FileText className="h-4 w-4" />
                        </div>
                        <h1 className="text-xl font-bold text-white">Document Chat</h1>
                    </div>
                </div>

                <Card className="flex-1 flex flex-col glass-card border-white/5 overflow-hidden">
                    <CardHeader className="border-b border-white/5 py-4">
                        <CardTitle className="text-sm font-medium text-slate-400">Ask anything about this document...</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-2">
                                    <Bot className="h-12 w-12 text-slate-700" />
                                    <p className="text-slate-500 max-w-xs px-4">
                                        Hello! I've analyzed your document. What would you like to know about it?
                                    </p>
                                </div>
                            )}
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 flex gap-3 ${m.role === "user"
                                            ? "bg-primary text-white"
                                            : "bg-white/5 text-slate-200 border border-white/5"
                                        }`}>
                                        <div className="mt-1">
                                            {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-secondary" />}
                                        </div>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-2 flex gap-3">
                                        <Bot className="h-4 w-4 text-secondary mt-1" />
                                        <div className="flex gap-1 items-center h-4">
                                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-white/5 bg-black/20">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-2"
                            >
                                <Input
                                    placeholder="Type your question..."
                                    className="bg-white/5 border-white/10"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={loading}
                                />
                                <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
