#!/bin/bash

# Exit immediately if a command fails
set -e

# Project variables (replace with your Firebase project ID)
FIREBASE_PROJECT="inventory-app"

echo "🚀 Starting Firebase deployment for project: $FIREBASE_PROJECT"

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Build React app
echo "⚙️ Building React app..."
npm run build

# 3. Login to Firebase (requires interactive auth once)
echo "🔑 Logging in to Firebase..."
firebase login

# 4. Initialize Firebase (only needed first time)
echo "🛠️ Initializing Firebase project..."
firebase use $FIREBASE_PROJECT

# 5. Deploy Hosting + Database rules
echo "🌐 Deploying to Firebase Hosting..."
firebase deploy --only hosting,database

echo "✅ Deployment complete!"
