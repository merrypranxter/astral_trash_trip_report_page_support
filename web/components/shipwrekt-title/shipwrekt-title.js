(() => {
  const script = document.currentScript;
  const componentBase = new URL(".", script?.src || window.location.href).href;
  const TAU = Math.PI * 2;
  const DPR_LIMIT = 1.5;
  const BURST_DURATION = 3.4;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const lerp = (a, b, amount) => a + (b - a) * amount;
  const hash = (x, y = 0) => {
    const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
    return value - Math.floor(value);
  };

  class ShipwrektTitle extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          @font-face {
            font-family: "Shipwrekt Nexus";
            src: url("${componentBase}../../assets/fonts/nexus-grotesque.woff2") format("woff2");
            font-style: normal;
            font-weight: 400;
            font-display: swap;
          }

          @font-face {
            font-family: "Shipwrekt Hipnouma";
            src: url("${componentBase}../../assets/fonts/hipnouma.woff2") format("woff2");
            font-style: normal;
            font-weight: 400;
            font-display: swap;
          }

          :host {
            position: relative;
            display: block;
            width: min(46vw, 44rem);
            min-width: 17rem;
            aspect-ratio: 1.58;
            contain: layout paint style;
            isolation: isolate;
            outline: none;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }

          canvas,
          .fallback,
          .focus-ring {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }

          canvas {
            display: block;
            pointer-events: none;
            filter: saturate(1.14) contrast(1.04);
          }

          .fallback {
            display: grid;
            align-content: center;
            padding: 8%;
            color: white;
            line-height: .82;
            text-transform: uppercase;
            text-shadow:
              .05em 0 #ff2bd6,
              -.05em 0 #27f6ff,
              0 0 .28em #861cff;
          }

          .fallback small {
            margin: 0 0 .45em .1em;
            font: 700 clamp(.65rem, 1.6vw, .9rem) / 1 ui-monospace, monospace;
            letter-spacing: .45em;
          }

          .fallback b {
            font-family: "Shipwrekt Nexus", sans-serif;
            font-size: clamp(2.8rem, 8vw, 7.5rem);
            font-weight: 400;
          }

          .fallback i {
            margin-top: .18em;
            font-family: "Shipwrekt Hipnouma", sans-serif;
            font-size: clamp(3rem, 8.5vw, 8rem);
            font-style: normal;
            transform: scaleX(1.8);
            transform-origin: left center;
          }

          :host([data-ready]) .fallback {
            visibility: hidden;
          }

          .focus-ring {
            pointer-events: none;
            border: 2px solid transparent;
            border-radius: 49% 51% 45% 55% / 55% 42% 58% 45%;
            opacity: 0;
            transform: scale(.96) rotate(-1deg);
            transition:
              opacity 160ms linear,
              transform 380ms cubic-bezier(.16, 1, .3, 1);
          }

          :host(:focus-visible) .focus-ring {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            border-color: #c9ff2f;
            box-shadow:
              0 0 0 .22rem rgb(16 0 21 / .92),
              0 0 0 .38rem #ff2bd6,
              0 0 2rem #27f6ff;
          }

          .sr-only {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
          }

          @media (max-width: 42rem) {
            :host {
              width: min(94vw, 38rem);
              min-width: 0;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .focus-ring { transition: none; }
          }

          @media (forced-colors: active) {
            canvas { display: none; }
            .fallback { visibility: visible !important; color: CanvasText; text-shadow: none; }
            :host(:focus-visible) .focus-ring { border-color: Highlight; box-shadow: none; }
          }
        </style>
        <span class="sr-only">The Shipwrekt Experience</span>
        <div class="fallback" aria-hidden="true">
          <small>THE</small>
          <b>SHIPWREKT</b>
          <i>EXPERIENCE</i>
        </div>
        <canvas aria-hidden="true"></canvas>
        <span class="focus-ring" aria-hidden="true"></span>
      `;

      this.canvas = this.shadowRoot.querySelector("canvas");
      this.ctx = this.canvas.getContext("2d", { alpha: true });
      this.masks = {
        ship: document.createElement("canvas"),
        experience: document.createElement("canvas"),
      };
      this.layers = {
        ship: document.createElement("canvas"),
        experience: document.createElement("canvas"),
      };
      this.maskCtx = {
        ship: this.masks.ship.getContext("2d"),
        experience: this.masks.experience.getContext("2d"),
      };
      this.layerCtx = {
        ship: this.layers.ship.getContext("2d"),
        experience: this.layers.experience.getContext("2d"),
      };

      this.width = 680;
      this.height = 430;
      this.dpr = 1;
      this.frame = 0;
      this.connected = false;
      this.visible = !document.hidden;
      this.hovered = false;
      this.focused = false;
      this.pointer = { x: 340, y: 215 };
      this.smoothPointer = { x: 340, y: 215 };
      this.lastPointer = { x: 340, y: 215 };
      this.energy = 0;
      this.burstStarted = -10_000;
      this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.glyphs = ["+", "×", "∴", "∿", "⊹", "⋮", "⌁", "∞"];

      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerEnter = () => {
        this.hovered = true;
        this.requestRender();
      };
      this.onPointerLeave = () => {
        this.hovered = false;
        this.requestRender();
      };
      this.onFocus = () => {
        this.focused = true;
        this.requestRender();
      };
      this.onBlur = () => {
        this.focused = false;
        this.requestRender();
      };
      this.onClick = (event) => this.activate(event);
      this.onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.activate();
        }
      };
      this.onVisibility = () => {
        this.visible = !document.hidden;
        if (!this.visible && this.frame) {
          cancelAnimationFrame(this.frame);
          this.frame = 0;
        } else {
          this.requestRender();
        }
      };
    }

    connectedCallback() {
      if (this.connected) return;
      this.connected = true;
      if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
      if (!this.hasAttribute("role")) this.setAttribute("role", "button");
      if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", "Open The Shipwrekt Experience");

      this.addEventListener("pointermove", this.onPointerMove, { passive: true });
      this.addEventListener("pointerenter", this.onPointerEnter);
      this.addEventListener("pointerleave", this.onPointerLeave);
      this.addEventListener("focus", this.onFocus);
      this.addEventListener("blur", this.onBlur);
      this.addEventListener("click", this.onClick);
      this.addEventListener("keydown", this.onKeyDown);
      document.addEventListener("visibilitychange", this.onVisibility);
      this.reducedMotion.addEventListener?.("change", () => this.requestRender());

      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this);

      // Canvas text resolves fonts through document.fonts, while the visual
      // fallback lives inside this component's Shadow DOM. Registering the
      // faces explicitly keeps both renderers on the same actual glyphs.
      const fontLoads = typeof FontFace === "function" && document.fonts?.add
        ? Promise.all([
            new FontFace(
              "Shipwrekt Nexus",
              `url("${componentBase}../../assets/fonts/nexus-grotesque.woff2") format("woff2")`,
            ),
            new FontFace(
              "Shipwrekt Hipnouma",
              `url("${componentBase}../../assets/fonts/hipnouma.woff2") format("woff2")`,
            ),
          ].map((face) => face.load().then((loadedFace) => {
            document.fonts.add(loadedFace);
            return loadedFace;
          })))
        : Promise.resolve();

      fontLoads
        .catch(() => [])
        .then(() => {
          if (!this.connected) return;
          this.resize();
          this.setAttribute("data-ready", "");
          this.requestRender();
        });
    }

    disconnectedCallback() {
      this.connected = false;
      if (this.frame) cancelAnimationFrame(this.frame);
      this.frame = 0;
      this.resizeObserver?.disconnect();
      document.removeEventListener("visibilitychange", this.onVisibility);
      this.removeEventListener("pointermove", this.onPointerMove);
      this.removeEventListener("pointerenter", this.onPointerEnter);
      this.removeEventListener("pointerleave", this.onPointerLeave);
      this.removeEventListener("focus", this.onFocus);
      this.removeEventListener("blur", this.onBlur);
      this.removeEventListener("click", this.onClick);
      this.removeEventListener("keydown", this.onKeyDown);
    }

    onPointerMove(event) {
      const rect = this.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const dx = x - this.lastPointer.x;
      const dy = y - this.lastPointer.y;
      this.pointer.x = x;
      this.pointer.y = y;
      this.lastPointer.x = x;
      this.lastPointer.y = y;
      this.energy = clamp(this.energy + Math.hypot(dx, dy) / 90, 0, 1);
      this.requestRender();
    }

    activate(event) {
      const rect = this.getBoundingClientRect();
      if (!event?.clientX) {
        this.pointer.x = rect.width * 0.52;
        this.pointer.y = rect.height * 0.48;
      }
      this.burstStarted = performance.now();
      this.energy = 1;
      this.dispatchEvent(
        new CustomEvent("shipwrekt:activate", {
          bubbles: true,
          composed: true,
          detail: { source: "shipwrekt-title" },
        }),
      );
      this.requestRender();
    }

    resize() {
      const rect = this.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8) return;
      this.width = rect.width;
      this.height = rect.height;
      this.dpr = Math.min(window.devicePixelRatio || 1, DPR_LIMIT);

      for (const canvas of [this.canvas, ...Object.values(this.masks), ...Object.values(this.layers)]) {
        canvas.width = Math.max(1, Math.round(this.width * this.dpr));
        canvas.height = Math.max(1, Math.round(this.height * this.dpr));
      }
      this.drawMasks();
      this.requestRender();
    }

    drawMasks() {
      const w = this.width;
      const h = this.height;

      const ship = this.maskCtx.ship;
      ship.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ship.clearRect(0, 0, w, h);
      ship.fillStyle = "#fff";
      ship.textBaseline = "alphabetic";
      ship.textAlign = "left";
      const shipSize = Math.min(h * 0.33, w * 0.162);
      ship.font = `400 ${shipSize}px "Shipwrekt Nexus", sans-serif`;
      const shipWord = "SHIPWREKT";
      const shipNatural = ship.measureText(shipWord).width;
      const shipScale = Math.min(1.18, (w * 0.92) / shipNatural);
      const shipY = h * 0.49;
      ship.lineJoin = "round";
      ship.miterLimit = 2;
      ship.strokeStyle = "#fff";
      ship.lineWidth = Math.max(1.5, shipSize * 0.022);
      ship.save();
      ship.translate(w * 0.5, shipY);
      ship.transform(shipScale, -0.018, 0.012, 1, 0, 0);
      ship.strokeText(shipWord, -shipNatural * 0.5, 0);
      ship.fillText(shipWord, -shipNatural * 0.5, 0);
      ship.restore();

      const experience = this.maskCtx.experience;
      experience.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      experience.clearRect(0, 0, w, h);
      experience.fillStyle = "#fff";
      experience.textBaseline = "alphabetic";
      experience.textAlign = "left";
      const experienceSize = h * 0.31;
      experience.font = `400 ${experienceSize}px "Shipwrekt Hipnouma", sans-serif`;
      const experienceWord = "EXPERIENCE";
      const experienceWidths = [...experienceWord].map((letter) => experience.measureText(letter).width);
      const experienceNatural = experienceWidths.reduce((sum, item) => sum + item, 0);
      const experienceScaleX = Math.min(3.65, (w * 0.88) / experienceNatural);
      let experienceX = w * 0.065;
      const experienceY = h * 0.79;

      [...experienceWord].forEach((letter, index) => {
        const letterWidth = experienceWidths[index];
        const signal = Math.sin(index * 1.43 + 0.6);
        const squeeze = 0.88 + Math.cos(index * 2.2) * 0.1;
        experience.save();
        experience.translate(
          experienceX + letterWidth * experienceScaleX * 0.5,
          experienceY + signal * h * 0.025,
        );
        experience.rotate(signal * 0.018);
        experience.scale(experienceScaleX * squeeze, 1 + Math.sin(index * 1.9) * 0.055);
        experience.fillText(letter, -letterWidth * 0.5, 0);
        experience.restore();
        experienceX += letterWidth * experienceScaleX * 0.88;
      });
    }

    paintLayers(time, shear, burst) {
      const w = this.width;
      const h = this.height;

      for (const type of ["ship", "experience"]) {
        const ctx = this.layerCtx[type];
        const mask = this.masks[type];
        ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(mask, 0, 0, mask.width, mask.height, 0, 0, w, h);
        ctx.globalCompositeOperation = "source-in";

        const gradient = ctx.createLinearGradient(w * 0.04, h * 0.2, w * 0.96, h * 0.84);
        const drift = (time * 0.025) % 80;
        if (type === "ship") {
          gradient.addColorStop(0, `hsl(${328 + drift} 100% 58%)`);
          gradient.addColorStop(0.2, `hsl(${22 + drift * 0.4} 100% 59%)`);
          gradient.addColorStop(0.42, `hsl(${79 + drift * 0.25} 100% 58%)`);
          gradient.addColorStop(0.66, `hsl(${186 + drift * 0.6} 100% 57%)`);
          gradient.addColorStop(1, `hsl(${281 + drift * 0.5} 100% 61%)`);
        } else {
          gradient.addColorStop(0, `hsl(${183 + drift * 0.65} 100% 61%)`);
          gradient.addColorStop(0.28, `hsl(${317 + drift * 0.7} 100% 61%)`);
          gradient.addColorStop(0.52, `hsl(${29 + drift * 0.4} 100% 59%)`);
          gradient.addColorStop(0.76, `hsl(${92 + drift * 0.25} 100% 59%)`);
          gradient.addColorStop(1, `hsl(${264 + drift * 0.5} 100% 64%)`);
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = "source-atop";
        ctx.globalAlpha = 0.76;
        ctx.lineWidth = type === "ship" ? 1.45 : 1.05;
        const lineCount = type === "ship" ? 21 : 28;
        for (let i = 0; i < lineCount; i += 1) {
          const fi = i / Math.max(1, lineCount - 1);
          ctx.strokeStyle = i % 3 === 0 ? "#ffffff" : i % 3 === 1 ? "#2cf7ff" : "#ff2bd6";
          ctx.beginPath();
          for (let x = -12; x <= w + 12; x += 8) {
            const y = h * (0.17 + fi * 0.7)
              + Math.sin(x * (type === "ship" ? 0.018 : 0.027) + time * 0.0015 + i) * (8 + shear * 19)
              + Math.cos(x * 0.007 - time * 0.001 + i * 0.8) * 5;
            if (x === -12) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        if (type === "ship") {
          ctx.globalAlpha = 0.58 + burst * 0.2;
          for (let i = 0; i < 18; i += 1) {
            const x = w * (0.08 + hash(i, 2) * 0.84);
            const y = h * (0.24 + hash(i, 8) * 0.38);
            const radius = h * (0.018 + hash(i, 4) * 0.045);
            ctx.fillStyle = i % 2 ? "#15001f" : "#230046";
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, TAU);
            ctx.fill();
          }
        } else {
          ctx.globalAlpha = 0.44 + shear * 0.2;
          ctx.fillStyle = "#17001f";
          for (let x = -w * 0.08; x < w * 1.08; x += w * 0.055) {
            const slant = Math.sin(x * 0.03 + time * 0.002) * h * 0.018;
            ctx.save();
            ctx.translate(x, h * 0.67 + slant);
            ctx.rotate(-0.12 + shear * 0.05);
            ctx.fillRect(-w * 0.006, -h * 0.15, w * 0.012, h * 0.3);
            ctx.restore();
          }
        }

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(mask, 0, 0, mask.width, mask.height, 0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      }
    }

    drawAura(ctx, time, shear, burst) {
      const w = this.width;
      const h = this.height;
      const cx = w * 0.53;
      const cy = h * 0.52;
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < 7; i += 1) {
        const phase = i * 0.92 + time * 0.00016 * (i % 2 ? 1 : -1);
        const rx = w * (0.22 + i * 0.025 + burst * 0.035);
        const ry = h * (0.15 + i * 0.017 + shear * 0.012);
        ctx.globalAlpha = 0.1 + i * 0.016 + burst * 0.08;
        ctx.strokeStyle = i % 3 === 0 ? "#ff2bd6" : i % 3 === 1 ? "#27f6ff" : "#c9ff2f";
        ctx.lineWidth = 0.7 + burst * 0.5;
        ctx.beginPath();
        for (let p = 0; p <= 80; p += 1) {
          const a = (p / 80) * TAU;
          const wrinkle = 1 + Math.sin(a * (5 + (i % 4)) + phase) * (0.05 + shear * 0.025);
          const x = cx + Math.cos(a) * rx * wrinkle;
          const y = cy + Math.sin(a) * ry * wrinkle;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      const glyphCount = w < 420 ? 42 : 70;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < glyphCount; i += 1) {
        const phase = hash(i, 5) * TAU;
        const orbit = h * (0.2 + hash(i, 9) * 0.34);
        const x = cx + Math.cos(phase + time * 0.00007) * orbit * (1.05 + hash(i, 2));
        const y = cy + Math.sin(phase - time * 0.00008) * orbit * 0.55;
        ctx.font = `${7 + hash(i, 4) * 6}px ui-monospace, monospace`;
        ctx.fillStyle = i % 4 === 0 ? "#ff6b18" : i % 4 === 1 ? "#27f6ff" : i % 4 === 2 ? "#c9ff2f" : "#ff2bd6";
        ctx.globalAlpha = 0.16 + hash(i, 3) * 0.25 + burst * 0.1;
        ctx.fillText(this.glyphs[i % this.glyphs.length], x, y);
      }
      ctx.restore();
    }

    drawPayloadSeed(ctx, time, shear, burst) {
      const w = this.width;
      const h = this.height;
      const cx = w * 0.535;
      const cy = h * 0.48;
      const pulse = 1 + Math.sin(time * 0.0018) * 0.035 + burst * 0.18;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(pulse, pulse);
      ctx.globalCompositeOperation = "screen";

      for (let ring = 0; ring < 5; ring += 1) {
        const radius = h * (0.055 + ring * 0.026 + burst * 0.01);
        ctx.beginPath();
        for (let i = 0; i <= 72; i += 1) {
          const angle = (i / 72) * TAU;
          const teeth = Math.sin(angle * (8 + ring * 3) + time * 0.001 * (ring % 2 ? -1 : 1));
          const r = radius * (1 + teeth * (0.08 + shear * 0.055));
          const x = Math.cos(angle) * r * (1.52 - ring * 0.035);
          const y = Math.sin(angle) * r * 0.58;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = ring % 3 === 0 ? "#ff2bd6" : ring % 3 === 1 ? "#27f6ff" : "#c9ff2f";
        ctx.globalAlpha = 0.12 + ring * 0.025 + burst * 0.12;
        ctx.lineWidth = 0.8 + ring * 0.18;
        ctx.stroke();
      }

      const spokes = 18;
      for (let i = 0; i < spokes; i += 1) {
        const angle = (i / spokes) * TAU + time * 0.00008;
        const inner = h * 0.025;
        const outer = h * (0.17 + (i % 3) * 0.018 + shear * 0.025);
        ctx.strokeStyle = i % 2 ? "#ff6b18" : "#861cff";
        ctx.globalAlpha = 0.075 + burst * 0.07;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner * 0.5);
        ctx.lineTo(Math.cos(angle) * outer * 1.55, Math.sin(angle) * outer * 0.5);
        ctx.stroke();
      }
      ctx.restore();
    }

    drawLayerWithSlices(ctx, layer, type, time, shear, burst) {
      const w = this.width;
      const h = this.height;
      if (type === "ship") {
        const stripHeight = Math.max(3, h / 54);
        for (let y = 0; y < h; y += stripHeight) {
          const proximity = Math.exp(-Math.abs(y - this.smoothPointer.y) / (h * 0.22));
          const displacement = Math.sin(y * 0.065 + time * 0.004) * (0.7 + shear * proximity * 13 + burst * 7);
          ctx.drawImage(
            layer,
            0,
            y * this.dpr,
            layer.width,
            stripHeight * this.dpr,
            displacement,
            y,
            w,
            stripHeight,
          );
        }
      } else {
        const stripWidth = Math.max(3, w / 82);
        for (let x = 0; x < w; x += stripWidth) {
          const proximity = Math.exp(-Math.abs(x - this.smoothPointer.x) / (w * 0.24));
          const displacement = Math.sin(x * 0.051 - time * 0.0048) * (0.8 + shear * proximity * 15 + burst * 9);
          ctx.drawImage(
            layer,
            x * this.dpr,
            0,
            stripWidth * this.dpr,
            layer.height,
            x,
            displacement,
            stripWidth,
            h,
          );
        }
      }
    }

    drawTemporalEchoes(ctx, layer, type, time, shear, burst) {
      const w = this.width;
      const h = this.height;
      const cx = w * 0.52;
      const cy = h * 0.55;
      const copies = type === "experience" ? 7 + Math.round(burst * 5) : 4 + Math.round(burst * 4);
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = copies; i >= 1; i -= 1) {
        const amount = i / copies;
        const direction = i % 2 ? -1 : 1;
        const distance = amount * (2.5 + shear * 14 + burst * 28);
        ctx.save();
        ctx.globalAlpha = (type === "experience" ? 0.085 : 0.055) + shear * 0.025 + burst * 0.035;
        ctx.translate(cx + direction * distance, cy + Math.sin(time * 0.001 + i) * distance * 0.5);
        ctx.rotate(direction * amount * burst * 0.035);
        ctx.scale(1 + amount * burst * 0.025, 1 - amount * burst * 0.012);
        ctx.translate(-cx, -cy);
        ctx.filter = i % 3 === 0 ? "hue-rotate(95deg)" : i % 3 === 1 ? "hue-rotate(215deg)" : "none";
        ctx.drawImage(layer, 0, 0, layer.width, layer.height, 0, 0, w, h);
        ctx.restore();
      }
      ctx.restore();
    }

    drawThe(ctx, time, shear, burst) {
      const w = this.width;
      const h = this.height;
      const x = w * 0.105;
      const y = h * 0.185;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.08 + Math.sin(time * 0.0006) * 0.015 + burst * 0.04);
      ctx.font = `800 ${Math.max(10, h * 0.034)}px ui-monospace, monospace`;
      ctx.letterSpacing = `${Math.max(2, w * 0.006)}px`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = "#27f6ff";
      ctx.fillText("THE", -2 - shear * 2, 1);
      ctx.fillStyle = "#ff2bd6";
      ctx.fillText("THE", 2 + shear * 2, -1);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ffffff";
      ctx.fillText("THE", 0, 0);
      ctx.restore();
    }

    drawConnector(ctx, time, shear, burst) {
      const w = this.width;
      const h = this.height;
      const startX = w * 0.17;
      const startY = h * 0.21;
      const endX = w * 0.31;
      const endY = h * 0.36;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.strokeStyle = "rgb(201 255 47 / .68)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 5]);
      ctx.lineDashOffset = -time * 0.012;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(
        w * (0.22 + Math.sin(time * 0.0005) * 0.025),
        h * (0.28 - shear * 0.03),
        endX + burst * 12,
        endY,
      );
      ctx.stroke();
      ctx.restore();
    }

    render = (now) => {
      this.frame = 0;
      if (!this.connected || !this.visible || !this.hasAttribute("data-ready")) return;

      const time = this.reducedMotion.matches ? 1800 : now;
      const burstAge = Math.max(0, (now - this.burstStarted) / 1000);
      const progress = clamp(burstAge / BURST_DURATION, 0, 1);
      const bursting = burstAge < BURST_DURATION;
      const burst = bursting ? Math.sin(progress * Math.PI) ** 0.72 : 0;
      const contraction = bursting && progress < 0.11
        ? 1 - Math.sin((progress / 0.11) * Math.PI * 0.5) * 0.28
        : 1 + burst * 0.018;
      const shearTarget = this.hovered || this.focused ? 1 : 0;
      const shear = clamp(shearTarget * 0.72 + this.energy * 0.38, 0, 1);

      this.smoothPointer.x = lerp(this.smoothPointer.x, this.pointer.x, 0.12);
      this.smoothPointer.y = lerp(this.smoothPointer.y, this.pointer.y, 0.12);
      this.energy *= 0.9;

      this.paintLayers(time, shear, burst);
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      this.drawAura(ctx, time, shear, burst);
      this.drawPayloadSeed(ctx, time, shear, burst);

      const cx = w * 0.52;
      const cy = h * 0.54;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(contraction, contraction);
      ctx.rotate(-0.018 + (this.smoothPointer.x / w - 0.5) * shear * 0.018);
      ctx.translate(-cx, -cy);

      this.drawTemporalEchoes(ctx, this.layers.ship, "ship", time, shear, burst);
      this.drawTemporalEchoes(ctx, this.layers.experience, "experience", time, shear, burst);

      for (const [type, layer] of Object.entries(this.layers)) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = type === "ship" ? 0.7 : 0.58;
        ctx.filter = `blur(${3 + burst * 6}px)`;
        ctx.drawImage(layer, 0, 0, layer.width, layer.height, 0, 0, w, h);
        ctx.restore();
        this.drawLayerWithSlices(ctx, layer, type, time, shear, burst);
      }

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 0.72 + burst * 0.2;
      ctx.shadowBlur = 10 + burst * 18;
      ctx.shadowColor = burst > 0.08 ? "#ff2bd6" : "#27f6ff";
      ctx.drawImage(this.layers.ship, 0, 0, this.layers.ship.width, this.layers.ship.height, 0, 0, w, h);
      ctx.drawImage(this.layers.experience, 0, 0, this.layers.experience.width, this.layers.experience.height, 0, 0, w, h);
      ctx.restore();

      this.drawThe(ctx, time, shear, burst);
      this.drawConnector(ctx, time, shear, burst);
      ctx.restore();

      if (!this.reducedMotion.matches) this.frame = requestAnimationFrame(this.render);
    };

    requestRender() {
      if (!this.frame && this.visible && this.connected) {
        this.frame = requestAnimationFrame(this.render);
      }
    }
  }

  if (!customElements.get("shipwrekt-title")) {
    customElements.define("shipwrekt-title", ShipwrektTitle);
  }
})();
