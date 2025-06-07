import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { LandingPage } from "./pages/landing";
import { Sidebar } from "./components/sidebar";
import { Navbar } from "./components/navbar";
import { CreateCampaign } from "./pages/createCampaign";
import { Profile } from "./pages/profile";
import { CampaignDetails } from "./pages/campaignDetails";
import { AdminDashboard } from "./pages/admin";
import { HeroSection } from "./components/HeroSection";



const AppLayout = ({ children } :any) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar/>
      <Navbar/>
      <div className="">
        
          {children}
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <Routes>
      {/* Landing page without any layout */}
      <Route path="/" element={<LandingPage />} />
      
      {/* All other routes with top navbar only */}
      <Route path="/home" element={
        <AppLayout>
          <Home />
        </AppLayout>
      } />
      
      <Route path="/profile" element={
        <AppLayout>
          <Profile />
        </AppLayout>
      } />
      
      <Route path="/create-campaign" element={
        <AppLayout>
          <CreateCampaign />
        </AppLayout>
      } />
      
      <Route path="/campaign-details/:id" element={
        <AppLayout>
          <CampaignDetails />
        </AppLayout>
      } />
      
      <Route path="/admin" element={
        <AppLayout>
          <AdminDashboard />
        </AppLayout>
      } />
    </Routes>
  );
};
