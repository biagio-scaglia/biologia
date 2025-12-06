# 🏥 Istiocitosi a Cellule di Langerhans - Guida Educativa

Un progetto React completo, totalmente front-end, dedicato all'educazione e all'informazione scientifica sull'Istiocitosi a Cellule di Langerhans (ICL).

## 📋 Caratteristiche

- ✅ **Solo Front-End**: Nessuna API, nessun backend, nessuna chiamata esterna
- ✅ **Contenuto Scientifico**: Informazioni mediche estratte da documenti PDF specializzati
- ✅ **TypeScript**: Tipizzazione completa per maggiore sicurezza e manutenibilità
- ✅ **Struttura Modulare**: Organizzazione chiara e scalabile del codice
- ✅ **Componenti Riutilizzabili**: Libreria UI interna completamente personalizzabile
- ✅ **Design Medico**: Stile pulito e professionale ispirato a dashboard mediche
- ✅ **Dati JSON**: Tutti i contenuti medici gestiti tramite file JSON
- ✅ **Visualizzazioni**: Grafici e statistiche con Recharts
- ✅ **Animazioni**: Transizioni fluide con Framer Motion
- ✅ **Responsive**: Design adattivo per tutti i dispositivi
- ✅ **Accessibile**: Componenti conformi alle linee guida WCAG

## 🎯 Obiettivo del Progetto

Questo progetto presenta informazioni mediche e biologiche sull'Istiocitosi a Cellule di Langerhans (ICL), una malattia rara che colpisce principalmente i bambini. Il contenuto è stato estratto da documenti PDF specializzati e presentato in formato educativo e accessibile.

### Contenuti Inclusi

- **Panoramica**: Cos'è l'ICL, epidemiologia, incidenza
- **Cellule Coinvolte**: CD1a, CD207, cellule dendritiche e di Langerhans
- **Mutazioni Genetiche**: BRAF V600E, MAP2K1, RAS, ARAF e meccanismi
- **Sintomi e Organi**: Manifestazioni cliniche per ogni organo colpito
- **Diagnostica**: Metodi di diagnosi, marker, imaging, analisi genetiche
- **Trattamenti**: Chirurgia, chemioterapia, radioterapia, terapie mirate (Vemurafenib)
- **Statistiche**: Epidemiologia, mortalità, prognosi, coinvolgimento organi
- **Prevenzione e Ricerca**: Stato attuale della ricerca, studi clinici

## 🏗️ Struttura del Progetto

```
src/
├── assets/
│   ├── data/
│   │   └── lch/              # Dati medici in formato JSON
│   │       ├── introduction.json
│   │       ├── cells.json
│   │       ├── mutations.json
│   │       ├── symptoms.json
│   │       ├── diagnostics.json
│   │       ├── treatments.json
│   │       ├── statistics.json
│   │       ├── prevention.json
│   │       └── sources.json
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/
│   ├── ui/                   # Componenti UI riutilizzabili
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   └── Modal/
│   ├── ICL/                  # Componenti specifici per ICL
│   │   ├── HeroIntro/
│   │   ├── CellTypes/
│   │   ├── Mutations/
│   │   ├── AffectedSystems/
│   │   ├── Diagnostics/
│   │   ├── Treatments/
│   │   ├── Statistics/
│   │   └── Prevention/
│   ├── shared/               # Componenti condivisi
│   │   ├── FormBuilder/
│   │   └── Notifications/
│   └── layout/              # Componenti di layout
│       ├── Header/
│       ├── Footer/
│       └── Container/
│
├── pages/
│   ├── Home/                # Pagina introduttiva
│   ├── Cells/               # Cellule e mutazioni
│   ├── Symptoms/            # Sintomi e organi colpiti
│   ├── Diagnostics/         # Metodi diagnostici
│   ├── Treatments/          # Opzioni terapeutiche
│   ├── Statistics/          # Statistiche ed epidemiologia
│   ├── Prevention/         # Prevenzione e ricerca
│   └── Sources/             # Fonti e riferimenti
│
├── config/
│   ├── routes.ts            # Configurazione routing
│   └── appConfig.ts         # Configurazione app
│
├── context/
│   └── AppContext.tsx       # Context globale
│
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useToggle.ts
│   └── useMediaQuery.ts
│
├── lib/
│   └── utils/
│       ├── formatters.ts
│       ├── validators.ts
│       └── helpers.ts
│
└── styles/
    ├── global.css
    ├── variables.css
    └── themes/
```

## 🚀 Installazione

1. **Installa le dipendenze:**
```bash
npm install
```

2. **Avvia il server di sviluppo:**
```bash
npm run dev
```

3. **Build per produzione:**
```bash
npm run build
```

4. **Preview build di produzione:**
```bash
npm run preview
```

## 📚 Pagine Disponibili

- **Home** (`/`): Introduzione all'ICL e panoramica generale
- **Cellule** (`/cells`): Cellule coinvolte (CD1a, CD207) e mutazioni genetiche
- **Sintomi** (`/symptoms`): Organi colpiti e manifestazioni cliniche
- **Diagnostica** (`/diagnostics`): Metodi di diagnosi e marker
- **Trattamenti** (`/treatments`): Opzioni terapeutiche disponibili
- **Statistiche** (`/statistics`): Dati epidemiologici e prognosi
- **Prevenzione** (`/prevention`): Ricerca attuale e prospettive future
- **Fonti** (`/sources`): Riferimenti e disclaimer

## 🎨 Design e Architettura di Stile

Il progetto utilizza un **design system moderno e completo** con un approccio mobile-first, gradienti avanzati, glassmorphism e animazioni fluide.

### 🎯 Design System

#### **Design Tokens** (`src/styles/variables.css`)

Il progetto utilizza un sistema completo di design tokens per garantire consistenza e manutenibilità:

- **Colori**: Palette medica con scale complete (primary, secondary, neutral, semantic)
- **Gradienti**: Sistema di gradienti predefiniti per effetti visivi avanzati
- **Glassmorphism**: Variabili per effetti di vetro con backdrop blur
- **Tipografia**: Font fluidi con `clamp()` per responsive perfetto
- **Spacing**: Sistema a griglia 8px con variabili scalabili
- **Ombre**: Sistema di elevazione con 5 livelli
- **Animazioni**: Curve di easing personalizzate e durate standardizzate
- **Breakpoints**: Mobile-first con 5 breakpoints principali

#### **Componenti UI Moderni**

- **Header**: Glassmorphism con hamburger menu animato (slide-in/fade-in)
- **Button**: Varianti con gradienti, effetti hover avanzati e microinterazioni
- **Card**: Supporto per glassmorphism, gradienti e animazioni
- **Navigation**: Menu mobile fluido con animazioni staggered

#### **Responsive Design**

Approccio **mobile-first** con:
- **Fluid Typography**: Uso di `clamp()` per dimensioni font responsive
- **Fluid Spacing**: Padding e margin che si adattano automaticamente
- **Breakpoints**: 360px, 480px, 768px, 1024px, 1280px, 1536px
- **Touch Targets**: Minimo 44px per accessibilità mobile

#### **Effetti Visivi**

- **Gradienti**: Sistema completo di gradienti medical-themed
- **Glassmorphism**: Effetti di vetro con backdrop blur per header e card
- **Glow Effects**: Ombre colorate per elementi interattivi
- **Microinterazioni**: Hover effects, scale, translate per feedback visivo
- **Animazioni**: Transizioni fluide con curve di easing personalizzate

#### **Utility Classes** (`src/styles/global.css`)

Classi utility per:
- Gradienti: `.gradient-primary`, `.gradient-secondary`, `.gradient-text`
- Glassmorphism: `.glass`, `.glass-strong`, `.glass-light`
- Ombre: `.shadow-xs` fino a `.shadow-2xl`
- Glow: `.glow-primary`, `.glow-secondary`, `.glow-strong`
- Hover Effects: `.hover-lift`, `.hover-glow`, `.hover-scale`
- Animazioni: `.animate-fade-in`, `.animate-slide-up`, `.animate-scale-in`

#### **Accessibilità**

- **WCAG AA Compliant**: Contrasti colori verificati
- **Focus States**: Outline visibili per navigazione da tastiera
- **Reduced Motion**: Supporto per `prefers-reduced-motion`
- **ARIA Labels**: Attributi ARIA completi per screen readers
- **Touch Targets**: Dimensioni minime per dispositivi touch

#### **Performance**

- **CSS Ottimizzato**: Nessuna duplicazione, variabili riutilizzabili
- **Animazioni GPU**: Uso di `transform` e `opacity` per performance
- **Lazy Loading**: Componenti caricati on-demand
- **Backdrop Filter**: Supporto con fallback per browser legacy

## 📦 Dipendenze Principali

- **React 18.2.0**: Libreria UI
- **React Router DOM 6.21.1**: Routing
- **TypeScript 5.2.2**: Tipizzazione
- **Framer Motion 10.16.16**: Animazioni
- **Recharts 2.10.3**: Grafici e visualizzazioni
- **React Icons 4.12.0**: Icone
- **clsx 2.1.0**: Gestione classi CSS
- **Vite 5.0.8**: Build tool

## 🔧 Struttura Dati JSON

Tutti i contenuti medici sono memorizzati in file JSON nella cartella `src/assets/data/lch/`. Ogni file rappresenta una sezione tematica:

- `introduction.json`: Panoramica e epidemiologia
- `cells.json`: Cellule coinvolte (CD1a, CD207, etc.)
- `mutations.json`: Mutazioni genetiche (BRAF, MAP2K1, etc.)
- `symptoms.json`: Organi colpiti e sintomi
- `diagnostics.json`: Metodi diagnostici
- `treatments.json`: Opzioni terapeutiche
- `statistics.json`: Dati epidemiologici
- `prevention.json`: Prevenzione e ricerca
- `sources.json`: Fonti e disclaimer

## 📝 Note Importanti

### Disclaimer Medico

⚠️ **IMPORTANTE**: Le informazioni presentate in questo progetto sono a scopo educativo e informativo. Non sostituiscono la consulenza medica professionale. Per diagnosi e trattamento, consultare sempre un medico qualificato.

### Fonti

Tutti i contenuti sono stati estratti dai seguenti documenti PDF:
- `(ICL) Istiocitosi a cellule di Langerhans nei bambini.pdf`
- `biologia.pdf`

Non sono state aggiunte informazioni mediche non presenti nei documenti originali.

## 🛠️ Sviluppo

### Aggiungere Nuovo Contenuto

1. **Aggiungi dati JSON** in `src/assets/data/lch/`
2. **Crea componente** in `src/components/ICL/`
3. **Crea pagina** in `src/pages/`
4. **Aggiungi route** in `src/config/routes.ts`

### Modificare Stili

- Variabili CSS: `src/styles/variables.css`
- Stili globali: `src/styles/global.css`
- Stili componenti: File CSS nella cartella del componente

## 📖 Best Practices

1. **Contenuto**: Mantieni sempre la precisione scientifica
2. **Accessibilità**: Usa semantic HTML e attributi ARIA
3. **Performance**: Lazy loading per le pagine
4. **Tipizzazione**: Usa sempre TypeScript
5. **Responsive**: Testa su diverse dimensioni di schermo

## 🚧 Estensioni Future

- Aggiungere più visualizzazioni interattive
- Implementare ricerca nel contenuto
- Aggiungere modalità di stampa ottimizzata
- Supporto multilingua
- PWA capabilities

## 📄 Licenza

Questo progetto è open source e disponibile per uso educativo e informativo.

---

**Buon apprendimento! 🎓**
