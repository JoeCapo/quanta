// src/pages/Signup.tsx

import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/auth';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';
import { ROUTES, VALIDATION } from '../utils/constants';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`);
      return;
    }

    if (!VALIDATION.EMAIL_REGEX.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.displayName.trim().length === 0) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.displayName);
      // Redirect to dashboard on successful signup
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Join Quanta
          </h1>
          <p className="text-dark-text-secondary">
            Start your AI-powered investment journey today
          </p>
        </div>

        {/* Signup Card */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <ErrorMessage
                message={error}
                onRetry={() => setError('')}
              />
            )}

            {/* Name Input */}
            <Input
              type="text"
              name="displayName"
              label="Full Name"
              placeholder="John Doe"
              value={formData.displayName}
              onChange={handleChange}
              required
              autoComplete="name"
            />

            {/* Email Input */}
            <Input
              type="email"
              name="email"
              label="Email Address"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            {/* Password Input */}
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              helperText={`At least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`}
            />

            {/* Confirm Password Input */}
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-dark-text-secondary text-sm">
              Already have an account?{' '}
              <Link
                to={ROUTES.LOGIN}
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>

        {/* Additional Info */}
        <p className="text-center text-dark-text-secondary text-xs mt-6">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default Signup;
