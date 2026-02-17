"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, MessageSquare, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function KnowledgeBasePage() {
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const fetchFiles = async () => {
        const userId = localStorage.getItem("userId") || "guest-user";
        try {
            const res = await fetch(`/api/knowledgebase?userId=${userId}`);
            if (res.ok) {
                const data = await res.json();
                setFiles(data);
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
        const userId = localStorage.getItem("userId") || "guest-user";
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId);

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
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">KnowledgeBase</h1>
                    <p className="text-slate-400">Upload PDFs and chat with your documents using AI.</p>
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
                                {uploading ? "Ingesting..." : "Upload PDF"}
                            </span>
                        </Button>
                    </label>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-400">Loading files...</div>
            ) : files.length === 0 ? (
                <Card className="glass-card border-white/5 py-12 text-center">
                    <CardContent>
                        <FileText className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-white mb-2">No documents yet</h3>
                        <p className="text-slate-400 mb-6">Upload your first PDF to start chatting with its content.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {files.map((file) => (
                        <Card key={file.id} className="glass-card border-white/5 hover:bg-white/5 transition-all group">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-400">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardTitle className="text-lg text-white group-hover:text-primary transition-colors line-clamp-1">
                                    {file.name}
                                </CardTitle>
                                <CardDescription>
                                    Uploaded on {new Date(file.createdAt).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href={`/dashboard/user/knowledgebase/chat/${file.id}`}>
                                    <Button className="w-full gap-2" variant="secondary">
                                        <MessageSquare className="h-4 w-4" />
                                        Chat with PDF
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
