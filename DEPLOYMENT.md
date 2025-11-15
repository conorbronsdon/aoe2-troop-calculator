# Deployment Guide: Host Your AoE2 Calculator

This guide shows you how to deploy your Army Calculator online in minutes - all for FREE!

---

## Option 1: Netlify (Recommended for Beginners) ⭐

**Time: 2 minutes | Difficulty: Easy**

### Steps:
1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop `aoe2-calculator.html` into the deploy zone
4. Wait 10 seconds... Done! 🎉

### What you get:
- Free subdomain: `your-site-name.netlify.app`
- Instant updates: Just drag-drop to update
- HTTPS automatically enabled
- No configuration needed

### Custom Domain (Optional):
1. Buy a domain (like `aoe2calc.com`)
2. In Netlify: Site settings → Domain management → Add custom domain
3. Update DNS records as shown
4. Wait for DNS propagation (~30 minutes)

**Cost: FREE forever** (unless you need advanced features)

---

## Option 2: Vercel (Best for Developers)

**Time: 3 minutes | Difficulty: Easy**

### Steps:
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New..." → "Project"
3. Click "Deploy" (from Git or upload directly)
4. Upload `aoe2-calculator.html`
5. Done! Your site is live at `your-project.vercel.app`

### What you get:
- Lightning-fast CDN
- Automatic HTTPS
- Free subdomain
- Easy Git integration

### Pro tip:
Rename `aoe2-calculator.html` to `index.html` before uploading for cleaner URLs.

**Cost: FREE** (generous free tier)

---

## Option 3: GitHub Pages (Free + Version Control)

**Time: 5 minutes | Difficulty: Medium**

### Steps:

**1. Create Repository**
```bash
# On GitHub.com:
1. Click "New repository"
2. Name it: "aoe2-calculator"
3. Make it public
4. Don't add README (we have ours!)
```

**2. Upload Files**
```bash
# Option A: Via GitHub website
- Click "Add file" → "Upload files"
- Drag aoe2-calculator.html, README.md, QUICK_START.md
- Rename aoe2-calculator.html to index.html
- Commit changes

# Option B: Via command line (if you have Git)
git clone https://github.com/yourusername/aoe2-calculator.git
cd aoe2-calculator
cp aoe2-calculator.html index.html
git add index.html README.md QUICK_START.md
git commit -m "Initial commit: AoE2 Army Calculator"
git push
```

**3. Enable GitHub Pages**
- Go to repository Settings
- Scroll to "Pages" section
- Source: Select "main" branch
- Click Save
- Wait 1-2 minutes

**4. Access your site**
- URL: `https://yourusername.github.io/aoe2-calculator`

### What you get:
- Free hosting forever
- Version control (Git history)
- Custom domain support
- Easy collaboration (pull requests)

**Cost: FREE**

---

## Option 4: Cloudflare Pages (Fastest Global Delivery)

**Time: 4 minutes | Difficulty: Easy-Medium**

### Steps:
1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repo OR upload directly
3. Deploy with one click
4. Your site is live on Cloudflare's global network

### What you get:
- Fastest global CDN (200+ data centers)
- Unlimited bandwidth
- Free SSL
- DDoS protection

**Cost: FREE**

---

## Option 5: Local Server (For Testing)

**Time: 30 seconds | Difficulty: Very Easy**

### Method 1: Python (Mac/Linux)
```bash
# Navigate to folder with the HTML file
cd /path/to/folder

# Python 3
python3 -m http.server 8000

# Open browser to: http://localhost:8000/aoe2-calculator.html
```

### Method 2: Node.js
```bash
# Install http-server globally (one time)
npm install -g http-server

# Run server
http-server

# Open browser to: http://localhost:8080/aoe2-calculator.html
```

### Method 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `aoe2-calculator.html`
3. Select "Open with Live Server"
4. Auto-opens in browser with hot reload!

---

## Custom Domain Setup (Works with all options)

### 1. Buy a Domain
Recommended registrars:
- Namecheap: ~$10/year
- Google Domains: ~$12/year  
- Cloudflare: ~$9/year (cheapest)

### 2. Point Domain to Your Host

**For Netlify:**
```
A Record: @ → 75.2.60.5
CNAME: www → your-site.netlify.app
```

**For Vercel:**
```
A Record: @ → 76.76.21.21
CNAME: www → cname.vercel-dns.com
```

**For GitHub Pages:**
```
A Record: @ → 185.199.108.153
A Record: @ → 185.199.109.153
A Record: @ → 185.199.110.153
A Record: @ → 185.199.111.153
CNAME: www → yourusername.github.io
```

### 3. Add Custom Domain in Platform
- Netlify: Domain settings → Add custom domain
- Vercel: Project settings → Domains → Add
- GitHub: Settings → Pages → Custom domain

### 4. Wait for DNS Propagation
- Usually 15-30 minutes
- Can take up to 48 hours
- Check status: [whatsmydns.net](https://whatsmydns.net)

---

## Performance Optimization

### Optional Enhancements:

**1. Minify the HTML**
```bash
# Using online tool: https://www.willpeavy.com/tools/minifier/
# Or: npm install -g html-minifier
html-minifier --collapse-whitespace --remove-comments aoe2-calculator.html -o aoe2-calculator.min.html
```

**2. Add Caching Headers**
For Netlify, create `_headers` file:
```
/aoe2-calculator.html
  Cache-Control: public, max-age=3600
```

**3. Enable Gzip Compression**
Most platforms do this automatically!

---

## Monitoring & Analytics (Optional)

### Add Google Analytics:
Add this before `</head>` in your HTML:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Add Plausible (Privacy-friendly):
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## Troubleshooting

### "My site isn't loading!"
- Check if you renamed to `index.html` (required for some hosts)
- Verify DNS records are correct
- Clear browser cache (Ctrl+Shift+R)
- Wait longer (DNS can take time)

### "CSS/React not loading!"
- Check internet connection (CDNs need internet)
- Try different browser
- Check browser console (F12) for errors

### "404 Not Found"
- Ensure file is named `index.html` OR
- Access full path: `yoursite.com/aoe2-calculator.html`

### "Changes not appearing"
- Clear cache (hard refresh: Ctrl+Shift+R)
- For Netlify/Vercel: Wait 30 seconds after deploy
- For GitHub: Wait 1-2 minutes after push

---

## Comparison Table

| Platform | Speed | Ease | Free Tier | Best For |
|----------|-------|------|-----------|----------|
| Netlify | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Unlimited | Beginners |
| Vercel | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Generous | Developers |
| GitHub Pages | ⭐⭐⭐ | ⭐⭐⭐ | Unlimited | Version control |
| Cloudflare | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Unlimited | Performance |

---

## Security Checklist

✅ Enable HTTPS (all platforms do this automatically)  
✅ Set up custom domain with SSL  
✅ No API keys in code (we don't have any!)  
✅ No user data collection (calculator is client-side only)  
✅ Regular dependency updates (update React/Tailwind CDN links annually)

---

## Next Steps After Deployment

1. **Share your calculator!**
   - Reddit: /r/aoe2
   - Discord: AoE2 communities
   - Twitter/X with #AoE2

2. **Monitor usage**
   - Set up analytics
   - Track popular civilizations
   - See which army comps users build

3. **Gather feedback**
   - Add a feedback form
   - Create GitHub issues for bugs
   - Build Phase 2 features

4. **Keep improving**
   - Add more civilizations
   - Implement save/load
   - Build community features

---

## Support

**Questions?**
- GitHub: Open an issue
- Email: [your-email]
- Discord: [your-discord]

**Contributions Welcome!**
The calculator is open source - fork it and make it better!

---

## License Reminder

When deploying publicly, include:
```
Age of Empires II © Microsoft Corporation
Created under Microsoft's Game Content Usage Rules
```

Happy deploying! 🚀
