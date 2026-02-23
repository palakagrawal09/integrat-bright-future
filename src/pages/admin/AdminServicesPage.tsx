import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";

interface ServiceEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  published: boolean;
}

const mockServices: ServiceEntry[] = [
  { id: "1", title: "Fire Control Systems", description: "Advanced FCS for artillery", category: "Defence", published: true },
  { id: "2", title: "Simulators & Training", description: "High-fidelity training simulators", category: "Defence", published: true },
  { id: "3", title: "Oil & Gas Automation", description: "SCADA and PLC solutions", category: "Industrial", published: true },
  { id: "4", title: "Railway Systems", description: "Signalling and control", category: "Industrial", published: true },
  { id: "5", title: "Embedded Systems", description: "Custom embedded solutions", category: "Defence", published: false },
  { id: "6", title: "IoT Solutions", description: "Industrial IoT platforms", category: "Industrial", published: true },
];

const AdminServicesPage = () => {
  const [services, setServices] = useState<ServiceEntry[]>(mockServices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceEntry | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "" });

  const openCreate = () => { setEditing(null); setForm({ title: "", description: "", category: "" }); setDialogOpen(true); };
  const openEdit = (s: ServiceEntry) => { setEditing(s); setForm({ title: s.title, description: s.description, category: s.category }); setDialogOpen(true); };

  const handleSave = () => {
    if (editing) {
      setServices(s => s.map(sv => sv.id === editing.id ? { ...sv, ...form } : sv));
    } else {
      setServices(s => [...s, { id: Date.now().toString(), ...form, published: false }]);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Services</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage service offerings</p>
        </div>
        <Button onClick={openCreate} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Service</Button>
      </div>

      <div className="space-y-3">
        {services.map((service) => (
          <Card key={service.id} className="border-border/20">
            <CardContent className="flex items-center justify-between py-4 px-5">
              <div className="flex items-center gap-4">
                <span className="text-xs px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground font-medium">{service.category}</span>
                <div>
                  <p className="font-medium text-foreground">{service.title}</p>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setServices(s => s.map(sv => sv.id === service.id ? { ...sv, published: !sv.published } : sv))}>
                  {service.published ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => openEdit(service)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => setServices(s => s.filter(sv => sv.id !== service.id))}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Service" : "Add Service"}</DialogTitle>
            <DialogDescription>Fill in the service details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Defence / Industrial" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} />
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

export default AdminServicesPage;
