@echo off
cd /d C:\Users\Pborra_project\NashuaPeaceInitiative\client
start "Angular Server" cmd /k "ng serve"
timeout /t 5 /nobreak >nul
start http://localhost:4200