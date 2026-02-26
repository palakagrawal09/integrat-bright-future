import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminClientsPage = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ name: "", logo_url: "" });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await supabase.from("clients").select("*").order("sort_order");
    setClients(data || []); setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: "", logo_url: "" }); setDialogOpen(true); };
  const openEdit = (c: any) => { setEditing(c); setForm({ name: c.name, logo_url: c.logo_url }); setDialogOpen(true); };

  const handleSave = async () => {
    if (editing) { await supabase.from("clients").update(form).eq("id", editing.id); toast({ title: "Client updated" }); }
    else { await supabase.from("clients").insert({ ...form, sort_order: clients.length + 1 }); toast({ title: "Client added" }); }
    setDialogOpen(false); fetchData();
  };
  const deleteClient = async (id: string) => { await supabase.from("clients").delete().eq("id", id); toast({ title: "Client deleted" }); fetchData(); };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-display font-bold">Clients</h1><p className="text-sm text-muted-foreground mt-1">Manage client entries</p></div>
        <Button onClick={openCreate} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Client</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="border-border/20">
            <CardContent className="py-4 px-5">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center text-xs font-bold text-secondary-foreground">{client.name.charAt(0)}</div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(client)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteClient(client.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
              <p className="font-medium text-foreground">{client.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Client" : "Add Client"}</DialogTitle><DialogDescription>Fill in the client details.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><label className="text-sm font-medium">Name</label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Logo URL</label><Input value={form.logo_url} onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))} placeholder="https://..." /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminClientsPage;
