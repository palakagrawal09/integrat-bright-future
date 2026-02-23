import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";

interface Section {
  id: string;
  title: string;
  subtitle: string;
  published: boolean;
  order: number;
}

const mockSections: Section[] = [
  { id: "1", title: "Hero Banner", subtitle: "Defence-grade engineering", published: true, order: 1 },
  { id: "2", title: "About Summary", subtitle: "Company overview block", published: true, order: 2 },
  { id: "3", title: "Capabilities", subtitle: "Key service areas", published: true, order: 3 },
  { id: "4", title: "Credibility", subtitle: "Certifications and partners", published: true, order: 4 },
  { id: "5", title: "Contact CTA", subtitle: "Footer call-to-action", published: false, order: 5 },
];

const AdminHomepagePage = () => {
  const [sections, setSections] = useState<Section[]>(mockSections);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [form, setForm] = useState({ title: "", subtitle: "" });

  const openCreate = () => {
    setEditingSection(null);
    setForm({ title: "", subtitle: "" });
    setDialogOpen(true);
  };

  const openEdit = (section: Section) => {
    setEditingSection(section);
    setForm({ title: section.title, subtitle: section.subtitle });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingSection) {
      setSections(s => s.map(sec => sec.id === editingSection.id ? { ...sec, ...form } : sec));
    } else {
      setSections(s => [...s, { id: Date.now().toString(), ...form, published: false, order: s.length + 1 }]);
    }
    setDialogOpen(false);
  };

  const togglePublish = (id: string) => {
    setSections(s => s.map(sec => sec.id === id ? { ...sec, published: !sec.published } : sec));
  };

  const handleDelete = (id: string) => {
    setSections(s => s.filter(sec => sec.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Homepage Content</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage homepage sections</p>
        </div>
        <Button onClick={openCreate} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Add Section
        </Button>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <Card key={section.id} className="border-border/20">
            <CardContent className="flex items-center justify-between py-4 px-5">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-muted-foreground w-6">#{section.order}</span>
                <div>
                  <p className="font-medium text-foreground">{section.title}</p>
                  <p className="text-sm text-muted-foreground">{section.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => togglePublish(section.id)} title={section.published ? "Unpublish" : "Publish"}>
                  {section.published ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => openEdit(section)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(section.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSection ? "Edit Section" : "Add Section"}</DialogTitle>
            <DialogDescription>Fill in the section details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Section title" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subtitle</label>
              <Input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="Brief description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingSection ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminHomepagePage;
