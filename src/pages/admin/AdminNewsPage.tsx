import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";

interface NewsEntry {
  id: string;
  title: string;
  summary: string;
  date: string;
  published: boolean;
}

const mockNews: NewsEntry[] = [
  { id: "1", title: "DIPL awarded MSME contract", summary: "New defence contract secured for 2025.", date: "2025-01-15", published: true },
  { id: "2", title: "Aero India 2025 participation", summary: "DIPL showcases latest simulators.", date: "2025-02-10", published: true },
  { id: "3", title: "New facility inauguration", summary: "Manufacturing plant expansion.", date: "2024-12-01", published: false },
];

const AdminNewsPage = () => {
  const [news, setNews] = useState<NewsEntry[]>(mockNews);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<NewsEntry | null>(null);
  const [form, setForm] = useState({ title: "", summary: "", date: "" });

  const openCreate = () => { setEditing(null); setForm({ title: "", summary: "", date: "" }); setDialogOpen(true); };
  const openEdit = (n: NewsEntry) => { setEditing(n); setForm({ title: n.title, summary: n.summary, date: n.date }); setDialogOpen(true); };

  const handleSave = () => {
    if (editing) {
      setNews(n => n.map(ne => ne.id === editing.id ? { ...ne, ...form } : ne));
    } else {
      setNews(n => [...n, { id: Date.now().toString(), ...form, published: false }]);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">News & Media</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage news articles</p>
        </div>
        <Button onClick={openCreate} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Article</Button>
      </div>

      <div className="space-y-3">
        {news.map((article) => (
          <Card key={article.id} className="border-border/20">
            <CardContent className="flex items-center justify-between py-4 px-5">
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground font-mono w-20">{article.date}</span>
                <div>
                  <p className="font-medium text-foreground">{article.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{article.summary}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setNews(n => n.map(ne => ne.id === article.id ? { ...ne, published: !ne.published } : ne))}>
                  {article.published ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => openEdit(article)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => setNews(n => n.filter(ne => ne.id !== article.id))}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Article" : "Add Article"}</DialogTitle>
            <DialogDescription>Fill in the article details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Summary</label>
              <Textarea value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} rows={4} />
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

export default AdminNewsPage;
