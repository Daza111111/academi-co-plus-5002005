#!/bin/bash

echo "📦 Preparando archivos para GitHub..."

# Agregar archivos
git add .github/workflows/deploy.yml
git add frontend/vite.config.ts
git add frontend/package.json
git add frontend/public/.nojekyll
git add .emergent/emergent.yml
git add GITHUB_ACTIONS_SETUP.md

echo "✅ Archivos agregados"
echo ""
echo "📝 Mensaje de commit sugerido:"
cat COMMIT_MESSAGE.txt
echo ""
echo "🚀 Para hacer commit y push, ejecuta:"
echo "   git commit -F COMMIT_MESSAGE.txt"
echo "   git push origin main"
echo ""
echo "O copia este comando completo:"
echo "   git commit -F COMMIT_MESSAGE.txt && git push origin main"
