#!/bin/bash

# Function to parse the `npm outdated` output and update the packages
update_outdated_packages() {
  # Get the outdated packages as JSON for easy parsing
  outdated_packages=$(npm outdated --json)

  if [[ "$outdated_packages" == "" || "$outdated_packages" == "null" ]]; then
    echo "All packages are up to date."
    exit 0
  fi

  # Iterate over the outdated packages and update each one
  for package in $(echo "$outdated_packages" | jq -r 'keys[]'); do
    latest_version=$(echo "$outdated_packages" | jq -r --arg pkg "$package" '.[$pkg].latest')
    echo "Updating $package to $latest_version..."
    npm install "$package@$latest_version" --save || {
      echo "Failed to update $package"
    }
  done
}

# Check if jq is installed
if ! command -v jq &> /dev/null; then
  echo "jq is not installed. Please install jq to use this script."
  exit 1
fi

# Call the function to update packages
update_outdated_packages