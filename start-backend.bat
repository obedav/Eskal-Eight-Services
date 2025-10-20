@echo off
echo Starting ESKAL EIGHT SERVICES Backend Server...
echo.
echo Backend API will be available at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
cd backend\public
C:\xampp\php\php.exe -S localhost:8000
