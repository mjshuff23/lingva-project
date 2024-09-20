#!/bin/bash

# Function to check for package updates
check_package_update() {
  package_name=$1
  
  # Get the current version from package.json
  current_version=$(jq -r ".dependencies[\"$package_name\"] // .devDependencies[\"$package_name\"]" package.json)

  # If the package is not found in package.json, skip it
  if [[ -z "$current_version" || "$current_version" == "null" ]]; then
    echo "$package_name is not listed in package.json."
    return
  fi

  # Get the latest version available on NPM
  latest_version=$(npm view "$package_name" version)

  # Compare the versions and output the result
  if [[ "$current_version" != "$latest_version" ]]; then
    echo "$package_name: upgrade to $latest_version (current: $current_version)"
  else
    echo "$package_name is up to date (version: $current_version)"
  fi
}

# List of packages to check
packages=("glob" "@jest/reporters" " @jest/core@28.1.0" "jest") # Add more package names as needed

# Loop through each package and check for updates
for package in "${packages[@]}"; do
  check_package_update "$package"
done