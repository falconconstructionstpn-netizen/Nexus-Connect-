#!/bin/bash
set -e

echo "==> Starting Nexus build..."

# Verify client directory exists
if [ ! -d "client" ]; then
  echo "ERROR: client directory not found. Make sure client/ is committed to git."
  echo "Run: git add client/ && git commit -m 'add client' && git push"
  exit 1
fi

if [ ! -f "client/package.json" ]; then
  echo "ERROR: client/package.json not found."
  exit 1
fi

echo "==> Installing client dependencies..."
npm install --prefix client

echo "==> Building React app..."
npm run build --prefix client

echo "==> Build complete! React app built to client/build/"
ls -la client/build/
