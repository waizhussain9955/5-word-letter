# 🚀 Deployment Guide

## Quick Start

This website is a **static site** with no backend dependencies. It can be deployed to any static hosting service.

## Option 1: GitHub Pages (Recommended - FREE)

### Steps:

1. **Create GitHub Repository**
   ```bash
   cd c:\Users\Waiz-Hussain\Desktop\5-letter
   git init
   git add .
   git commit -m "Initial commit: 5 Letter Words website"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/5-letter-words.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Select branch: **main**
   - Select folder: **/ (root)**
   - Click **Save**

4. **Your site will be live at:**
   ```
   https://YOUR-USERNAME.github.io/5-letter-words/
   ```

5. **Update sitemap.xml**
   - Replace `https://yourdomain.com` with your actual GitHub Pages URL
   - Commit and push changes

---

## Option 2: Vercel (Recommended - FREE)

### Steps:

1. **Install Vercel CLI (one-time)**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from project folder**
   ```bash
   cd c:\Users\Waiz-Hussain\Desktop\5-letter
   vercel
   ```

3. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N**
   - Project name? **5-letter-words** (or your choice)
   - In which directory is your code located? **./** (current directory)

4. **Your site will be live instantly!**
   - Production URL will be shown (e.g., `5-letter-words.vercel.app`)
   - Custom domain can be added in Vercel dashboard

5. **Update sitemap.xml**
   - Replace `https://yourdomain.com` with your Vercel URL
   - Run `vercel --prod` to deploy changes

---

## Option 3: Netlify (FREE)

### Method A: Drag & Drop (Easiest)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `5-letter` folder into the drop zone
3. Site deploys instantly!
4. Update sitemap.xml with your Netlify URL

### Method B: Git Integration

1. Push code to GitHub (see Option 1 steps 1-2)
2. Go to [https://app.netlify.com](https://app.netlify.com)
3. Click **Add new site** → **Import an existing project**
4. Connect to GitHub and select your repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: **./**
6. Click **Deploy site**

---

## Option 4: Traditional Web Hosting (cPanel/FTP)

### Steps:

1. **Connect via FTP/SFTP**
   - Use FileZilla, WinSCP, or your host's file manager
   - Connect to your hosting account

2. **Upload all files**
   - Upload all files and folders to `public_html` or `www` directory
   - Maintain folder structure:
     ```
     public_html/
     ├── index.html
     ├── 3-letter-words.html
     ├── 4-letter-words.html
     ├── 5-letter-words.html
     ├── 6-letter-words.html
     ├── 7-letter-words.html
     ├── assets/
     ├── data/
     ├── robots.txt
     └── sitemap.xml
     ```

3. **Update sitemap.xml**
   - Replace `https://yourdomain.com` with your actual domain

4. **Your site is live at:**
   ```
   https://yourdomain.com
   ```

---

## Post-Deployment Checklist

After deploying to any platform:

### 1. Update sitemap.xml
- [ ] Replace all instances of `https://yourdomain.com` with your actual URL
- [ ] Redeploy/reupload the file

### 2. Update robots.txt
- [ ] Replace `https://yourdomain.com/sitemap.xml` with your actual sitemap URL
- [ ] Redeploy/reupload the file

### 3. Test the website
- [ ] Visit all pages (3, 4, 5, 6, 7 letter words)
- [ ] Test filters on each page
- [ ] Verify theme toggle works
- [ ] Check mobile responsiveness
- [ ] Verify JSON files load correctly (word counts should appear)

### 4. SEO Setup (Optional but Recommended)

#### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (website URL)
3. Verify ownership
4. Submit your sitemap: `https://your-url.com/sitemap.xml`

#### Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap

---

## Custom Domain Setup

### For GitHub Pages:
1. Buy a domain from Namecheap, GoDaddy, etc.
2. In your domain registrar, add DNS records:
   - Type: **A**, Value: **185.199.108.153**
   - Type: **A**, Value: **185.199.109.153**
   - Type: **A**, Value: **185.199.110.153**
   - Type: **A**, Value: **185.199.111.153**
   - Type: **CNAME**, Name: **www**, Value: **YOUR-USERNAME.github.io**
3. In GitHub Settings → Pages, enter your custom domain
4. Enable "Enforce HTTPS"

### For Vercel:
1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS instructions provided by Vercel

### For Netlify:
1. In Netlify site settings, go to **Domain management**
2. Click **Add custom domain**
3. Follow DNS configuration instructions

---

## Troubleshooting

### Issue: Words not loading (shows "0 of 0 words")

**Cause**: This happens when testing locally using `file://` protocol due to browser CORS restrictions.

**Solution**: Deploy to a web server. The issue will automatically resolve.

### Issue: CSS not loading

**Check**:
- All file paths are relative (`./assets/css/style.css`)
- Folder structure is maintained during upload
- File permissions (if using traditional hosting)

### Issue: Theme toggle not saving

**Check**:
- JavaScript files are loading correctly
- Browser's localStorage is enabled
- Check browser console for errors

---

## Performance Tips

After deployment:

1. **Enable HTTPS** (most platforms do this automatically)
2. **Enable Gzip compression** (usually automatic on modern hosts)
3. **Set cache headers** for static assets (CSS, JS, JSON files)
4. **Use a CDN** (Vercel and Netlify include this automatically)

---

## Maintenance

### Adding more words:

1. Edit `generate_words.py` to add words to the arrays
2. Run `python generate_words.py` to regenerate JSON files
3. Test locally by serving with a simple HTTP server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`
4. Redeploy using your chosen method

---

## Support

- **GitHub Pages**: [Documentation](https://docs.github.com/en/pages)
- **Vercel**: [Documentation](https://vercel.com/docs)
- **Netlify**: [Documentation](https://docs.netlify.com)

---

**Your website is now ready for deployment! 🎉**

Choose the deployment method that best suits your needs and follow the steps above.
