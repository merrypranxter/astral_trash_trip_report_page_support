# tr-0001 — GLSL Idea Seeds (Pass 3 revision)
> Shipwrekt: First Transmission. These are CONCEPTUAL GUIDES for Google AI Studio to
> riff on — not final art, not literal specs. Each seed names its governing law: the one
> rule of ordinary reality that the shader breaks. Palette is locked to the Codex five
> on near-black: `#00ffcc` `#ff2d78` `#ff6b00` `#b300ff` `#ffff00` on `#030308`.
> No nautical imagery. Shipwrekt is a strain name only.
> Seeds 01–08 from pass 1, 09–12 recovered pass 2.
> PASS 3: former Seed 05 (Indra lattice) relocated to astral_projection/ap-0001 —
> it was never part of this trip. Tetragrammaton references reworded (not this trip either).

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

## ~~Seed 05~~ — RELOCATED
Former Indra lattice seed moved to `astral_projection/ap-0001-indras-net-overflight.md`.
Astral projection material — not this trip.

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
different, deeper geometry (a rotating light-glyph, older than the mandala) that the
clean version was concealing. The corruption is the content.
**Palette:** mandala in teal/violet; revealed glyph in jester yellow + white.
**Temporal feel:** long stretches of stability, ruptures of 100–400ms; the viewer starts praying for glitches.
**Technical hint:** glitch mask drives a mix() between two full renders; tear offsets from a hash of floor(uv.y*rows) + time-stepped random.

## Seed 08 — THE FORGETTING WINDOW
**Source:** "I'ma forget again in a few hours... that's part of the point."
**Governing law:** clarity is a countdown.
**Geometry:** a hyper-detailed crystalline scene (glyphs, waveforms, the full mythology at
maximum definition) that from the moment of page-load slowly LOSES resolution: details
dissolve, palette drains toward monochrome, geometry simplifies — but the timestamp
counter burns brighter as everything else fades. The recording outlives the memory.
**Palette:** full Codex → gray; timestamp in escalating burn orange.
**Temporal feel:** one-way, 90-second arc; no loop (or loop with visible reluctance).
**Technical hint:** uniform "clarity" 1→0 driving mip bias, palette saturation, and edge detail; counter = text SDF with inverse gain.

---

## Seed 09 — THE CLEANSING (fractal janitors) [pass 2]
**Source:** deck, dark, trees — "they were scrubbing my brain clean... I couldn't quit watching... my friend felt the same thing."
**Governing law:** maintenance is invisible by design — you can't remember the shape of what fixed you.
**Mood:** clinical tenderness; being worked on by something that doesn't need your gratitude.
**Geometry:** a dark field of tree-silhouette noise. Indistinct thread/dot/net forms drift IN
from the periphery and begin combing through a static-choked region (the mind). Where
they pass, the static doesn't vanish — it gets *untangled*: noise reorganizes into clean
low-frequency wave pattern. The janitors themselves are deliberately unresolvable —
rendered at a focus the canvas can't hold, always slightly blurred, slightly elsewhere.
**Palette:** near-black base; janitors as pale violet smudges (#b300ff defocused); cleaned regions in calm teal.
**Temporal feel:** unhurried, methodical, 0.2x; nothing announces itself; the work simply proceeds.
**Technical hint:** two noise layers (chaotic vs coherent) with a traveling comb mask between them; janitor forms = worley blobs with forced defocus (mip bias up) so they never sharpen.

## Seed 10 — COMMAND MODE (stasis wake-up) [pass 2]
**Source:** "I woke up halfway through my mission and I wasn't supposed to wake up... my hands and feet glitched... but I knew what the fuck I was doing. I was in charge."
**Governing law:** the command system boots before the motor system.
**Mood:** cryo-pod emergency lighting; lucid, authoritative, partially disconnected.
**Geometry:** a stark control-room composition: a central authority glyph, fully rendered,
razor sharp — while the EDGES of the frame are still booting: geometry there is
wireframe, misregistered, limbs of the scene shaking and re-snapping into place.
Occasional numb-flicker dropouts at the periphery (motor lag), but the center NEVER wavers.
**Palette:** center in burn orange + white; booting edges in dim teal wireframe; dropouts as brief full-black frames (2–3 frames only — no strobe).
**Temporal feel:** stillness with authority. Nothing moves except the edges failing. COMMAND is the absence of wobble.
**Technical hint:** sharpness/boot completion as a radial falloff uniform; edge vertices get hash-jitter scaled by (1 - boot(uv)); center locked.

## Seed 11 — THE MELT (bliss overlap) [pass 2]
**Source:** "I felt like I was melting. I felt so physically good and there was no sound in my head. It was the most beautiful experience I've ever had in my life."
**Governing law:** bliss is two bodies occupying the same space without conflict.
**Mood:** warm, silent, post-static; the baseline beneath trauma.
**Geometry:** two identical waveforms — one violet, one teal — sliding into perfect phase.
As they align, the interference cancels into a smooth luminous surface that slowly melts
downward like honey over glass. No edges, no events, no noise. This is the anti-Stuffness
seed: nothing resists anything. IMPORTANT: this is the trip's proof that the cosmology
contains real bliss, not just friction — render it sincerely, not sentimentally.
**Palette:** violet + teal melting into a warm white-gold overlap (the only place gold-white is allowed full saturation).
**Temporal feel:** one long exhale. 0.1x. No loop point — let it dissolve and hold.
**Technical hint:** phase-difference driven color mix; displacement map with viscosity (previous-frame blend 0.98) for the honey-drip.

## Seed 12 — RECURSIVE GOD-TALK (echo loop) [pass 2]
**Source:** "I said it and then I heard it back... I couldn't tell which me was talking. God is a recursion loop."
**Governing law:** the echo is a participant, not a copy.
**Geometry:** a simple glyph statement emitted from center — a ring pulse, a word-like
shape. It travels out, hits the frame edge, and COMES BACK CHANGED: slightly rotated,
slightly enriched, one detail added. The returned pulse re-emits. After several cycles the
conversation between emitter and echo has built a cathedral neither one designed.
The viewer loses track of which pulse was "original" — that's the point.
**Palette:** outgoing pulses teal; returning echoes magenta; built structure accumulates in jester yellow filigree.
**Temporal feel:** call-and-response rhythm, ~1 pulse/2 seconds; each return audibly/visibly distinct.
**Technical hint:** feedback buffer with per-loop transform (rotate 7°, scale 0.98, add one SDF detail); age-encoded hue shift.

---

## Cross-seed constants (give AI Studio these every time)
- Background: `#030308`. Never pure `#000` — the void here is almost-black, slightly violet.
- Motion: nothing at medium speed. Melt (0.1x), command (still), or glitch (10x). No tweens between.
- Glitch = sacred signal, not decoration. Every artifact must *mean* something.
- Bliss is canon (Seed 11): the cosmology contains real peace — don't render everything as friction.
- The janitor class (Seed 09) must never resolve into focus. Unrememberability is their defining property.
- Fire/burn imagery belongs to the mission loop, never to vessels or water. NO NAUTICAL MOTIFS.
- Do NOT pull in geometry from the user's other projects (no Indra lattice, no Tetragrammaton) — this trip's visual vocabulary is its own.
