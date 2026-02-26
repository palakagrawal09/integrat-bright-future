import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminServicesPage = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setServices(data || []); setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); setForm({ title: "", description: "" }); setDialogOpen(true); };
  const openEdit = (s: any) => { setEditing(s); setForm({ title: s.title, description: s.description }); setDialogOpen(true); };

  const handleSave = async () => {
    if (editing) { await supabase.from("services").update(form).eq("id", editing.id); toast({ title: "Service updated" }); }
    else { await supabase.from("services").insert({ ...form, sort_order: services.length + 1 }); toast({ title: "Service created" }); }
    setDialogOpen(false); fetchData();
  };
  const togglePublish = async (s: any) => { await supabase.from("services").update({ published: !s.published }).eq("id", s.id); fetchData(); };
  const deleteService = async (id: string) => { await supabase.from("services").delete().eq("id", id); toast({ title: "Service deleted" }); fetchData(); };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-display font-bold">Services</h1><p className="text-sm text-muted-foreground mt-1">Manage service offerings</p></div>
        <Button onClick={openCreate} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Service</Button>
      </div>
      <div className="space-y-3">
        {services.map((service) => (
          <Card key={service.id} className="border-border/20">
            <CardContent className="flex items-center justify-between py-4 px-5">
              <div><p className="font-medium text-foreground">{service.title}</p><p className="text-sm text-muted-foreground">{service.description}</p></div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => togglePublish(service)}>{service.published ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}</Button>
                <Button variant="ghost" size="icon" onClick={() => openEdit(service)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => deleteService(service.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Service" : "Add Service"}</DialogTitle><DialogDescription>Fill in the service details.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><label className="text-sm font-medium">Title</label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Description</label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServicesPage;
