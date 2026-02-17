
"use client";


import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, FileText, Sparkles, Youtube, AlignLeft, ListChecks, HelpCircle, BookOpen } from "lucide-react";

export default function SummarizerPage() {
    const [mode, setMode] = useState<"video" | "text">("video");
    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);
    const [outputType, setOutputType] = useState<"summary" | "questions" | "mcq" | "detailed">("summary");


    const handleSummarize = async () => {
        if ((mode === "video" && !url) || (mode === "text" && !text)) return;

        setLoading(true);
        setSummary(null);

        try {
            const userId = localStorage.getItem('userId');
            const res = await fetch('/api/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    text: mode === 'text' ? text : undefined,
                    url: mode === 'video' ? url : undefined,
                    type: mode,
                    outputOption: outputType
                }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.content) {
                    setSummary(data.content);
                } else {
                    setSummary("Failed to generate content. Please try again.");
                }
            } else {
                let errorData: any = {};
                try {
                    errorData = await res.json();
                } catch (e) {
                    errorData = { error: `HTTP ${res.status}`, details: res.statusText };
                }

                console.error("Summarization failed:", errorData);
                const errorTitle = errorData.error || "Summarization failed";
                const detail = errorData.details ? `: ${errorData.details}` : "";
                setSummary(`${errorTitle}${detail}`);
            }
        } catch (error) {
            console.error("Summarization error", error);
            setSummary("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout role="user">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent inline-block">
                        AI Content Summarizer
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Generate summaries, questions, or notes from YouTube videos or text instantly.
                    </p>
                </div>

                <Card className="glass-card border-primary/20">
                    <CardHeader>
                        <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto p-1 bg-white/5 rounded-lg border border-white/10">
                            <button
                                onClick={() => { setMode("video"); setSummary(null); }}
                                className={`flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-md transition-all ${mode === "video" ? "bg-red-500/20 text-red-200 border border-red-500/50 shadow-lg" : "text-slate-400 hover:text-white"}`}
                            >
                                <Youtube className="h-4 w-4" />
                                Video URL
                            </button>
                            <button
                                onClick={() => { setMode("text"); setSummary(null); }}
                                className={`flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-md transition-all ${mode === "text" ? "bg-primary/20 text-primary-foreground border border-primary/50 shadow-lg" : "text-slate-400 hover:text-white"}`}
                            >
                                <AlignLeft className="h-4 w-4" />
                                Manual Text
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-2 space-y-6">
                        <div className="flex flex-col gap-4">
                            {mode === "video" ? (
                                <div className="relative">
                                    <Youtube className="absolute left-3 top-2.5 h-5 w-5 text-red-500" />
                                    <Input
                                        placeholder="Paste YouTube URL here..."
                                        className="pl-10 h-12 text-base"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className="relative">
                                    <textarea
                                        placeholder="Paste your text content here..."
                                        className="w-full min-h-[150px] rounded-md border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:bg-white/10 backdrop-blur-sm transition-all resize-none"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                </div>
                            )}

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-300">Select Output Type</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    <button
                                        onClick={() => setOutputType("summary")}
                                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${outputType === "summary" ? "bg-primary/20 border-primary/50 text-white" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"}`}
                                    >
                                        <Sparkles className="h-5 w-5" />
                                        <span className="text-xs font-medium">Quick Summary</span>
                                    </button>
                                    <button
                                        onClick={() => setOutputType("questions")}
                                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${outputType === "questions" ? "bg-secondary/20 border-secondary/50 text-white" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"}`}
                                    >
                                        <HelpCircle className="h-5 w-5" />
                                        <span className="text-xs font-medium">Exam Questions</span>
                                    </button>
                                    <button
                                        onClick={() => setOutputType("mcq")}
                                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${outputType === "mcq" ? "bg-accent/20 border-accent/50 text-white" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"}`}
                                    >
                                        <ListChecks className="h-5 w-5" />
                                        <span className="text-xs font-medium">Quick MCQ</span>
                                    </button>
                                    <button
                                        onClick={() => setOutputType("detailed")}
                                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${outputType === "detailed" ? "bg-green-500/20 border-green-500/50 text-white" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"}`}
                                    >
                                        <BookOpen className="h-5 w-5" />
                                        <span className="text-xs font-medium">Detailed Notes</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="h-12 w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                            onClick={handleSummarize}
                            disabled={loading || (mode === "video" ? !url : !text)}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate {outputType === 'mcq' ? 'MCQ' : outputType === 'questions' ? 'Questions' : outputType === 'detailed' ? 'Notes' : 'Summary'}
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {summary && (
                    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-white/10 bg-slate-900/50">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-secondary" />
                                <CardTitle>Generated Result</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-invert prose-slate max-w-none">
                                <pre className="whitespace-pre-wrap font-sans text-slate-300">
                                    {summary}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}
