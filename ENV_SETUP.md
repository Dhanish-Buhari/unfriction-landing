# Environment Variables Setup

## Local Development

1. **Create `.env.local` file** in the root directory:
   ```bash
   cp .env.example .env.local
   ```

2. **Add your API keys** to `.env.local`:
   ```env
   LOOPS_API_KEY=your_actual_loops_api_key_here
   POLAR_API_KEY=your_actual_polar_api_key_here
   # ... etc
   ```

3. **Restart your dev server** after adding env variables:
   ```bash
   npm run dev
   ```

> ⚠️ **Note**: `.env.local` is already in `.gitignore` and will NOT be committed to git. It's safe to add real API keys here.

## Production Deployment (Vercel)

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Name**: `LOOPS_API_KEY`
   - **Value**: Your actual API key
   - **Environment**: Production, Preview, Development (select all)
4. Click **Save**
5. **Redeploy** your project for changes to take effect

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login
vercel login

# Add environment variable
vercel env add LOOPS_API_KEY production
vercel env add LOOPS_API_KEY preview
vercel env add LOOPS_API_KEY development

# Deploy
vercel --prod
```

## Getting Your API Keys

### Loops API Key (for waitlist)
1. Go to https://app.loops.so
2. Navigate to **Settings** → **API**
3. Copy your API key
4. Paste it into `LOOPS_API_KEY`

### Polar.sh API Key (for pricing)
1. Go to https://polar.sh
2. Navigate to **Settings** → **API**
3. Copy your API key
4. Paste it into `POLAR_API_KEY`

## Verify Setup

After adding your keys:
- ✅ Restart your dev server
- ✅ Test the waitlist signup form
- ✅ Check that emails are being added to Loops with the `waitlist` tag
- ✅ Verify in Loops dashboard: **Contacts** → Filter by tag: `waitlist`

## Troubleshooting

### Environment variables not working?
- Make sure the file is named `.env.local` (not `.env` or `.env.example`)
- Restart your dev server after adding variables
- In production, make sure you've added the variables in Vercel and redeployed

### API key not found?
- Check that the key is spelled exactly: `LOOPS_API_KEY` (case-sensitive)
- Verify the key doesn't have extra spaces
- Make sure you're using the correct environment file (`.env.local` for local, Vercel settings for production)

