# URGENT: Fix Vercel Environment Variable

## The Problem

Your frontend is calling the wrong URL:
- ❌ Calling: `https://awad-cys7i46t3-hytatys-projects.vercel.app/auth/login` (wrong!)
- ✅ Should call: `https://ia01-react-tutorial-vik0.onrender.com/auth/login` (correct!)

This means `VITE_API_BASE_URL` is not set in Vercel.

---

## Solution 1: Set Environment Variable in Vercel (REQUIRED)

### Step-by-Step Instructions:

1. **Go to your Vercel project**:
   - https://vercel.com/dashboard
   - Select your project (probably named "awad-04" or similar)

2. **Navigate to Settings**:
   - Click "Settings" tab at the top
   - Click "Environment Variables" in the left sidebar

3. **Add the environment variable**:

   Click "Add New" button and enter:

   ```
   Key: VITE_API_BASE_URL
   Value: https://ia01-react-tutorial-vik0.onrender.com
   ```

   **IMPORTANT CHECKBOXES** - Check ALL three:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. **Click "Save"**

5. **Trigger a new deployment**:

   **Option A - Via Dashboard (Fastest)**:
   - Go to "Deployments" tab
   - Find the latest deployment
   - Click the three dots (⋯) on the right
   - Click "Redeploy"
   - Click "Redeploy" again to confirm

   **Option B - Via Git Push**:
   ```bash
   git commit --allow-empty -m "Trigger rebuild with env vars"
   git push origin main
   ```

---

## Solution 2: Verify in Browser Console (After Redeployment)

After the new deployment finishes (1-2 minutes):

1. Open your Vercel app
2. Open Browser Console (F12)
3. Paste this and press Enter:
   ```javascript
   console.log(import.meta.env.VITE_API_BASE_URL)
   ```
4. Should show: `https://ia01-react-tutorial-vik0.onrender.com`

---

## Common Mistakes to Avoid

### ❌ Wrong Format:
```
VITE_API_BASE_URL=https://ia01-react-tutorial-vik0.onrender.com/  (trailing slash)
VITE_API_BASE_URL="https://ia01-react-tutorial-vik0.onrender.com"  (quotes)
API_BASE_URL=https://ia01-react-tutorial-vik0.onrender.com  (missing VITE_ prefix)
```

### ✅ Correct Format:
```
VITE_API_BASE_URL=https://ia01-react-tutorial-vik0.onrender.com
```

---

## Why This Happens

Vite requires environment variables to:
1. Start with `VITE_` prefix (for security)
2. Be set at **BUILD TIME** (not runtime)
3. Be redeployed after adding/changing them

Without the variable, your code falls back to localhost, but Vercel may inject its own URLs.

---

## Verification Checklist

After redeployment, verify:

- [ ] Environment variable appears in Vercel Settings → Environment Variables
- [ ] All three environments checked (Production, Preview, Development)
- [ ] New deployment created after adding the variable
- [ ] Browser console shows correct API URL
- [ ] Login/Register API calls go to Render backend
- [ ] No CORS errors in console

---

## Still Not Working?

### Check Build Logs:

1. Go to Vercel Dashboard → Deployments
2. Click on the latest deployment
3. Click "Building" or "Logs"
4. Search for "VITE_API_BASE_URL"
5. Should see it being used during build

### Nuclear Option - Delete & Recreate Project:

If nothing works:
1. Note your environment variables
2. Delete the Vercel project
3. Re-import from GitHub
4. Set environment variables BEFORE first deployment
5. Deploy

---

## Screenshots Reference

Your Vercel Environment Variables should look like:

```
┌─────────────────────────┬───────────────────────────────────────────────────┬─────┬─────────┬─────────────┐
│ KEY                     │ VALUE                                             │ PRD │ PRV     │ DEV         │
├─────────────────────────┼───────────────────────────────────────────────────┼─────┼─────────┼─────────────┤
│ VITE_API_BASE_URL       │ https://ia01-react-tutorial-vik0.onrender.com    │  ✓  │    ✓    │      ✓      │
└─────────────────────────┴───────────────────────────────────────────────────┴─────┴─────────┴─────────────┘
```

---

## Quick Command Reference

```bash
# If you have Vercel CLI installed
cd frontend
vercel env add VITE_API_BASE_URL production
# Enter: https://ia01-react-tutorial-vik0.onrender.com

vercel env add VITE_API_BASE_URL preview
# Enter: https://ia01-react-tutorial-vik0.onrender.com

vercel env add VITE_API_BASE_URL development
# Enter: https://ia01-react-tutorial-vik0.onrender.com

# Then redeploy
vercel --prod
```
