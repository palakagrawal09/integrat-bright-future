import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FileText, Info, Briefcase, Users, Newspaper,
  Mail, LogOut, Menu, X, ChevronRight, Package, UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/dipl-logo.jpg";

const navItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Homepage", url: "/admin/homepage", icon: FileText },
  { title: "About", url: "/admin/about", icon: Info },
  { title: "Products & Systems", url: "/admin/products", icon: Package },
  { title: "Services", url: "/admin/services", icon: Briefcase },
  { title: "Clients", url: "/admin/clients", icon: Users },
  { title: "Employees", url: "/admin/employees", icon: UserCircle },
  { title: "News & Media", url: "/admin/news", icon: Newspaper },
  { title: "Contact Submissions", url: "/admin/contacts", icon: Mail },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    navigate("/admin/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 lg:w-16"
        } transition-all duration-300 bg-defence-green text-primary-foreground flex-shrink-0 flex flex-col overflow-hidden`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen && (
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <img src={logo} alt="DIPL" className="h-8 w-auto" />
              <span className="font-display font-semibold text-sm">Admin</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/70 hover:text-white p-1 hidden lg:block"
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                isActive(item.url)
                  ? "bg-brass-gold text-foreground"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              title={!sidebarOpen ? item.title : undefined}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-sm text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border/20 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-foreground"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm" asChild>
              <Link to="/" target="_blank">View Site</Link>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
