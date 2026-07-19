# Browser artwork

The browser layer is organized by responsibility:

- `pages/` contains complete, directly servable HTML entry points.
- `components/` contains page-independent visual components.
- `assets/` contains shared static resources such as fonts.

Keep essential content and navigation in semantic HTML. Canvas and WebGL
systems should remain decorative, progressively enhanced, and safe to disable.
