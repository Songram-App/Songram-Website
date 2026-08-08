# 🔧 Maintenance Mode Guide

This guide explains how to enable and manage maintenance mode for the Songram website.

## Overview

The maintenance mode system provides:
- ✅ **Client-side enforcement** - Immediate redirect to maintenance page in React app
- ✅ **Server-side enforcement** - 503 status code for proper SEO and monitoring
- ✅ **Team bypass** - Secret parameter or IP allowlist for team access during maintenance
- ✅ **Persistent bypass** - localStorage remembers bypass for team members
- ✅ **Beautiful UI** - Matches the provided design mockup

## Quick Start

### Enable Maintenance Mode

1. **Update environment variable:**
   ```bash
   # In .env.local (local development)
   VITE_MAINTENANCE_MODE=true
   ```

2. **For Vercel deployment:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Set `VITE_MAINTENANCE_MODE` to `true`
   - Redeploy the application

3. **For Netlify deployment:**
   - Uncomment the maintenance redirect section in `netlify.toml`
   - Go to Site settings → Environment variables
   - Set `VITE_MAINTENANCE_MODE` to `true`
   - Redeploy the application

### Disable Maintenance Mode

1. Set `VITE_MAINTENANCE_MODE=false` in your environment variables
2. Redeploy

## Team Bypass Access

Team members can bypass maintenance mode in three ways:

### 1. URL Parameter (Recommended)

Share this URL with the team:
```
https://songram.app?bypass=songram-team-2026
```

Once accessed, the bypass is stored in localStorage and persists across visits.

### 2. Change the Bypass Secret

Edit the secret in `.env.local`:
```bash
VITE_MAINTENANCE_BYPASS_SECRET=your-custom-secret-here
```

Then share: `https://songram.app?bypass=your-custom-secret-here`

### 3. IP Allowlist (Server-side only)

For production deployments, you can allowlist specific IPs:

```bash
# In Vercel/Netlify environment variables
MAINTENANCE_ALLOWED_IPS=203.0.113.1,203.0.113.2,203.0.113.3
```

**Note:** IP allowlist requires the serverless function (`api/maintenance.js`) to be deployed.

## File Structure

```
songram-website/
├── .env.local                          # Local environment config
├── .env.example                        # Example environment variables
├── src/
│   ├── pages/
│   │   └── MaintenancePage.tsx        # Beautiful maintenance UI component
│   ├── utils/
│   │   └── maintenance.ts             # Maintenance mode utilities
│   └── App.tsx                        # Updated with maintenance check
├── api/
│   └── maintenance.js                 # Vercel serverless function (503 status)
├── public/
│   └── maintenance.html               # Fallback static HTML page
├── vercel.json                        # Vercel configuration
├── netlify.toml                       # Netlify configuration
└── MAINTENANCE_MODE.md                # This file

```

## How It Works

### Entry Points Covered

✅ **Homepage** - `/`
✅ **About page** - `/about`
✅ **Team page** - `/team`
✅ **Pricing page** - `/pricing`
✅ **FAQ page** - `/faq`
✅ **Privacy page** - `/privacy`
✅ **Terms page** - `/terms`
✅ **404 page** - `/*`
✅ **Direct URLs** - All routes redirect to maintenance
✅ **Deep links** - Handled by React Router check
✅ **API routes** - Handled by server config (if using Vercel functions)
✅ **Form submissions** - Blocked at app level

### Flow Diagram

```
User visits any URL
       ↓
Is VITE_MAINTENANCE_MODE=true?
       ↓
    Yes → Check bypass parameter/localStorage
            ↓
         Has valid bypass?
            ↓
         Yes → Show normal site
         No  → Show maintenance page (503)
       ↓
    No → Show normal site
```

## Server-Side Enforcement

### Vercel

The `api/maintenance.js` serverless function provides:
- 503 Service Unavailable status code
- `Retry-After` header (3600 seconds)
- IP allowlist support
- JSON response for monitoring

### Netlify

Uncomment the maintenance redirect in `netlify.toml` to:
- Serve `/maintenance.html` with 503 status
- Support bypass via query parameter
- Force redirect for all public traffic

### Why Server-Side Matters

1. **SEO**: Search engines understand 503 (temporary) vs 404 (permanent)
2. **Monitoring**: Uptime tools correctly detect maintenance vs outage
3. **Caching**: CDNs can cache maintenance responses appropriately
4. **Security**: Can't be bypassed by disabling JavaScript

## Testing

### Local Testing

1. Start development server:
   ```bash
   npm run dev
   ```

2. Enable maintenance mode:
   ```bash
   # In .env.local
   VITE_MAINTENANCE_MODE=true
   ```

3. Visit `http://localhost:5174`
   - Should see maintenance page

4. Test bypass:
   ```
   http://localhost:5174?bypass=songram-team-2026
   ```
   - Should see normal site

5. Refresh without query parameter:
   - Should still see normal site (bypass persisted)

### Production Testing

Before enabling for real users:

1. Deploy with maintenance mode OFF
2. Test the bypass URL works
3. Enable maintenance mode
4. Verify maintenance page appears
5. Verify bypass still works
6. Check monitoring tools show 503 status

## Troubleshooting

### Maintenance page not showing

- Check environment variable is set: `VITE_MAINTENANCE_MODE=true`
- Verify the app was rebuilt after changing env vars
- Clear browser cache and localStorage
- Check browser console for errors

### Can't bypass maintenance mode

- Verify bypass secret matches in environment variables
- Check localStorage in browser dev tools (key: `songram_maintenance_bypass`)
- Try in incognito mode to test fresh
- Ensure URL parameter format is correct: `?bypass=SECRET`

### 503 status not being returned

- Verify serverless function is deployed (`api/maintenance.js` for Vercel)
- Check platform environment variables are set
- Review deployment logs for errors
- For Netlify, ensure redirect rules are uncommented

### Still seeing old page after enabling

- Force a hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Verify deployment completed successfully
- Check if bypass is active in localStorage

## Security Notes

⚠️ **Important:**

1. **Change the default bypass secret** in production
2. **Don't commit `.env.local`** - it's gitignored
3. **Share bypass URL securely** - use private channels (Slack, email)
4. **Rotate the secret** after maintenance is complete
5. **Don't hardcode secrets** - always use environment variables

## Cleanup After Maintenance

After maintenance is complete:

1. Set `VITE_MAINTENANCE_MODE=false`
2. Redeploy
3. (Optional) Rotate the bypass secret for next time
4. Clear team localStorage if desired:
   ```javascript
   localStorage.removeItem('songram_maintenance_bypass');
   ```
5. Monitor error rates and user feedback

## Support

If you encounter issues:
- Check this documentation first
- Review browser console for errors
- Check deployment logs on Vercel/Netlify
- Contact: team@songram.app

---

**Last Updated:** August 8, 2026
**Maintained by:** Songram Development Team
