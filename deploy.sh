#!/bin/bash

# Script di deploy automatico per GitHub Pages
# Questo script builda il progetto e lo pubblica sulla branch gh-pages

set -e  # Exit on error

echo "🚀 Inizio deploy automatico su GitHub Pages..."

# Verifica che siamo sulla branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "⚠️  Attenzione: non sei sulla branch main (attuale: $CURRENT_BRANCH)"
  read -p "Vuoi continuare comunque? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Installa dipendenze se necessario
if [ ! -d "node_modules" ]; then
  echo "📦 Installazione dipendenze..."
  npm install
fi

# Build del progetto
echo "🔨 Build del progetto..."
npm run build

# Verifica che la build sia stata creata
if [ ! -d "dist" ]; then
  echo "❌ Errore: la cartella dist non è stata creata!"
  exit 1
fi

# Crea file .nojekyll per GitHub Pages (necessario per SPA)
echo "" > dist/.nojekyll

# Deploy su gh-pages
echo "📤 Deploy su GitHub Pages..."
npm run deploy

echo "✅ Deploy completato con successo!"
echo "🌐 Il sito sarà disponibile su: https://biagio-scaglia.github.io/biologia/"
echo ""
echo "⚠️  Nota: potrebbe richiedere alcuni minuti prima che le modifiche siano visibili."

