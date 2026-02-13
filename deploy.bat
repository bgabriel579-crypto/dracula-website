@echo off
echo ========================================
echo   DRACULA Token - Auto Deploy Script
echo ========================================
echo.

REM Verifică dacă Git este instalat
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git nu este instalat!
    echo Te rog instalează Git de pe: https://git-scm.com/
    pause
    exit /b 1
)

echo 1. Git este instalat ✓
echo.

REM Verifică dacă suntem în repository-ul corect
if not exist ".git" (
    echo ERROR: Nu sunteți într-un Git repository!
    echo Rulați scriptul din folderul dracula-website
    pause
    exit /b 1
)

echo 2. Repository Git verificat ✓
echo.

REM Verifică dacă remote origin există
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo 3. Remote GitHub nu este configurat
    echo.
    echo Te rog adaugă URL-ul repository-ului tău GitHub:
    echo.
    set /p github_url="GitHub Repository URL: "
    
    if "%github_url%"=="" (
        echo ERROR: URL-ul nu poate fi gol!
        pause
        exit /b 1
    )
    
    echo.
    echo Adaug remote origin...
    git remote add origin "%github_url%"
    
    if %errorlevel% neq 0 (
        echo ERROR: Nu am putut adăuga remote origin!
        pause
        exit /b 1
    )
    
    echo Remote origin adăugat ✓
) else (
    echo 3. Remote GitHub deja configurat ✓
    git remote get-url origin
)

echo.
echo 4. Adaug fișierele modificate...
git add .

echo.
echo 5. Creez commit...
set commit_msg=Auto deploy DRACULA Token website - %date% %time%
git commit -m "%commit_msg%"

echo.
echo 6. Push pe GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Push a eșuat!
    echo.
    echo Posibile cauze:
    echo - Repository-ul nu există pe GitHub
    echo - Nu ai drepturi de write
    echo - Internet connection problems
    echo.
    echo Te rog verifică și încearcă din nou.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    ✅ DEPLOY REUȘIT! 
echo ========================================
echo.
echo Website-ul DRACULA Token a fost încărcat pe GitHub!
echo.
echo Pentru a activa GitHub Pages:
echo 1. Mergi la repository-ul tău pe GitHub
echo 2. Click pe Settings
echo 3. Click pe Pages în meniul din stânga
echo 4. Selectează "Deploy from a branch"
echo 5. Alege branch-ul "main"
echo 6. Alege folder-ul "/ (root)"
echo 7. Click pe "Save"
echo.
echo Website-ul va fi live la:
echo https://[USERNAME].github.io/[REPO-NAME]/
echo.
echo Apasă orice tastă pentru a deschide repository-ul...
pause >nul

REM Deschide repository-ul în browser
start "" "https://github.com"

echo.
echo Script terminat! Website-ul tău este acum pe GitHub! 🚀
pause
