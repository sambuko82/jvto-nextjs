import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import WhyJVTO from "./pages/WhyJVTO";
import VerifyJVTO from "./pages/VerifyJVTO";
import Team from "./pages/Team";
import CrewProfile from "./pages/CrewProfile";
import TravelGuide from "./pages/TravelGuide";
import TravelGuideDetail from "./pages/TravelGuideDetail";
import FAQ from "./pages/FAQ";
import Reviews from "./pages/Reviews";
import ISIC from "./pages/ISIC";
import BookingPolicy from "./pages/BookingPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import OurStory from "./pages/OurStory";

function Router() {
  return (
    <Switch>
      {/* Core Pages */}
      <Route path="/" component={Home} />
      
      {/* Destinations */}
      <Route path="/destinations" component={Destinations} />
      <Route path="/destinations/:slug" component={DestinationDetail} />
      
      {/* Tours */}
      <Route path="/tours" component={Tours} />
      <Route path="/tours/:slug" component={TourDetail} />
      
      {/* Why JVTO & Verification */}
      <Route path="/why-jvto" component={WhyJVTO} />
      <Route path="/verify-jvto" component={VerifyJVTO} />
      
      {/* Team */}
      <Route path="/team" component={Team} />
      <Route path="/team/:slug" component={CrewProfile} />
      
      {/* Travel Guide */}
      <Route path="/travel-guide" component={TravelGuide} />
      <Route path="/travel-guide/:slug" component={TravelGuideDetail} />
      
      {/* Reviews & FAQ */}
      <Route path="/reviews" component={Reviews} />
      <Route path="/faq" component={FAQ} />
      <Route path="/travel-guide/faq" component={FAQ} />
      
      {/* ISIC */}
      <Route path="/isic" component={ISIC} />
      <Route path="/student-packages" component={ISIC} />
      
      {/* Our Story */}
      <Route path="/our-story" component={OurStory} />
      
      {/* Policy Pages */}
      <Route path="/booking-policy" component={BookingPolicy} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      
      {/* Fallback */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
