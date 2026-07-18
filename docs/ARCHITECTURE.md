# ARCHITECTURE

```
trip_reports/
  raw/           — original unedited notes (pasted as-is)
  processed/     — structured markdown, dual-schema YAML frontmatter
  extracted/     — CSVs / JSONs for machine ingestion
  integration/   — integration notes linked to specific trips
glsl_seeds/      — shader inspiration derived from reports
ascii_seeds/     — ASCII art concepts derived from reports
schemas/         — standard_schema.yaml + weird_schema.yaml
templates/       — markdown templates for new trips + integration notes
docs/            — this file, contribution guide
scripts/         — validation helpers
manifest.json    — master index for Google AI Studio
```

## Dual Schema

Every processed trip carries BOTH schemas in one frontmatter block:

- **Standard Mode** — trip_id, date, substance, dose, route, setting,
  duration_hours, intensity (1-10), body_load (1-10),
  comeup_texture, peak_texture, afterglow_texture
- **Weird Mode** — astral_plane, entity_hierarchy, geometry_type,
  temporal_anchor, color_signature, visual_frequency, color_harmonics

Site toggles Standard ↔ Weird, or overlays them.

## Art Derivation

Each processed trip auto-generates `glsl_ideas.md` + `ascii_ideas.md`.
These are explicitly idea-guides for Google AI Studio — conceptual prompts,
not final art to copy.
