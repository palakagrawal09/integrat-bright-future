import { useState } from "react";
import { Trash2, Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  verified: boolean;
}

const mockSubmissions: ContactSubmission[] = [
  { id: "1", name: "Rajesh Kumar", email: "rajesh@example.com", phone: "+91 98765 43210", message: "Interested in fire control systems for army project.", date: "2025-02-20", verified: true },
  { id: "2", name: "Priya Sharma", email: "priya@company.in", phone: "+91 87654 32109", message: "Need quote for industrial automation setup.", date: "2025-02-18", verified: true },
  { id: "3", name: "Col. Mehta (Retd.)", email: "mehta@defence.gov.in", phone: "+91 99887 76655", message: "Enquiry regarding simulator training systems.", date: "2025-02-15", verified: false },
];

const AdminContactsPage = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(mockSubmissions);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  const handleDelete = (id: string) => {
    setSubmissions(s => s.filter(sub => sub.id !== id));
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Contact Submissions</h1>
        <p className="text-sm text-muted-foreground mt-1">{submissions.length} submissions received</p>
      </div>

      <div className="space-y-3">
        {submissions.map((sub) => (
          <Card
            key={sub.id}
            className="border-border/20 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelected(sub)}
          >
            <CardContent className="flex items-center justify-between py-4 px-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {sub.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{sub.name}</p>
                    {sub.verified && (
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm font-medium">OTP Verified</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{sub.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground hidden sm:block">{sub.date}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => { e.stopPropagation(); handleDelete(sub.id); }}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {submissions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Mail className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No submissions yet</p>
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submission from {selected?.name}</DialogTitle>
            <DialogDescription>Contact form submission details</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{selected.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{selected.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{selected.date}</span>
              </div>
              <div className="bg-secondary/50 p-4 rounded-sm text-sm">
                {selected.message}
              </div>
              {selected.verified && (
                <p className="text-xs text-primary font-medium">✓ OTP Verified submission</p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
            <Button variant="destructive" onClick={() => selected && handleDelete(selected.id)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContactsPage;
