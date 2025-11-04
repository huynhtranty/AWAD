# Alternative Fix: Hardcode Production API URL

If the environment variable approach doesn't work, use this as a **temporary fix**:

## Update axios.ts

Replace line 4 in `frontend/src/services/axios.ts`:

### Current Code:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
```

### Replace With:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === 'production'
    ? 'https://ia01-react-tutorial-vik0.onrender.com'
    : 'http://localhost:3000');
```

This will:
- Use env var if set (preferred)
- Fall back to Render backend if in production
- Use localhost for local development

## Apply the Fix:

```bash
cd frontend/src/services

# Edit axios.ts with the new code above

# Commit and push
git add axios.ts
git commit -m "Fix: Use production backend URL as fallback"
git push origin main
```

Vercel will redeploy and it should work!

## Why This Works:

Vite sets `import.meta.env.MODE` to:
- `'development'` locally
- `'production'` on Vercel

So even without the env var, it will use the correct URL in production.
