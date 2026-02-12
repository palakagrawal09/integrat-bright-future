import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import DefenseSystemsPage from "./pages/DefenseSystemsPage";
import SimulatorsPage from "./pages/SimulatorsPage";
import IndustrialAutomationPage from "./pages/IndustrialAutomationPage";
import ServicesPage from "./pages/ServicesPage";
import GemProductsPage from "./pages/GemProductsPage";
import NewsMediaPage from "./pages/NewsMediaPage";
import ClientsPage from "./pages/ClientsPage";
import ContactPage from "./pages/ContactPage";
import EnquiryPage from "./pages/EnquiryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/defence-systems" element={<DefenseSystemsPage />} />
          <Route path="/simulators" element={<SimulatorsPage />} />
          <Route path="/industrial-automation" element={<IndustrialAutomationPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gem-products" element={<GemProductsPage />} />
          <Route path="/news" element={<NewsMediaPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
