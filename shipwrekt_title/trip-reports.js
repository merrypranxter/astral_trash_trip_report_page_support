const fieldCanvas = document.querySelector("#trip-field");
const titleCanvas = document.querySelector("#title-organism");
const titleContact = document.querySelector(".title-contact");
const stateReadout = document.querySelector(".state-readout");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const coarsePointer = window.matchMedia("(pointer: coarse)");
const TAU = Math.PI * 2;
const DPR_LIMIT = 1.65;
const RELIC_DURATION = 4.2;

const interaction = {
  pointer: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
  smoothPointer: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
  lastPointer: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
  velocity: 0,
  hover: false,
  focus: false,
  burstStarted: -10_000,
  click: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
  memory: [],
};

let width = window.innerWidth;
let height = window.innerHeight;
let dpr = Math.min(window.devicePixelRatio || 1, DPR_LIMIT);
let visible = !document.hidden;
let frame = 0;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (a, b, amount) => a + (b - a) * amount;
const smoothstep = (edge0, edge1, value) => {
  const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
};

function hash2(x, y) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

class PsychedelicField {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });

    if (!this.gl) {
      canvas.hidden = true;
      return;
    }

    const vertexSource = `#version 300 es
      in vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `#version 300 es
      precision highp float;

      out vec4 outColor;
      uniform vec2 u_resolution;
      uniform vec2 u_pointer;
      uniform vec2 u_click;
      uniform float u_time;
      uniform float u_energy;
      uniform float u_clickAge;
      uniform float u_reduced;

      #define PI 3.141592653589793

      mat2 rot(float a) {
        float c = cos(a), s = sin(a);
        return mat2(c, -s, s, c);
      }

      float hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      vec3 spectrum(float t) {
        vec3 a = vec3(0.56, 0.48, 0.58);
        vec3 b = vec3(0.48, 0.52, 0.46);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.03, 0.33, 0.67);
        return a + b * cos(6.28318 * (c * t + d));
      }

      float rosette(vec2 p, float petals, float phase) {
        float a = atan(p.y, p.x);
        float r = length(p);
        float bloom = abs(sin(a * petals + phase)) * 0.13;
        return 0.012 / (abs(r - 0.19 - bloom) + 0.012);
      }

      float ribbon(vec2 p, float time) {
        float f = sin(p.x * 4.7 + sin(p.y * 3.1 - time * 0.7));
        f += sin(p.y * 5.9 - cos(p.x * 2.3 + time * 0.4));
        f += sin((p.x + p.y) * 3.2 + sin(time * 0.31));
        return f / 3.0;
      }

      void main() {
        vec2 frag = gl_FragCoord.xy;
        vec2 uv = (2.0 * frag - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 mouse = (2.0 * u_pointer - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 click = (2.0 * u_click - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        float t = u_time * mix(0.12, 0.025, u_reduced);
        vec2 p = uv;

        float pointerDistance = length(p - mouse);
        float pointerLens = exp(-pointerDistance * 2.3) * (0.08 + u_energy * 0.15);
        p *= rot(0.12 * sin(t * 0.7) + pointerLens);
        p += 0.16 * vec2(
          sin(p.y * 2.8 + t * 1.7),
          cos(p.x * 2.35 - t * 1.4)
        );
        p += (p - mouse) * pointerLens * sin(pointerDistance * 17.0 - t * 8.0);

        float clickRadius = length(uv - click);
        float shock = exp(-u_clickAge * 1.2)
          * exp(-abs(clickRadius - u_clickAge * 0.52) * 14.0);
        p *= rot(shock * 1.4);
        p += normalize((uv - click) + 0.0001) * shock * 0.12;

        float field = ribbon(p * 1.25, t);
        float folded = ribbon(rot(PI / 3.7) * p * 2.0, -t * 1.17);
        float filaments = 0.025 / (abs(sin((field + folded) * 8.0)) + 0.025);

        float cells = 0.0;
        for (int i = 0; i < 5; i++) {
          float fi = float(i);
          vec2 center = vec2(
            sin(t * (0.61 + fi * 0.07) + fi * 2.3),
            cos(t * (0.47 + fi * 0.05) + fi * 1.7)
          ) * vec2(0.68, 0.51);
          vec2 q = rot(fi * 0.73 + t * 0.14) * (p - center);
          cells += rosette(q, 5.0 + mod(fi, 4.0), t * (0.8 + fi * 0.11));
        }

        float interference = sin(length(p) * 21.0 - t * 5.0 + field * 4.0);
        interference *= cos(atan(p.y, p.x) * 7.0 + folded * 3.0);

        float colorIndex = field * 0.22 + folded * 0.18 + length(p) * 0.12;
        colorIndex += t * 0.08 + shock * 0.2;
        vec3 color = spectrum(colorIndex);
        vec3 opposite = spectrum(colorIndex + 0.43 + interference * 0.08);

        color = mix(color, opposite, smoothstep(-0.6, 0.7, interference));
        color *= 0.42 + filaments * 0.19 + cells * 0.045;
        color += spectrum(colorIndex + 0.2) * cells * 0.03;
        color += vec3(1.0, 0.1, 0.78) * shock * 1.4;
        color += vec3(0.08, 0.95, 1.0) * pointerLens * 0.8;

        float fine = sin((p.x - p.y) * 58.0 + t * 4.0 + field * 9.0);
        color += spectrum(colorIndex + 0.17) * smoothstep(0.82, 1.0, fine) * 0.18;

        float grain = hash21(frag + floor(u_time * 18.0)) - 0.5;
        color += grain * 0.045;
        color = pow(max(color, 0.0), vec3(0.82));
        color *= 1.0 - smoothstep(0.72, 1.85, length(uv)) * 0.3;

        outColor = vec4(color, 1.0);
      }
    `;

    const gl = this.gl;
    this.program = this.createProgram(vertexSource, fragmentSource);
    if (!this.program) {
      canvas.hidden = true;
      this.gl = null;
      return;
    }

    this.uniforms = Object.fromEntries(
      [
        "u_resolution",
        "u_pointer",
        "u_click",
        "u_time",
        "u_energy",
        "u_clickAge",
        "u_reduced",
      ].map((name) => [name, gl.getUniformLocation(this.program, name)]),
    );

    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(this.program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  }

  createShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation failed:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  createProgram(vertexSource, fragmentSource) {
    const gl = this.gl;
    const vertex = this.createShader(gl.VERTEX_SHADER, vertexSource);
    const fragment = this.createShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Shader program failed:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }

  resize() {
    if (!this.gl) return;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  render(time, burstAge) {
    if (!this.gl) return;
    const gl = this.gl;
    gl.useProgram(this.program);
    gl.uniform2f(this.uniforms.u_resolution, this.canvas.width, this.canvas.height);
    gl.uniform2f(
      this.uniforms.u_pointer,
      interaction.smoothPointer.x * dpr,
      (height - interaction.smoothPointer.y) * dpr,
    );
    gl.uniform2f(
      this.uniforms.u_click,
      interaction.click.x * dpr,
      (height - interaction.click.y) * dpr,
    );
    gl.uniform1f(this.uniforms.u_time, time);
    gl.uniform1f(this.uniforms.u_energy, interaction.velocity + (interaction.hover ? 0.38 : 0));
    gl.uniform1f(this.uniforms.u_clickAge, burstAge);
    gl.uniform1f(this.uniforms.u_reduced, reducedMotion.matches ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}

class TitleOrganism {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });
    this.mask = document.createElement("canvas");
    this.maskCtx = this.mask.getContext("2d", { willReadFrequently: true });
    this.layer = document.createElement("canvas");
    this.layerCtx = this.layer.getContext("2d");
    this.edgePoints = [];
    this.bounds = { x: 0, y: 0, w: 0, h: 0 };
    this.glyphs = ["+", "×", "∞", "∴", "⊹", "⋮", "⌁", "◉", "∿", "※"];
  }

  resize() {
    for (const canvas of [this.mask, this.layer]) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    this.drawMask();
    this.sampleEdges();
  }

  drawWord(ctx, word, x, baseline, fontSize, maxWidth, seed) {
    const tracking = fontSize * 0.012;
    ctx.font = `400 ${fontSize}px "Cleo Folk", Impact, Haettenschweiler, "Arial Black", sans-serif`;
    ctx.textBaseline = "alphabetic";

    const widths = [...word].map((letter) => ctx.measureText(letter).width);
    const naturalWidth = widths.reduce((sum, item) => sum + item, 0) + tracking * (word.length - 1);
    const scale = Math.min(1.16, maxWidth / naturalWidth);
    let cursor = x;

    [...word].forEach((letter, index) => {
      const letterWidth = widths[index] * scale;
      const wave = Math.sin(index * 1.93 + seed);
      const wobble = Math.cos(index * 2.41 + seed * 0.7);
      ctx.save();
      ctx.translate(cursor + letterWidth * 0.5, baseline + wave * fontSize * 0.025);
      ctx.rotate(wobble * 0.026);
      ctx.transform(1, wave * 0.032, wobble * 0.018, 1, 0, 0);
      ctx.scale(scale * (1 + wave * 0.025), 1 + wobble * 0.035);
      ctx.fillText(letter, -widths[index] * 0.5, 0);
      ctx.restore();
      cursor += letterWidth + tracking;
    });

    return cursor - x;
  }

  drawMask() {
    const ctx = this.maskCtx;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";

    const compact = width < 680;
    const tripSize = Math.min(width * (compact ? 0.34 : 0.275), height * 0.31);
    const reportsSize = Math.min(width * (compact ? 0.225 : 0.185), height * 0.235);
    const maxTripWidth = width * (compact ? 0.78 : 0.64);
    const maxReportsWidth = width * (compact ? 0.92 : 0.82);

    const tripX = width * (compact ? 0.08 : 0.115);
    const tripY = height * (compact ? 0.465 : 0.45);
    const reportsX = width * (compact ? 0.035 : 0.12);
    const reportsY = height * (compact ? 0.66 : 0.68);

    const tripWidth = this.drawWord(ctx, "TRIP", tripX, tripY, tripSize, maxTripWidth, 1.7);
    const reportsWidth = this.drawWord(
      ctx,
      "REPORTS",
      reportsX,
      reportsY,
      reportsSize,
      maxReportsWidth,
      4.2,
    );

    this.bounds = {
      x: Math.min(tripX, reportsX) - width * 0.035,
      y: tripY - tripSize * 0.92,
      w: Math.max(tripX + tripWidth, reportsX + reportsWidth) - Math.min(tripX, reportsX) + width * 0.07,
      h: reportsY - tripY + tripSize * 1.05,
    };
  }

  sampleEdges() {
    const pixels = this.maskCtx.getImageData(0, 0, this.mask.width, this.mask.height).data;
    const stride = this.mask.width * 4;
    const step = Math.max(8, Math.round(11 * dpr));
    const points = [];

    for (let y = step; y < this.mask.height - step; y += step) {
      for (let x = step; x < this.mask.width - step; x += step) {
        const index = y * stride + x * 4 + 3;
        if (pixels[index] < 150) continue;
        const outside =
          pixels[index - step * 4] < 40 ||
          pixels[index + step * 4] < 40 ||
          pixels[index - step * stride] < 40 ||
          pixels[index + step * stride] < 40;
        if (!outside) continue;
        points.push({
          x: x / dpr,
          y: y / dpr,
          phase: hash2(x, y) * TAU,
          speed: 0.5 + hash2(y, x) * 0.9,
          glyph: this.glyphs[Math.floor(hash2(x + 9, y - 4) * this.glyphs.length)],
        });
      }
    }
    this.edgePoints = points;
  }

  paintLayer(time, relic) {
    const ctx = this.layerCtx;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(this.mask, 0, 0, this.mask.width, this.mask.height, 0, 0, width, height);

    ctx.globalCompositeOperation = "source-in";
    const gradient = ctx.createLinearGradient(0, height * 0.2, width, height * 0.78);
    const phase = (time * 0.028) % 1;
    gradient.addColorStop(0, `hsl(${(318 + phase * 100) % 360} 100% 62%)`);
    gradient.addColorStop(0.19, `hsl(${(183 + phase * 70) % 360} 100% 67%)`);
    gradient.addColorStop(0.38, `hsl(${(274 + phase * 120) % 360} 100% 66%)`);
    gradient.addColorStop(0.58, `hsl(${(83 + phase * 80) % 360} 100% 61%)`);
    gradient.addColorStop(0.78, `hsl(${(218 + phase * 90) % 360} 100% 61%)`);
    gradient.addColorStop(1, `hsl(${(344 + phase * 60) % 360} 100% 65%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = "source-atop";
    ctx.lineWidth = relic > 0.05 ? 2.2 : 1.2;
    ctx.globalAlpha = 0.58 + relic * 0.28;

    for (let i = 0; i < 19; i += 1) {
      const fi = i / 18;
      ctx.strokeStyle = i % 3 === 0 ? "#ffffff" : i % 3 === 1 ? "#22f8ff" : "#ff2bd6";
      ctx.beginPath();
      for (let x = -20; x <= width + 20; x += 9) {
        const y = height * (0.22 + fi * 0.56)
          + Math.sin(x * 0.016 + time * 0.0016 + i * 0.72) * (10 + relic * 24)
          + Math.cos(x * 0.007 - time * 0.001 + i) * 7;
        if (x === -20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    for (let i = 0; i < 11; i += 1) {
      const x = width * (0.08 + i * 0.086);
      const y = height * (0.36 + Math.sin(i * 2.1 + time * 0.001) * 0.17);
      const radius = 18 + (i % 4) * 7 + relic * 30;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(time * 0.0002 * (i % 2 ? 1 : -1));
      ctx.strokeStyle = i % 2 ? "rgb(255 255 255 / .78)" : "rgb(201 255 47 / .82)";
      ctx.beginPath();
      for (let p = 0; p <= 36; p += 1) {
        const angle = (p / 36) * TAU;
        const r = radius * (0.52 + 0.43 * Math.abs(Math.sin(angle * (3 + (i % 5)))));
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (p === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(this.mask, 0, 0, this.mask.width, this.mask.height, 0, 0, width, height);
    ctx.globalCompositeOperation = "source-over";
  }

  drawEchoes(ctx, time, rupture, relic) {
    const centerX = this.bounds.x + this.bounds.w * 0.5;
    const centerY = this.bounds.y + this.bounds.h * 0.5;
    const copies = 3 + Math.round(relic * 8);

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (let i = copies; i >= 1; i -= 1) {
      const amount = i / copies;
      const angle = time * 0.00012 + i * 0.57;
      const distance = (2.5 + rupture * 11 + relic * 31) * amount;
      const scale = 1 + relic * amount * 0.055;
      ctx.save();
      ctx.globalAlpha = (0.08 + rupture * 0.035 + relic * 0.055) * (1 - amount * 0.42);
      ctx.translate(centerX + Math.cos(angle) * distance, centerY + Math.sin(angle * 1.3) * distance);
      ctx.rotate((i % 2 ? -1 : 1) * relic * amount * 0.038);
      ctx.scale(scale, scale);
      ctx.translate(-centerX, -centerY);
      ctx.filter = i % 3 === 0 ? "hue-rotate(90deg)" : i % 3 === 1 ? "hue-rotate(220deg)" : "none";
      ctx.drawImage(this.layer, 0, 0, this.layer.width, this.layer.height, 0, 0, width, height);
      ctx.restore();
    }
    ctx.restore();
  }

  drawFilaments(ctx, time, rupture, relic) {
    const pointer = interaction.smoothPointer;
    const pointStep = Math.max(1, Math.floor(this.edgePoints.length / 240));
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.font = `${clamp(width * 0.009, 9, 15)}px ui-monospace, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let drawn = 0;
    for (let i = 0; i < this.edgePoints.length; i += pointStep) {
      const point = this.edgePoints[i];
      if (drawn++ > 260) break;
      const dx = point.x - pointer.x;
      const dy = point.y - pointer.y;
      const distance = Math.hypot(dx, dy) || 1;
      const pointerPull = Math.exp(-distance / 130) * rupture;
      const breathing = Math.sin(time * 0.001 * point.speed + point.phase);
      const out = 3 + breathing * 3 + pointerPull * 22 + relic * (6 + hash2(i, 2) * 35);
      const nx = dx / distance;
      const ny = dy / distance;
      const x = point.x + nx * out;
      const y = point.y + ny * out;

      ctx.fillStyle = i % 3 === 0 ? "#ffffff" : i % 3 === 1 ? "#2cf7ff" : "#d5ff32";
      ctx.globalAlpha = 0.32 + Math.abs(breathing) * 0.36 + rupture * 0.18;
      ctx.fillText(point.glyph, x, y);

      if (i % (pointStep * 8) === 0) {
        ctx.strokeStyle = i % 2 ? "rgb(255 43 214 / .34)" : "rgb(39 246 255 / .32)";
        ctx.lineWidth = 0.7 + relic * 0.8;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.quadraticCurveTo(
          point.x + Math.sin(point.phase + time * 0.0007) * (18 + relic * 32),
          point.y + Math.cos(point.phase - time * 0.0008) * (18 + relic * 32),
          x + nx * (10 + relic * 25),
          y + ny * (10 + relic * 25),
        );
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  drawMemory(ctx, now) {
    interaction.memory = interaction.memory.filter((item) => now - item.time < 3600);
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (const item of interaction.memory) {
      const age = (now - item.time) / 1000;
      const alpha = (1 - age / 3.6) * 0.58;
      const radius = 12 + age * 94;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = item.hue;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = 0; i <= 72; i += 1) {
        const angle = (i / 72) * TAU;
        const distortion = 1 + Math.sin(angle * 7 + item.phase + age * 3) * 0.13;
        const x = item.x + Math.cos(angle) * radius * distortion;
        const y = item.y + Math.sin(angle) * radius * distortion;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }

  drawAmbientGlyphs(ctx, time, rupture, relic) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const count = width < 680 ? 44 : 76;

    for (let i = 0; i < count; i += 1) {
      const seedX = hash2(i * 3.17, 8.4);
      const seedY = hash2(i * 7.91, 2.6);
      const phase = hash2(i * 1.13, i * 5.2) * TAU;
      const x = seedX * width + Math.sin(time * 0.00021 + phase) * (8 + rupture * 16);
      const y = seedY * height + Math.cos(time * 0.00017 - phase) * (7 + relic * 24);
      const size = 7 + hash2(i, 4.9) * 7 + relic * 2;
      ctx.font = `${size}px ui-monospace, monospace`;
      ctx.fillStyle = i % 4 === 0 ? "#d5ff32" : i % 4 === 1 ? "#2cf7ff" : i % 4 === 2 ? "#ff2bd6" : "#ffffff";
      ctx.globalAlpha = 0.11 + hash2(i, 9.7) * 0.18 + rupture * 0.06;
      ctx.fillText(this.glyphs[i % this.glyphs.length], x, y);
    }
    ctx.restore();
  }

  drawRelicGeometry(ctx, time, relic) {
    if (relic < 0.015) return;

    const centerX = width * 0.54;
    const centerY = height * 0.49;
    const scale = Math.min(width, height) * (0.25 + relic * 0.035);
    const a = time * 0.00031;
    const b = time * -0.00023;
    const c = time * 0.00017;
    const vertices = [];

    for (let i = 0; i < 16; i += 1) {
      let x = i & 1 ? 1 : -1;
      let y = i & 2 ? 1 : -1;
      let z = i & 4 ? 1 : -1;
      let w = i & 8 ? 1 : -1;

      [x, y] = [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
      [z, w] = [z * Math.cos(a) - w * Math.sin(a), z * Math.sin(a) + w * Math.cos(a)];
      [x, w] = [x * Math.cos(b) - w * Math.sin(b), x * Math.sin(b) + w * Math.cos(b)];
      [y, z] = [y * Math.cos(c) - z * Math.sin(c), y * Math.sin(c) + z * Math.cos(c)];

      const projection4 = 3.6 / (3.6 - w);
      x *= projection4;
      y *= projection4;
      z *= projection4;
      const projection3 = 3.2 / (3.2 - z * 0.52);
      vertices.push({
        x: centerX + x * scale * projection3,
        y: centerY + y * scale * 0.68 * projection3,
        z,
      });
    }

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.lineWidth = 0.8 + relic * 1.2;
    ctx.shadowBlur = 8 + relic * 20;

    for (let i = 0; i < 16; i += 1) {
      for (let bit = 0; bit < 4; bit += 1) {
        const neighbor = i ^ (1 << bit);
        if (neighbor <= i) continue;
        const from = vertices[i];
        const to = vertices[neighbor];
        ctx.globalAlpha = relic * (0.16 + (from.z + 2) * 0.055);
        ctx.strokeStyle = bit === 0 ? "#2cf7ff" : bit === 1 ? "#ff2bd6" : bit === 2 ? "#d5ff32" : "#ffffff";
        ctx.shadowColor = ctx.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
    }

    for (let i = 0; i < vertices.length; i += 1) {
      const point = vertices[i];
      ctx.globalAlpha = relic * 0.72;
      ctx.fillStyle = i % 3 === 0 ? "#ffffff" : i % 3 === 1 ? "#ff2bd6" : "#2cf7ff";
      ctx.beginPath();
      ctx.arc(point.x, point.y, 1.4 + relic * 2.1, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }

  render(now, rupture, relic) {
    const ctx = this.ctx;
    const time = reducedMotion.matches ? 2400 : now;
    this.paintLayer(time, relic);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    this.drawMemory(ctx, now);
    this.drawAmbientGlyphs(ctx, time, rupture, relic);
    this.drawRelicGeometry(ctx, time, relic);

    const centerX = this.bounds.x + this.bounds.w * 0.5;
    const centerY = this.bounds.y + this.bounds.h * 0.5;
    const breath = reducedMotion.matches ? 0 : Math.sin(time * 0.00078) * 0.006;
    const pointerLean = clamp((interaction.smoothPointer.x / width - 0.5) * 0.018, -0.009, 0.009);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(-0.028 + pointerLean + relic * Math.sin(time * 0.002) * 0.018);
    ctx.scale(1 + breath + relic * 0.018, 1 - breath * 0.6 + relic * 0.01);
    ctx.translate(-centerX, -centerY);

    this.drawEchoes(ctx, time, rupture, relic);

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.65;
    ctx.filter = `blur(${5 + relic * 7}px)`;
    ctx.drawImage(this.layer, 0, 0, this.layer.width, this.layer.height, 0, 0, width, height);
    ctx.restore();

    const stripHeight = Math.max(3, Math.round(7 + rupture * 3));
    for (let y = 0; y < height; y += stripHeight) {
      const wave = Math.sin(y * 0.047 + time * 0.0053) + Math.sin(y * 0.013 - time * 0.002);
      const proximity = Math.exp(-Math.abs(y - interaction.smoothPointer.y) / (height * 0.24));
      const displacement = wave * (0.65 + rupture * proximity * 9 + relic * 4);
      ctx.drawImage(
        this.layer,
        0,
        y * dpr,
        this.layer.width,
        stripHeight * dpr,
        displacement,
        y,
        width,
        stripHeight,
      );
    }

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.62 + relic * 0.22;
    ctx.strokeStyle = relic > 0.2 ? "#ffffff" : "#bffcff";
    ctx.lineWidth = 0.7 + relic * 1.2;
    ctx.shadowBlur = 13 + relic * 18;
    ctx.shadowColor = relic > 0.2 ? "#ff2bd6" : "#27f6ff";
    ctx.drawImage(this.layer, 0, 0, this.layer.width, this.layer.height, 0, 0, width, height);
    ctx.restore();

    this.drawFilaments(ctx, time, rupture, relic);
    ctx.restore();
  }
}

const field = new PsychedelicField(fieldCanvas);
const title = new TitleOrganism(titleCanvas);

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, DPR_LIMIT);

  for (const canvas of [fieldCanvas, titleCanvas]) {
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  field.resize();
  title.resize();
}

function updateState(now) {
  const relicAge = Math.max(0, (now - interaction.burstStarted) / 1000);
  const relic = relicAge < RELIC_DURATION
    ? Math.sin(clamp(relicAge / RELIC_DURATION, 0, 1) * Math.PI) ** 0.72
    : 0;
  const ruptureTarget = interaction.hover || interaction.focus ? 1 : 0;
  const rupture = smoothstep(0, 1, ruptureTarget * 0.72 + clamp(interaction.velocity, 0, 1) * 0.28);

  interaction.smoothPointer.x = lerp(interaction.smoothPointer.x, interaction.pointer.x, 0.1);
  interaction.smoothPointer.y = lerp(interaction.smoothPointer.y, interaction.pointer.y, 0.1);
  interaction.velocity *= 0.91;

  return { relicAge, relic, rupture };
}

function render(now) {
  if (!visible) return;
  const { relicAge, relic, rupture } = updateState(now);
  field.render(now / 1000, relicAge);
  title.render(now, rupture, relic);

  if (reducedMotion.matches) {
    frame = 0;
    return;
  }
  frame = requestAnimationFrame(render);
}

function requestRender() {
  if (!frame && visible) frame = requestAnimationFrame(render);
}

function disturb(event) {
  const rect = titleContact.getBoundingClientRect();
  const x = event?.clientX ?? rect.left + rect.width * 0.57;
  const y = event?.clientY ?? rect.top + rect.height * 0.46;
  const now = performance.now();

  interaction.click.x = x;
  interaction.click.y = y;
  interaction.burstStarted = now;
  interaction.velocity = 1;
  interaction.memory.push({
    x,
    y,
    time: now,
    phase: Math.random() * TAU,
    hue: Math.random() > 0.5 ? "#2cf7ff" : "#ff2bd6",
  });
  stateReadout.textContent = "STATE 03 / HYPERDIMENSIONAL RELIC";
  window.setTimeout(() => {
    if (performance.now() - interaction.burstStarted >= RELIC_DURATION * 1000 - 100) {
      stateReadout.textContent = interaction.hover || interaction.focus
        ? "STATE 02 / PERCEPTUAL RUPTURE"
        : "STATE 01 / CHROMATIC THOUGHT ANIMAL";
    }
  }, RELIC_DURATION * 1000);
  requestRender();
}

window.addEventListener(
  "pointermove",
  (event) => {
    const dx = event.clientX - interaction.lastPointer.x;
    const dy = event.clientY - interaction.lastPointer.y;
    interaction.pointer.x = event.clientX;
    interaction.pointer.y = event.clientY;
    interaction.lastPointer.x = event.clientX;
    interaction.lastPointer.y = event.clientY;
    interaction.velocity = clamp(interaction.velocity + Math.hypot(dx, dy) / 140, 0, 1);
    requestRender();
  },
  { passive: true },
);

titleContact.addEventListener("pointerenter", () => {
  interaction.hover = true;
  if (performance.now() - interaction.burstStarted > RELIC_DURATION * 1000) {
    stateReadout.textContent = "STATE 02 / PERCEPTUAL RUPTURE";
  }
});

titleContact.addEventListener("pointerleave", () => {
  interaction.hover = false;
  if (performance.now() - interaction.burstStarted > RELIC_DURATION * 1000) {
    stateReadout.textContent = "STATE 01 / CHROMATIC THOUGHT ANIMAL";
  }
});

titleContact.addEventListener("focus", () => {
  interaction.focus = true;
  if (performance.now() - interaction.burstStarted > RELIC_DURATION * 1000) {
    stateReadout.textContent = "STATE 02 / PERCEPTUAL RUPTURE";
  }
  requestRender();
});

titleContact.addEventListener("blur", () => {
  interaction.focus = false;
  if (performance.now() - interaction.burstStarted > RELIC_DURATION * 1000) {
    stateReadout.textContent = "STATE 01 / CHROMATIC THOUGHT ANIMAL";
  }
});

titleContact.addEventListener("click", disturb);

window.addEventListener("resize", resize, { passive: true });

document.addEventListener("visibilitychange", () => {
  visible = !document.hidden;
  if (!visible && frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  } else {
    requestRender();
  }
});

reducedMotion.addEventListener?.("change", () => {
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  requestRender();
});

if (coarsePointer.matches) {
  stateReadout.textContent = "STATE 01 / TAP THE THOUGHT ANIMAL";
}

const titleFontReady = document.fonts?.load
  ? document.fonts.load('120px "Cleo Folk"')
  : Promise.resolve();

titleFontReady
  .catch(() => [])
  .then(() => {
    resize();
    requestRender();
    document.documentElement.classList.add("js-running");
  });
