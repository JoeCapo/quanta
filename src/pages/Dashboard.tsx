// src/pages/Dashboard.tsx

import { useAuth } from '../hooks/useAuth';
import { logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { ROUTES } from '../utils/constants';
import { WatchlistManager } from '../components/stock';

function Dashboard() {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading state while profile is being fetched
  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-dark-text-secondary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">
              Welcome, {userProfile?.displayName || user?.displayName || 'Investor'}!
            </h1>
            <p className="text-dark-text-secondary">
              Your AI-powered investment dashboard
            </p>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-dark-text-secondary text-sm uppercase tracking-wide mb-2">
              Investment Strategy
            </h3>
            <p className="text-2xl font-bold capitalize">
              {userProfile?.investmentStrategy || 'Not Set'}
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-dark-text-secondary text-sm uppercase tracking-wide mb-2">
              Monthly Budget
            </h3>
            <p className="text-2xl font-bold">
              ${userProfile?.monthlyBudget?.toLocaleString() || '0'}
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-dark-text-secondary text-sm uppercase tracking-wide mb-2">
              Subscription
            </h3>
            <p className="text-2xl font-bold capitalize">
              {userProfile?.subscriptionTier || 'Free'}
            </p>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mb-8">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" onClick={() => navigate(ROUTES.PROFILE)}>
              Edit Profile
            </Button>
            <Button variant="ghost" disabled>
              Portfolio (Coming Soon)
            </Button>
            <Button variant="ghost" disabled>
              AI Chat (Coming Soon)
            </Button>
          </div>
        </Card>

        {/* Watchlist Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Stock Watchlist</h2>
          <Card className="p-6">
            <WatchlistManager />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
