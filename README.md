# Birthday Page — Muhammad Rizki Aditya

One-page interactive birthday website built with React + Vite.

## Features

- Dark luxury + bold magenta/pink visual style
- Interactive opening screen
- Mouse glow and subtle 3D hero parallax
- Click-to-open birthday envelope
- Personalized message with a special extra line
- Photo gallery with modal/lightbox view
- Interactive wish cards
- Press-and-hold birthday surprise
- Confetti and birthday message animation
- “Happy Birthday” melody generated directly with Web Audio
- Responsive for desktop and mobile

## Install & run

Make sure Node.js 18+ is installed.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

## Production build

```bash
npm run build
```

The production files will be generated inside `dist/`.

## Preview production build

```bash
npm run preview
```

## Main files

- `src/App.jsx` — layout, birthday interactions, music logic, photo gallery
- `src/styles.css` — visual design and animations
- `src/main.jsx` — React entry point
- `public/photos/*` — birthday gallery photos
