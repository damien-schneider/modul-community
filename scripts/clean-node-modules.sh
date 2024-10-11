#!/bin/bash

# Authorize the script execution : chmod +x scripts/clean-node-modules.sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Find and remove all node_modules directories
echo "Removing all node_modules directories..."
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Optional: remove pnpm store (if you want to clean everything)
# echo "Removing pnpm store..."
# pnpm store prune

echo "All node_modules directories have been removed."