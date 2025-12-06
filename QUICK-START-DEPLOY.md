# ⚡ Quick Start - Deploy su GitHub Pages

## 🎯 Setup Iniziale (Solo Prima Volta)

### 1. Installa le Dipendenze
```bash
npm install
```

### 2. Esegui il Primo Deploy
```bash
npm run deploy
```

### 3. Configura GitHub Pages (Solo Prima Volta)

1. Vai su: **https://github.com/biagio-scaglia/biologia/settings/pages**
2. In **Source**, seleziona:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
3. Clicca **Save**

### 4. Attiva GitHub Actions (Solo Prima Volta)

1. Vai su: **https://github.com/biagio-scaglia/biologia/settings/actions**
2. In **Workflow permissions**, seleziona:
   - ✅ **Read and write permissions**
3. Clicca **Save**
4. Vai su: **Settings** → **Pages**
5. In **Source**, cambia a:
   - **Source**: `GitHub Actions`
6. Clicca **Save**

## ✅ Risultato

Il sito sarà disponibile su: **https://biagio-scaglia.github.io/biologia/**

## 🔄 Deploy Futuri (Automatico)

Ogni volta che fai push su `main`, il deploy avviene **automaticamente** tramite GitHub Actions.

Nessun comando manuale necessario! 🚀

---

Per dettagli completi, vedi [DEPLOY.md](./DEPLOY.md)

