import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Megaphone, UserCircle, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminEmployeesPage = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [empDialogOpen, setEmpDialogOpen] = useState(false);
  const [annDialogOpen, setAnnDialogOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState<any | null>(null);
  const [editingAnn, setEditingAnn] = useState<any | null>(null);
  const [empForm, setEmpForm] = useState({ name: "", email: "", phone: "", department: "", designation: "", join_date: "" });
  const [annForm, setAnnForm] = useState({ title: "", content: "", priority: "normal" });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const [{ data: emps }, { data: anns }] = await Promise.all([
      supabase.from("employees").select("*").order("created_at"),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
    ]);
    setEmployees(emps || []);
    setAnnouncements(anns || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // Employee CRUD
  const openCreateEmp = () => { setEditingEmp(null); setEmpForm({ name: "", email: "", phone: "", department: "", designation: "", join_date: "" }); setEmpDialogOpen(true); };
  const openEditEmp = (emp: any) => { setEditingEmp(emp); setEmpForm({ name: emp.name, email: emp.email, phone: emp.phone, department: emp.department, designation: emp.designation, join_date: emp.join_date || "" }); setEmpDialogOpen(true); };
  const handleSaveEmp = async () => {
    const data = { ...empForm, join_date: empForm.join_date || null };
    if (editingEmp) {
      await supabase.from("employees").update(data).eq("id", editingEmp.id);
      toast({ title: "Employee updated" });
    } else {
      await supabase.from("employees").insert(data);
      toast({ title: "Employee added" });
    }
    setEmpDialogOpen(false); fetchData();
  };
  const deleteEmp = async (id: string) => { await supabase.from("employees").delete().eq("id", id); toast({ title: "Employee removed" }); fetchData(); };
  const toggleEmpStatus = async (emp: any) => {
    await supabase.from("employees").update({ status: emp.status === "active" ? "inactive" : "active" }).eq("id", emp.id);
    fetchData();
  };

  // Announcement CRUD
  const openCreateAnn = () => { setEditingAnn(null); setAnnForm({ title: "", content: "", priority: "normal" }); setAnnDialogOpen(true); };
  const openEditAnn = (ann: any) => { setEditingAnn(ann); setAnnForm({ title: ann.title, content: ann.content, priority: ann.priority }); setAnnDialogOpen(true); };
  const handleSaveAnn = async () => {
    if (editingAnn) {
      await supabase.from("announcements").update(annForm).eq("id", editingAnn.id);
      toast({ title: "Announcement updated" });
    } else {
      await supabase.from("announcements").insert(annForm);
      toast({ title: "Announcement created" });
    }
    setAnnDialogOpen(false); fetchData();
  };
  const deleteAnn = async (id: string) => { await supabase.from("announcements").delete().eq("id", id); toast({ title: "Announcement deleted" }); fetchData(); };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Employee Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage employees and company announcements</p>
      </div>

      <Tabs defaultValue="employees">
        <TabsList>
          <TabsTrigger value="employees" className="gap-1.5"><UserCircle className="w-4 h-4" /> Employees</TabsTrigger>
          <TabsTrigger value="announcements" className="gap-1.5"><Megaphone className="w-4 h-4" /> Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{employees.length} employees</p>
            <Button onClick={openCreateEmp} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Employee</Button>
          </div>
          <div className="grid gap-3">
            {employees.map((emp) => (
              <Card key={emp.id} className="border-border/20">
                <CardContent className="flex items-center justify-between py-4 px-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-defence-green/10 flex items-center justify-center text-defence-green font-bold text-sm rounded-full">
                      {emp.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground text-sm">{emp.name}</p>
                        <Badge variant={emp.status === "active" ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">{emp.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{emp.designation} · {emp.department}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground/70">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{emp.email}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{emp.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleEmpStatus(emp)}>
                      <UserCircle className={`w-4 h-4 ${emp.status === "active" ? "text-primary" : "text-muted-foreground"}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditEmp(emp)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteEmp(emp.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{announcements.length} announcements</p>
            <Button onClick={openCreateAnn} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Announcement</Button>
          </div>
          <div className="grid gap-3">
            {announcements.map((ann) => (
              <Card key={ann.id} className="border-border/20">
                <CardContent className="flex items-start justify-between py-4 px-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground text-sm">{ann.title}</p>
                      {ann.priority === "urgent" && <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Urgent</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{ann.content}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(ann.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditAnn(ann)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteAnn(ann.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Employee Dialog */}
      <Dialog open={empDialogOpen} onOpenChange={setEmpDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingEmp ? "Edit Employee" : "Add Employee"}</DialogTitle><DialogDescription>Fill in the employee details.</DialogDescription></DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><label className="text-sm font-medium">Full Name</label><Input value={empForm.name} onChange={e => setEmpForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div className="space-y-1.5"><label className="text-sm font-medium">Email</label><Input value={empForm.email} onChange={e => setEmpForm(f => ({ ...f, email: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><label className="text-sm font-medium">Phone</label><Input value={empForm.phone} onChange={e => setEmpForm(f => ({ ...f, phone: e.target.value }))} /></div>
              <div className="space-y-1.5"><label className="text-sm font-medium">Department</label><Input value={empForm.department} onChange={e => setEmpForm(f => ({ ...f, department: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><label className="text-sm font-medium">Designation</label><Input value={empForm.designation} onChange={e => setEmpForm(f => ({ ...f, designation: e.target.value }))} /></div>
              <div className="space-y-1.5"><label className="text-sm font-medium">Join Date</label><Input type="date" value={empForm.join_date} onChange={e => setEmpForm(f => ({ ...f, join_date: e.target.value }))} /></div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setEmpDialogOpen(false)}>Cancel</Button><Button onClick={handleSaveEmp}>{editingEmp ? "Update" : "Create"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Announcement Dialog */}
      <Dialog open={annDialogOpen} onOpenChange={setAnnDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingAnn ? "Edit Announcement" : "Add Announcement"}</DialogTitle><DialogDescription>Write the announcement details.</DialogDescription></DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5"><label className="text-sm font-medium">Title</label><Input value={annForm.title} onChange={e => setAnnForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium">Content</label><Textarea value={annForm.content} onChange={e => setAnnForm(f => ({ ...f, content: e.target.value }))} rows={4} /></div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Priority</label>
              <div className="flex gap-2">
                <Button size="sm" variant={annForm.priority === "normal" ? "default" : "outline"} onClick={() => setAnnForm(f => ({ ...f, priority: "normal" }))}>Normal</Button>
                <Button size="sm" variant={annForm.priority === "urgent" ? "destructive" : "outline"} onClick={() => setAnnForm(f => ({ ...f, priority: "urgent" }))}>Urgent</Button>
              </div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setAnnDialogOpen(false)}>Cancel</Button><Button onClick={handleSaveAnn}>{editingAnn ? "Update" : "Create"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEmployeesPage;
