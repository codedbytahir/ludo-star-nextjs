# 🚀 Deployment Guide - Ludo Star 2.0

## Quick Deploy to Vercel (Recommended - 2 minutes)

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/codedbytahir/ludo-star-nextjs)

### Option 2: Manual Deploy

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Repository**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose `codedbytahir/ludo-star-nextjs`

3. **Configure & Deploy**
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Click **Deploy**

4. **Done!** 🎉
   - Your app will be live at: `https://your-project.vercel.app`
   - Auto-deploys on every push to main branch

---

## Deploy to Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build the Project**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod
```

4. **Or use Netlify UI**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select the repository
   - Build command: `npm run build`
   - Publish directory: `.next`

---

## Deploy to Railway

1. **Install Railway CLI**
```bash
npm i -g @railway/cli
```

2. **Login & Initialize**
```bash
railway login
railway init
```

3. **Deploy**
```bash
railway up
```

4. **Or use Railway Dashboard**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `codedbytahir/ludo-star-nextjs`
   - Railway auto-detects Next.js and deploys

---

## Deploy to GitHub Pages (Static Export)

1. **Update next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

2. **Build Static Site**
```bash
npm run build
```

3. **Deploy to GitHub Pages**
```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d out"

# Deploy
npm run deploy
```

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Your site: `https://codedbytahir.github.io/ludo-star-nextjs/`

---

## Environment Variables (Optional)

If you add features like analytics or multiplayer:

### Vercel
- Go to Project Settings → Environment Variables
- Add variables like:
  - `NEXT_PUBLIC_API_URL`
  - `NEXT_PUBLIC_SOCKET_URL`

### Local Development
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain (e.g., `ludostar.com`)
3. Update DNS records as instructed
4. SSL certificate auto-generated

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS
4. SSL auto-enabled

---

## Performance Optimization

### Before Deploying

1. **Optimize Images**
```bash
# Use Next.js Image component
import Image from 'next/image'
```

2. **Enable Compression**
```javascript
// next.config.js
module.exports = {
  compress: true,
}
```

3. **Analyze Bundle**
```bash
npm install @next/bundle-analyzer
```

### After Deploying

1. **Check Lighthouse Score**
   - Open DevTools → Lighthouse
   - Aim for 90+ on all metrics

2. **Monitor Performance**
   - Vercel Analytics (built-in)
   - Google Analytics
   - Sentry for error tracking

---

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**TypeScript Errors**
```bash
# Check types
npm run lint
```

### Deployment Issues

**Vercel: Build timeout**
- Increase timeout in Project Settings
- Or optimize build process

**Netlify: Function timeout**
- Upgrade plan or optimize functions

**Railway: Out of memory**
- Increase memory in service settings

---

## Post-Deployment Checklist

- [ ] Test on mobile devices
- [ ] Check all game modes work
- [ ] Verify animations are smooth
- [ ] Test on different browsers
- [ ] Check localStorage persistence
- [ ] Verify responsive design
- [ ] Test AI opponents
- [ ] Check confetti celebrations
- [ ] Verify toast notifications
- [ ] Test game over modal

---

## Monitoring & Analytics

### Add Google Analytics

1. **Install package**
```bash
npm install @next/third-parties
```

2. **Add to layout.tsx**
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

### Vercel Analytics
- Automatically enabled on Vercel
- View in Vercel Dashboard → Analytics

---

## Continuous Deployment

### Auto-Deploy on Push
- **Vercel**: Automatic (default)
- **Netlify**: Automatic (default)
- **Railway**: Automatic (default)

### Preview Deployments
- Every PR gets a preview URL
- Test before merging to main

---

## Scaling

### For High Traffic

1. **Use CDN**
   - Vercel Edge Network (built-in)
   - Cloudflare (free tier)

2. **Enable Caching**
```javascript
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

3. **Optimize Assets**
   - Compress images (WebP format)
   - Minify CSS/JS (automatic in Next.js)
   - Use lazy loading

---

## Support

Need help? Check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Issues](https://github.com/codedbytahir/ludo-star-nextjs/issues)

---

**🎲 Happy Deploying!**
