import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Accompagnement from "./pages/Accompagnement";
import Offres from "./pages/Offres";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import AccesPrive from "./pages/AccesPrive";
import { SiteSettingsProvider } from "./components/SiteSettingsProvider";
import AccesPriveSeo from "./pages/AccesPriveSeo";
import AccesPriveSeoEditor from "./pages/AccesPriveSeoEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SiteSettingsProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/accompagnement" element={<Accompagnement />} />
            <Route path="/offres" element={<Offres />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/acces-prive" element={<AccesPrive />} />
            <Route path="/acces-prive/seo" element={<AccesPriveSeo />} />
            <Route path="/acces-prive/seo/:pageId" element={<AccesPriveSeoEditor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SiteSettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
