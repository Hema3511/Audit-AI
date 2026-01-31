@echo off
REM Push this project to GitHub (Hema3511)
REM Run this in Command Prompt or PowerShell after Git is installed and in PATH.
REM First create a new empty repo at: https://github.com/new
REM Suggested name: algorithmic-accountability-dashboard (or hackathon)

set REPO_NAME=algorithmic-accountability-dashboard
set REMOTE_URL=https://github.com/Hema3511/%REPO_NAME%.git

where git >nul 2>nul
if %errorlevel% neq 0 (
  echo Git is not installed or not in PATH. Install from https://git-scm.com/
  exit /b 1
)

cd /d "%~dp0"

if not exist .git (
  echo Initializing git repository...
  git init
  git add .
  git commit -m "Initial commit: Algorithmic Accountability Dashboard with 4 scenarios"
  echo Adding remote: %REMOTE_URL%
  git remote add origin %REMOTE_URL%
  git branch -M main
  echo Pushing to GitHub...
  git push -u origin main
  echo Done! View at: https://github.com/Hema3511/%REPO_NAME%
) else (
  echo Repository already initialized. Adding, committing, and pushing...
  git add .
  git status
  git commit -m "Update: Algorithmic Accountability Dashboard" || echo No changes to commit
  git remote get-url origin >nul 2>nul || git remote add origin %REMOTE_URL%
  git branch -M main 2>nul
  git push -u origin main
  echo Done!
)
