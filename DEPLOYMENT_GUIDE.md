# 🚀 Deployment Guide - AoE2 Army Calculator

## Quick Deployment Options

### Option 1: GitHub Pages (Recommended - Free & Automatic)

#### Step 1: Merge Your Changes
**Via GitHub Web UI:**
1. Go to: https://github.com/conorbronsdon/aoe2-troop-calculator/compare
2. Select: `base: main` ← `compare: your-feature-branch`
3. Click "Create pull request"
4. Review changes and merge

**Or via Command Line:**
```bash
git checkout main
git pull origin main
git merge your-feature-branch
git push origin main
```

#### Step 2: Enable GitHub Pages (First Time Only)
1. Go to repository Settings: https://github.com/conorbronsdon/aoe2-troop-calculator/settings/pages
2. Under "Source", select: **GitHub Actions**
3. Click "Save"

#### Step 3: Wait for Deployment
- GitHub Actions will automatically build and deploy (2-3 minutes)
- Monitor progress: https://github.com/conorbronsdon/aoe2-troop-calculator/actions
- Once complete, your site will be live at:
  ```
  https://conorbronsdon.github.io/aoe2-troop-calculator/
  ```

---

### Option 2: Netlify Drop (Fastest - 30 seconds)

1. Build locally: `npm run build`
2. Go to: https://app.netlify.com/drop
3. Drag and drop the entire `dist/` folder
4. Get instant public URL (e.g., `https://random-name.netlify.app`)

**Pros:**
- Instant deployment
- No GitHub setup needed
- Get shareable URL immediately

**Cons:**
- URL is random (can be customized in Netlify dashboard)
- Manual redeployment for updates

---

### Option 3: Vercel (Easy - 1 minute)

1. Sign in to: https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository: `conorbronsdon/aoe2-troop-calculator`
4. Set these build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click "Deploy"
6. Get URL: `https://aoe2-troop-calculator.vercel.app`

**Pros:**
- Auto-deploys on git push
- Custom domain support
- Free SSL

---

### Option 4: Local Preview (Testing Only)

To test locally before deploying:

```bash
# In the project directory
npm install
npm run dev
```

Then open: http://localhost:3000

Or to test the production build:
```bash
npm run build
npm run preview
```

Then open: http://localhost:4173

---

## Verification Checklist

After deployment, verify these features work:

- [ ] Page loads without errors
- [ ] PWA installs correctly (install prompt appears)
- [ ] Can select different civilizations (51 total)
- [ ] Can add/remove units
- [ ] Resource tracking updates in real-time
- [ ] Progress bars show correct colors
- [ ] Civilization bonuses apply correctly (test Mayans archers)
- [ ] Population counter works
- [ ] Combat stats display on unit cards
- [ ] Technology selection and stat calculation
- [ ] Preset army compositions load correctly
- [ ] Export to CSV/JSON works
- [ ] Share composition via URL works
- [ ] Import/Export compositions works
- [ ] Responsive on mobile
- [ ] Dark mode toggle works
- [ ] Reset button clears composition

---

## Troubleshooting

### "Page not found" on GitHub Pages
- Check that GitHub Pages is enabled in Settings
- Ensure source is set to "GitHub Actions"
- Wait 2-3 minutes after merge for first deploy

### Build fails on GitHub Actions
- Check the Actions tab for error logs
- Most likely cause: Missing dependencies (should auto-install)
- Re-run failed workflow from Actions tab

### Assets not loading (404 errors)
- Check `vite.config.js` has correct `base` path
- For GitHub Pages, should be: `base: '/aoe2-troop-calculator/'`
- For custom domain, should be: `base: '/'`

### PWA not installing
- Ensure HTTPS is enabled
- Check service worker registration in browser dev tools
- Clear cache and reload

### Tests failing
- Run `npm test` locally to see failures
- Run `npm run lint` to check for code issues
- Run `npm run format:check` for formatting issues

---

## Current Version

**Version:** 2.12.0

**Features:**
- 51 civilizations with complete bonuses
- 100+ units with stats
- 90+ unique units
- Technology system with stat calculations
- Combat statistics display
- PWA with offline support
- Preset army compositions
- Import/Export functionality

---

## Questions?

- Build issues? Check: `npm run build` output
- Deployment issues? Check: GitHub Actions logs
- Feature issues? Test locally first with `npm run dev`
- Test failures? Run: `npm test` for details

---

**Ready to deploy!** Choose any option above to get your version live. 🚀

**Last Updated**: November 2025
