#!/bin/bash
# Push this project to GitHub (Hema3511)
# Run this in Git Bash or any terminal where 'git' is installed.
# First create a new empty repo at: https://github.com/new
# Suggested name: algorithmic-accountability-dashboard (or hackathon)

set -e
cd "$(dirname "$0")"

REPO_NAME="algorithmic-accountability-dashboard"
REMOTE_URL="https://github.com/Hema3511/${REPO_NAME}.git"

if ! command -v git &>/dev/null; then
  echo "Git is not installed or not in PATH. Install Git from https://git-scm.com/"
  exit 1
fi

if [ ! -d .git ]; then
  echo "Initializing git repository..."
  git init
  git add .
  git commit -m "Initial commit: Algorithmic Accountability Dashboard with 4 scenarios"
  echo "Adding remote: $REMOTE_URL"
  git remote add origin "$REMOTE_URL"
  git branch -M main
  echo "Pushing to GitHub..."
  git push -u origin main
  echo "Done! View at: https://github.com/Hema3511/${REPO_NAME}"
else
  echo "Repository already initialized. Adding, committing, and pushing..."
  git add .
  git status
  git commit -m "Update: Algorithmic Accountability Dashboard" || true
  if ! git remote get-url origin &>/dev/null; then
    git remote add origin "$REMOTE_URL"
  fi
  git branch -M main 2>/dev/null || true
  git push -u origin main
  echo "Done!"
fi
