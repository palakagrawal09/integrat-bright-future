import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminNewsPage = () => {
  const { toast } = useToast();
  const [news, setNews] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await supabase.from("news_articles").select("*").order("created_at", { ascending: false });
    setNews(data || []); setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); setForm({ title: "", content: "" }); setDialogOpen(true); };
  const openEdit = (n: any) => { setEditing(n); setForm({ title: n.title, content: n.content }); setDialogOpen(true); };

  const handleSave = async () => {
    if (editing) { await supabase.from("news_articles").update(form).eq("id", editing.id); toast({ title: "Article updated" }); }
    else { await supabase.from("news_articles").insert(form); toast({ title: "Article created" }); }
    setDialogOpen(false); fetchData();
  };
  const togglePublish = async (n: any) => {
    await supabase.from("news_articles").update({ published: !n.published, published_at: !n.published ? new Date().toISOString() : null }).eq("id", n.id);
    fetchData();
  };
  const deleteArticle = async (id: string) => { await supabase.from("news_articles").delete().eq("id", id); toast({ title: "Article deleted" }); fetchData(); };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-display font-bold">News & Media</h1><p className="text-sm text-muted-foreground mt-1">Manage news articles</p></div>
        <Button onClick={openCreate} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Article</Button>
      </div>
      <div className="space-y-3">
        {news.map((article) => (
          <Card key={article.id} className="border-border/20">
            <CardContent className="flex items-center justify-between py-4 px-5">
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground font-mono w-20">{new Date(article.created_at).toLocaleDateString()}</span>
                <div><p className="font-medium text-foreground">{article.title}</p><p className="text-sm text-muted-foreground line-clamp-1">{article.content}</p></div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => togglePublish(article)}>{article.published ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}</Button>
                <Button variant="ghost" size="icon" onClick={() => openEdit(article)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => deleteArticle(article.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Article" : "Add Article"}</DialogTitle><DialogDescription>Fill in the article details.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><label className="text-sm font-medium">Title</label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Content</label><Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={5} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNewsPage;
