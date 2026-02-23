import { FileText, Users, Newspaper, Mail, Info, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { title: "Homepage Sections", count: 5, icon: FileText, url: "/admin/homepage", color: "bg-primary" },
  { title: "About Entries", count: 4, icon: Info, url: "/admin/about", color: "bg-accent" },
  { title: "Services", count: 6, icon: Briefcase, url: "/admin/services", color: "bg-primary" },
  { title: "Clients", count: 12, icon: Users, url: "/admin/clients", color: "bg-accent" },
  { title: "News Articles", count: 8, icon: Newspaper, url: "/admin/news", color: "bg-primary" },
  { title: "Contact Submissions", count: 3, icon: Mail, url: "/admin/contacts", color: "bg-destructive" },
];

const AdminDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of website content and submissions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.title} to={stat.url}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`${stat.color} p-2 rounded-sm`}>
                  <stat.icon className="w-4 h-4 text-primary-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold font-display">{stat.count}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="border-border/20">
        <CardHeader>
          <CardTitle className="text-lg font-display">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: "New contact submission received", time: "2 hours ago" },
              { action: "News article updated", time: "5 hours ago" },
              { action: "Service entry added", time: "1 day ago" },
              { action: "Client logo uploaded", time: "2 days ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/10 last:border-0">
                <span className="text-sm text-foreground">{activity.action}</span>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
