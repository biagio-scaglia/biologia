# 🚀 Guida al Deploy Automatico su GitHub Pages

Questo documento descrive il processo **completamente automatico** per il deploy del progetto su GitHub Pages all'URL: **https://biagio-scaglia.github.io/biologia/**

## 📋 Configurazione Completata

### ✅ Modifiche Applicate

1. **package.json**
   - ✅ Aggiunto campo `"homepage": "/biologia"`
   - ✅ Aggiunta dipendenza `gh-pages` (v6.1.1)
   - ✅ Aggiunti script:
     - `predeploy`: Esegue la build prima del deploy
     - `deploy`: Pubblica su GitHub Pages usando gh-pages

2. **vite.config.ts**
   - ✅ Configurato `base: '/biologia/'` per il routing corretto

3. **File di Supporto**
   - ✅ Creato `public/.nojekyll` per disabilitare Jekyll su GitHub Pages
   - ✅ Aggiornato `public/404.html` per gestire il routing SPA con base path

4. **Script di Deploy**
   - ✅ Creato `deploy.sh` (per Linux/macOS)
   - ✅ Creato `deploy.ps1` (per Windows PowerShell)

5. **GitHub Actions**
   - ✅ Creato workflow automatico `.github/workflows/deploy.yml`

## 🎯 Primo Deploy Manuale

### Opzione 1: Deploy Manuale con npm (Raccomandato per il primo setup)

```bash
# 1. Installa le dipendenze (se non già fatto)
npm install

# 2. Esegui il deploy (build + pubblicazione automatica)
npm run deploy
```

Questo comando:
- Esegue automaticamente `npm run build`
- Pubblica la cartella `dist` sulla branch `gh-pages`
- Configura GitHub Pages automaticamente

### Opzione 2: Deploy con Script

**Su Windows (PowerShell):**
```powershell
.\deploy.ps1
```

**Su Linux/macOS:**
```bash
chmod +x deploy.sh
./deploy.sh
```

## ⚙️ Configurazione GitHub Pages (Solo Prima Volta)

Dopo il primo deploy, configura GitHub Pages:

1. Vai su **GitHub** → Repository → **Settings** → **Pages**
2. In **Source**, seleziona:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
3. Clicca **Save**
4. L'URL sarà: `https://biagio-scaglia.github.io/biologia/`

⚠️ **IMPORTANTE**: Non configurare un dominio personalizzato (CNAME) per mantenere l'URL standard.

## 🔄 Deploy Automatico con GitHub Actions

Il workflow GitHub Actions è configurato per eseguire il deploy **automaticamente** ad ogni push sulla branch `main`.

### Come Funziona

1. **Push su main** → Il workflow si attiva automaticamente
2. **Build** → Compila il progetto
3. **Deploy** → Pubblica su GitHub Pages
4. **URL**: https://biagio-scaglia.github.io/biologia/

### Attivazione GitHub Actions (Solo Prima Volta)

1. Vai su **GitHub** → Repository → **Settings** → **Actions** → **General**
2. In **Workflow permissions**, seleziona:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
3. Clicca **Save**
4. Vai su **Settings** → **Pages**
5. In **Source**, seleziona:
   - **Source**: `GitHub Actions` (non "Deploy from a branch")
6. Clicca **Save**

### Esecuzione Manuale del Workflow

Puoi eseguire manualmente il workflow da:
- **GitHub** → Repository → **Actions** → **Deploy to GitHub Pages** → **Run workflow**

## 📝 Comandi Utili

### Build Locale
```bash
npm run build
```

### Preview Build Locale
```bash
npm run preview
```

### Deploy Manuale
```bash
npm run deploy
```

### Pulizia Branch gh-pages (se necessario)
```bash
# Rimuove la branch locale gh-pages
git branch -D gh-pages

# Rimuove la branch remota gh-pages
git push origin --delete gh-pages

# Poi esegui di nuovo il deploy
npm run deploy
```

## 🔍 Verifica del Deploy

### Controlli Automatici

1. **Verifica URL**: https://biagio-scaglia.github.io/biologia/
2. **Verifica Routing**: Naviga tra le pagine per assicurarti che funzionino
3. **Verifica Assets**: Controlla che immagini, CSS e JS si carichino correttamente

### Troubleshooting

#### Problema: 404 su route secondarie
**Soluzione**: Verifica che `vite.config.ts` abbia `base: '/biologia/'`

#### Problema: Assets non si caricano
**Soluzione**: Verifica che il file `.nojekyll` sia presente in `dist/`

#### Problema: Deploy non funziona
**Soluzione**: 
1. Verifica che `gh-pages` sia installato: `npm install`
2. Verifica i permessi GitHub Actions
3. Controlla i log in **Actions** → **Deploy to GitHub Pages**

## 🚨 Controlli per Futuri Aggiornamenti

### Checklist Pre-Deploy

- [ ] ✅ `package.json` contiene `"homepage": "/biologia"`
- [ ] ✅ `vite.config.ts` ha `base: '/biologia/'`
- [ ] ✅ File `.nojekyll` presente in `public/`
- [ ] ✅ Build locale funziona: `npm run build`
- [ ] ✅ Preview locale funziona: `npm run preview`

### Controlli Automatici nel Workflow

Il workflow GitHub Actions verifica automaticamente:
- ✅ Build senza errori
- ✅ Creazione file `.nojekyll`
- ✅ Upload corretto della cartella `dist`
- ✅ Deploy su GitHub Pages

## 📚 Struttura File di Deploy

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow GitHub Actions
├── public/
│   ├── .nojekyll               # Disabilita Jekyll
│   └── 404.html                # Redirect per SPA routing
├── deploy.sh                   # Script deploy (Linux/macOS)
├── deploy.ps1                  # Script deploy (Windows)
├── package.json                # Configurazione homepage e script
└── vite.config.ts              # Base path configurato
```

## 🎉 Risultato Finale

Dopo la configurazione, ogni push su `main` attiverà automaticamente:
1. ✅ Build del progetto
2. ✅ Deploy su GitHub Pages
3. ✅ Disponibilità su: **https://biagio-scaglia.github.io/biologia/**

**Nessun intervento manuale richiesto!** 🚀

---

## 📞 Supporto

Per problemi o domande:
1. Controlla i log in **GitHub** → **Actions**
2. Verifica la configurazione in **Settings** → **Pages**
3. Assicurati che tutti i file di configurazione siano presenti

