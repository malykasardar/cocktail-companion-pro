
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import Flavors from "./pages/Flavors";
import DrinkWise from "./pages/DrinkWise";
import Reference from "./pages/Reference";
import LessonDetail from "./pages/LessonDetail";
import ReferenceDetail from "./pages/ReferenceDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Learn />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/flavors" element={<Flavors />} />
          <Route path="/drinkwise" element={<DrinkWise />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="/lesson/:id" element={<LessonDetail />} />
          <Route path="/reference/:id" element={<ReferenceDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
