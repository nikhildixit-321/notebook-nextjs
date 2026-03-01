import { getNotes } from "@/lib/actions"
import { NoteCard } from "@/components/NoteCard"
import { NoteForm } from "@/components/NoteForm"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { NotebookPen } from "lucide-react"

export default async function Home() {
  const notes = await getNotes()

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-primary-foreground">
            <NotebookPen size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Notebook</h1>
            <p className="text-muted-foreground">Keep your thoughts organized (MongoDB Edition)</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-md border-primary/20">
              <CardHeader>
                <CardTitle>Create Note</CardTitle>
                <CardDescription>Add a new thought or reminder</CardDescription>
              </CardHeader>
              <CardContent>
                <NoteForm />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.length === 0 ? (
                <div className="col-span-full py-12 text-center bg-white dark:bg-zinc-900 rounded-xl border-2 border-dashed border-muted">
                  <p className="text-muted-foreground font-medium">No notes yet. Create one to get started!</p>
                </div>
              ) : (
                notes.map((note: any) => (
                  <NoteCard key={note.id} note={note} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
