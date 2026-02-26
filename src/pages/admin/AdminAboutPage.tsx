import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminAboutPage = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await supabase.from("about_entries").select("*").order("sort_order");
    setEntries(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); setForm({ title: "", content: "" }); setDialogOpen(true); };
  const openEdit = (entry: any) => { setEditing(entry); setForm({ title: entry.title, content: entry.content }); setDialogOpen(true); };

  const handleSave = async () => {
    if (editing) {
      await supabase.from("about_entries").update(form).eq("id", editing.id);
      toast({ title: "Entry updated" });
    } else {
      await supabase.from("about_entries").insert({ ...form, sort_order: entries.length + 1 });
      toast({ title: "Entry created" });
    }
    setDialogOpen(false); fetchData();
  };

  const togglePublish = async (entry: any) => {
    await supabase.from("about_entries").update({ published: !entry.published }).eq("id", entry.id);
    fetchData();
  };

  const deleteEntry = async (id: string) => {
    await supabase.from("about_entries").delete().eq("id", id);
    toast({ title: "Entry deleted" }); fetchData();
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

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
                <Button variant="ghost" size="icon" onClick={() => togglePublish(entry)}>
                  {entry.published ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => openEdit(entry)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => deleteEntry(entry.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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
            <div className="space-y-2"><label className="text-sm font-medium">Title</label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Content</label><Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={5} /></div>
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
