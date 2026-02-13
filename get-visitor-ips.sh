#!/bin/bash

#============================================
# Visitor IP Logger Script for Netlify
#============================================
# This script helps you retrieve visitor IPs from your Netlify deployment
# Setup instructions below

echo "╔════════════════════════════════════════════════════════════╗"
echo "║       Netlify Portfolio - Visitor IP Retrieval Script      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI is not installed."
    echo ""
    echo "📦 Install it with:"
    echo "   npm install -g netlify-cli"
    echo ""
    echo "Then authenticate:"
    echo "   netlify login"
    exit 1
fi

# Check if site is linked
SITE_ID=$(cat .netlify/state.json 2>/dev/null | grep -o '"siteId":"[^"]*' | cut -d'"' -f4)

if [ -z "$SITE_ID" ]; then
    echo "❌ No Netlify site linked to this directory."
    echo ""
    echo "📌 Link your site with:"
    echo "   netlify link"
    exit 1
fi

echo "✅ Site ID: $SITE_ID"
echo ""
echo "🔍 Retrieving recent logs..."
echo ""

# Get the logs (last 1000 lines by default)
# This will show function logs with visitor IPs
netlify logs --tail --lines=100 --site=$SITE_ID 2>/dev/null | grep -A2 "Visitor logged"

if [ $? -ne 0 ]; then
    echo "📊 Alternative: View Netlify Dashboard"
    echo ""
    echo "1. Go to https://app.netlify.com"
    echo "2. Select your site"
    echo "3. Click 'Functions' tab"
    echo "4. Click 'log-visitor' function"
    echo "5. View logs in real-time"
    echo ""
    echo "Or use Netlify API:"
    echo ""
    echo "   # Get your Netlify access token from: https://app.netlify.com/user/applications"
    echo "   curl -H 'Authorization: Bearer YOUR_TOKEN' \\"
    echo "     https://api.netlify.com/api/v1/sites/$SITE_ID/builds?limit=10"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
