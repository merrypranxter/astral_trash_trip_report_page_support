# ARCHITECTURE

```
trip_reports/
  raw/           — original unedited notes (pasted as-is)
  processed/     — structured markdown, dual-schema YAML frontmatter
  extracted/     — CSVs / JSONs for machine ingestion
  integration/   — integration notes linked to specific trips
astral_projection/ — projection reports, separate from substance reports
glsl_seeds/      — shader inspiration derived from reports
ascii_seeds/     — ASCII art concepts derived from reports
schemas/         — standard_schema.yaml + weird_schema.yaml
templates/       — markdown templates for new trips + integration notes
web/
  pages/         — standalone browser entry points
  components/    — reusable visual Web Components
  assets/fonts/  — shared, deduplicated type assets
docs/            — this file, contribution guide
scripts/         — validation helpers
manifest.json    — master index for Google AI Studio
```

Content stays at the repository root so ingestion paths remain short and
stable. Browser-facing presentation is isolated under `web/` so visual code
and assets can evolve without being confused with the source corpus.

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

## Browser Layer

`web/pages/trip-reports/` is a directly servable page. Reusable artwork lives
under `web/components/`; page-independent assets belong in `web/assets/`.
Canvas and WebGL layers are progressive decoration over semantic HTML.
