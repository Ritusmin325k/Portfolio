#!/bin/bash

#============================================
# Visitor IP Logger Script for Netlify
#============================================
# This script helps you retrieve visitor IPs from your Netlify deployment

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

echo "📌 Checking if site is linked..."
echo ""

# Try to get site info
SITE_INFO=$(netlify status 2>&1)

# Check if successfully linked
if echo "$SITE_INFO" | grep -q "not linked"; then
    echo "❌ No Netlify site linked to this directory."
    echo ""
    echo "📌 Link your site with:"
    echo "   netlify link"
    echo ""
    echo "Or deploy with:"
    echo "   netlify deploy --prod"
    exit 1
fi

# Extract site name/ID
SITE_NAME=$(echo "$SITE_INFO" | grep "Site name:" | awk -F': ' '{print $2}')
SITE_ID=$(echo "$SITE_INFO" | grep "Site ID:" | awk -F': ' '{print $2}')

if [ -n "$SITE_NAME" ]; then
    echo "✅ Site Name: $SITE_NAME"
fi

if [ -n "$SITE_ID" ]; then
    echo "✅ Site ID: $SITE_ID"
fi

echo ""
echo "🔍 Retrieving recent visitor logs..."
echo "📊 Showing function invocations with visitor IPs..."
echo ""

# Get the logs
netlify logs --lines=50 2>/dev/null | grep -i "visitor\|logged"

if [ $? -ne 0 ]; then
    echo ""
    echo "💡 Alternative ways to view logs:"
    echo ""
    echo "1. 📊 View in Netlify Dashboard:"
    echo "   https://app.netlify.com → Your Site → Functions → log-visitor"
    echo ""
    echo "2. 🔧 Use Netlify CLI (live logs):"
    echo "   netlify logs --tail"
    echo ""
    echo "3. 📡 Use Netlify API:"
    echo "   # Get your token from: https://app.netlify.com/user/applications"
    echo "   export TOKEN='your_netlify_token'"
    echo "   curl -H \"Authorization: Bearer \$TOKEN\" \\"
    echo "     https://api.netlify.com/api/v1/sites/$SITE_ID/deploys"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ For real-time logs, visit your Netlify dashboard"
echo "═══════════════════════════════════════════════════════════════"
