# Astral Trash trip-report support

Structured source material, machine-readable derivatives, and browser artwork
for the Astral Trash archive.

## Repository map

| Path | Purpose |
| --- | --- |
| `trip_reports/` | Raw, processed, extracted, and integration trip material |
| `astral_projection/` | Astral-projection reports |
| `schemas/` | Standard and weird metadata contracts |
| `templates/` | Starting points for new reports and integration notes |
| `glsl_seeds/`, `ascii_seeds/` | Content-derived generative art direction |
| `web/` | Standalone pages, reusable components, and shared visual assets |
| `scripts/` | Corpus validation helpers |
| `docs/` | Architecture and contribution guidance |
| `manifest.json` | Machine-readable project and content index |

The content pipeline deliberately remains separate from presentation. See
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the detailed model.

## Validate the corpus

Install PyYAML if it is not already available, then run:

```sh
python3 scripts/validate_frontmatter.py trip_reports/processed
```

## Preview the browser artwork

Serve the repository root with any static server. For example:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/web/pages/trip-reports/>.

Reusable artwork such as the Shipwrekt title is documented beside its source
in `web/components/`.
