# 🚀 Deployment Guide - AoE2 Army Calculator v2.0

## Quick Test Deployment

### Option 1: GitHub Pages (Recommended - Free & Automatic)

#### Step 1: Merge the Changes
The code is ready and tested on branch: `claude/plan-phase-two-features-013i4R9KPAKzTfB8mhaEbpUz`

**Via GitHub Web UI:**
1. Go to: https://github.com/conorbronsdon/aoe2-troop-calculator/compare
2. Select: `base: main` ← `compare: claude/plan-phase-two-features-013i4R9KPAKzTfB8mhaEbpUz`
3. Click "Create pull request"
4. Review changes and merge

**Or via Command Line:**
```bash
git checkout main
git merge claude/plan-phase-two-features-013i4R9KPAKzTfB8mhaEbpUz
git push origin main
```

#### Step 2: Enable GitHub Pages
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

1. Go to: https://app.netlify.com/drop
2. Drag and drop the entire `dist/` folder from this repository
3. Get instant public URL (e.g., `https://random-name.netlify.app`)
4. Works immediately, no configuration needed

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
- [ ] Can select different civilizations
- [ ] Can add/remove units
- [ ] Resource tracking updates in real-time
- [ ] Progress bars show correct colors
- [ ] Civilization bonuses apply correctly (test Mayans archers)
- [ ] Population counter works
- [ ] Reset button clears composition
- [ ] Responsive on mobile (if accessible)

---

## Troubleshooting

### "Page not found" on GitHub Pages
- Check that GitHub Pages is enabled in Settings
- Ensure source is set to "GitHub Actions"
- Wait 2-3 minutes after merge for first deploy

### "403 Error" when pushing to main
- This is expected on certain protected branches
- Use the PR merge method via GitHub UI instead

### Build fails on GitHub Actions
- Check the Actions tab for error logs
- Most likely cause: Missing dependencies (should auto-install)
- Re-run failed workflow from Actions tab

### Assets not loading (404 errors)
- Check `vite.config.js` has correct `base` path
- For GitHub Pages, should be: `base: '/aoe2-troop-calculator/'`
- For custom domain, should be: `base: '/'`

---

## Current Status

✅ **Code Ready:**
- Branch: `claude/plan-phase-two-features-013i4R9KPAKzTfB8mhaEbpUz`
- Build tested: Successful (165KB, 54KB gzipped)
- Feature parity: Verified

✅ **Files Ready:**
- `dist/` folder contains production build
- GitHub Actions workflow configured
- All dependencies installed

⏳ **Waiting For:**
- Merge to main branch
- GitHub Pages to be enabled

---

## Next Steps After Deployment

Once the test deployment is live and verified:

1. **Test all features** using the checklist above
2. **Share the URL** with stakeholders for feedback
3. **Start Phase 2 development:**
   - Add more civilizations and units
   - Implement save/load functionality
   - Add CSV export
   - Build shareable link feature
   - Create unit counter suggestions

---

## Questions?

- Build issues? Check: `npm run build` output
- Deployment issues? Check: GitHub Actions logs
- Feature issues? Test locally first with `npm run dev`

---

**Ready to deploy!** Choose any option above to get your test version live. 🚀
