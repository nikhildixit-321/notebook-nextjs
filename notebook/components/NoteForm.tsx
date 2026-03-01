"use client"

import { useState } from "react"
import { addNote, updateNote } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { InputGroupTextarea } from "@/components/ui/input-group"

interface NoteFormProps {
    note?: { id: string, title: string, content: string }
    onSuccess?: () => void
}

export function NoteForm({ note, onSuccess }: NoteFormProps) {
    const [title, setTitle] = useState(note?.title || "")
    const [content, setContent] = useState(note?.content || "")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        try {
            if (note) {
                await updateNote(note.id, title, content)
            } else {
                await addNote(title, content)
            }
            setTitle("")
            setContent("")
            if (onSuccess) onSuccess()
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note title..."
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Content</label>
                <InputGroupTextarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Note content..."
                    rows={4}
                    className="resize-none"
                    required
                />
            </div>
            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : (note ? "Update Note" : "Add Note")}
            </Button>
        </form>
    )
}
