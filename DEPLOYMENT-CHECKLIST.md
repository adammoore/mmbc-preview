# MMBC Website - Quick Deployment Checklist

## ✅ Pre-Deployment Checklist

### Files Ready
- [ ] Downloaded all files from outputs folder
- [ ] Verified folder structure (css/, js/, images/)
- [ ] Checked all HTML files are present (6 pages)
- [ ] Confirmed styles.css is in css/ folder
- [ ] Confirmed script.js is in js/ folder

### IONOS FTP Details Needed
- [ ] FTP hostname: ftp.mmbc.co.uk (or from IONOS panel)
- [ ] FTP username: _____________
- [ ] FTP password: _____________
- [ ] FTP port: 21 (standard)

## 🚀 Deployment Steps

### 1. Connect via FTP
```
Using FileZilla, Cyberduck, or similar:
- Host: ftp.mmbc.co.uk
- Username: [your FTP username]
- Password: [your FTP password]
- Port: 21
```

### 2. Upload Files
Upload to website root (usually `/` or `/public_html/`):

```
Root Directory:
├── index.html ✓
├── moorings.html ✓
├── membership.html ✓
├── events.html ✓
├── gallery.html ✓
├── contact.html ✓
├── css/
│   └── styles.css ✓
├── js/
│   └── script.js ✓
└── images/
    └── (empty for now)
```

**Important**: Make sure to upload the CSS and JS files IN their folders (css/ and js/), not in the root directory!

### 3. Set File Permissions
- HTML files: 644
- CSS file: 644
- JS file: 644
- Directories (css/, js/, images/): 755

### 4. Test Website

Visit each page and check:
- [ ] https://www.mmbc.co.uk/ (Homepage loads)
- [ ] https://www.mmbc.co.uk/moorings.html (Mooring images display)
- [ ] https://www.mmbc.co.uk/membership.html (All content visible)
- [ ] https://www.mmbc.co.uk/events.html (Page loads correctly)
- [ ] https://www.mmbc.co.uk/gallery.html (Structure in place)
- [ ] https://www.mmbc.co.uk/contact.html (Accordions work)

### 5. Test Navigation
- [ ] Click each menu item - does it navigate correctly?
- [ ] Test on mobile - does hamburger menu work?
- [ ] Check all internal links work
- [ ] Verify footer links work
- [ ] Test email links (mailto:)
- [ ] Test phone links (tel:)

### 6. Test on Different Devices
- [ ] Desktop browser (Chrome, Firefox, Safari, Edge)
- [ ] Mobile phone (portrait and landscape)
- [ ] Tablet
- [ ] Different screen sizes

### 7. Check Original Media
- [ ] Mooring images load from original URLs
- [ ] PDF link works (mooring conditions)
- [ ] All original contact details present

### 8. Accessibility Test
Visit: https://wave.webaim.org/
- [ ] Enter www.mmbc.co.uk
- [ ] Check for errors
- [ ] Verify accessibility passes

### 9. Performance Test
Visit: https://pagespeed.web.dev/
- [ ] Test homepage
- [ ] Check mobile score
- [ ] Check desktop score

## 🎨 Optional Enhancements

### Add More Images
1. [ ] Upload photos to /images/ folder via FTP
2. [ ] Update gallery.html to reference uploaded images
3. [ ] Add hero background image to homepage
4. [ ] Add clubhouse photos to about section

### Set Up Analytics
1. [ ] Create Google Analytics account
2. [ ] Get tracking ID
3. [ ] Add tracking code to all HTML pages (before </head>)
4. [ ] Verify tracking works

### SSL Certificate
- [ ] Confirm SSL is active on IONOS
- [ ] Test https://www.mmbc.co.uk loads securely
- [ ] Set up automatic HTTP to HTTPS redirect

### Search Engine Submission
1. [ ] Create Google Search Console account
2. [ ] Add property for www.mmbc.co.uk
3. [ ] Submit sitemap (can create later)
4. [ ] Submit Bing Webmaster Tools

## 🐛 Troubleshooting

### Images Not Showing
**Problem**: Mooring images don't display
**Solution**: 
- Check image URLs in moorings.html are correct
- Images link to original mmbc.co.uk URLs
- Should work as long as original site images are available

### Styles Not Loading
**Problem**: Website looks plain, no colors/formatting
**Solution**:
- Verify styles.css is in css/ folder (not root)
- Check HTML links: `<link rel="stylesheet" href="css/styles.css">`
- Clear browser cache (Ctrl+F5)
- Check file permissions (should be 644)

### Navigation Not Working
**Problem**: Menu doesn't work on mobile
**Solution**:
- Verify script.js is in js/ folder (not root)
- Check HTML links: `<script src="js/script.js"></script>`
- Check browser console for errors (F12 > Console)
- Clear browser cache

### Page Not Found (404)
**Problem**: Some pages show 404 error
**Solution**:
- Verify all .html files are in root directory
- Check file names exactly match (case-sensitive on some servers)
- Ensure files have .html extension

### Links Broken
**Problem**: Clicking links doesn't work
**Solution**:
- Check all internal links use .html extension
- Verify file names match exactly
- Test in different browsers

## 📞 Get Help

### IONOS Support
- Check IONOS support portal for FTP issues
- Verify hosting plan includes necessary features
- Confirm domain is properly configured

### Website Issues
Contact FAIR Research Consultancy & Management
- Via: https://fair-res-conman.co.uk

### Club Content Updates
Contact MMBC directly:
- Email: admin@mmbc.co.uk
- Phone: 0151 526 1015

## ✨ Success Criteria

Website is successfully deployed when:
- ✅ All 6 pages load without errors
- ✅ Navigation works on desktop and mobile
- ✅ Original mooring images display correctly
- ✅ All contact information is accessible
- ✅ Mobile menu functions properly
- ✅ Accordion sections expand/collapse on contact page
- ✅ Links to external PDFs work
- ✅ Site looks professional on all devices
- ✅ Accessibility test passes

## 🎉 Post-Launch

After successful deployment:
1. [ ] Announce new website to members
2. [ ] Update any external links to the site
3. [ ] Monitor Google Analytics for visitor data
4. [ ] Collect feedback from members
5. [ ] Plan regular content updates

---

**Estimated Deployment Time**: 30-60 minutes
**Difficulty**: Easy to Moderate
**Required Knowledge**: Basic FTP file upload

**Ready? Let's launch! 🚀**
