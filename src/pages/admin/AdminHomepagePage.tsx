import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminHomepagePage = () => {
  const { toast } = useToast();
  const [sections, setSections] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await supabase.from("homepage_sections").select("*").order("sort_order");
    setSections(data || []); setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); setForm({ title: "", content: "" }); setDialogOpen(true); };
  const openEdit = (s: any) => { setEditing(s); setForm({ title: s.title, content: s.content }); setDialogOpen(true); };

  const handleSave = async () => {
    if (editing) { await supabase.from("homepage_sections").update(form).eq("id", editing.id); toast({ title: "Section updated" }); }
    else { await supabase.from("homepage_sections").insert({ ...form, sort_order: sections.length + 1 }); toast({ title: "Section created" }); }
    setDialogOpen(false); fetchData();
  };
  const togglePublish = async (s: any) => { await supabase.from("homepage_sections").update({ published: !s.published }).eq("id", s.id); fetchData(); };
  const deleteSection = async (id: string) => { await supabase.from("homepage_sections").delete().eq("id", id); toast({ title: "Section deleted" }); fetchData(); };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-display font-bold">Homepage Content</h1><p className="text-sm text-muted-foreground mt-1">Manage homepage sections</p></div>
        <Button onClick={openCreate} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Section</Button>
      </div>
      <div className="space-y-3">
        {sections.map((section, i) => (
          <Card key={section.id} className="border-border/20">
            <CardContent className="flex items-center justify-between py-4 px-5">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-muted-foreground w-6">#{i + 1}</span>
                <div><p className="font-medium text-foreground">{section.title}</p><p className="text-sm text-muted-foreground line-clamp-1">{section.content}</p></div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => togglePublish(section)}>{section.published ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}</Button>
                <Button variant="ghost" size="icon" onClick={() => openEdit(section)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => deleteSection(section.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Section" : "Add Section"}</DialogTitle><DialogDescription>Fill in the section details below.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><label className="text-sm font-medium">Title</label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Content</label><Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={4} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminHomepagePage;
