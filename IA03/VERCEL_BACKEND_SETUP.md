# Deploy NestJS Backend to Vercel - Complete Guide

## ⚠️ Important Note

NestJS on Vercel requires a **serverless** setup. Vercel functions have limitations:
- **10 second timeout** on free tier (25s on Pro)
- **Cold starts** (~1-3 seconds)
- **No WebSockets** or persistent connections
- **Stateless** - no in-memory storage between requests

If you need persistent connections or longer processing times, use **Render or Railway** instead!

---

## 📁 Required Files (Already Created)

I've created these files in your `backend/` directory:

### 1. `backend/vercel.json`
Configuration for Vercel deployment

### 2. `backend/api/index.ts`
Serverless function entry point

### 3. `backend/.vercelignore`
Files to exclude from deployment

---

## 🚀 Deploy to Vercel - Step by Step

### Step 1: Prepare Your Code

```bash
# Navigate to your project root
cd d:\DEV\AdvancedWeb\IA03

# Add all files
git add .

# Commit
git commit -m "Configure backend for Vercel deployment"

# Push to GitHub
git push origin main
```

### Step 2: Deploy Backend on Vercel

1. **Go to Vercel**: https://vercel.com/dashboard

2. **Click "Add New Project"**

3. **Import your GitHub repository**

4. **Configure the project**:

   **Framework Preset**: Other

   **Root Directory**: `backend` ⚠️ IMPORTANT!
   - Click "Edit" next to Root Directory
   - Type: `backend`

   **Build Settings**:
   - Build Command: `npm run build` or leave empty
   - Output Directory: leave empty
   - Install Command: `npm install`

5. **Add Environment Variables**:

   Click "Environment Variables" and add these:

   | Variable Name | Value | Required |
   |--------------|--------|----------|
   | `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` | ✅ Yes |
   | `JWT_SECRET` | Your JWT secret (random string) | ✅ Yes |
   | `JWT_REFRESH_SECRET` | Your refresh token secret | ✅ Yes |
   | `NODE_ENV` | `production` | ✅ Yes |

   **How to get MongoDB URI**:
   - Go to MongoDB Atlas: https://cloud.mongodb.com/
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

   **Generate secure secrets**:
   ```bash
   # Run in terminal to generate random secrets
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

6. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your backend will be available at: `https://your-backend.vercel.app`

---

## 🔧 Update Frontend Configuration

### Step 1: Update Local .env

Update `frontend/.env`:
```env
VITE_API_BASE_URL=https://your-backend.vercel.app
```

Replace `your-backend.vercel.app` with your actual Vercel backend URL.

### Step 2: Update Vercel Frontend Environment Variable

1. Go to your **frontend project** in Vercel
2. Settings → Environment Variables
3. Update `VITE_API_BASE_URL`:
   ```
   VITE_API_BASE_URL=https://your-backend.vercel.app
   ```
4. Redeploy frontend

---

## ✅ Testing Your Backend

### Test 1: Check if Backend is Online

```bash
# Replace with your actual Vercel URL
curl https://your-backend.vercel.app
```

You should get a response (even if it's 404).

### Test 2: Test User Registration

```bash
curl -X POST https://your-backend.vercel.app/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456"}'
```

Expected response:
```json
{
  "message": "User registered successfully",
  "user": {
    "email": "test@example.com",
    "createdAt": "2025-11-05T..."
  }
}
```

### Test 3: Test Login

```bash
curl -X POST https://your-backend.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456"}'
```

Expected response:
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

---

## 🔍 Troubleshooting

### Issue 1: "Cannot find module"

**Cause**: Dependencies not installed properly

**Solution**:
1. Check Vercel build logs
2. Ensure all dependencies are in `dependencies` (not `devDependencies`)
3. Move `@nestjs/cli` to `dependencies`:

```bash
cd backend
npm install --save @nestjs/cli @nestjs/schematics
git add package.json package-lock.json
git commit -m "Move NestJS CLI to dependencies"
git push origin main
```

### Issue 2: "MongoDB connection failed"

**Cause**: MongoDB Atlas network access or wrong connection string

**Solution**:
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Save
5. Verify connection string in Vercel environment variables

### Issue 3: "CORS errors"

**Cause**: Frontend URL not in CORS whitelist

**Solution**: Your backend is already configured with:
```typescript
app.enableCors({
  origin: [
    'http://localhost:5173',
    /\.vercel\.app$/, // Allows all Vercel apps
  ],
  credentials: true,
});
```

This should work automatically!

### Issue 4: "Function timeout"

**Cause**: Operation takes longer than 10 seconds

**Solution**:
- Free tier: 10 second limit (can't change)
- Pro tier: 25 second limit
- Consider using Render for long operations

### Issue 5: Cold starts

**Cause**: Vercel serverless functions sleep when not used

**Solution**:
- First request after idle: ~2-3 seconds
- Subsequent requests: Fast
- Use Render if you need consistently fast response times

---

## 📊 Vercel vs Render Comparison

| Feature | Vercel | Render |
|---------|--------|--------|
| **Setup** | Harder (serverless) | Easier (traditional server) |
| **Cold starts** | Yes (~2s) | No (Pro tier) |
| **Timeout** | 10s (Free), 25s (Pro) | No limit |
| **WebSockets** | ❌ No | ✅ Yes |
| **Free tier** | Generous | 750 hrs/month |
| **Best for** | Simple APIs | Complex backends |

---

## 🎯 Recommended Setup

### For Simple Projects (Current setup):
- ✅ Frontend: Vercel
- ✅ Backend: Vercel (with serverless)
- ✅ Database: MongoDB Atlas

### For Production Apps:
- ✅ Frontend: Vercel
- ✅ Backend: Render or Railway
- ✅ Database: MongoDB Atlas

---

## 📝 Deployment Checklist

### Backend Deployment
- [ ] Create `backend/vercel.json` (already done)
- [ ] Create `backend/api/index.ts` (already done)
- [ ] Create `backend/.vercelignore` (already done)
- [ ] Push code to GitHub
- [ ] Deploy on Vercel with root directory = `backend`
- [ ] Add all environment variables
- [ ] Test API endpoints
- [ ] Note backend URL

### Frontend Configuration
- [ ] Update `frontend/.env` with backend URL
- [ ] Update Vercel environment variable
- [ ] Redeploy frontend
- [ ] Test login/register
- [ ] Verify no CORS errors

### MongoDB Setup
- [ ] Create cluster on MongoDB Atlas
- [ ] Whitelist all IPs (0.0.0.0/0)
- [ ] Get connection string
- [ ] Add to Vercel environment variables
- [ ] Test connection

---

## 🔗 Useful Commands

### Get Backend URL

After deployment, Vercel gives you a URL like:
```
https://ia03-backend.vercel.app
```

### Redeploy Backend

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Vercel auto-deploys on push!

### Check Logs

1. Go to Vercel Dashboard
2. Select your backend project
3. Click "Deployments"
4. Click on latest deployment
5. Click "Functions" or "Runtime Logs"

---

## 🎉 Success!

Your NestJS backend is now deployed to Vercel!

**Test the full flow**:
1. Visit your frontend: `https://your-frontend.vercel.app`
2. Register a new user
3. Login with credentials
4. Access dashboard
5. Check browser console for API calls

All API calls should go to your Vercel backend now! 🚀

---

## 💡 Pro Tips

1. **Monitor function usage**: Check Vercel dashboard for usage limits
2. **Use caching**: Implement caching to reduce function invocations
3. **Optimize cold starts**: Keep functions small and focused
4. **Environment variables**: Never commit secrets to Git
5. **Database indexes**: Add indexes in MongoDB for faster queries

---

## 📚 Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **NestJS Docs**: https://docs.nestjs.com/
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Vercel Functions**: https://vercel.com/docs/functions

---

## Summary

Files created for Vercel deployment:
1. ✅ `backend/vercel.json` - Vercel configuration
2. ✅ `backend/api/index.ts` - Serverless entry point
3. ✅ `backend/.vercelignore` - Ignore list

Next steps:
1. Push to GitHub
2. Deploy on Vercel (set root directory to `backend`)
3. Add environment variables
4. Update frontend to use new backend URL
5. Test everything!

Your backend will be live at: `https://your-project.vercel.app` 🎊
