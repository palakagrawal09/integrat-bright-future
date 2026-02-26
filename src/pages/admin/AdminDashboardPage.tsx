import { useEffect, useState } from "react";
import { FileText, Users, Newspaper, Mail, Info, Briefcase, Package, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboardPage = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchCounts = async () => {
      const tableNames = ["homepage_sections", "about_entries", "products", "services", "clients", "employees", "news_articles", "contact_submissions"] as const;
      const results = await Promise.all(
        tableNames.map(t => supabase.from(t).select("id", { count: "exact", head: true }))
      );
      const map: Record<string, number> = {};
      tableNames.forEach((t, i) => { map[t] = results[i].count || 0; });
      setCounts(map);
    };
    fetchCounts();
  }, []);

  const stats = [
    { title: "Homepage Sections", count: counts.homepage_sections ?? 0, icon: FileText, url: "/admin/homepage", color: "bg-primary" },
    { title: "About Entries", count: counts.about_entries ?? 0, icon: Info, url: "/admin/about", color: "bg-accent" },
    { title: "Products & Systems", count: counts.products ?? 0, icon: Package, url: "/admin/products", color: "bg-primary" },
    { title: "Services", count: counts.services ?? 0, icon: Briefcase, url: "/admin/services", color: "bg-accent" },
    { title: "Clients", count: counts.clients ?? 0, icon: Users, url: "/admin/clients", color: "bg-primary" },
    { title: "Employees", count: counts.employees ?? 0, icon: UserCircle, url: "/admin/employees", color: "bg-accent" },
    { title: "News Articles", count: counts.news_articles ?? 0, icon: Newspaper, url: "/admin/news", color: "bg-primary" },
    { title: "Contact Submissions", count: counts.contact_submissions ?? 0, icon: Mail, url: "/admin/contacts", color: "bg-destructive" },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1><p className="text-sm text-muted-foreground mt-1">Overview of website content and submissions</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.title} to={stat.url}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`${stat.color} p-2 rounded-sm`}><stat.icon className="w-4 h-4 text-primary-foreground" /></div>
              </CardHeader>
              <CardContent><p className="text-3xl font-bold font-display">{stat.count}</p></CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
