@echo off
REM In PowerShell run as: .\push-to-github.bat  (dot-backslash required)
cd /d "%~dp0"
set REPO=https://github.com/futureworldvision842-lgtm/futureworldplatoform.git

if not exist .git (
  git init
  git branch -M main
  echo Git initialized.
)

git add .
git status
git commit -m "Deploy: GAIGS / Global AI Governance platform - full project" 2>nul || git commit -m "Update: GAIGS platform" 2>nul || echo No changes to commit.

git remote remove origin 2>nul
git remote add origin %REPO%
echo.
echo Pushing to GitHub...
git push -u origin main
if errorlevel 1 (
  echo.
  echo Push failed. Agar repo mein pehle se commits hain to try:
  echo   git pull origin main --allow-unrelated-histories
  echo   git push -u origin main
  echo.
  echo Ya ensure you are logged in to GitHub.
)
pause
