import { useState, useEffect } from "react";
import { Trash2, Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminContactsPage = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    setSubmissions(data || []); setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    await supabase.from("contact_submissions").delete().eq("id", id);
    toast({ title: "Submission deleted" }); setSelected(null); fetchData();
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-display font-bold">Contact Submissions</h1><p className="text-sm text-muted-foreground mt-1">{submissions.length} submissions received</p></div>
      <div className="space-y-3">
        {submissions.map((sub) => (
          <Card key={sub.id} className="border-border/20 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelected(sub)}>
            <CardContent className="flex items-center justify-between py-4 px-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-bold text-sm">{sub.name.charAt(0)}</div>
                <div><p className="font-medium text-foreground">{sub.name}</p><p className="text-sm text-muted-foreground line-clamp-1">{sub.message}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground hidden sm:block">{new Date(sub.created_at).toLocaleDateString()}</span>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDelete(sub.id); }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {submissions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground"><Mail className="w-10 h-10 mx-auto mb-3 opacity-40" /><p>No submissions yet</p></div>
        )}
      </div>
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Submission from {selected?.name}</DialogTitle><DialogDescription>Contact form submission details</DialogDescription></DialogHeader>
          {selected && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-muted-foreground" /><span>{selected.email}</span></div>
              <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-muted-foreground" /><span>{selected.phone}</span></div>
              <div className="flex items-center gap-2 text-sm"><Clock className="w-4 h-4 text-muted-foreground" /><span>{new Date(selected.created_at).toLocaleString()}</span></div>
              {selected.subject && <p className="text-sm font-medium">Subject: {selected.subject}</p>}
              <div className="bg-secondary/50 p-4 rounded-sm text-sm">{selected.message}</div>
            </div>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setSelected(null)}>Close</Button><Button variant="destructive" onClick={() => selected && handleDelete(selected.id)}>Delete</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContactsPage;
