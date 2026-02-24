import { useState } from "react";
import { Plus, Pencil, Trash2, Megaphone, UserCircle, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joinDate: string;
  status: "active" | "inactive";
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: "normal" | "urgent";
}

const mockEmployees: Employee[] = [
  { id: "1", name: "Rahul Sharma", email: "rahul@dipl.com", phone: "+91 98765 43210", department: "Engineering", designation: "Senior Engineer", joinDate: "2018-03-15", status: "active" },
  { id: "2", name: "Priya Patel", email: "priya@dipl.com", phone: "+91 87654 32109", department: "R&D", designation: "Research Lead", joinDate: "2019-07-22", status: "active" },
  { id: "3", name: "Amit Kumar", email: "amit@dipl.com", phone: "+91 76543 21098", department: "Production", designation: "Production Manager", joinDate: "2016-11-08", status: "active" },
  { id: "4", name: "Neha Gupta", email: "neha@dipl.com", phone: "+91 65432 10987", department: "Admin", designation: "HR Executive", joinDate: "2021-01-10", status: "active" },
  { id: "5", name: "Vikram Singh", email: "vikram@dipl.com", phone: "+91 54321 09876", department: "Engineering", designation: "Embedded Systems Engineer", joinDate: "2020-06-01", status: "inactive" },
];

const mockAnnouncements: Announcement[] = [
  { id: "1", title: "Annual Day Celebration", content: "DIPL Annual Day will be celebrated on March 15. All employees are invited with their families.", date: "2026-02-20", priority: "normal" },
  { id: "2", title: "Security Protocol Update", content: "New security protocols for accessing lab facilities. Please collect your updated ID cards from admin.", date: "2026-02-18", priority: "urgent" },
  { id: "3", title: "Training Session — Embedded Systems", content: "A 2-day workshop on advanced embedded systems design will be held next week.", date: "2026-02-15", priority: "normal" },
];

const AdminEmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [empDialogOpen, setEmpDialogOpen] = useState(false);
  const [annDialogOpen, setAnnDialogOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null);

  const [empForm, setEmpForm] = useState({ name: "", email: "", phone: "", department: "", designation: "", joinDate: "" });
  const [annForm, setAnnForm] = useState({ title: "", content: "", priority: "normal" as "normal" | "urgent" });

  const openCreateEmp = () => { setEditingEmp(null); setEmpForm({ name: "", email: "", phone: "", department: "", designation: "", joinDate: "" }); setEmpDialogOpen(true); };
  const openEditEmp = (emp: Employee) => { setEditingEmp(emp); setEmpForm({ name: emp.name, email: emp.email, phone: emp.phone, department: emp.department, designation: emp.designation, joinDate: emp.joinDate }); setEmpDialogOpen(true); };

  const handleSaveEmp = () => {
    if (editingEmp) {
      setEmployees(e => e.map(em => em.id === editingEmp.id ? { ...em, ...empForm } : em));
    } else {
      setEmployees(e => [...e, { id: Date.now().toString(), ...empForm, status: "active" }]);
    }
    setEmpDialogOpen(false);
  };

  const openCreateAnn = () => { setEditingAnn(null); setAnnForm({ title: "", content: "", priority: "normal" }); setAnnDialogOpen(true); };
  const openEditAnn = (ann: Announcement) => { setEditingAnn(ann); setAnnForm({ title: ann.title, content: ann.content, priority: ann.priority }); setAnnDialogOpen(true); };

  const handleSaveAnn = () => {
    if (editingAnn) {
      setAnnouncements(a => a.map(an => an.id === editingAnn.id ? { ...an, ...annForm } : an));
    } else {
      setAnnouncements(a => [...a, { id: Date.now().toString(), ...annForm, date: new Date().toISOString().split("T")[0] }]);
    }
    setAnnDialogOpen(false);
  };

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

        {/* Employees Tab */}
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
                      {emp.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground text-sm">{emp.name}</p>
                        <Badge variant={emp.status === "active" ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">
                          {emp.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{emp.designation} · {emp.department}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground/70">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{emp.email}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{emp.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEmployees(e => e.map(em => em.id === emp.id ? { ...em, status: em.status === "active" ? "inactive" : "active" } : em))}>
                      {emp.status === "active" ? <UserCircle className="w-4 h-4 text-primary" /> : <UserCircle className="w-4 h-4 text-muted-foreground" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditEmp(emp)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEmployees(e => e.filter(em => em.id !== emp.id))}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Announcements Tab */}
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
                      {ann.priority === "urgent" && (
                        <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Urgent</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{ann.content}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {ann.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditAnn(ann)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setAnnouncements(a => a.filter(an => an.id !== ann.id))}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
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
          <DialogHeader>
            <DialogTitle>{editingEmp ? "Edit Employee" : "Add Employee"}</DialogTitle>
            <DialogDescription>Fill in the employee details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Full Name</label>
                <Input value={empForm.name} onChange={e => setEmpForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email</label>
                <Input value={empForm.email} onChange={e => setEmpForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Phone</label>
                <Input value={empForm.phone} onChange={e => setEmpForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Department</label>
                <Input value={empForm.department} onChange={e => setEmpForm(f => ({ ...f, department: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Designation</label>
                <Input value={empForm.designation} onChange={e => setEmpForm(f => ({ ...f, designation: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Join Date</label>
                <Input type="date" value={empForm.joinDate} onChange={e => setEmpForm(f => ({ ...f, joinDate: e.target.value }))} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmpDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEmp}>{editingEmp ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Announcement Dialog */}
      <Dialog open={annDialogOpen} onOpenChange={setAnnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAnn ? "Edit Announcement" : "Add Announcement"}</DialogTitle>
            <DialogDescription>Write the announcement details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Title</label>
              <Input value={annForm.title} onChange={e => setAnnForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Content</label>
              <Textarea value={annForm.content} onChange={e => setAnnForm(f => ({ ...f, content: e.target.value }))} rows={4} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Priority</label>
              <div className="flex gap-2">
                <Button size="sm" variant={annForm.priority === "normal" ? "default" : "outline"} onClick={() => setAnnForm(f => ({ ...f, priority: "normal" }))}>Normal</Button>
                <Button size="sm" variant={annForm.priority === "urgent" ? "destructive" : "outline"} onClick={() => setAnnForm(f => ({ ...f, priority: "urgent" }))}>Urgent</Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnnDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAnn}>{editingAnn ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEmployeesPage;
