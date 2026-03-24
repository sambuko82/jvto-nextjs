import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import OurStory from "./pages/why-jvto/OurStory";
import OurTeam from "./pages/why-jvto/OurTeam";
import Reviews from "./pages/why-jvto/Reviews";
import VerifyJVTO from "./pages/VerifyJVTO";
import VerifyLegal from "./pages/verify-jvto/Legal";
import VerifyPress from "./pages/verify-jvto/PressRecognition";
import VerifyHistory from "./pages/verify-jvto/HistoryArtifacts";
import VerifyPolice from "./pages/verify-jvto/PoliceSafety";
import CrewProfile from "./pages/CrewProfile";
import TravelGuide from "./pages/TravelGuide";
import TravelGuideDetail from "./pages/TravelGuideDetail";
import TravelGuideBooking from "./pages/travel-guide/BookingInformation";
import TravelGuideIjen from "./pages/travel-guide/IjenHealthScreening";
import TravelGuideSafety from "./pages/travel-guide/SafetyOnTours";
import TravelGuideWeather from "./pages/travel-guide/WeatherClosures";
import TravelGuidePacking from "./pages/travel-guide/PackingFitness";
import TravelGuideEscort from "./pages/travel-guide/PoliceEscort";
import FAQ from "./pages/FAQ";
import ISIC from "./pages/ISIC";
import Policy from "./pages/policy/Policy";
import BookingPaymentCancellation from "./pages/policy/BookingPaymentCancellation";
import PolicyInclusions from "./pages/policy/InclusionsExclusions";
import Privacy from "./pages/policy/Privacy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

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
      
      {/* Why JVTO Cluster */}
      <Route path="/why-jvto" component={WhyJVTO} />
      <Route path="/why-jvto/our-story" component={OurStory} />
      <Route path="/why-jvto/our-team" component={OurTeam} />
      <Route path="/why-jvto/reviews" component={Reviews} />
      
      {/* Verify JVTO Cluster */}
      <Route path="/verify-jvto" component={VerifyJVTO} />
      <Route path="/verify-jvto/legal" component={VerifyLegal} />
      <Route path="/verify-jvto/press-recognition" component={VerifyPress} />
      <Route path="/verify-jvto/history-artifacts" component={VerifyHistory} />
      <Route path="/verify-jvto/police-safety" component={VerifyPolice} />
      
      {/* Team (Crew Profiles) */}
      <Route path="/team" component={OurTeam} />
      <Route path="/team/:slug" component={CrewProfile} />
      
      {/* Travel Guide Cluster */}
      <Route path="/travel-guide" component={TravelGuide} />
      <Route path="/travel-guide/booking-information" component={TravelGuideBooking} />
      <Route path="/travel-guide/ijen-health-screening" component={TravelGuideIjen} />
      <Route path="/travel-guide/safety-on-tours" component={TravelGuideSafety} />
      <Route path="/travel-guide/weather-and-closures" component={TravelGuideWeather} />
      <Route path="/travel-guide/packing-and-fitness" component={TravelGuidePacking} />
      <Route path="/travel-guide/police-escort-for-groups" component={TravelGuideEscort} />
      <Route path="/travel-guide/faq" component={FAQ} />
      <Route path="/travel-guide/:slug" component={TravelGuideDetail} />
      
      {/* FAQ (legacy route) */}
      <Route path="/faq" component={FAQ} />
      
      {/* ISIC Student Package */}
      <Route path="/isic" component={ISIC} />
      <Route path="/isic/student-package" component={ISIC} />
      
      {/* Policy Cluster */}
      <Route path="/policy" component={Policy} />
      <Route path="/policy/booking-payment-cancellation" component={BookingPaymentCancellation} />
      <Route path="/policy/inclusions-exclusions" component={PolicyInclusions} />
      <Route path="/policy/privacy" component={Privacy} />
      
      {/* Contact */}
      <Route path="/contact" component={Contact} />
      
      {/* Legacy routes for backward compatibility */}
      <Route path="/reviews" component={Reviews} />
      <Route path="/our-story" component={OurStory} />
      <Route path="/booking-policy" component={BookingPaymentCancellation} />
      <Route path="/privacy-policy" component={Privacy} />
      
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
