# Cake Couch

![Cake Couch: animated product showcase](docs/screenshot.jpg)

**Live:** https://cake-couch-animation.vercel.app

A tiny, dependency-free animated product showcase: one HTML file with inline CSS, JS and hand-drawn SVG. No framework, no fonts, no images, no build step (about 12 KB gzipped).

<p align="center">
  <img src="docs/cake-couch.gif" width="80%" alt="The three themes (Sofa cake, Blob sofa, Herbs pods) cycling: objects swing around a hidden circle while the rounded pentagon behind them rotates and changes colour">
</p>

## How it moves
- Three themes (Sofa cake, Blob sofa, Herbs pods) cycle on a loop.
- Every object rides one hidden circle, clockwise. The old set sweeps out to the bottom-left while the new set swings in from the top; blurred foreground objects travel further, which gives depth.
- The coloured background is a rounded pentagon that rotates 144° per theme about the same centre. The card clips it, so its visible outline keeps changing while the colour morphs.
- The headline and the product rows slide out left as a strip and the new ones follow right behind.
- Pauses on hover, focus, hidden tab and the pause button. Honours `prefers-reduced-motion`.

## Run locally
```bash
python3 -m http.server 4173
```
Then open http://localhost:4173.

## Files
| File | What it holds |
|---|---|
| `index.html` | Everything: markup, styles, SVG artwork and the small script |
| `docs/` | README picture and animation |

Inspired by [Cake Couch](https://dribbble.com/shots/16460483-Cake-Couch) by Cosmin Capitanu. All artwork here is original SVG; no assets were copied.
