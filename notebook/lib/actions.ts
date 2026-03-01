"use server"

import { revalidatePath } from "next/cache";
import connectToDatabase from "./mongodb";
import Note from "@/models/Note";

export async function getNotes() {
    await connectToDatabase();
    const notes = await Note.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(notes)).map((note: any) => ({
        ...note,
        id: note._id.toString(),
    }));
}

export async function addNote(title: string, content: string) {
    if (!title || !content) return;

    await connectToDatabase();
    await Note.create({ title, content });

    revalidatePath("/");
}

export async function deleteNote(id: string) {
    await connectToDatabase();
    await Note.findByIdAndDelete(id);

    revalidatePath("/");
}

export async function updateNote(id: string, title: string, content: string) {
    await connectToDatabase();
    await Note.findByIdAndUpdate(id, { title, content });

    revalidatePath("/");
}
