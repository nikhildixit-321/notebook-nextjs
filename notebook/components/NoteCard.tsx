"use client"

import { useState } from "react"
import { deleteNote } from "@/lib/actions"
import { NoteForm } from "./NoteForm"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2, X } from "lucide-react"

interface NoteCardProps {
    note: { id: string, title: string, content: string }
}

export function NoteCard({ note }: NoteCardProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        if (!confirm("Are you sure?")) return;
        setLoading(true)
        try {
            await deleteNote(note.id)
        } finally {
            setLoading(false)
        }
    }

    if (isEditing) {
        return (
            <Card className="relative p-4 border-primary">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setIsEditing(false)}
                >
                    <X className="h-4 w-4" />
                </Button>
                <div className="mt-6">
                    <NoteForm note={note} onSuccess={() => setIsEditing(false)} />
                </div>
            </Card>
        )
    }

    return (
        <Card className="hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm border-muted">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold">{note.title}</CardTitle>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Hover effects handled by parent in real app, here we just show always for clarity */}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-foreground/80 whitespace-pre-wrap">{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2 border-t">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={handleDelete} disabled={loading}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}
