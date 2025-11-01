# 🚀 Quanta - Quick Setup Guide

## Step 1: Copy Configuration Files

Copy these files from the artifacts into your project:

### Core Files (Required)
1. **src/types/index.ts** - TypeScript type definitions
2. **src/utils/constants.ts** - App constants and configuration
3. **src/index.css** - Global styles with Tailwind
4. **tailwind.config.js** - Tailwind configuration (REPLACE existing)
5. **.env.example** - Environment variables template
6. **README.md** - Project documentation (REPLACE existing)

## Step 2: Update Existing Files

### Update `vite.config.ts`:
Replace the existing file with:

\`\`\`typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@services': path.resolve(__dirname, './src/services'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
\`\`\`

### Update `tsconfig.app.json`:
Add this to the `compilerOptions`:

\`\`\`json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"],
  "@components/*": ["./src/components/*"],
  "@pages/*": ["./src/pages/*"],
  "@hooks/*": ["./src/hooks/*"],
  "@contexts/*": ["./src/contexts/*"],
  "@services/*": ["./src/services/*"],
  "@types/*": ["./src/types/*"],
  "@utils/*": ["./src/utils/*"],
  "@styles/*": ["./src/styles/*"],
  "@assets/*": ["./src/assets/*"]
}
\`\`\`

## Step 3: Create Environment File

\`\`\`bash
# Copy the example file
cp .env.example .env

# Edit .env and add your actual API keys
\`\`\`

## Step 4: Test the Setup

\`\`\`bash
# Run the dev server
npm run dev
\`\`\`

You should see the default Vite React app at http://localhost:3000

## Step 5: Get API Keys

### Firebase (Required)
1. Go to https://console.firebase.google.com/
2. Create new project "Quanta"
3. Enable Authentication > Email/Password
4. Enable Firestore Database
5. Copy config to `.env`

### Finnhub (Required)
1. Sign up at https://finnhub.io/register
2. Copy API key to `.env`

### Hugging Face (Required)
1. Sign up at https://huggingface.co/
2. Go to Settings > Access Tokens
3. Create token, copy to `.env`

## Next Steps

Once setup is complete, we'll create:
- 🔐 Authentication components
- 📊 Stock ticker
- 🤖 AI chat interface
- 📱 Pages and routing

## Troubleshooting

### Port already in use?
Change port in `vite.config.ts` or:
\`\`\`bash
npm run dev -- --port 3001
\`\`\`

### TypeScript errors?
\`\`\`bash
npm run type-check
\`\`\`

### Tailwind not working?
Make sure `index.css` imports Tailwind directives and is imported in `main.tsx`

## File Checklist

- [ ] types/index.ts created
- [ ] utils/constants.ts created  
- [ ] index.css updated
- [ ] tailwind.config.js replaced
- [ ] vite.config.ts updated
- [ ] tsconfig.app.json updated
- [ ] .env created from .env.example
- [ ] npm run dev works
- [ ] Got all 3 API keys

**Ready to build Quanta! 🚀**
