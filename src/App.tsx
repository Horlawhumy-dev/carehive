import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import WorkerListing from './pages/WorkerListing';
import WorkerProfile from './pages/WorkerProfile';
import BookingFlow from './pages/BookingFlow';
import WorkerDashboard from './pages/WorkerDashboard';
import Payment from './pages/Payment';
import MyHousehold from './pages/MyHousehold';
import Earnings from './pages/Earnings';
import SubscriptionPlans from './pages/SubscriptionPlans';
import SubscriptionCustomization from './pages/SubscriptionCustomization';
import VerificationTrust from './pages/VerificationTrust';
import SubscriptionManagement from './pages/SubscriptionManagement';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ResponsiveLayout from './components/layout/ResponsiveLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors closeButton />
      <ResponsiveLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<WorkerListing />} />
          <Route path="/worker/:id" element={<WorkerProfile />} />
          
          {/* Client/Household Protected Routes */}
          <Route path="/booking" element={<ProtectedRoute allowedRole="client"><BookingFlow /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute allowedRole="client"><Payment /></ProtectedRoute>} />
          <Route path="/household" element={<ProtectedRoute allowedRole="client"><MyHousehold /></ProtectedRoute>} />
          <Route path="/subscription-plans" element={<ProtectedRoute allowedRole="client"><SubscriptionPlans /></ProtectedRoute>} />
          <Route path="/subscription-customize" element={<ProtectedRoute allowedRole="client"><SubscriptionCustomization /></ProtectedRoute>} />
          <Route path="/subscription-manage" element={<ProtectedRoute allowedRole="client"><SubscriptionManagement /></ProtectedRoute>} />
          
          {/* Worker Protected Routes */}
          <Route path="/worker-dashboard" element={<ProtectedRoute allowedRole="pro"><WorkerDashboard /></ProtectedRoute>} />
          <Route path="/earnings" element={<ProtectedRoute allowedRole="pro"><Earnings /></ProtectedRoute>} />
          
          <Route path="/trust" element={<VerificationTrust />} />
          <Route path="/login" element={<ProtectedRoute redirectIfAuthenticated><Login /></ProtectedRoute>} />
          <Route path="/signup" element={<ProtectedRoute redirectIfAuthenticated><Signup /></ProtectedRoute>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </ResponsiveLayout>
    </Router>
  );
}

export default App;
