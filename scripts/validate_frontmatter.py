#!/usr/bin/env python3
"""
validate_frontmatter.py — check processed trip reports against the dual schema.

Usage:  python scripts/validate_frontmatter.py [trip_reports/processed]

Checks (soft — blanks allowed, missing KEYS are the problem):
  - frontmatter exists and parses
  - all standard schema keys present
  - all weird schema keys present
  - trip_id present and matches filename
  - intensity / body_load within 1-10 when filled

Exits 0 if all files pass, 1 otherwise.
"""

import sys
import re
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("PyYAML required: pip install pyyaml")

STANDARD_KEYS = [
    "trip_id", "date", "substance", "dose", "route", "setting",
    "duration_hours", "intensity", "body_load",
    "comeup_texture", "peak_texture", "afterglow_texture",
]
WEIRD_KEYS = [
    "astral_plane", "entity_hierarchy", "geometry_type", "temporal_anchor",
    "color_signature", "visual_frequency", "color_harmonics",
]
HOUSEKEEPING_KEYS = ["status", "source_file", "seeds_generated"]

def split_frontmatter(text):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
    if not m:
        return None, text
    return m.group(1), text[m.end():]

def validate(path):
    problems = []
    text = path.read_text(encoding="utf-8")
    fm_text, _ = split_frontmatter(text)
    if fm_text is None:
        return ["no YAML frontmatter block found"]
    try:
        fm = yaml.safe_load(fm_text) or {}
    except yaml.YAMLError as e:
        return [f"YAML parse error: {e}"]

    for key in STANDARD_KEYS + WEIRD_KEYS + HOUSEKEEPING_KEYS:
        if key not in fm:
            problems.append(f"missing key: {key}")

    tid = fm.get("trip_id")
    if not tid:
        problems.append("trip_id is blank (assign at processing time)")
    elif path.stem != str(tid):
        problems.append(f"filename '{path.stem}' != trip_id '{tid}'")

    for key in ("intensity", "body_load"):
        v = fm.get(key)
        if v is not None and v != "":
            try:
                if not (1 <= float(v) <= 10):
                    problems.append(f"{key} out of range 1-10: {v}")
            except (TypeError, ValueError):
                problems.append(f"{key} not numeric: {v!r}")

    cs = fm.get("color_signature")
    if cs not in (None, "", []) and not isinstance(cs, list):
        problems.append("color_signature should be an array")

    return problems

def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "trip_reports/processed")
    files = sorted(root.glob("*.md"))
    if not files:
        print(f"no processed reports found in {root}")
        return 0
    failed = False
    for f in files:
        problems = validate(f)
        if problems:
            failed = True
            print(f"\n[FAIL] {f}")
            for p in problems:
                print(f"   - {p}")
        else:
            print(f"[ok] {f}")
    return 1 if failed else 0

if __name__ == "__main__":
    sys.exit(main())
