@echo off
setlocal
cd /d "%~dp0"
echo ========================================
echo          LLD Coach - Setup
 echo ========================================
node --version >nul 2>&1
if errorlevel 1 (
  echo Node.js is not installed. Install Node.js 18+ first.
  pause
  exit /b 1
)
npm --version >nul 2>&1
if errorlevel 1 (
  echo npm is not available.
  pause
  exit /b 1
)
if not exist node_modules (echo Installing root dependencies... & npm install)
if not exist backend\node_modules (echo Installing backend dependencies... & npm --prefix backend install)
if not exist frontend\node_modules (echo Installing frontend dependencies... & npm --prefix frontend install)
echo.
echo Starting LLD Coach...
npm run dev
pause
