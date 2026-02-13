# IP Logging Setup Guide for Netlify Deployment

## Overview
Your portfolio now logs visitor IPs when they accept the privacy policy. This data is stored in Netlify Functions logs.

## How It Works

1. **When a visitor accepts the privacy policy**, their IP is captured
2. **IP logging function** sends the data to Netlify Function (`log-visitor`)
3. **Netlify logs** store all visitor data with timestamps
4. **You can retrieve logs** using Netlify CLI or the Netlify dashboard

## Setup Steps

### 1. Install Netlify CLI (if you haven't already)

```bash
npm install -g netlify-cli
```

### 2. Authenticate with Netlify

```bash
netlify login
```

This will open your browser to authenticate. Log in with your Netlify account.

### 3. Deploy to Netlify

From your portfolio directory:

```bash
netlify deploy --prod
```

Or:
- Drag and drop your portfolio folder to Netlify
- Connect your GitHub repository for automatic deployments

### 4. Your site is ready!

The function will automatically log visitor IPs when they visit and accept the privacy policy.

---

## Retrieve Visitor IPs

### Method 1: Using the Script (Recommended)

```bash
./get-visitor-ips.sh
```

This script will show recent logs with visitor IPs.

### Method 2: Using Netlify Dashboard

1. Go to https://app.netlify.com
2. Select your portfolio site
3. Click **"Functions"** tab
4. Click **"log-visitor"** function
5. View real-time logs with visitor IPs

### Method 3: Using Netlify CLI Directly

```bash
# Stream live logs
netlify logs --tail

# Get specific number of logs
netlify logs --lines=50
```

### Method 4: Using Netlify API

```bash
# Get your access token from: https://app.netlify.com/user/applications

SITE_ID="your-site-id"
TOKEN="your-access-token"

curl -H "Authorization: Bearer $TOKEN" \
  https://api.netlify.com/api/v1/sites/$SITE_ID/functions/log-visitor/logs
```

---

## Data Collected

Each visitor log entry contains:

```json
{
  "ip": "203.0.113.45",
  "timestamp": "2025-02-13T12:30:45.123Z",
  "url": "https://yourportfolio.netlify.app",
  "userAgent": "Mozilla/5.0..."
}
```

---

## Privacy Policy Compliance

✅ **Privacy Policy mentions IP logging**
✅ **Visitors see privacy policy on first visit**
✅ **IPs are only logged after they accept**
✅ **Netlify logs are encrypted and secured**

---

## Troubleshooting

### Logs not appearing?

1. Make sure the function is deployed: `netlify functions:list`
2. Check that visitors are accepting the privacy policy
3. Verify the privacy policy appears on first visit

### Want to stop logging?

Edit `script.js` and comment out the `logVisitorIP()` call in `acceptPrivacyPolicy()`

### Want to store IPs in a database instead?

Replace the Netlify function with your own endpoint that stores to a database (MongoDB, Firebase, Supabase, etc.)

---

## Security Notes

- IPs are logged only after explicit user consent
- Netlify Functions are automatically secured
- Data is encrypted in transit (HTTPS)
- Regular backups are maintained by Netlify

---

## Next Steps

1. ✅ Deploy to Netlify
2. ✅ Test the site - privacy policy should appear
3. ✅ Accept privacy policy
4. ✅ Check logs using one of the methods above
5. ✅ View visitor IPs!

---

## Questions?

- Netlify Docs: https://docs.netlify.com/functions/overview/
- IP API: https://www.ipify.org/
- Privacy Best Practices: https://www.netlify.com/
