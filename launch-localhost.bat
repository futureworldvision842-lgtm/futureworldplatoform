@echo off
setlocal EnableDelayedExpansion
cd /d "E:\Muhammad's Work VP automation\mq prject\Platform Project"
echo ========================================
echo  G.A.I.G.S. - Launch on localhost
echo ========================================
echo.

echo [1/3] Prisma client...
if exist "node_modules\.prisma\client\index.js" (
  echo Prisma client already present, skipping generate.
) else (
  call npx prisma generate
  if errorlevel 1 (
    echo.
    echo Prisma generate failed ^(EPERM = file locked^). Run fix-prisma.bat once:
    echo   Close Cursor and all terminals, then right-click fix-prisma.bat - Run as administrator.
    echo Or continue to start dev server if you had a working client before.
    echo.
    set /p cont="Continue to dev server anyway? (y/n): "
    if /i not "!cont!"=="y" exit /b 1
  )
)
echo.

echo [2/3] Prisma db push (needs DATABASE_URL in .env)...
call npx prisma db push
if errorlevel 1 (
  echo.
  echo db push failed. Check .env has DATABASE_URL=postgresql://...
  echo See LOCAL-SETUP.md. You can still run dev without DB for UI test.
  echo.
  set /p cont="Continue to start dev server anyway? (y/n): "
  if /i not "%cont%"=="y" exit /b 1
)
echo.

echo [3/3] Starting dev server...
echo Open http://localhost:3000 when ready. Press Ctrl+C to stop.
echo.
call npm run dev
pause
