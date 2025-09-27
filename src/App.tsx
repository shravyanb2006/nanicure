import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { CompanionsPage } from "./pages/CompanionsPage";
import NaniKeNuskePage from "./pages/NaniKeNuskePage";
import NaniKiVaniPage from "./pages/NaniKiVaniPage";
import NaniWellnessPage from "./pages/NaniWellnessPage";
import DoctorConnectPage from "./pages/DoctorConnectPage";
import ProfilePage from "./pages/ProfilePage";
import StarredPage from "./pages/StarredPage";
import AboutPage from "./pages/AboutPage";
import FeedbackPage from "./pages/FeedbackPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
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
          <Route path="/companions" element={<CompanionsPage />} />
          <Route path="/nani-ke-nuske" element={<NaniKeNuskePage />} />
          <Route path="/nani-nuske" element={<NaniKeNuskePage />} />
          <Route path="/nani-ki-vani" element={<NaniKiVaniPage />} />
          <Route path="/nani-vani" element={<NaniKiVaniPage />} />
          <Route path="/nani-wellness" element={<NaniWellnessPage />} />
          <Route path="/doctor-connect" element={<DoctorConnectPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/starred" element={<StarredPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
