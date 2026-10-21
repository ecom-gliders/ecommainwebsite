# UserWay Accessibility Widget Feature Map

**Date:** 2026-10-22  
**Source:** UserWay Help Center + shipped widget strings (`cdn.userway.org/widget/.../chunks/app-*.js`)  
**Method:** Documented features + string inventory from widget bundle (artifact not retained)  
**Confidence:** High for feature inventory; Medium for exact visual chrome (iframe-gated)

## Profiles (apply feature bundles)

- Motor Impaired
- Blind
- Color Blind
- Dyslexia
- Low vision / Visually Impaired
- Cognitive & Learning
- Seizure & Epileptic
- ADHD

## Feature tiles (cycle levels on repeated click)

| Feature | Observed levels / modes |
| --- | --- |
| Bigger Text | bigger-text-1 … bigger-text-5 |
| Contrast+ | contrast-plus / contrast-2…4 (invert, dark, light) |
| Smart Contrast | smart-contrast |
| Highlight Links | on / off |
| Text Spacing | spacing-1 … spacing-4 |
| Pause Animations | on / off |
| Hide Images | on / off |
| Dyslexia Friendly | DyslexiaFont |
| Cursor tools | Big Cursor, Reading Guide, Reading Mask (reading-1…4) |
| Tooltips | on / off |
| Page Structure | outline panel |
| Line Height | line-height-1 … line-height-4 |
| Text Align | text-align-1 … text-align-5 |
| Saturation | saturation-1 … saturation-4 |
| Screen Reader | proprietary (skipped in our port) |
| Dictionary | proprietary (skipped in our port) |

## UI pattern to mirror

1. Bottom-right equal-size launcher FAB
2. Side panel with header + close
3. Profile chips / shortcuts near top
4. Dense square feature tiles in a 2–3 column grid; active state highlighted; repeated clicks advance level
5. Reset All footer action

## Our port scope

Implement CSS/localStorage equivalents for profiles + tiles above except Screen Reader and Dictionary. Match eCom Gliders hard-panel visual system (not UserWay blue chrome).
