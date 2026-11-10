# Cake Couch

A tiny, dependency-free animated product showcase: one HTML file, inline CSS, JS and hand-drawn SVG. No frameworks, no fonts, no images (about 10 KB gzipped).

- Three themes (Sofa cake, Blob sofa, Herbs pods) cycle on a loop.
- Objects ride a hidden circle (clockwise) while a rounded pentagon behind them rotates and changes colour.
- Pauses on hover, focus, hidden tab and the pause button; honours `prefers-reduced-motion`.

Inspired by [Cake Couch](https://dribbble.com/shots/16460483-Cake-Couch) by Cosmin Capitanu. All artwork here is original SVG; no assets were copied.

Run locally: `python3 -m http.server 4173` in this folder, then open http://localhost:4173.
