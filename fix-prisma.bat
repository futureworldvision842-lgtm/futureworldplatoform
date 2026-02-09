@echo off
:: Run this ONCE when Prisma generate fails with EPERM (file locked).
:: 1. Close Cursor / VS Code and ALL terminals.
:: 2. Right-click this file -> Run as administrator.
:: 3. Then use launch-localhost.bat as usual.
cd /d "E:\Muhammad's Work VP automation\mq prject\Platform Project"

echo Removing old Prisma client...
if exist "node_modules\.prisma\client" (
  rd /s /q "node_modules\.prisma\client"
  if errorlevel 1 (
    echo Access denied. Close Cursor and every Node/CMD window, then run this as Administrator again.
    pause
    exit /b 1
  )
  echo Removed.
) else (
  echo No existing client folder.
)

echo.
echo Generating Prisma client...
call npx prisma generate
if errorlevel 1 (
  echo Still failed. Reboot PC and run this file as Administrator again.
  pause
  exit /b 1
)

echo.
echo Done. You can now use launch-localhost.bat.
pause
