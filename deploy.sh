#!/bin/bash

echo "========================================"
echo "  DRACULA Token - Auto Deploy Script"
echo "========================================"
echo

# Verifică dacă Git este instalat
if ! command -v git &> /dev/null; then
    echo "ERROR: Git nu este instalat!"
    echo "Te rog instalează Git:"
    echo "  Ubuntu/Debian: sudo apt-get install git"
    echo "  macOS: brew install git"
    echo "  Windows: https://git-scm.com/"
    exit 1
fi

echo "1. Git este instalat ✓"
echo

# Verifică dacă suntem în repository-ul corect
if [ ! -d ".git" ]; then
    echo "ERROR: Nu sunteți într-un Git repository!"
    echo "Rulați scriptul din folderul dracula-website"
    exit 1
fi

echo "2. Repository Git verificat ✓"
echo

# Verifică dacă remote origin există
if ! git remote get-url origin &> /dev/null; then
    echo "3. Remote GitHub nu este configurat"
    echo
    echo "Te rog adaugă URL-ul repository-ului tău GitHub:"
    echo
    read -p "GitHub Repository URL: " github_url
    
    if [ -z "$github_url" ]; then
        echo "ERROR: URL-ul nu poate fi gol!"
        exit 1
    fi
    
    echo
    echo "Adaug remote origin..."
    git remote add origin "$github_url"
    
    if [ $? -ne 0 ]; then
        echo "ERROR: Nu am putut adăuga remote origin!"
        exit 1
    fi
    
    echo "Remote origin adăugat ✓"
else
    echo "3. Remote GitHub deja configurat ✓"
    git remote get-url origin
fi

echo
echo "4. Adaug fișierele modificate..."
git add .

echo
echo "5. Creez commit..."
commit_msg="Auto deploy DRACULA Token website - $(date)"
git commit -m "$commit_msg"

echo
echo "6. Push pe GitHub..."
git push -u origin main

if [ $? -ne 0 ]; then
    echo
    echo "ERROR: Push a eșuat!"
    echo
    echo "Posibile cauze:"
    echo "- Repository-ul nu există pe GitHub"
    echo "- Nu ai drepturi de write"
    echo "- Internet connection problems"
    echo
    echo "Te rog verifică și încearcă din nou."
    exit 1
fi

echo
echo "========================================"
echo "   ✅ DEPLOY REUȘIT!"
echo "========================================"
echo
echo "Website-ul DRACULA Token a fost încărcat pe GitHub!"
echo
echo "Pentru a activa GitHub Pages:"
echo "1. Mergi la repository-ul tău pe GitHub"
echo "2. Click pe Settings"
echo "3. Click pe Pages în meniul din stânga"
echo "4. Selectează 'Deploy from a branch'"
echo "5. Alege branch-ul 'main'"
echo "6. Alege folder-ul '/ (root)'"
echo "7. Click pe 'Save'"
echo
echo "Website-ul va fi live la:"
echo "https://[USERNAME].github.io/[REPO-NAME]/"
echo

# Întreabă dacă vrea să deschidă repository-ul
read -p "Apasă Enter pentru a deschide repository-ul în browser..." 
if command -v xdg-open &> /dev/null; then
    xdg-open "$(git remote get-url origin)"
elif command -v open &> /dev/null; then
    open "$(git remote get-url origin)"
elif command -v start &> /dev/null; then
    start "$(git remote get-url origin)"
fi

echo
echo "Script terminat! Website-ul tău este acum pe GitHub! 🚀"
