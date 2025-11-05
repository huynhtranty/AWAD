# Backend Deployment Guide - NestJS

## ⚠️ Important: NestJS Cannot Be Deployed to Vercel Directly

**Vercel is NOT suitable for NestJS backends** because:
- Vercel is designed for static sites and serverless functions
- NestJS needs a persistent Node.js server
- CORS and middleware won't work properly on Vercel serverless

**Use Render, Railway, or Heroku instead!**

---

## ✅ Recommended: Deploy Backend to Render

### Why Render?
- ✅ Free tier available
- ✅ Supports Node.js servers perfectly
- ✅ Auto-deploy from GitHub
- ✅ Built-in environment variables
- ✅ HTTPS included

### Step-by-Step: Deploy NestJS Backend to Render

#### 1. Prepare Your Backend

Make sure your backend has these files:

**backend/package.json** - Verify build script:
```json
{
  "scripts": {
    "start": "node dist/main",
    "start:prod": "node dist/main",
    "build": "nest build"
  }
}
```

**Create: backend/render.yaml** (optional but recommended):
```yaml
services:
  - type: web
    name: ia03-backend
    env: node
    region: oregon
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm run start:prod
    envVars:
      - key: NODE_ENV
        value: production
```

#### 2. Push to GitHub

```bash
# From project root
git add .
git commit -m "Configure backend for Render deployment"
git push origin main
```

#### 3. Deploy on Render

1. **Go to Render**: https://dashboard.render.com/

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure the Service**:

   **Basic Settings**:
   - Name: `ia03-backend`
   - Region: Oregon (or closest to you)
   - Branch: `main`
   - Root Directory: `backend` (IMPORTANT!)
   - Runtime: `Node`

   **Build Settings**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

   **Plan**: Free

4. **Add Environment Variables**:

   Click "Environment" tab and add:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | Your JWT secret (random string) |
   | `JWT_REFRESH_SECRET` | Your refresh token secret (random string) |
   | `PORT` | `3000` |
   | `NODE_ENV` | `production` |

   **MongoDB Atlas Connection String Example**:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/user-registration?retryWrites=true&w=majority
   ```

   **Generate Secure Secrets**:
   ```bash
   # Run this locally to generate secure secrets
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - You'll get a URL like: `https://ia03-backend.onrender.com`

#### 4. Update Frontend Configuration

After deployment, update your frontend to use the new backend URL:

**In Vercel Dashboard**:
- Go to your frontend project
- Settings → Environment Variables
- Update `VITE_API_BASE_URL` to your new Render URL

**Locally** (frontend/.env):
```env
VITE_API_BASE_URL=https://ia03-backend.onrender.com
```

#### 5. Verify Deployment

Test your backend:

```bash
# Check if backend is online
curl https://your-backend-url.onrender.com

# Test user registration
curl -X POST https://your-backend-url.onrender.com/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

---

## 🔧 Troubleshooting Render Deployment

### Issue: "Application failed to respond"

**Solution**: Check build logs
1. Go to Render Dashboard → Your Service
2. Click "Logs" tab
3. Look for errors

Common causes:
- Missing dependencies
- Build command failed
- Environment variables not set
- MongoDB connection failed

### Issue: Backend is suspended (Free tier)

**Render free tier sleeps after 15 minutes of inactivity**

Solutions:
- Use a cron job to keep it awake (ping every 10 minutes)
- Upgrade to paid tier ($7/month)
- Expect 30-60 second cold start on first request

**Keep-Alive Service** (optional):
Use a service like [UptimeRobot](https://uptimerobot.com/) to ping your backend every 5 minutes.

### Issue: MongoDB connection fails

**Solution**: Check MongoDB Atlas network access
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Save

### Issue: CORS errors

**Solution**: Update backend CORS to include frontend URL

In `backend/src/main.ts`:
```typescript
app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend.vercel.app', // Add your Vercel URL
    /\.vercel\.app$/, // Allow all Vercel previews
  ],
  credentials: true,
});
```

Commit and push to redeploy.

---

## 🚀 Alternative: Deploy Backend to Railway

**Railway** is another excellent option:

1. **Go to Railway**: https://railway.app/
2. **New Project** → **Deploy from GitHub**
3. **Select repository**
4. **Add MongoDB plugin** (Railway provides free MongoDB)
5. **Add environment variables**
6. **Deploy**

Railway advantages:
- Free $5/month credit
- Built-in database options
- Easier setup than Render
- No cold starts

---

## 📊 Deployment Comparison

| Platform | Free Tier | Cold Starts | Setup | Best For |
|----------|-----------|-------------|-------|----------|
| **Render** | ✅ 750 hrs/mo | Yes (60s) | Medium | Simple apps |
| **Railway** | ✅ $5 credit | No | Easy | Small projects |
| **Heroku** | ❌ Paid only | No | Medium | Production |
| **Vercel** | ❌ Not for NestJS | N/A | N/A | Frontend only |

---

## 🎯 Recommended Setup for Your Project

### Frontend (Vercel)
```
https://your-app.vercel.app
```

### Backend (Render)
```
https://ia03-backend.onrender.com
```

### Database (MongoDB Atlas)
```
Cloud-hosted MongoDB
```

This is the standard setup for modern full-stack applications!

---

## 📝 Quick Deploy Checklist

### Backend (Render)
- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Set root directory to `backend`
- [ ] Configure build and start commands
- [ ] Add all environment variables
- [ ] Deploy and wait for build
- [ ] Test API endpoints
- [ ] Note the backend URL

### Frontend (Vercel)
- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Add `VITE_API_BASE_URL` environment variable
- [ ] Deploy and wait for build
- [ ] Test login/register functionality
- [ ] Verify no CORS errors

### Database (MongoDB Atlas)
- [ ] Create cluster
- [ ] Create database user
- [ ] Whitelist all IPs (0.0.0.0/0)
- [ ] Get connection string
- [ ] Test connection

---

## 🔗 Useful Links

- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Railway**: https://railway.app/
- **Vercel**: https://vercel.com/

---

## Summary

**DO NOT deploy NestJS backend to Vercel!**

Use this setup instead:
- **Frontend**: Vercel ✅
- **Backend**: Render or Railway ✅
- **Database**: MongoDB Atlas ✅

Your existing Render deployment is the right approach!
