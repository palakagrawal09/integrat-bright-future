import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";

interface ClientEntry {
  id: string;
  name: string;
  sector: string;
  logoUrl: string;
}

const mockClients: ClientEntry[] = [
  { id: "1", name: "Indian Army", sector: "Defence", logoUrl: "" },
  { id: "2", name: "Indian Navy", sector: "Defence", logoUrl: "" },
  { id: "3", name: "DRDO", sector: "Research", logoUrl: "" },
  { id: "4", name: "BEL", sector: "Defence PSU", logoUrl: "" },
  { id: "5", name: "ONGC", sector: "Oil & Gas", logoUrl: "" },
  { id: "6", name: "Indian Railways", sector: "Railways", logoUrl: "" },
];

const AdminClientsPage = () => {
  const [clients, setClients] = useState<ClientEntry[]>(mockClients);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ClientEntry | null>(null);
  const [form, setForm] = useState({ name: "", sector: "", logoUrl: "" });

  const openCreate = () => { setEditing(null); setForm({ name: "", sector: "", logoUrl: "" }); setDialogOpen(true); };
  const openEdit = (c: ClientEntry) => { setEditing(c); setForm({ name: c.name, sector: c.sector, logoUrl: c.logoUrl }); setDialogOpen(true); };

  const handleSave = () => {
    if (editing) {
      setClients(c => c.map(cl => cl.id === editing.id ? { ...cl, ...form } : cl));
    } else {
      setClients(c => [...c, { id: Date.now().toString(), ...form }]);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage client entries</p>
        </div>
        <Button onClick={openCreate} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Client</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="border-border/20">
            <CardContent className="py-4 px-5">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center text-xs font-bold text-secondary-foreground">
                  {client.name.charAt(0)}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(client)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => setClients(c => c.filter(cl => cl.id !== client.id))}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
              <p className="font-medium text-foreground">{client.name}</p>
              <p className="text-xs text-muted-foreground">{client.sector}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Client" : "Add Client"}</DialogTitle>
            <DialogDescription>Fill in the client details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sector</label>
              <Input value={form.sector} onChange={e => setForm(f => ({ ...f, sector: e.target.value }))} placeholder="Defence / Industrial / PSU" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Logo URL</label>
              <Input value={form.logoUrl} onChange={e => setForm(f => ({ ...f, logoUrl: e.target.value }))} placeholder="https://..." />
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

export default AdminClientsPage;
