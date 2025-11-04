# Vercel Deployment Guide - Frontend

Complete guide to deploy your React frontend to Vercel with the existing Render backend.

## Prerequisites

- Git repository with your code
- Vercel account (free tier works great)
- Backend API already deployed on Render: `https://ia01-react-tutorial-vik0.onrender.com`

---

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Prepare Your Repository

1. **Ensure your code is committed to Git**:
   ```bash
   cd frontend
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Verify your `vercel.json` is in the frontend folder** (already created)

### Step 2: Deploy on Vercel

1. **Go to Vercel**: https://vercel.com/

2. **Sign in** with GitHub, GitLab, or Bitbucket

3. **Import your project**:
   - Click "Add New Project" or "Import Project"
   - Select your Git repository
   - Choose the repository containing your IA03 project

4. **Configure your project**:

   **Framework Preset**: Vite

   **Root Directory**: `frontend` (IMPORTANT!)
   - Click "Edit" next to Root Directory
   - Type `frontend`
   - This tells Vercel to deploy only the frontend folder

   **Build Settings** (usually auto-detected):
   - Build Command: `npm run build` or `vite build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Environment Variables** (CRITICAL STEP):

   Click "Environment Variables" and add:

   | Name | Value |
   |------|-------|
   | `VITE_API_BASE_URL` | `https://ia01-react-tutorial-vik0.onrender.com` |

   **Important**:
   - No trailing slash
   - Use `https://` not `http://`
   - Make sure to add this for all environments (Production, Preview, Development)

6. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes for the build to complete
   - Your app will be live at a URL like: `https://your-project-name.vercel.app`

### Step 3: Verify Deployment

1. **Visit your deployment URL**
2. **Test the flow**:
   - Try to sign up (create new account)
   - Login with your credentials
   - Access the dashboard
   - Test logout

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from Frontend Directory

```bash
cd frontend
vercel
```

### Step 4: Configure During Deployment

The CLI will ask you questions:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (first time) or Yes (if updating)
- **What's your project's name?** → `ia03-jwt-auth` (or your choice)
- **In which directory is your code located?** → `./`
- **Want to override settings?** → Yes
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`
  - **Development Command**: `npm run dev`

### Step 5: Set Environment Variables

```bash
vercel env add VITE_API_BASE_URL
```

When prompted, enter: `https://ia01-react-tutorial-vik0.onrender.com`

Select which environments: Production, Preview, Development (select all)

### Step 6: Deploy to Production

```bash
vercel --prod
```

---

## Method 3: Deploy via GitHub Integration (Best for Continuous Deployment)

### Step 1: Push Your Code to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect GitHub to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Follow steps from Method 1 (Step 4-6)

**Benefits**:
- Every push to `main` automatically deploys
- Pull requests get preview deployments
- Easy rollbacks to previous versions

---

## Important Configuration Details

### Environment Variables

Your React app needs to know where the backend API is. In production:

**❌ Wrong** (localhost - won't work in production):
```
VITE_API_BASE_URL=http://localhost:3000
```

**✅ Correct** (your Render backend):
```
VITE_API_BASE_URL=https://ia01-react-tutorial-vik0.onrender.com
```

### vercel.json Configuration

The `vercel.json` file in your frontend folder handles:
- **Client-side routing**: All routes redirect to index.html (React Router works properly)
- **Security headers**: XSS protection, clickjacking prevention, content sniffing protection

### CORS Configuration

Make sure your backend (Render) allows requests from your Vercel domain:

In your backend `main.ts`, you should have:
```typescript
app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://your-vercel-app.vercel.app', // Add your Vercel URL
    'https://ia-03-hytatys-projects.vercel.app' // Your current Vercel URL
  ],
  credentials: true,
});
```

---

## Updating Your Deployment

### Automatic Updates (GitHub Integration)
Just push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```
Vercel will automatically rebuild and deploy.

### Manual Updates (Vercel CLI)
```bash
cd frontend
vercel --prod
```

### Via Vercel Dashboard
- Go to your project in Vercel
- Click "Deployments"
- Click "Redeploy" on any previous deployment

---

## Troubleshooting

### Issue: "Cannot read property of undefined" errors

**Solution**: Environment variable not set correctly
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify `VITE_API_BASE_URL` is set
3. Redeploy the project

### Issue: API requests failing (404 or CORS errors)

**Solution 1**: Check backend CORS settings
- Your backend must allow requests from your Vercel URL

**Solution 2**: Verify the API URL
- No trailing slash in `VITE_API_BASE_URL`
- Use `https://` not `http://`

### Issue: Routes not working (404 on page refresh)

**Solution**: Ensure `vercel.json` is present in frontend folder with rewrite rules

### Issue: Build fails

**Solution**: Check build logs in Vercel dashboard
- Usually missing dependencies or TypeScript errors
- Test build locally first: `npm run build`

### Issue: Environment variables not updating

**Solution**:
1. Update the variable in Vercel dashboard
2. Go to Deployments tab
3. Click "Redeploy" (not just refresh)

---

## Custom Domain (Optional)

### Add Your Own Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `myapp.com`)
3. Follow Vercel's DNS configuration instructions
4. Update backend CORS to include your custom domain

---

## Monitoring & Analytics

Vercel provides:
- **Analytics**: User visits, page views, performance metrics
- **Logs**: Build logs and runtime logs
- **Speed Insights**: Core Web Vitals monitoring
- **Error Tracking**: Runtime error monitoring

Access these in your Vercel Dashboard.

---

## Production Checklist

Before going live, verify:

- [ ] Environment variables are set correctly
- [ ] Backend CORS includes Vercel URL
- [ ] Build succeeds locally: `npm run build`
- [ ] All routes work after deployment
- [ ] API calls work (login, register, profile, logout)
- [ ] Token refresh works properly
- [ ] Error messages display correctly
- [ ] Mobile responsive design works
- [ ] HTTPS is enabled (automatic on Vercel)

---

## Quick Reference

**Backend API**: `https://ia01-react-tutorial-vik0.onrender.com`

**Frontend Deployment**:
```bash
cd frontend
vercel --prod
```

**Environment Variable**:
```
VITE_API_BASE_URL=https://ia01-react-tutorial-vik0.onrender.com
```

**Vercel Dashboard**: https://vercel.com/dashboard

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html#vercel
- **Vercel Community**: https://github.com/vercel/vercel/discussions

---

## Summary

Your React frontend is now deployed on Vercel and connected to your Render backend. Users can:
1. Visit your Vercel URL
2. Register and login
3. Access protected dashboard
4. Experience automatic token refresh
5. Logout securely

All API calls are proxied to your Render backend, and the authentication flow works seamlessly in production!
