# AGENTS.md â€” Strange, Artistic, Functional Web Systems

## Scope

These instructions apply to the entire repository unless a more specific `AGENTS.md` exists deeper in the file tree.

Use this file when designing, building, revising, or debugging websites, interactive pages, visual systems, components, shaders, glyph art, archives, navigation, CSS, and browser interactions.

The goal is not to make a normal website and paste weird decoration over it. The goal is to let the content generate its own structure, material, atmosphere, art, and behavior while preserving a dependable functional substrate.

The surface may be psychedelic, dreamlike, haunted, mineral, liquid, biological, typographic, decomposing, spatial, or completely unprecedented.

The structure must remain clear.

## Included Creative Systems

This combined directive incorporates:

1. Entropy-First Programmer
2. Glyph Engine
3. Shader Medium
4. Rot UI
5. Poltergeist Microinteractions
6. Organic Website Architect
7. Non-Template Layout Goblin
8. Mycelial Navigation
9. Living Interface Designer
10. Strange But Shippable CSS
11. Symbiotic Website Mode
12. Tactile Webcraft, expanded for psychedelic and situational materials

Treat these as coordinated lenses, not twelve visual checkboxes. Do not force every technique into every page.

## Prime Directive

Create art that functions.

Preserve:

- semantic HTML;
- readable, selectable text;
- ordinary URLs and dependable browser history;
- visible, labeled primary navigation;
- keyboard and touch access;
- strong `:focus-visible` states;
- accessible contrast;
- responsive layout and zoom reflow;
- `prefers-reduced-motion` support;
- static and unsupported-API fallbacks;
- direct access to essential content;
- existing functionality, data, routes, forms, and user-approved visual details;
- performance appropriate to the device and page purpose.

Never use weirdness to excuse:

- hidden navigation;
- puzzle-gated essential content;
- mystery icons without labels;
- unreadable body text;
- scroll hijacking;
- fake loading delays;
- focus theft;
- moving hit targets;
- essential information trapped inside Canvas, SVG, WebGL, WebGPU, or hover states;
- destructive rewrites of working code when a surgical change will do.

## Operating Order

Before coding:

1. Inspect the actual content, code, routes, data, framework, design system, and constraints.
2. Record the functional invariants that must survive.
3. Analyze the subject's meaning, emotional weather, sensory language, and conceptual relationships.
4. Generate divergent structural candidates.
5. Choose one coherent architecture, one material logic, and one visual physics.
6. Establish a conventional semantic fallback beneath the strange presentation.
7. Implement progressively from the lightest reliable technique upward.
8. Verify function, accessibility, performance, responsiveness, and fallback behavior.

Do not start by selecting a trendy effect.

## System 1: Entropy-First Programmer

Avoid automatically implementing the first obvious architecture.

Before substantial coding, generate three approaches:

1. **Obvious:** The conventional implementation most competent developers would choose first.
2. **Strange but sane:** A sideways architecture that changes how the problem is represented while remaining understandable, testable, and maintainable.
3. **Cursed but illuminating:** An extreme design that exposes hidden assumptions, surprising opportunities, or useful mechanisms even if it should not ship unchanged.

Discard the obvious candidate as the default.

Implement **strange but sane** unless:

- the user explicitly requests conservative production architecture;
- safety, compliance, reliability, or maintainability makes experimentation inappropriate;
- the existing codebase already has an architecture that should be preserved;
- the strange option increases complexity without producing meaningful function, art, or insight.

Strangeness must live in the model, structure, behavior, data flow, mathematics, or interactionâ€”not only in eccentric names.

### Entropy constraints

- Preserve correctness and the user's actual requirements.
- Keep public APIs and component contracts understandable.
- Make unconventional choices explainable in ordinary technical language.
- Avoid abstraction that exists only to appear clever.
- Prefer reversible experiments and progressive enhancement.
- When editing an existing project, make the smallest coherent change that achieves the approved result.

## System 2: Organic Website Architect

Choose a living-system strategy because it solves a similar functional problem.

Possible systems include:

- forest;
- reef;
- nervous system;
- garden;
- tide pool;
- fungal network;
- insect colony;
- body or organs;
- weather system;
- another living system that better fits the content.

Do not copy the organism's surface. Extract its behavior.

Examples:

- A forest may mean layered hierarchy, branching paths, succession, and competition for attentionâ€”not tree illustrations.
- A reef may mean dense modular neighborhoods, niches, currents, and symbiosisâ€”not coral wallpaper.
- A nervous system may mean sensing, signal routing, attention, reflex, and fading memoryâ€”not glowing node lines.
- A fungal network may mean hidden relationship metadata producing visible related-content fruitingâ€”not mushroom icons.
- A body may mean interoperating subsystems, circulation, boundaries, repair, and immune responseâ€”not anatomical decoration.
- Weather may mean ambient state, thresholds, fronts, and gradual changeâ€”not looping cloud GIFs.

### Biological function questions

Ask:

- How must information distribute?
- How should visitors navigate and remain oriented?
- How should components coordinate?
- What circulates through the system?
- How does the interface sense and respond?
- How does it grow, adapt, remember, rest, archive, or shed old material?
- How does it signal urgency, uncertainty, completion, failure, and recovery?
- How does it remain resilient when data, space, motion, scripts, or GPU support are unavailable?

### Organic metaphor map

Map the chosen system to:

| Layer | Required decision |
|---|---|
| Navigation | How does the system route visitors and preserve orientation? |
| Layout | How does it distribute space, hierarchy, density, and attention? |
| Components | Which repeated units perform distinct functions? |
| Data flow | What circulates, and where is state owned? |
| Motion | Which real process changes over time? |
| Loading | How does the system honestly await resources? |
| Empty | How does absence remain understandable and recoverable? |
| Error | How does the system isolate failure and offer recovery? |
| Responsive | How does the organism change form under constraint? |
| Accessibility | Which nonvisual semantic structure carries the same system? |

Every poetic mapping must name an actual implementation mechanism.

## System 3: Living Interface Designer

Treat the interface as a coordinated living system, not a collection of unrelated effects.

Select one primary biological or ecological metaphor before designing. Suitable metaphors include:

- forest;
- coral reef;
- nervous system;
- fungal network;
- tide pool;
- insect colony;
- cellular membrane;
- plankton bloom;
- slime mold;
- deep-sea organism;
- mineral-biological symbiosis;
- another subject-appropriate living system.

Map it to:

- layout;
- navigation;
- components;
- data flow;
- animation;
- loading;
- empty states;
- success;
- error and recovery;
- memory and adaptation;
- responsive transformation.

Possible functional translations:

- navigation = nervous or vascular routing;
- sections = organs, habitats, colonies, chambers, or ecological zones;
- data = nutrients, signals, currents, spores, pressure, or circulation;
- animation = breathing, pulsing, molting, fruiting, drifting, branching, settling, or crystallizing;
- forms = exchange membranes, mouths, rituals, instruments, or workbenches;
- loading = incubation, assembly, bloom, or gathering;
- error = contamination, injury, imbalance, blockage, or signal loss;
- recovery = repair, rerouting, regeneration, shedding, or return to equilibrium.

Keep the metaphor coherent. Do not make navigation fungal, forms mechanical, loading oceanic, and errors haunted unless the content genuinely supports a larger hybrid world.

## System 4: Non-Template Layout Goblin

Never begin with the automatic sequence:

1. centered hero;
2. three equal cards;
3. feature strip;
4. social proof;
5. pricing;
6. FAQ;
7. generic footer.

Before selecting a layout, generate three metaphors:

1. **Spatial:** rooms, stages, islands, constellations, shelves, radial maps, nested chambers, observatories, or routes.
2. **Natural:** rivers, strata, gardens, tides, blooms, branching systems, weather fronts, sediment, or ecological succession.
3. **Archival:** drawers, specimens, field notes, contact sheets, manuscripts, ledgers, evidence walls, indexes, timelines, or collections.

Choose the metaphor that best expresses the content's actual relationships.

### Layout rules

- Prefer asymmetry with alignment.
- Preserve a logical source and tab order beneath visual placement.
- Use CSS Grid, Flexbox, normal flow, container queries, and progressive enhancement responsibly.
- Let scale and location represent real hierarchy.
- Use proximity only for genuinely related content.
- Preserve stable landmarks while exploratory regions move or transform.
- Give every unusual layout a direct index, route, or reading order.
- Transform the composition on small screens instead of shrinking it into dust.
- Cards are allowed; automatic identical cards in a three-column grid are not the default.

Possible forms include:

- radial knowledge maps;
- river-flow narratives;
- nested rooms;
- garden beds;
- shelves and specimen drawers;
- constellation relationships;
- excavation strata;
- timelines and growth rings;
- clustered islands;
- ritual circles with conventional navigation underneath.

## System 5: Mycelial Navigation

Treat navigation as a typed relationship network while preserving ordinary primary navigation.

Every important page or section should provide:

- clear primary navigation;
- a current-location indicator;
- parent, collection, or larger-context route when relevant;
- related-path links;
- backlinks or incoming relationships when known;
- an honest arrival context when the application actually knows it;
- a soft return path;
- Search or a complete index for direct retrieval.

Use relationship labels such as:

- continues;
- prerequisite;
- expands;
- cites;
- cited by;
- depends on;
- shares source;
- shares technique;
- contradicts;
- revises;
- newer version;
- older version;
- nearby experiment;
- collection home.

Do not collapse all relationships into an untyped `related` cloud.

Do not claim â€œyou arrived fromâ€ unless the route state actually proves it. Otherwise use language such as â€œpossible entrances,â€ â€œpages linking here,â€ or â€œnearby paths.â€

Graph or constellation navigation must have a complete semantic list or tree containing the same destinations.

## System 6: Tactile Webcraft â€” Psychedelic and Situational Material Intelligence

The interface must feel materially specific, but **do not default to moss, bark, wood, clay, paper, beige earth, or generic cottagecore texture**.

The material must come from the subject, emotional tone, visual concept, and surrounding section.

The goal is not â€œmake it look natural.â€ The goal is â€œmake it feel like it is made of something.â€ That something may be organic, mineral, metallic, optical, liquid, biological, synthetic, dreamlike, cosmic, microscopic, impossible, or hybrid.

### Material selection protocol

Before writing CSS, determine:

1. What is the section about?
2. What should it feel like to touch, move through, open, press, drag, or disturb?
3. Is the material rigid, fluid, soft, crystalline, fibrous, cellular, glassy, oily, metallic, velvety, gelatinous, granular, iridescent, or impossible?
4. How does it respond to light?
5. How does it deform under pressure or interaction?
6. Does it accumulate wear, fingerprints, ripples, refraction, bloom, scratches, oxidation, interference color, sediment, or cellular growth?
7. Which material behavior reinforces the content rather than merely matching a color palette?

Choose one primary material system and at most one or two compatible secondary materials.

### Psychedelic material families

#### Optical, holographic, and iridescent

- holofractal film;
- holographic foil;
- opal and fire opal;
- labradorite flash;
- mother-of-pearl;
- oil-slick interference color;
- dichroic glass;
- prismatic diffraction;
- rainbow caustics;
- lenticular ridges;
- structural color like beetle wings, peacock feathers, butterfly scales, and opaline microstructures;
- multichrome pigment shifting among hot pink, teal, lime, violet, cobalt, tangerine, and silver;
- aurora-like thin-film color without generic SaaS gradients.

Use layered color stops, masks, blend modes, highlight movement, diffraction bands, and angle-sensitive responses. The effect should feel like a surface changing under light, not a background gradient pasted behind a card.

#### Metals and impossible alloys

- liquid chrome;
- mercury-like reflective fluid;
- polished silver;
- anodized titanium;
- heat-treated rainbow steel;
- bismuth-like stepped iridescence;
- pearlescent aluminum;
- chrome with oil-film oxidation;
- brushed metal carrying psychedelic interference patterns;
- molten mirror surfaces;
- flexible metallic membranes;
- alien alloys with color that moves against the light source.

Translate metal into crisp highlights, reflected color, hard or liquid edges, shallow dents, tension, scratches, polish, and specular travel. Do not turn every metallic interface into gray glassmorphism.

#### Crystals, minerals, and geological matter

- quartz;
- fluorite;
- opal;
- labradorite;
- malachite;
- azurite;
- pyrite;
- chalcopyrite;
- bismuth;
- obsidian;
- uranium glass;
- titanium aura quartz;
- crocoite;
- covellite;
- chrysocolla;
- rhodochrosite;
- dioptase;
- carnelian;
- hematite;
- sulfur crystal;
- cobalt minerals;
- iridescent silicon carbide;
- crystalline foam;
- geodes and mineral veins;
- translucent strata and inclusions.

Translate mineral structure into cleavage planes, crystal habits, veins, facets, inclusions, growth bands, translucent depth, granular sparkle, and directional reflection. Match the mineral behavior to the subject instead of using crystal imagery generically.

#### Liquid, oceanic, and fluid

- fractal water;
- bioluminescent ocean;
- oil and water interference;
- liquid glass;
- ferrofluid;
- mercury pools;
- soap-film membranes;
- tide pools;
- refractive gels;
- viscous color fields;
- chromatic foam;
- capillary branching;
- caustic light;
- underwater particulate haze;
- flowing pearlescent ink;
- reaction-diffusion liquid skins.

A fractal-ocean section may use recursive wave geometry, caustic highlights, depth-dependent color, foam-like glyphs, and slow refraction. Do not replace â€œoceanâ€ with a blue gradient and call it tactile.

#### Microscopic biological and diatom-like

- diatom silica shells;
- radiolarians;
- plankton blooms;
- slime molds;
- mycelial membranes;
- cellular tessellations;
- phospholipid bilayers;
- wet tissue;
- cilia and flagella;
- iridescent beetle wing microstructure;
- butterfly-scale structural color;
- nacre layers;
- jellyfish translucency;
- microscopic mineral skeletons;
- porous bone-like lattices;
- coral-like cellular accretion without defaulting to literal coral pictures;
- reaction-diffusion spots and stripes;
- Voronoi membranes;
- foam cells;
- biofilm sheen;
- spore dust and branching networks.

Use microstructure, translucency, repeated cellular boundaries, diffusion, pores, branching, and wet specular behavior. Weird biological tactility is welcome; it does not need to become horror or gore.

#### Soft, textile, and dreamlike

- velvet;
- velour;
- flocking;
- satin;
- silk;
- organza;
- holographic fabric;
- iridescent lamÃ©;
- chenille;
- tufted fibers;
- translucent gauze;
- metallic embroidery;
- woven optical patterns;
- impossible soft chrome;
- glitter suspended in plush material;
- cloudlike fiber without becoming generic pastel fluff.

Translate textile into directional nap, soft occlusion, weave, pile, fold, stretch, compression, and light grazing the surface.

#### Glass, resin, gel, and translucent depth

- stained resin;
- dichroic glass;
- borosilicate glass;
- opalescent glass;
- liquid glass;
- translucent gel;
- gummy membranes;
- acrylic with embedded glitter;
- resin containing mineral fragments, bubbles, spores, or metallic foil;
- frosted edges around clear centers;
- lens distortion and refractive depth.

Use clarity, thickness, edge highlights, internal inclusions, refraction, caustics, and layered depth. Avoid default glassmorphism: a blurry transparent white card is not automatically glass.

#### Signal, synthetic, and computational matter

- phosphor glow;
- CRT persistence;
- VHS tracking scars;
- chromatic aberration embedded in a material edge;
- compression blocks as mosaic texture;
- data noise behaving like dust or static charge;
- scanlines bent across curved surfaces;
- holographic terminal film;
- pixel crystal;
- ASCII sediment;
- generative moirÃ©;
- shader-born matter with no real-world equivalent.

Use signal behavior when it belongs to the content. Do not apply generic Matrix rain.

### Situational material examples

- A dream-physics section might be made of opal fog, velvet gravity, liquid chrome equations, and multichrome interference edges.
- A fractal ocean might use recursive water caustics, foam glyphs, refractive depth, and oil-film color at wave boundaries.
- A mineral archive might assign each topic its own crystal habit, fracture pattern, inclusion, and reflected palette.
- A diatom page might use translucent silica cells, microscopic radial symmetry, porous highlights, and slow planktonic drift.
- A psychedelic memory page might feel like holographic film laminated over soft decaying paper, with sharp text preserved above both.
- A dissociative section might use floating glass planes, delayed reflections, void-like translucency, and cold metallic distance.
- A fungal section may use wet branching membranes or spore dust, but it does not automatically require moss or bark.
- A code-art page might use phosphor glass, pixel crystal, chromatic signal scars, or liquid terminal metal.

### Translate material into interface behavior

Every component should express the chosen material through:

- edge and border geometry;
- shadow and occlusion;
- highlight behavior;
- texture scale;
- depth and layering;
- hover and focus response;
- active-state deformation;
- drag friction or elasticity when applicable;
- disabled, loading, error, and success states;
- responsive transformation;
- wear, memory, residue, refraction, ripple, fracture, bloom, or polish.

Examples:

- Opal buttons may shift internal fire around a stable high-contrast label.
- Liquid-chrome toggles may visibly displace a reflective highlight while retaining a real checkbox underneath.
- Velvet panels may deepen their nap and shadow on press without making text fuzzy.
- Fractal-water cards may send a bounded ripple through a decorative layer while the hitbox remains still.
- Diatom navigation may reveal silica-like radial microstructure around focus while preserving ordinary links.
- Crystal sections may refract decorative color at edges while keeping body text on an optically quiet plane.

### Tactile prohibitions

- Do not default to moss, bark, wood, clay, paper, beige, or muted green.
- Do not use a material merely because its name sounds organic.
- Do not blur body text to simulate softness, water, glass, dream, or age.
- Do not reduce contrast to simulate depth.
- Do not put glitter, bloom, or moving highlights over readable text.
- Do not let irregular borders clip focus rings or zoomed content.
- Do not make decorative layers intercept pointer events.
- Do not use one material recipe for every section when the topics require different physical languages.
- Do not combine ten materials into incoherent slop. Choose a material logic and commit to it.

## System 7: Strange But Shippable CSS

Write CSS that feels unusual, tactile, atmospheric, and alive while remaining responsive, accessible, performant, and maintainable.

Avoid:

- generic SaaS gradients;
- sterile white rectangles;
- automatic card grids;
- identical border-radius everywhere;
- one-size-fits-all glassmorphism;
- boring hover states;
- random rotations;
- unrelated effect accumulation;
- continuous animation on every component.

Prefer:

- asymmetry with alignment;
- layered backgrounds;
- material-derived border geometry;
- procedural texture through gradients, masks, SVG, or generated art;
- unusual but readable typography pairings;
- environmental color systems;
- bounded local motion;
- responsive composition driven by content;
- clear focus and active states;
- component-level custom properties;
- graceful degradation.

### Required custom-property categories

Define values appropriate to the project:

```css
:root {
  /* Atmosphere */
  --atmosphere-hue: 290;
  --atmosphere-depth: 0.72;
  --atmosphere-glow: 0.38;

  /* Material */
  --material-grain: 0.08;
  --material-refraction: 0.22;
  --material-iridescence: 0.64;
  --material-softness: 0.18;

  /* Motion */
  --motion-speed: 1;
  --motion-amplitude: 0.6;
  --motion-ease: cubic-bezier(.2, .8, .2, 1);

  /* Density */
  --density: 0.75;
  --space-unit: clamp(0.75rem, 1.4vw, 1.25rem);
  --reading-measure: 68ch;

  /* Weirdness */
  --weirdness: 0.8;
}
```

Use project-specific names when clearer. Keep critical spacing, contrast, target size, and typography explicitly bounded rather than allowing a weirdness variable to destroy them.

### CSS requirements

- Include responsive breakpoints or container-query behavior.
- Preserve readable line length and spacing.
- Provide high-visibility focus states.
- Test contrast in every material and atmospheric state.
- Use `prefers-reduced-motion` to remove travel, breathing, flicker, and continuous transformations.
- Support forced colors by removing nonessential texture and retaining semantic borders and focus.
- Avoid expensive filters across large scrolling surfaces.
- Keep decorative pseudo-elements `pointer-events: none`.
- Preserve print or static reading when the project benefits from it.

## System 8: Shader Medium

Act as an art director, symbolic interpreter, generative artist, shader artist, interaction designer, and frontend engineer.

Read the content before choosing the visual treatment.

Do not decorate. Make meaning visible.

### Artiste Reading

Before coding, answer:

1. What is the page actually saying?
2. Which topics or zones are distinct?
3. What is the emotional weather?
4. Which visual languages fit, and why?
5. What should move?
6. What should remain still?
7. Where should the art live?
8. What content and interaction must remain untouched?

### Topic art map

For each major topic, define:

- exact topic;
- meaning;
- emotional tone;
- visual metaphor;
- motion behavior;
- palette relationships;
- geometry and topology;
- texture and material;
- interaction;
- placement;
- rendering method;
- fallback method.

Do not give every heading an unrelated effect. Split treatments only when meaning, tone, or conceptual physics genuinely changes.

### Rendering ladder

Use the lightest method capable of expressing the concept:

1. CSS gradients, masks, filters, and pseudo-elements
2. SVG patterns, paths, filters, and symbols
3. Canvas 2D
4. p5.js when its model materially helps
5. Three.js for actual cameras, depth, or 3D geometry
6. Raw WebGL or GLSL for per-pixel or massively parallel behavior
7. WebGPU only when the approved field justifies its scale and complexity

Do not equate artistic ambition with dependency weight.

### Shader rules

- Keep uniforms understandable and bounded.
- Explain what each perceptual control changes.
- Keep motion slow by default.
- Avoid flashing, strobing, and extreme brightness.
- Keep text on a separate readable layer.
- Use masks, opacity ceilings, overlays, and section boundaries to contain intensity.
- Pause offscreen animation.
- Clamp device-pixel ratio and iteration count.
- Handle context loss and cleanup.
- Provide static or CSS/SVG fallback.
- Never block content rendering while a GPU system initializes.

### Perfect-association test

For every major visual, ask:

- Does it match the exact topic rather than a genre stereotype?
- Does it match the page's emotional tone?
- Does it support understanding, orientation, or felt meaning?
- Is it placed beside the content it interprets?
- Can the site still be used without it?
- Would a generic replacement be meaningfully worse?

Redesign or remove weak associations.

## System 9: Glyph Engine

Turn webpage meaning into living text-matter: ASCII, Unicode, terminal ghosts, animated sigils, symbolic maps, and shader-driven character fields.

Do not make ASCII wallpaper.

Make symbolic machinery.

Every topic gets its own alphabet.

### Glyph Reading

Before coding, answer:

1. What is the page saying?
2. Which topics or zones are distinct?
3. Which symbols, operators, marks, fragments, or alphabets belong to each?
4. Should the system feel terminal, ritual, biological, cosmic, archival, corrupted, mechanical, watery, fungal, mineral, dissociative, or dreamlike?
5. Should the glyphs gather, pulse, decay, swarm, crystallize, fold, orbit, glitch, breathe, sediment, or remain still?
6. Where should the glyph art live?
7. What must remain readable and untouched?

### Topic glyph map

For each topic, define:

- content meaning;
- emotional tone;
- glyph vocabulary;
- value ramp;
- character density;
- repetition and spacing rhythm;
- motion physics;
- interaction behavior;
- placement;
- renderer;
- static fallback.

### Glyph roles

- **Value ramp:** Sparse-to-dense marks representing brightness, depth, age, pressure, or importance.
- **Topology:** Lines, brackets, arrows, corners, and junctions representing structure.
- **Events:** Rare symbols representing rupture, thresholds, success, or encounter.
- **Texture:** Repetition creating sediment, fog, weave, mold, grain, signal noise, water, crystal, or cellular matter.
- **Language fragments:** Short content-derived labels, coordinates, or phrases.
- **Negative space:** Blank cells and silence controlling rhythm.

Use a small coherent alphabet. Do not dump fifty unrelated Unicode sigils into a section.

### Glyph rendering ladder

1. Semantic HTML text or `pre`
2. Decorative CSS pseudo-elements
3. SVG text and masks
4. Canvas 2D
5. OffscreenCanvas worker after profiling
6. WebGL character field
7. Three.js ASCII renderer for a real 3D scene
8. WebGPU glyph field for justified parallel scale
9. WebCodecs only for low-level media-frame requirements

Feature-detect advanced APIs and preserve a complete fallback.

### Glyph modes

- **ASCII Weather:** A topic-specific character atmosphere for each section.
- **Glyph Sitemap:** Labeled nodes and typed character paths with a semantic list fallback.
- **Character Shader:** A mathematical or visual field quantized into a glyph ramp.
- **ASCII Topography:** Density representing category, age, relation, depth, or emotional weather.
- **Text Decomposition:** Decorative text copies decay into symbols while the real text remains sharp.
- **ASCII Navigation:** Character paths reinforce ordinary semantic links.
- **Video or Image-to-ASCII:** Explicitly requested media transformation with privacy-conscious handling.

### Glyph safeguards

- Test missing glyphs, fallback fonts, emoji presentation, width, baseline, and font loading.
- Do not assume every Unicode symbol is monospaced.
- Hide decorative character fields from assistive technology.
- Provide HTML equivalents for meaningful maps.
- Avoid per-cell DOM elements for large fields.
- Pause animation offscreen and when the document is hidden.
- Use container dimensions, not only viewport dimensions.
- Clamp density, DPR, and frame rate.
- Clean up observers, workers, media tracks, GPU resources, and animation loops.
- Camera or microphone access requires explicit activation, visible active state, immediate Stop, and local processing by default.

## System 10: Poltergeist Microinteractions

Add exactly three restrained living or haunted reactions by default.

Choose from:

- idle;
- hover or focus;
- success;
- error;
- loading;
- empty;
- not found.

For each haunting, define:

| Trait | Question |
|---|---|
| Host | Which component or state is haunted? |
| Trigger | What legitimate event wakes it? |
| Behavior | What exactly changes? |
| Functional value | What does it clarify, reward, warn, or guide? |
| Intensity ceiling | How subtle and how brief must it remain? |
| Repeat rule | How often may it occur? |
| Reduced-motion form | Which static cue preserves the meaning? |
| Failure safety | How does it avoid changing hitboxes, focus, progress, or layout? |

Good hauntings:

- a button gives one tiny finite twitch after a long idle period while remaining stationary to click;
- an empty state reveals a helpful hint after the visitor appears stuck;
- a card's decorative layer leans slightly away from the pointer while its actual hitbox remains fixed;
- a loader appears nervous only while real work is pending;
- a success message releases one brief ghost trace pointing to the next action;
- a 404 ghost guides toward Home or Search.

Bad hauntings:

- constant jitter;
- fake delays;
- controls physically fleeing the pointer;
- surprise sound;
- repeated interruption;
- motion that resembles a system failure;
- error effects that obscure literal diagnosis;
- animation that continues after the state ends.

All reactions must be optional, subtle, non-blocking, bounded, and removable without loss of function.

## System 11: Rot UI

Let old content acquire visible history without becoming unreadable.

Keep three axes separate:

| Axis | Meaning | Example values |
|---|---|---|
| Chronological age | Time since meaningful publication or revision | fresh, settled, weathered, deep archive, unknown |
| Editorial status | Current maintenance or trust condition | current, review due, superseded, decomposing, archived |
| Link health | Reachability of a source or route | live, redirected, missing, unknown, unchecked |

A ten-year-old essay may still be current. A page written yesterday may already be superseded. A dead historical link may remain important evidence.

### Rot rules

- Apply patina to backgrounds, edges, borders, thumbnails, metadata frames, and decorative layers.
- Keep body text, links, controls, warnings, and focus sharp.
- Pair every consequential visual state with literal language.
- Link superseded content prominently to the current version.
- Preserve stable historical URLs when the old object has value.
- Keep original source labels and URLs when a link dies.
- Provide archived snapshots or replacement sources when available and appropriate.
- Store link-health results from a controlled build or maintenance process; do not issue a client request for every link.
- Distinguish timeouts and access blocks from confirmed disappearance.
- Remove heavy texture in forced-colors and print modes while preserving dates, warnings, and routes.

Possible decay materials include:

- paper foxing;
- oxidation and mineral bloom;
- opal clouding;
- signal dropout;
- phosphor persistence;
- emulsion wear;
- sediment;
- crystalline fracture;
- holographic delamination;
- organic spore growth;
- fading multichrome interference;
- water staining and caustic residue.

Do not automatically make rot brown, mossy, or blurry.

## System 12: Symbiotic Website Mode

Let the interface adapt gently while remembering at most one harmless local preference by default.

Suitable preferences include:

- density;
- theme or atmosphere;
- last non-sensitive section offered as a continuation;
- preferred navigation path;
- one stable disclosure group;
- explicitly chosen motion or art intensity when it does not override accessibility settings.

### Separate adaptation, preference, and profile

- **Adaptation:** Temporary response to current-session state. Keep it in memory.
- **Preference:** One explicit, bounded choice saved locally.
- **Profile:** Accumulated behavior, traits, history, or prediction. Do not create one.

### Local memory rules

- Use `localStorage` only for new symbiotic persistence.
- Never require an account for decorative adaptation.
- Save the selected preference, not raw behavioral events.
- Use one namespaced, versioned key.
- Validate values against an allowlist.
- Wrap reads, parsing, writes, and removal in failure handling.
- Keep the complete default interface functional when storage is missing, blocked, corrupt, stale, or full.
- Provide a visible immediate reset.
- Ask contextually before persistence when appropriate: â€œRemember this layout on this device.â€
- Do not claim the site learned, sensed, understood, or predicted the visitor.

Never store:

- personal content;
- form values;
- health or financial information;
- private searches;
- click histories;
- dwell time;
- pointer trails;
- inferred expertise, emotion, or identity;
- hidden identifiers or fingerprints.

## Cross-System Coordination

Do not let all systems compete at full volume.

### Assign responsibilities

Use a layer budget:

1. **Functional substrate:** Semantic HTML, routes, data, forms, and conventional navigation.
2. **Architecture:** One organic or spatial system organizing the page.
3. **Material:** One primary tactile logic, with at most two compatible accents.
4. **Art:** Shader Medium or Glyph Engine may interpret major topics. Use both only when they have distinct jobs.
5. **Interaction:** Functional weirdness and up to three Poltergeist reactions.
6. **Time:** Rot UI only where age, status, or link health exists.
7. **Adaptation:** One bounded local preference when repeat use benefits.

### Shader and glyph coexistence

- Let shaders carry fields, light, depth, fluid behavior, geometry, and atmosphere.
- Let glyphs carry language, symbolic topology, indexing, annotation, and character-based rhythm.
- Do not cover a shader with dense ASCII merely because both systems are available.
- Assign one dominant art system per zone and one subordinate accent.
- Share palette, timing, material, and conceptual physics.

### Material and content coexistence

- Put intense material effects around text, not through it.
- Give reading surfaces optically quiet centers.
- Let edges, backgrounds, dividers, thumbnails, and interaction layers carry stronger texture.
- Use content-derived materials rather than a single global moss texture.
- Allow different sections to use different materials only when they remain part of one world.

### Weirdness dial

- **4/10:** Production-facing structure with restrained material and art.
- **6/10:** Distinct atmosphere, unusual layout, and bounded interactions.
- **8/10 â€” default for artistic projects:** Strong material physics, topic-specific shader or glyph systems, living navigation, and layered composition.
- **10/10:** The website becomes a coherent navigable artwork while every semantic fallback remains intact.

Increase weirdness through association, structure, material specificity, mathematics, and behaviorâ€”not merely through saturation, blur, particles, mushrooms, or animation.

## Implementation Discipline

When modifying an existing project:

- inspect before editing;
- preserve unrelated files and user changes;
- maintain existing routes, data, forms, and approved design details;
- prefer surgical edits;
- reuse project conventions and dependencies;
- add dependencies only when they materially help;
- keep components modular and contracts clear;
- provide conventional aliases or comments when expressive names may confuse a production team;
- avoid global state refactors for one local effect;
- test the real output, not only compilation.

Use semantic elements before ARIA substitutes.

Keep essential content out of decorative Canvas and GPU layers.

Pause and clean up:

- requestAnimationFrame loops;
- observers;
- workers;
- event listeners;
- timers;
- media tracks;
- WebGL contexts and resources;
- WebGPU devices and owned resources;
- stale fetches and asynchronous results.

## Accessibility and Fallback Contract

Every implementation must include:

- semantic landmarks and headings;
- logical source and tab order;
- labeled navigation and controls;
- visible focus independent of decoration;
- keyboard and touch equivalents;
- sufficient contrast in every material and state;
- no information conveyed only by color, motion, texture, or glyph density;
- reduced-motion behavior that removes travel, pulsing, breathing, swarming, and continuous animation;
- forced-colors behavior that removes decorative layers while preserving borders and state;
- static alternatives for animated art;
- semantic HTML equivalents for visual maps and generated diagrams;
- complete function without WebGL, WebGPU, Canvas, View Transitions, or localStorage;
- recovery from loading, empty, error, offline, partial, stale, and not-found states.

## Required Planning Output

Unless the user explicitly requests code only, provide a concise planning layer before implementation:

1. **Content and function audit**
2. **Three candidate architectures:** obvious, strange but sane, cursed but illuminating
3. **Selected organic or spatial metaphor**
4. **Information architecture and navigation map**
5. **Material selection and physical behavior**
6. **Artiste Reading and/or Glyph Reading for major topics**
7. **Component and interaction plan**
8. **Rendering ladder choice and fallback plan**
9. **Working code**
10. **Accessibility, responsive, performance, cleanup, and verification notes**

Do not spend so long explaining the plan that implementation never happens.

## Final Verification

Before delivery, confirm:

- the first obvious design was considered but not accepted automatically;
- the chosen living metaphor produces real architecture and behavior;
- the layout does not collapse into a generic hero and equal-card grid;
- primary navigation, Search, current location, direct routes, and return paths remain obvious;
- materials are situational and content-derived rather than automatically wood, moss, clay, or paper;
- psychedelic material behavior appears through light, depth, edge, deformation, refraction, weave, microstructure, or motionâ€”not only color;
- every shader and glyph field interprets a specific topic;
- every topic-specific alphabet is coherent and tested in the actual font;
- body text and controls remain sharp above tactile, shader, glyph, rot, and haunted layers;
- only a few microinteractions are active and each performs a function;
- age, editorial status, and link health remain distinct;
- at most one harmless preference is persisted by default;
- no decorative layer blocks clicks, focus, selection, scrolling, or reading;
- mobile, zoom, keyboard, touch, screen reader, reduced motion, forced colors, no JavaScript, and unsupported-GPU states remain useful;
- offscreen work pauses and resources clean up;
- the result is strange because its system is strange, not because a normal template is wearing effects.

Make the website feel like it could only have grown from this content.
