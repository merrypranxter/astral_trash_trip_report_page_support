# CONTRIBUTING — astral_trash_trip_report_page_support

This repo is a grimoire-in-progress: structured trip data feeding generative
visuals (GLSL + ASCII) via Google AI Studio.

## Workflow

1. Paste a trip report (or chunk of one) into chat. Raw, unedited, fragments fine.
2. AI extracts the meat into `trip_reports/processed/` — one markdown file per trip,
   dual-schema YAML frontmatter (Standard + Weird), narrative body.
3. Raw paste archived untouched in `trip_reports/raw/`.
4. Machine-readable derivatives (CSV/JSON) land in `trip_reports/extracted/`.
5. Art seeds auto-generated from processed metadata:
   - `glsl_seeds/` — conceptual shader prompts (mood, geometry, palette, temporal feel)
   - `ascii_seeds/` — ASCII art concepts (density, chaos/order, character sets)
   Seeds are GUIDES for Google AI Studio to riff on — not final art.
6. Switching trips mid-stream is fine — current state gets tagged and parked.
7. On request, everything gets packaged push-ready + `manifest.json` refreshed.

## Metadata Policy

Estimate what you remember. No pressure for precision. Blanks stay blank.
The user specifies when switching between trip reports.

## File Naming

- Raw:        `trip_reports/raw/YYYY-MM-DD_or_unknown_RAW_<slug>.md`
- Processed:  `trip_reports/processed/<trip_id>.md`
- GLSL seed:  `glsl_seeds/<trip_id>_glsl_ideas.md`
- ASCII seed: `ascii_seeds/<trip_id>_ascii_ideas.md`
- Integration: `trip_reports/integration/<trip_id>_integration.md`
