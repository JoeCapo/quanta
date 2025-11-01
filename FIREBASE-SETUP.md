# Firebase Setup Guide for Quanta

## Step 1: Create Firebase Account & Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account
3. Click **"Add project"** or **"Create a project"**
4. Enter project name: **"Quanta"** (or your preferred name)
5. Disable Google Analytics (optional for MVP)
6. Click **"Create project"**

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Register app nickname: **"Quanta Web App"**
3. Check **"Also set up Firebase Hosting"** (optional)
4. Click **"Register app"**
5. **COPY** the Firebase configuration object - you'll need this!

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 3: Enable Authentication

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Click on **"Email/Password"** under Sign-in providers
4. Toggle **"Enable"** to ON
5. Click **"Save"**

## Step 4: Create Firestore Database

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
   - Note: This allows read/write access for 30 days
4. Choose your preferred location (e.g., us-central)
5. Click **"Enable"**

## Step 5: Set Up Firestore Security Rules (Optional but Recommended)

After creating the database, go to the **"Rules"** tab and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Allow all other collections for testing (change in production!)
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Click **"Publish"**

## Step 6: Update Your .env File

1. Open your `.env` file in the project root
2. Replace the placeholder values with your Firebase config:

```env
VITE_FIREBASE_API_KEY=AIza...your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Step 7: Restart Your Dev Server

After updating the `.env` file:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## Verification

Your Firebase setup is complete when:
- ✅ Authentication is enabled with Email/Password
- ✅ Firestore database is created
- ✅ `.env` file has real Firebase credentials
- ✅ Dev server restarted after updating `.env`

## Testing Authentication

1. Go to `http://localhost:3000`
2. You should be redirected to `/login`
3. Click "Sign up for free"
4. Create a test account
5. Check Firebase Console > Authentication > Users to see your new user!

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure all Firebase config values in `.env` are correct
- Restart your dev server after changing `.env`

### "Missing or insufficient permissions"
- Check Firestore rules are set correctly
- Make sure you're in "test mode" or have proper rules

### Still not working?
- Open browser console (F12) to see specific error messages
- Check that `.env` values don't have quotes around them
- Make sure the `.env` file is in the project root (not in `src/`)

## Next Steps

Once Firebase is set up and authentication works:
- Phase 2: Stock data integration (Finnhub API)
- Phase 3: AI chat integration (Hugging Face API)
- Phase 4: Watchlist and user preferences
