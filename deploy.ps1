# Script di deploy automatico per GitHub Pages (PowerShell)
# Questo script builda il progetto e lo pubblica sulla branch gh-pages

$ErrorActionPreference = "Stop"

Write-Host "🚀 Inizio deploy automatico su GitHub Pages..." -ForegroundColor Cyan

# Verifica che siamo sulla branch main
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    Write-Host "⚠️  Attenzione: non sei sulla branch main (attuale: $currentBranch)" -ForegroundColor Yellow
    $response = Read-Host "Vuoi continuare comunque? (y/n)"
    if ($response -ne "y" -and $response -ne "Y") {
        exit 1
    }
}

# Installa dipendenze se necessario
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installazione dipendenze..." -ForegroundColor Cyan
    npm install
}

# Build del progetto
Write-Host "🔨 Build del progetto..." -ForegroundColor Cyan
npm run build

# Verifica che la build sia stata creata
if (-not (Test-Path "dist")) {
    Write-Host "❌ Errore: la cartella dist non è stata creata!" -ForegroundColor Red
    exit 1
}

# Crea file .nojekyll per GitHub Pages (necessario per SPA)
New-Item -Path "dist\.nojekyll" -ItemType File -Force | Out-Null

# Deploy su gh-pages
Write-Host "📤 Deploy su GitHub Pages..." -ForegroundColor Cyan
npm run deploy

Write-Host "✅ Deploy completato con successo!" -ForegroundColor Green
Write-Host "🌐 Il sito sarà disponibile su: https://biagio-scaglia.github.io/biologia/" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  Nota: potrebbe richiedere alcuni minuti prima che le modifiche siano visibili." -ForegroundColor Yellow

