# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for "sBrechstunde" — a weekly Friday 16:00–17:00 session where people can vent frustrations ("abkotzen"), break out of typical thinking ("ausbrechen"), and start fresh ("aufbrechen"). Topics: ERP, KI (AI), Digitalisierung. The goal is improving competitiveness through real, effective change.

## Design Direction

- Dark mode
- Hero section with three overlapping/blended images (themes: venting, breaking out, breaking through)
- Images sourced from free stock portals
- Bold, provocative German copy — not corporate-polished
- Single-page landing page

## Tech Stack

Plain HTML/CSS/JS with Tailwind CSS (via CDN). No build tools, no frameworks.

## Hosting

GitHub Pages from the `main` branch root. The `.nojekyll` file disables Jekyll processing.

## Development

Open `index.html` in a browser. No build step required.

## Structure

- `index.html` — single-page landing page
- `css/style.css` — custom styles (hero image blending)
- `js/main.js` — interactions
- `img/` — hero images (three: abkotzen, ausbrechen, aufbrechen themes)

## Language

All user-facing content is in **German**. Code comments and technical docs in English.
