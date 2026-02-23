import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";

interface AboutEntry {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

const mockEntries: AboutEntry[] = [
  { id: "1", title: "Company Overview", content: "DIPL is a defence electronics company...", published: true },
  { id: "2", title: "Mission & Vision", content: "To be the leading provider of defence...", published: true },
  { id: "3", title: "Leadership Team", content: "Led by experienced professionals...", published: true },
  { id: "4", title: "Certifications", content: "ISO 9001, CMMI Level 3...", published: false },
];

const AdminAboutPage = () => {
  const [entries, setEntries] = useState<AboutEntry[]>(mockEntries);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AboutEntry | null>(null);
  const [form, setForm] = useState({ title: "", content: "" });

  const openCreate = () => { setEditing(null); setForm({ title: "", content: "" }); setDialogOpen(true); };
  const openEdit = (entry: AboutEntry) => { setEditing(entry); setForm({ title: entry.title, content: entry.content }); setDialogOpen(true); };

  const handleSave = () => {
    if (editing) {
      setEntries(e => e.map(en => en.id === editing.id ? { ...en, ...form } : en));
    } else {
      setEntries(e => [...e, { id: Date.now().toString(), ...form, published: false }]);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">About Page</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage about page content</p>
        </div>
        <Button onClick={openCreate} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Entry</Button>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <Card key={entry.id} className="border-border/20">
            <CardContent className="flex items-center justify-between py-4 px-5">
              <div>
                <p className="font-medium text-foreground">{entry.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">{entry.content}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setEntries(e => e.map(en => en.id === entry.id ? { ...en, published: !en.published } : en))}>
                  {entry.published ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => openEdit(entry)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => setEntries(e => e.filter(en => en.id !== entry.id))}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Entry" : "Add Entry"}</DialogTitle>
            <DialogDescription>Fill in the about entry details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={5} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAboutPage;
