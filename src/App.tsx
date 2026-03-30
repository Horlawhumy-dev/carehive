import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <ResponsiveLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<WorkerListing />} />
          <Route path="/worker/:id" element={<WorkerProfile />} />
          <Route path="/booking" element={<BookingFlow />} />
          <Route path="/worker-dashboard" element={<WorkerDashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/household" element={<MyHousehold />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/subscriptions" element={<SubscriptionPlans />} />
          <Route path="/subscription-customize" element={<SubscriptionCustomization />} />
          <Route path="/trust" element={<VerificationTrust />} />
          <Route path="/subscription-manage" element={<SubscriptionManagement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </ResponsiveLayout>
    </Router>
  );
}

export default App;
