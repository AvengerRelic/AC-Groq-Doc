
"use client";

import { useEffect, useState } from "react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, MoreVertical, Trash2, Share2, Eye } from "lucide-react";



export default function LibraryPage() {
    const [libraryItems, setLibraryItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const fetchLibrary = async () => {
        const userId = localStorage.getItem('userId') || 'guest-user';
        setLoading(true);
        try {
            const res = await fetch(`/api/library?userId=${userId}`);
            if (res.ok) {
                const data = await res.json();
                const formattedItems = data.map((item: any) => ({
                    ...item,
                    date: new Date(item.createdAt).toLocaleDateString(),
                    category: item.type === 'video' ? 'Video Analysis' : 'Text Summary',
                    thumbnail: item.type === 'video' ? "bg-red-500/10" : "bg-blue-500/10",
                }));
                setLibraryItems(formattedItems);
            }
        } catch (error) {
            console.error("Failed to fetch library", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLibrary();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this summary?")) return;

        const userId = localStorage.getItem('userId') || 'guest-user';
        try {
            const res = await fetch(`/api/library?id=${id}&userId=${userId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setLibraryItems(prev => prev.filter(item => item.id !== id));
            } else {
                alert("Failed to delete summary.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <DashboardLayout role="user">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Library</h1>
                    <p className="text-slate-400">Manage your saved summaries and notes.</p>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search library..." className="pl-10 bg-white/5 border-white/10" />
                </div>
            </div>

            {loading ? (
                <div className="text-center text-slate-400 py-12">Loading library...</div>
            ) : libraryItems.length === 0 ? (
                <div className="text-center text-slate-400 py-12">
                    <BookOpen className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                    <p>No items found in your library.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {libraryItems.map((item) => (
                        <Card key={item.id} className="glass-card border-white/5 group hover:bg-white/5 transition-all duration-300">
                            <div className={`h-40 w-full ${item.thumbnail} relative flex items-center justify-center`}>
                                <BookOpen className="h-12 w-12 text-white/10 group-hover:text-white/20 transition-colors" />
                            </div>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">{item.title}</CardTitle>
                                        <CardDescription>{item.date}</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="border-white/10 text-[10px] text-slate-500 uppercase h-5">
                                        {item.type}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex gap-1 w-full justify-end">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 text-slate-400 hover:text-white hover:bg-white/10"
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Simple Modal overlay for viewing details */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col glass-card border-white/10 shadow-2xl">
                        <CardHeader className="border-b border-white/5 bg-white/5">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-xl text-white">{selectedItem.title}</CardTitle>
                                    <CardDescription>{selectedItem.date} • {selectedItem.category}</CardDescription>
                                </div>
                                <Button variant="ghost" size="icon" className="text-slate-400" onClick={() => setSelectedItem(null)}>
                                    <Eye className="h-5 w-5 rotate-45" /> {/* Use icon as X if no X available or just text */}
                                    <span className="sr-only">Close</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="overflow-y-auto p-6 text-slate-300 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                            <div className="mb-4 p-3 bg-white/5 rounded border border-white/5 text-xs text-slate-500">
                                <strong>Source:</strong> {selectedItem.original}
                            </div>
                            {selectedItem.content}
                        </CardContent>
                        <div className="p-4 border-t border-white/5 bg-white/5 flex justify-end">
                            <Button onClick={() => setSelectedItem(null)}>Close</Button>
                        </div>
                    </Card>
                </div>
            )}
        </DashboardLayout>
    );
}
