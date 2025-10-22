@echo off
echo ===================================
echo FIXING BUILD ERROR AND PUSHING
echo ===================================
echo.
git add .
git commit -m "Fix: Add missing Link import in ServicesPage"
git push origin main
echo.
echo ===================================
echo DONE! Pushed to GitHub!
echo Render will rebuild automatically
echo ===================================
pause
