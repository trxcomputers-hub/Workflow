@echo off
setlocal enabledelayedexpansion

echo Starting TaskFlow System Components...
echo ==========================================

:: Find Local IP Address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set ip=%%a
    set ip=!ip: ^=!
)

echo YOUR LOCAL NETWORK IP: !ip!
echo WORKERS SHOULD LOG IN AT: http://!ip!:5173
echo ==========================================

:: 1. Start MongoDB
echo Starting MongoDB Database...
start "TaskFlow Database (MongoDB)" cmd /k "run-mongodb.bat"

:: Wait for DB
timeout /t 5 >nul

:: 2. Starting Backend Server
echo Starting Backend Server (Port 5000)...
start "TaskFlow Server" cmd /k "cd server && npm.cmd run dev"

:: 3. Starting Frontend Client
echo Starting Frontend Client (Port 5173 - Network Enabled)...
start "TaskFlow Client" cmd /k "cd client && npm.cmd run dev"

echo 4. Opening Browser...
timeout /t 5 >nul
start http://localhost:5173

echo ==========================================
echo EVERYTHING IS RUNNING!
echo Share link: http://!ip!:5173 with your workers.
echo do NOT close any of these windows.
echo ==========================================
pause
