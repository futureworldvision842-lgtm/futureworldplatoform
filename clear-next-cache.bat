@echo off
cd /d "%~dp0"
if exist .next rmdir /s /q .next
echo Deleted .next folder. Run "npm run dev" to start fresh.
