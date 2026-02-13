# DRACULA Token - Domain Configuration Guide

## 🌐 Domain Setup for draculatokens.com

### Step 1: GitHub Pages Configuration
1. Go to: https://github.com/bgabriel579-crypto/dracula-website/settings/pages
2. Under "Custom domain", enter: `draculatokens.com`
3. Click "Save"
4. GitHub will show you DNS records to add

### Step 2: DNS Configuration (at your domain provider)

#### Option A - CNAME Record (Recommended)
```
Type: CNAME
Name: @
Value: bgabriel579-crypto.github.io
TTL: 3600 (or default)
```

#### Option B - A Records (if CNAME not supported)
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

#### Option C - WWW Subdomain
```
Type: CNAME
Name: www
Value: bgabriel579-crypto.github.io
```

### Step 3: Verify DNS Propagation
1. Wait 5-30 minutes for DNS to propagate
2. Check: https://www.whatsmydns.net/
3. Search for: draculatokens.com
4. Should point to GitHub Pages

### Step 4: HTTPS Certificate
1. GitHub Pages automatically provides HTTPS
2. Wait for certificate to be issued (usually 24 hours)
3. Check: https://draculatokens.com

## 🚀 Alternative Deployment Options

### Netlify (Easiest)
1. Go to: https://app.netlify.com/drop
2. Drag entire dracula-website folder
3. Get instant URL: https://random-name.netlify.app
4. Upgrade to custom domain: draculatokens.com

### Vercel
1. Go to: https://vercel.com
2. Import GitHub repository
3. Automatic deploy
4. Add custom domain in settings

## 🔧 Files Ready for Upload

Your website includes:
- ✅ Responsive design (mobile + desktop)
- ✅ Animated vampire character
- ✅ Hamburger menu for mobile
- ✅ All DRACULA token images
- ✅ Blockchain cyan/blue theme
- ✅ Complete tokenomics section
- ✅ Social links and contact

## 📞 Need Help?
If you need assistance with DNS configuration:
1. Contact your domain provider support
2. Or use Netlify drop for instant deployment

## 🎯 Quick Start
For immediate live website without domain:
https://bgabriel579-crypto.github.io/dracula-website/

---
*Ready to go live on draculatokens.com!*
