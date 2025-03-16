import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import LandlordDashboard from "./pages/landlord/Dashboard";
import TenantDashboard from "./pages/tenant/Dashboard";
import LegalDashboard from "./pages/legal/Dashboard";
import PropertyDetails from "./pages/landlord/PropertyDetails";
import AddProperty from "./pages/landlord/AddProperty";
import TenantApplications from "./pages/landlord/TenantApplications";
import RentDashboard from "./pages/landlord/RentDashboard";
import MaintenanceRequests from "./pages/landlord/MaintenanceRequests";
import PropertySearch from "./pages/tenant/PropertySearch";
import TenantRentDashboard from "./pages/tenant/RentDashboard";
import TenantMaintenanceRequests from "./pages/tenant/MaintenanceRequests";
import CaseManagement from "./pages/legal/CaseManagement";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Landlord Routes */}
          <Route path="/landlord" element={<ProtectedRoute role="landlord" />}>
            <Route path="dashboard" element={<LandlordDashboard />} />
            <Route path="property/:id" element={<PropertyDetails />} />
            <Route path="add-property" element={<AddProperty />} />
            <Route path="applications" element={<TenantApplications />} />
            <Route path="rent" element={<RentDashboard />} />
            <Route path="maintenance" element={<MaintenanceRequests />} />
          </Route>

          {/* Tenant Routes */}
          <Route path="/tenant" element={<ProtectedRoute role="tenant" />}>
            <Route path="dashboard" element={<TenantDashboard />} />
            <Route path="search" element={<PropertySearch />} />
            <Route path="rent" element={<TenantRentDashboard />} />
            <Route path="maintenance" element={<TenantMaintenanceRequests />} />
          </Route>

          {/* Legal Expert Routes */}
          <Route path="/legal" element={<ProtectedRoute role="legal" />}>
            <Route path="dashboard" element={<LegalDashboard />} />
            <Route path="cases" element={<CaseManagement />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
