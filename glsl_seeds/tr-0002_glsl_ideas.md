# tr-0002 — GLSL Idea Seeds
> The Unstuffing (shower scrub ritual — recurring pattern report). CONCEPTUAL GUIDES for
> Google AI Studio, not final art. Each seed names its governing law. This report has no
> fixed palette — it inherits the Codex five by default (`#00ffcc` `#ff2d78` `#ff6b00`
> `#b300ff` `#ffff00` on `#030308`) but water-logic may argue for a cooler subset.
> Water here is CLEANSING, vertical, one-way. No nautical motifs, no drowning, no vessels.

---

## Seed 01 — THE UNSTUFFING (title piece)
**Source:** "I want the dense matter off of me... scrubbing the dense matter off my soul — or acting like I am, if I could."
**Governing law:** the self sheds matter the way water sheds heat — continuously, invisibly, on contact.
**Mood:** devotional maintenance; pressure-washed grace.
**Geometry:** a luminous humanoid form (warm violet-white core) coated in a dull gray-brown
particulate crust — the stuff. Streams of water (thin teal streaks, top of frame) strike
the form and the crust SLoughs off in flakes and sheets, falling with the water toward
the bottom edge. Underneath, the form is brighter than the frame can comfortably hold.
The crust keeps trying to re-accumulate — the scrubbing is the loop, not the finish line.
**Palette:** crust in desaturated drab; revealed form in violet + white; water in thin teal.
**Temporal feel:** continuous rain; shedding in pulses that match scrub rhythm (2–3 Hz stroke cycle).
**Technical hint:** particle adhesion system — crust particles stick to an SDF body, shear off where a moving "scrub" mask (two ellipse zones, the hands) passes; gravity + flow advect them downscreen; slow re-accumulation via noise.

## Seed 02 — BACKGROUND PROCESS ("I want out")
**Source:** "It's not like I'm focusing on it heavily... that's the background thought process running behind everything."
**Governing law:** the loop is only visible when the foreground shuts up.
**Geometry:** a busy, pleasant foreground layer (bathroom tile grid, water sparkle,
steam drift — rendered in full Codex color, lots of small motion). Behind it, at 4%
opacity, the same three words — I WANT OUT — tiled in a huge, slow-scrolling lattice,
repeating to every edge of the frame. A periodic "quiet event" (foreground dims to 10%,
all motion damps) reveals the text layer at full contrast for two seconds. Then the world
resumes, and you can't un-know it's there.
**Palette:** foreground full color; the loop in flat gray-white — deliberately styleless, system-font energy.
**Temporal feel:** 30–45 seconds between quiet events; the reveal should feel accidental, like catching a process in Task Manager.
**Technical hint:** two composited layers with a global "attention" uniform; text = SDF font texture, translated slowly, revealed by 1 - foregroundGain.

## Seed 03 — THE BLOODY-PULP TEST (the inquiry)
**Source:** "It can't be my skin — if I took my skin off that would hurt... it's not my skin; it's the stuff."
**Governing law:** subtraction has to pass the harm test — the ritual must not injure what it's trying to free.
**Mood:** clinical discernment inside devotion; the knife that refuses.
**Geometry:** a split decision diagram rendered as living shader: LEFT — a form with its
surface peeled back, rendered in alarm-red wireframe, visibly WRONG (pain vectors, harsh
jitter, the frame itself flinches); RIGHT — the same form with a translucent gray
"stuff-shell" lifting away like steam off pavement, the form beneath untouched and calm.
The two panels breathe against each other; the wrong option slowly desaturates and
stops being rendered, while the right option loops gently, forever.
**Palette:** wrong path in alarm red (off-palette, used NOWHERE else in the corpus); right path in violet/teal calm.
**Temporal feel:** the red side decays over 20 seconds and never returns; the calm side settles into a breathing loop.
**Technical hint:** dual SDF renders with a "viability" uniform fading the red pass; pain = high-frequency vertex jitter on the red side only.

## Seed 04 — DRAIN VORTEX (one-way exit)
**Source:** the ritual's unspoken terminus — the removed stuff has to GO somewhere.
**Governing law:** removal is permanent; the drain does not return what it takes.
**Geometry:** bottom-of-frame vortex — a spiral sink of dark water pulling down every flake
of scrubbed-off stuff that falls. The vortex is beautiful in a dead way: perfectly ordered,
perfectly terminal. Nothing in the shader ever travels upward past the vortex line.
Occasionally a flake tries to swirl back up on an eddy — the vortex corrects it. No drama.
Just plumbing-as-cosmology.
**Palette:** vortex in near-black with violet rim-sheen; flakes in drab gray; the water sheet above in teal.
**Temporal feel:** slow, relentless spiral (~0.2 rev/s); the correction events are the only surprise.
**Technical hint:** polar-coordinate swirl with radial sink term (velocity ∝ 1/r toward center + down); one-way constraint enforced by clamping upward velocity to zero below the vortex line.

---

## Cross-seed constants
- Water = vertical, cleansing, one-way. It NEVER threatens. No depths-as-fear, no vessels, no sea.
- The ritual is maintenance, not emergency — nothing in this set should feel like crisis.
- Alarm red is RESERVED for the rejected wrong path (Seed 03) and appears nowhere else in the corpus.
- The scrub rhythm (2–3 Hz) is the heartbeat of the whole set; sync anything cyclical to it.
- If the Tetragrammaton association gets visualized later, it's a PRELUDE frame — the ritual shader itself stands alone.
