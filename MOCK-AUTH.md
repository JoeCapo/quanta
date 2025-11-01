# Mock Authentication Guide

## Quick Start (No Firebase Required!)

You can test Quanta immediately without setting up Firebase by using **mock authentication mode**.

### Option 1: Automatic Mock Mode (Recommended for Quick Testing)

If Firebase is not configured, the app automatically uses mock auth. Just:

1. Make sure your `.env` file **doesn't** have Firebase credentials, or has placeholder values
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Use these test credentials:
   - **Email:** `test@quanta.com`
   - **Password:** `password123`

### Option 2: Explicit Mock Mode

Force mock authentication even if Firebase is configured:

1. Add this to your `.env` file:
   ```env
   VITE_USE_MOCK_AUTH=true
   ```

2. Restart dev server:
   ```bash
   npm run dev
   ```

## Test Account

A pre-created test account is available:

```
Email:    test@quanta.com
Password: password123
```

This account has:
- Display Name: "Test User"
- Investment Strategy: Growth
- Monthly Budget: $5,000
- Watchlist: AAPL, GOOGL, MSFT
- Subscription: Free

## Creating New Mock Accounts

You can also create new accounts via the signup page. They will be stored in-memory (lost on page refresh).

## Features Available in Mock Mode

✅ **Available:**
- User registration (signup)
- User login/logout
- Protected routes
- User profile display
- All UI components

❌ **Not Available:**
- Data persistence (resets on refresh)
- Actual Firebase features
- Production deployment

## Switching to Real Firebase

When ready for real Firebase:

1. Remove or comment out `VITE_USE_MOCK_AUTH` from `.env`
2. Add real Firebase credentials to `.env`
3. Follow [FIREBASE-SETUP.md](./FIREBASE-SETUP.md)
4. Restart dev server

## Console Messages

You'll see this in the browser console when using mock auth:

```
⚠️ Firebase not configured. Using mock authentication mode.
💡 To use real Firebase, set up your .env file with Firebase credentials.
```

This is normal and expected!

## Troubleshooting

### "Still can't login"
- Check browser console for errors
- Make sure you're using the correct test credentials
- Try clearing browser cache and cookies
- Restart the dev server

### "Want to see my data persist"
- You need to set up Firebase
- Follow [FIREBASE-SETUP.md](./FIREBASE-SETUP.md)

### "Mock mode not activating"
- Check `.env` has `VITE_USE_MOCK_AUTH=true`
- Make sure there are no typos
- Restart dev server after changing `.env`

## Technical Details

Mock authentication uses:
- In-memory user storage (Map)
- Simulated async operations (delays)
- Automatic cleanup on page refresh
- Same interfaces as real Firebase auth

Code location: `src/services/mockAuthService.ts`
