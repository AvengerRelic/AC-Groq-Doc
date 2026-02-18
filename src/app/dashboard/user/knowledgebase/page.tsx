"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, MessageSquare, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { ChatInterface } from "@/components/chat-interface";
import { cn } from "@/lib/utils";

export default function KnowledgeBasePage() {
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/knowledgebase?t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                const fileList = Array.isArray(data) ? data : (data.files || []);
                setFiles(fileList);

                // Auto-select first file if none selected
                if (!selectedFile && fileList.length > 0) {
                    setSelectedFile(fileList[0]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch files", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/ingest", {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                alert("File ingested successfully!");
                fetchFiles();
            } else {
                const data = await res.json();
                alert(data.error || "Upload failed");
            }
        } catch (error) {
            console.error("Upload error", error);
            alert("An error occurred during upload.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <DashboardLayout role="user">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">KnowledgeBase</h1>
                    <p className="text-slate-400">Select a document to start chatting.</p>
                </div>
                <div className="relative">
                    <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        id="pdf-upload"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                    <label htmlFor="pdf-upload">
                        <Button asChild className="cursor-pointer gap-2">
                            <span>
                                {uploading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Upload className="h-4 w-4" />
                                )}
                                {uploading ? "Ingesting..." : "Upload New PDF"}
                            </span>
                        </Button>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
                {/* Left Pane: Document List */}
                <Card className="lg:col-span-4 glass-card border-white/5 flex flex-col overflow-hidden">
                    <CardHeader className="pb-2 border-b border-white/5">
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Documents
                        </CardTitle>
                        <CardDescription>
                            {files.length} file{files.length !== 1 ? 's' : ''} available
                        </CardDescription>
                    </CardHeader>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {loading ? (
                            <div className="text-center py-8 text-slate-400 text-sm">Loading...</div>
                        ) : files.length === 0 ? (
                            <div className="text-center py-8 text-slate-400 text-sm">No documents uploaded yet.</div>
                        ) : (
                            files.map((file) => (
                                <div
                                    key={file.id}
                                    onClick={() => setSelectedFile(file)}
                                    className={cn(
                                        "p-3 rounded-lg cursor-pointer transition-all border",
                                        selectedFile?.id === file.id
                                            ? "bg-primary/10 border-primary/50"
                                            : "hover:bg-white/5 border-transparent"
                                    )}
                                >
                                    <h4 className={cn(
                                        "font-medium text-sm line-clamp-1",
                                        selectedFile?.id === file.id ? "text-primary" : "text-slate-200"
                                    )}>
                                        {file.name}
                                    </h4>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs text-slate-500">
                                            {new Date(file.createdAt).toLocaleDateString()}
                                        </span>
                                        {selectedFile?.id === file.id && (
                                            <MessageSquare className="h-3 w-3 text-primary" />
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Right Pane: Chat Interface */}
                <Card className="lg:col-span-8 glass-card border-white/5 flex flex-col overflow-hidden h-full">
                    {selectedFile ? (
                        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
                            <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <span className="text-slate-400 font-normal text-sm">Chatting with:</span>
                                    {selectedFile.name}
                                </h2>
                            </div>
                            <ChatInterface fileId={selectedFile.id} fileName={selectedFile.name} />
                        </CardContent>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                            <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                                <MessageSquare className="h-8 w-8 text-slate-500" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">No Document Selected</h3>
                            <p>Select a document from the list on the left to start a conversation.</p>
                        </div>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    );
}
