// src/pages/Profile.tsx

import { useState, type FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';
import { ROUTES, INVESTMENT_STRATEGIES, VALIDATION } from '../utils/constants';

function Profile() {
  const { userProfile, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    monthlyBudget: userProfile?.monthlyBudget || 1000,
    investmentStrategy: userProfile?.investmentStrategy || 'index',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.monthlyBudget < VALIDATION.MIN_BUDGET) {
      setError(`Budget must be at least $${VALIDATION.MIN_BUDGET}`);
      return;
    }

    if (formData.monthlyBudget > VALIDATION.MAX_BUDGET) {
      setError(`Budget cannot exceed $${VALIDATION.MAX_BUDGET.toLocaleString()}`);
      return;
    }

    setLoading(true);

    try {
      await updateUserProfile({
        displayName: formData.displayName,
        monthlyBudget: formData.monthlyBudget,
        investmentStrategy: formData.investmentStrategy as any,
      });

      setSuccess('Profile updated successfully!');

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Profile Settings
          </h1>
          <p className="text-dark-text-secondary">
            Update your investment preferences
          </p>
        </div>

        {/* Profile Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Message */}
            {success && (
              <div className="rounded-lg border border-success-500/30 bg-success-500/10 p-4">
                <p className="text-sm text-success-400">{success}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <ErrorMessage
                message={error}
                onRetry={() => setError('')}
              />
            )}

            {/* Display Name */}
            <Input
              type="text"
              name="displayName"
              label="Display Name"
              placeholder="Your name"
              value={formData.displayName}
              onChange={handleChange}
              required
            />

            {/* Monthly Budget */}
            <Input
              type="number"
              name="monthlyBudget"
              label="Monthly Investment Budget ($)"
              placeholder="1000"
              value={formData.monthlyBudget}
              onChange={handleChange}
              required
              min={VALIDATION.MIN_BUDGET}
              max={VALIDATION.MAX_BUDGET}
              step="10"
              helperText={`Between $${VALIDATION.MIN_BUDGET} and $${VALIDATION.MAX_BUDGET.toLocaleString()}`}
            />

            {/* Investment Strategy */}
            <div className="w-full">
              <label htmlFor="investmentStrategy" className="label">
                Investment Strategy
              </label>
              <select
                id="investmentStrategy"
                name="investmentStrategy"
                value={formData.investmentStrategy}
                onChange={handleChange}
                className="input w-full"
                required
              >
                {INVESTMENT_STRATEGIES.map((strategy) => (
                  <option key={strategy.id} value={strategy.id}>
                    {strategy.icon} {strategy.name}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-dark-text-secondary">
                {INVESTMENT_STRATEGIES.find(s => s.id === formData.investmentStrategy)?.description}
              </p>
            </div>

            {/* Strategy Details */}
            <Card className="p-4 bg-dark-elevated">
              <h4 className="font-semibold mb-2 text-sm">Strategy Characteristics:</h4>
              <ul className="space-y-1">
                {INVESTMENT_STRATEGIES.find(s => s.id === formData.investmentStrategy)?.characteristics?.map((char, idx) => (
                  <li key={idx} className="text-sm text-dark-text-secondary flex items-start gap-2">
                    <span className="text-primary-400 mt-0.5">•</span>
                    {char}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                className="flex-1"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => navigate(ROUTES.DASHBOARD)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
