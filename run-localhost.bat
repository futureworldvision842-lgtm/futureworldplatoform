@echo off
cd /d "E:\Muhammad's Work VP automation\mq prject\Platform Project"
echo Installing dependencies...
call npm install
if errorlevel 1 (
  echo npm install failed.
  pause
  exit /b 1
)
echo.
echo Starting dev server on http://localhost:3000
echo Press Ctrl+C to stop.
echo.
call npm run dev
pause
