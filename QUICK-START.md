# Quanta - Quick Start Guide

## TL;DR - Start Testing NOW! ⚡

```bash
# 1. Restart your dev server
npm run dev

# 2. Open browser to http://localhost:3000

# 3. Login with test credentials:
Email: test@quanta.com
Password: password123
```

That's it! The app automatically uses **mock authentication** since Firebase isn't configured yet.

---

## What Just Happened?

✅ **Phase 1 Complete**: Firebase + Authentication Setup
✅ **Mock Auth Enabled**: Test without Firebase
✅ **Tailwind CSS Fixed**: Styles now working
✅ **React 19**: Latest features enabled

---

## Current Status

### ✅ Working Features:
- User authentication (login/signup/logout)
- Protected routes
- Beautiful dark space-themed UI with Tailwind CSS
- User profile display
- Dashboard with user stats
- Responsive design
- Mock authentication mode (no Firebase needed for testing)

### 🔧 Needs Setup:
- Real Firebase (optional - see [FIREBASE-SETUP.md](./FIREBASE-SETUP.md))
- Stock data API (Phase 2)
- AI chat integration (Phase 3)

---

## Two Ways to Use Quanta

### Option 1: Mock Mode (Quick Testing - No Setup)

**Automatic**: If Firebase isn't configured, mock mode activates automatically.

**Test Account**:
- Email: `test@quanta.com`
- Password: `password123`

**Features**:
- ✅ Full UI testing
- ✅ Create new accounts
- ✅ All protected routes work
- ❌ No data persistence (resets on refresh)

See [MOCK-AUTH.md](./MOCK-AUTH.md) for details.

### Option 2: Firebase Mode (Production Ready)

**Setup Required**: Follow [FIREBASE-SETUP.md](./FIREBASE-SETUP.md)

**Features**:
- ✅ Full UI testing
- ✅ Real authentication
- ✅ Data persistence
- ✅ Production ready

---

## Testing the App

### 1. Login Page (`/login`)
- Use test credentials above
- Or create a new account via "Sign up"

### 2. Dashboard (`/dashboard`)
- View user profile
- See investment strategy and budget
- Click "Logout" to test logout flow

### 3. Signup Page (`/signup`)
- Create new mock accounts
- Try validation errors (short password, etc.)

---

## Project Structure

```
quanta/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Loading.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── layout/       # Layout components
│   ├── pages/            # Page components
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── Dashboard.tsx
│   ├── contexts/         # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/            # Custom hooks
│   │   └── useAuth.ts
│   ├── services/         # API services
│   │   ├── firebase.ts
│   │   ├── authService.ts
│   │   ├── mockAuthService.ts
│   │   └── auth.ts       # Unified auth (switches between mock/real)
│   ├── types/            # TypeScript types
│   ├── utils/            # Constants and utilities
│   └── index.css         # Tailwind + custom styles
├── .env                  # Environment variables (YOU CREATE THIS)
├── .env.example          # Template
└── package.json
```

---

## Important Files

| File | Purpose |
|------|---------|
| `.env` | Your API keys (create from `.env.example`) |
| `src/config.ts` | Determines mock vs Firebase mode |
| `src/services/auth.ts` | Unified auth service |
| `src/contexts/AuthContext.tsx` | Global auth state |
| `tailwind.config.js` | Theme colors and styles |
| `postcss.config.js` | PostCSS plugins for Tailwind |

---

## Styles & Theme

### Colors
- **Primary**: Indigo/Purple (`#6366f1`)
- **Accent**: Cyan/Blue (`#22d3ee`)
- **Success**: Green (market gains)
- **Error**: Red (market losses)
- **Background**: Deep space black (`#0a0a0f`)

### Utility Classes
- `.text-gradient` - Gradient text effect
- `.card` - Standard card
- `.card-elevated` - Elevated card with glow
- `.btn-primary` - Primary button
- `.spinner` - Loading spinner

---

## Next Steps

### Phase 2: Stock Data Integration
- [ ] Finnhub API setup
- [ ] Stock ticker component
- [ ] Watchlist functionality
- [ ] Real-time price updates

### Phase 3: AI Chat
- [ ] Hugging Face API setup
- [ ] Chat interface
- [ ] AI-powered recommendations
- [ ] Context-aware responses

### Phase 4: Advanced Features
- [ ] Portfolio tracking
- [ ] Advanced charts (Recharts)
- [ ] Price alerts
- [ ] Export functionality

---

## Troubleshooting

### Styles Not Showing?
1. Make sure dev server restarted after creating `postcss.config.js`
2. Check browser console for errors
3. Try clearing browser cache: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Can't Login?
1. Using test credentials? `test@quanta.com` / `password123`
2. Check browser console - should see "Using mock authentication mode"
3. Try creating a new account via signup

### Page is Blank?
1. Check browser console for errors
2. Make sure `npm run dev` is running
3. Try `npm install` and restart dev server

### Want Real Firebase?
Follow [FIREBASE-SETUP.md](./FIREBASE-SETUP.md) to set up production auth.

---

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run linter
```

---

## Support

- **Documentation**: Check `*.md` files in project root
- **Issues**: https://github.com/JoeCapo/quanta/issues
- **Firebase Help**: [FIREBASE-SETUP.md](./FIREBASE-SETUP.md)
- **Mock Auth Help**: [MOCK-AUTH.md](./MOCK-AUTH.md)

---

**Ready to build the future of AI-powered investing! 🚀**
