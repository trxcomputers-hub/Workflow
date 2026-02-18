@echo off
echo Starting MongoDB...
echo ==========================================
echo MongoDB is starting from: %~dp0mongodb-win32-x86_64-windows-8.2.5\bin
echo Data will be saved in: C:\data\db
echo ==========================================
"%~dp0mongodb-win32-x86_64-windows-8.2.5\bin\mongod.exe" --dbpath="C:\data\db" --logpath="C:\data\log\mongodb.log" --logappend
pause
