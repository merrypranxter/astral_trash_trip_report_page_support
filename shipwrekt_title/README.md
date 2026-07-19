# Trip Reports title organism

A dependency-free interactive opening artwork for the Astral Trash psychedelic archive.

The title uses the bundled Cleo Folk display face from the project's support repository as the living mask beneath its generated light, geometry, glyphs, and distortion.

## What it does

- Runs a full-viewport WebGL2 psychedelic field generated entirely in code.
- Grows `TRIP REPORTS` from a responsive text mask filled with animated interference geometry.
- Treats the title as three states of one organism:
  - idle: Chromatic Thought Animal
  - hover/focus: Perceptual Rupture
  - click/activate: Hyperdimensional Relic
- Leaves temporary visual memory where the visitor disturbs it.
- Includes keyboard activation, real semantic heading text, reduced-motion behavior, a CSS fallback, and responsive sizing.

## Run locally

Any static server works. From this folder:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy

The folder can be pushed directly to GitHub and imported into Netlify. No build command or dependencies are required. `netlify.toml` already points Netlify at the project root.

## Main files

- `index.html` — semantic structure and interaction surface
- `styles.css` — atmosphere, layout, fallback, accessibility, and interface details
- `trip-reports.js` — WebGL background, procedural title rendering, and all interaction states
- `shipwrekt-demo.html` — the original shader field with the transparent Shipwrekt component placed over it
- `components/shipwrekt-title/` — portable **The Shipwrekt Experience** title sprite, fonts, and integration notes

## Add the Shipwrekt title

Load the component once and place it wherever the page composition needs it:

```html
<script defer src="./components/shipwrekt-title/shipwrekt-title.js"></script>
<shipwrekt-title></shipwrekt-title>
```

It has a transparent canvas, so Google AI Studio can position it over the existing background without creating a box or second scene. It emits `shipwrekt:activate` when clicked, tapped, or keyboard-activated.

## Future type changes

The visible letter skeleton is generated in `TitleOrganism.drawWord()` inside `trip-reports.js`. Replace the font stack there if a future display face is selected. The shader fill, glyph growth, distortion, and interaction states will continue to operate on the new letter shapes.
