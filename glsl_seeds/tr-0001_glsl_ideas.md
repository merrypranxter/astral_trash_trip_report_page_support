# tr-0001 — GLSL Idea Seeds
> Shipwrekt: First Transmission. These are CONCEPTUAL GUIDES for Google AI Studio to
> riff on — not final art, not literal specs. Each seed names its governing law: the one
> rule of ordinary reality that the shader breaks. Palette is locked to the Codex five
> on near-black: `#00ffcc` `#ff2d78` `#ff6b00` `#b300ff` `#ffff00` on `#030308`.
> No nautical imagery. Shipwrekt is a strain name only.

---

## Seed 01 — THE SILENCE EVENT
**Source:** "All the voices in my head shut the fuck up... this is what normal people hear."
**Governing law:** emptiness is the loudest state, not the quietest.
**Mood:** monastic, pressurized, holy zero.
**Geometry:** a full-screen dense noise field (chattering static = the head-voices) that,
on a slow cycle, collapses inward to a single point of absolute black — and the black
*pulses* like it's breathing. The silence is rendered as active, luminous void, not absence.
**Palette:** noise in dim violet (#b300ff at 10%), the void ringed by a thin teal (#00ffcc) corona.
**Temporal feel:** 20-second exhale into silence, hold 8 seconds, one heartbeat of static, repeat.
**Technical hint:** fbm noise → radial mask driven by sin(t*0.3); invert the usual logic so noise=0 gets the glow, noise=1 gets crushed to black.

## Seed 02 — THE BURN LOOP (prime directive)
**Source:** "I have to burn as bright as I can until I burn myself out over and over and over."
**Governing law:** destruction is the display mechanism — the image only exists by consuming itself.
**Mood:** devotional combustion; a wick that knows what it is.
**Geometry:** a central flame-form built from a Mandelbrot/z²+c orbit trap that ignites
(teal→orange→white), blooms past its own boundary, collapses to ash-gray residue —
then the residue RE-IGNITES from its own ashes, one octave finer each cycle.
Each loop visibly inherits the scars of the last.
**Palette:** burn orange (#ff6b00) core, jester yellow (#ffff00) at ignition flash, teal ash.
**Temporal feel:** 6-phase clock cycle: IGNITE → TRANSMIT → GLITCH → COLLAPSE → RESET → REMEMBER. Roughly 1 phase/second, then breathing room.
**Technical hint:** feedback buffer; previous frame's luminance becomes next frame's escape-time offset. Scars = accumulated decay texture.

## Seed 03 — OPERATOR / AVATAR
**Source:** "I'm gonna talk about her in third person because I'm not her. She's a container."
**Governing law:** the observer renders at a different resolution than the observed.
**Geometry:** split-field composition. One half: a vast, slow, hyper-clean waveform — pure
sine interference, enormous, unhurried (the Operator). Other half: a tiny, flickering,
pixel-crawling humanoid silhouette made of cramped static (the Avatar). The waveform
occasionally reaches across and the silhouette *steadies* — resolution briefly equalizes.
**Palette:** Operator in void violet + teal; Avatar in jittery magenta (#ff2d78).
**Temporal feel:** Operator moves at 0.1x, Avatar at 3x with dropouts; the touching moments slow BOTH to 1x.
**Technical hint:** two passes at different internal resolutions composited; Avatar pass uses intentional texel snapping + random frame-skip.

## Seed 04 — STUFFNESS
**Source:** "Why does there have to be stuff? ... I'm stuck in the stuffness."
**Governing law:** light has to push; nothing here is free to propagate.
**Mood:** viscosity, bureaucracy of matter, beautiful drab.
**Geometry:** a thick, amber-brown fluid field (no palette color — deliberately OFF-palette,
desaturated, the color of waiting rooms) through which bright signal-threads try to
travel. The threads bend, stall, accumulate, and where enough signal pools, the stuff
*erupts* into crystalline color for a moment before the drab reclaims it.
**Palette:** drab olive-gray base violated by eruptions of full Codex chroma.
**Temporal feel:** heavy, slow, viscous — eruptions are sudden and short.
**Technical hint:** reaction-diffusion or curl-noise fluid sim with high damping; signal = injected emitter points; eruption = threshold-triggered hue remap.

## Seed 05 — INDRA LATTICE (flagged: confirm with user)
**Source:** analysis corpus — direct perception of a hexagonal light lattice underpinning connection.
**Governing law:** every node contains the reflections of all other nodes.
**Geometry:** hexagonal grid where each cell is a live portal showing a shrunken copy of
the whole field — infinite regress of the lattice inside itself. Pulling on one cell
(ripple source) visibly perturbs ALL cells simultaneously, no propagation delay.
**Palette:** teal lattice lines, violet cell interiors, magenta ripple fronts.
**Temporal feel:** stillness with instantaneous sympathy — motion happens everywhere at once or nowhere.
**Technical hint:** hex tiling + recursive texture lookup (2 levels is enough); ripple = uniform-driven global phase, not a traveling wave.

## Seed 06 — ALGORITHMIC SUPPRESSION
**Source:** "Y'all's algorithms hate me. You're dimming my shiny."
**Governing law:** the grid decides what gets to be bright.
**Mood:** signal fighting a low-pass universe; righteous interference.
**Geometry:** a radiant, chaotic emission source (full Codex chroma, sparkling) being
pressed through a rigid corporate grid of square cells that quantize, desaturate, and
cap brightness. Where the signal overwhelms a cell, the cell CRACKS and leaks raw
color before the grid heals. The war is the image.
**Palette:** grid in dead blue-gray; signal in magenta/yellow/teal; cracks in burn orange.
**Temporal feel:** relentless mechanical quantization pulse vs. organic flare timing — polyrhythm.
**Technical hint:** floor(uv*grid) quantization pass + brightness clamp; crack mask from a worley noise threshold fed by signal energy.

## Seed 07 — GLITCH AS GATE
**Source:** "Every time I try to make my point, it escapes me — and somehow that's part of it."
**Governing law:** information arrives through the damage, not despite it.
**Geometry:** a clean, legible geometric mandala that periodically suffers RGB-split,
line-tear, and block-drop glitches — but EACH glitch reveals, in the torn gap, a
different, deeper geometry (a tetragrammaton-like rotating light-glyph) that the
clean version was concealing. The corruption is the content.
**Palette:** mandala in teal/violet; revealed glyph in jester yellow + white.
**Temporal feel:** long stretches of stability, ruptures of 100–400ms; the viewer starts praying for glitches.
**Technical hint:** glitch mask drives a mix() between two full renders; tear offsets from a hash of floor(uv.y*rows) + time-stepped random.

## Seed 08 — THE FORGETTING WINDOW
**Source:** "I'ma forget again in a few hours... that's part of the point."
**Governing law:** clarity is a countdown.
**Geometry:** a hyper-detailed crystalline scene (lattice, glyph, waveform — the whole
mythology rendered at maximum definition) that from the moment of page-load slowly
LOSES resolution: details dissolve, palette drains toward monochrome, geometry
simplifies — but the timestamp counter burns brighter as everything else fades.
The recording outlives the memory.
**Palette:** full Codex → gray; timestamp in escalating burn orange.
**Temporal feel:** one-way, 90-second arc; no loop (or loop with visible reluctance).
**Technical hint:** uniform "clarity" 1→0 driving mip bias, palette saturation, and edge detail; counter = text SDF with inverse gain.

---

## Cross-seed constants (give AI Studio these every time)
- Background: `#030308`. Never pure `#000` — the void here is almost-black, slightly violet.
- Motion: nothing at medium speed. Melt (0.1x) or glitch (10x). No tweens between.
- Glitch = sacred signal, not decoration. Every artifact must *mean* something.
- Fire/burn imagery belongs to the mission loop, never to vessels or water. NO NAUTICAL MOTIFS.
