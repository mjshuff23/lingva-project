#!/bin/bash

# Print instructions for the user
echo "Starting setup for local development..."

# Fix permissions for the entire project directory
echo "Changing ownership of all project files..."
sudo chown -R $USER:$USER ..

# Run npm install
echo "Installing dependencies..."
npm install

# Build Docker containers (optional step based on user's needs)
echo "Building Docker containers for dev and prod..."
npm run docker:build:dev
npm run docker:build:prod

# Finished setup
echo "Setup complete! You can now run your project locally or in Docker."
