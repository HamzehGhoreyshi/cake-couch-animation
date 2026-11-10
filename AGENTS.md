First read ~/Desktop/AI/ai-os/AGENTS.md

# AGENTS.md — cake-couch-animation

## First
This project belongs to Hamzeh's AI OS.
Read `~/Desktop/AI/ai-os/AGENTS.md` and follow its session routine.
If you cannot reach that path, ask Hamzeh to also connect the `ai-os` folder.
Project summary lives in: `~/Desktop/AI/ai-os/10_context/projects/cake-couch-animation.md`

## This project
- What it is: a recreation of the Dribbble shot "Cake Couch" by Cosmin Capitanu (https://dribbble.com/shots/16460483-Cake-Couch) as a fast animated product showcase. Experiment.
- Tech stack: `index.html` (markup + SVG), `style.css`, `app.js`. Plain HTML/CSS/JS, hand-drawn SVG. No framework, no fonts, no images (except `og-image.jpg` for link previews), no build step.
- How to run it: `python3 -m http.server 4173` in this folder, open http://localhost:4173. (The app's preview launcher cannot read ~/Desktop, so use a terminal tab.)
- How to deploy it: `vercel deploy --prod --yes` (live at https://cake-couch-animation.vercel.app), then `git push` to HamzehGhoreyshi/cake-couch-animation.
- Rules specific to this project:
  - Never copy, embed or hotlink the author's videos or images. All artwork stays original SVG.
  - Keep the "Inspired by Cake Couch by Cosmin Capitanu" credit and the signature footer (© Hamzeh · Powered by Claude · GitHub · Star).
  - Motion model (measured from the shot): objects ride one hidden circle (centre ~104,128 in 710x482 card units), clockwise; the background is a rounded pentagon that rotates 144° per theme about the same centre, clipped by the card. Change these only by re-measuring the shot.
  - Animate only transform/opacity (plus the colour morph). Keep it dependency-free and under ~15 KB gzipped.

## Session end (in addition to the AI OS routine)
- Commit and push this project's changes to its own repo.
- Update the project page in ai-os/10_context/projects/cake-couch-animation.md directly: state, decisions, next actions.
