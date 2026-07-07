/* motion.jsx — shared kinetic engine for the site.
   Scroll reveals, cursor-reactive hero, magnetic buttons, count-up,
   scroll progress, nav theme switching. */

const { useState: _mState, useEffect: _mEffect, useRef: _mRef, useCallback: _mCb } = React;

/* prefers-reduced-motion guard */
const PRM = typeof window !== "undefined" &&
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- scroll reveal (reversible via GSAP ScrollTrigger) ----------
   Reveals play in on enter AND reverse back out when you scroll up past them. */
function useReveal() {
  _mEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (PRM) { els.forEach((e) => e.classList.add("in")); return; }
    const G = window.gsap, ST = window.ScrollTrigger;
    if (G && ST) {
      G.registerPlugin(ST);
      const triggers = [];
      els.forEach((el) => {
        triggers.push(ST.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => el.classList.add("in"),
          onEnterBack: () => el.classList.add("in"),
          onLeaveBack: () => el.classList.remove("in"),
        }));
      });
      const refresh = () => ST.refresh();
      window.addEventListener("load", refresh);
      const to = setTimeout(refresh, 800);
      return () => {
        triggers.forEach((tr) => tr.kill());
        window.removeEventListener("load", refresh);
        clearTimeout(to);
      };
    }
    // fallback: one-way IntersectionObserver
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ---------- count-up ---------- */
function useCountUp(target, durationMs = 1400, trigger) {
  const [v, setV] = _mState(0);
  _mEffect(() => {
    if (!trigger) { setV(0); return; }
    if (PRM) { setV(target); return; }
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 4);
      setV(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, durationMs, trigger]);
  return v;
}

/* observe → boolean seen, reversible so count-ups re-fire on scroll back */
function useSeen(threshold = 0.25) {
  const ref = _mRef(null);
  const [seen, setSeen] = _mState(false);
  _mEffect(() => {
    if (!ref.current) return;
    if (PRM) { setSeen(true); return; }
    const G = window.gsap, ST = window.ScrollTrigger;
    if (G && ST) {
      G.registerPlugin(ST);
      const st = ST.create({
        trigger: ref.current,
        start: "top 80%",
        onEnter: () => setSeen(true),
        onEnterBack: () => setSeen(true),
        onLeaveBack: () => setSeen(false),
      });
      const to = setTimeout(() => ST.refresh(), 800);
      return () => { st.kill(); clearTimeout(to); };
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/* ---------- scroll progress + nav theme ---------- */
function useScrollProgress() {
  const [p, setP] = _mState(0);
  _mEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? h.scrollTop / max : 0);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

/* Toggle nav to "on dark" once the light zone (hero+about) is scrolled past.
   Reads the bottom of the element flagged data-lightzone-end. */
function useNavOnDark() {
  const [onDark, setOnDark] = _mState(false);
  _mEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const marker = document.querySelector("[data-lightzone-end]");
      if (!marker) return;
      const r = marker.getBoundingClientRect();
      setOnDark(r.bottom <= 72);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return onDark;
}

/* ---------- magnetic hover ---------- */
function useMagnetic(strength = 0.34) {
  const ref = _mRef(null);
  _mEffect(() => {
    const el = ref.current;
    if (!el || PRM) return;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

function Magnetic({ as = "div", strength, className = "", children, ...rest }) {
  const ref = useMagnetic(strength);
  const El = as;
  return <El ref={ref} className={"magnetic " + className} {...rest}>{children}</El>;
}

/* ---------- hero fluid reveal ----------
   Clean light page at rest. A stable-fluids simulation (Jos Stam) runs behind
   the hero: the cursor injects velocity + dye, the dye advects and swirls like
   ink in water, and that dye field is used as the mask that reveals the dark
   AI · data blueprint underneath. Ambient swirls keep it flowing with no cursor;
   dye dissipates so motion fades when you stop. */
function HeroReveal({ src }) {
  const canvasRef = _mRef(null);

  _mEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.closest(".hero") || canvas.parentElement;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    let ready = false;
    img.onload = () => { ready = true; };
    img.src = src;

    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d");

    // gooey edge filter: blur the upscaled dye to erase grid facets, then a steep
    // alpha-contrast snaps it to one crisp, smooth contour (no pixel stair-steps).
    let edgeFilter = "none";
    (function ensureFilter() {
      if (document.getElementById("fluidEdge")) { edgeFilter = "url(#fluidEdge)"; return; }
      const NS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("width", "0"); svg.setAttribute("height", "0");
      svg.style.cssText = "position:absolute;width:0;height:0;pointer-events:none";
      const f = document.createElementNS(NS, "filter");
      f.setAttribute("id", "fluidEdge");
      f.setAttribute("x", "-20%"); f.setAttribute("y", "-20%");
      f.setAttribute("width", "140%"); f.setAttribute("height", "140%");
      f.setAttribute("color-interpolation-filters", "sRGB");
      const blur = document.createElementNS(NS, "feGaussianBlur");
      blur.setAttribute("in", "SourceGraphic");
      blur.setAttribute("stdDeviation", "7");
      blur.setAttribute("result", "b");
      const cm = document.createElementNS(NS, "feColorMatrix");
      cm.setAttribute("in", "b"); cm.setAttribute("type", "matrix");
      // keep RGB white; alpha' = 22*alpha - 9  → crisp anti-aliased edge
      cm.setAttribute("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9");
      f.appendChild(blur); f.appendChild(cm); svg.appendChild(f);
      document.body.appendChild(svg);
      edgeFilter = "url(#fluidEdge)";
    })();

    let W = 1, H = 1;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const setSize = () => {
      const r = host.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      canvas.width = mask.width = Math.round(W * dpr);
      canvas.height = mask.height = Math.round(H * dpr);
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(host);

    // ---- stable-fluids solver (Jos Stam): a dye field drives the reveal mask ----
    const FCOLS = 150;
    const FROWS = Math.max(40, Math.round(FCOLS * H / W));
    const GW = FCOLS + 2, GN = GW * (FROWS + 2);
    const IX = (i, j) => i + GW * j;
    let u = new Float32Array(GN), v = new Float32Array(GN);
    let u0 = new Float32Array(GN), v0 = new Float32Array(GN);
    let dens = new Float32Array(GN), dens0 = new Float32Array(GN);
    const fu = new Float32Array(GN), fv = new Float32Array(GN), fd = new Float32Array(GN);

    const setBnd = (b, x) => {
      for (let i = 1; i <= FCOLS; i++) {
        x[IX(i, 0)] = b === 2 ? -x[IX(i, 1)] : x[IX(i, 1)];
        x[IX(i, FROWS + 1)] = b === 2 ? -x[IX(i, FROWS)] : x[IX(i, FROWS)];
      }
      for (let j = 1; j <= FROWS; j++) {
        x[IX(0, j)] = b === 1 ? -x[IX(1, j)] : x[IX(1, j)];
        x[IX(FCOLS + 1, j)] = b === 1 ? -x[IX(FCOLS, j)] : x[IX(FCOLS, j)];
      }
    };
    const linSolve = (b, x, x0, a, c, iter) => {
      const invc = 1 / c;
      for (let k = 0; k < iter; k++) {
        for (let j = 1; j <= FROWS; j++) for (let i = 1; i <= FCOLS; i++) {
          x[IX(i, j)] = (x0[IX(i, j)] + a * (x[IX(i - 1, j)] + x[IX(i + 1, j)] + x[IX(i, j - 1)] + x[IX(i, j + 1)])) * invc;
        }
        setBnd(b, x);
      }
    };
    const advect = (b, d, d0, vu, vv, dt) => {
      const dtx = dt * FCOLS, dty = dt * FROWS;
      for (let j = 1; j <= FROWS; j++) for (let i = 1; i <= FCOLS; i++) {
        let x = i - dtx * vu[IX(i, j)], y = j - dty * vv[IX(i, j)];
        if (x < 0.5) x = 0.5; else if (x > FCOLS + 0.5) x = FCOLS + 0.5;
        if (y < 0.5) y = 0.5; else if (y > FROWS + 0.5) y = FROWS + 0.5;
        const i0 = x | 0, i1 = i0 + 1, j0 = y | 0, j1 = j0 + 1;
        const s1 = x - i0, s0 = 1 - s1, t1 = y - j0, t0 = 1 - t1;
        d[IX(i, j)] = s0 * (t0 * d0[IX(i0, j0)] + t1 * d0[IX(i0, j1)]) + s1 * (t0 * d0[IX(i1, j0)] + t1 * d0[IX(i1, j1)]);
      }
      setBnd(b, d);
    };
    const project = (vu, vv, p, div) => {
      for (let j = 1; j <= FROWS; j++) for (let i = 1; i <= FCOLS; i++) {
        div[IX(i, j)] = -0.5 * ((vu[IX(i + 1, j)] - vu[IX(i - 1, j)]) / FCOLS + (vv[IX(i, j + 1)] - vv[IX(i, j - 1)]) / FROWS);
        p[IX(i, j)] = 0;
      }
      setBnd(0, div); setBnd(0, p);
      linSolve(0, p, div, 1, 4, 8);
      for (let j = 1; j <= FROWS; j++) for (let i = 1; i <= FCOLS; i++) {
        vu[IX(i, j)] -= 0.5 * FCOLS * (p[IX(i + 1, j)] - p[IX(i - 1, j)]);
        vv[IX(i, j)] -= 0.5 * FROWS * (p[IX(i, j + 1)] - p[IX(i, j - 1)]);
      }
      setBnd(1, vu); setBnd(2, vv);
    };
    const addSource = (x, s, dt) => { for (let i = 0; i < GN; i++) x[i] += dt * s[i]; };

    // tiny offscreen the size of the grid; bilinear-upscaled into the mask
    const dye = document.createElement("canvas");
    dye.width = FCOLS; dye.height = FROWS;
    const dyeCtx = dye.getContext("2d");
    const dyeImg = dyeCtx.createImageData(FCOLS, FROWS);
    const renderDye = () => {
      const data = dyeImg.data;
      for (let j = 0; j < FROWS; j++) for (let i = 0; i < FCOLS; i++) {
        // smooth density — NO per-cell threshold here; the SVG filter makes the edge
        let a = dens[IX(i + 1, j + 1)] * 1.15;
        if (a < 0) a = 0; else if (a > 1) a = 1;
        const idx = (i + j * FCOLS) * 4;
        data[idx] = 255; data[idx + 1] = 255; data[idx + 2] = 255; data[idx + 3] = a * 255;
      }
      dyeCtx.putImageData(dyeImg, 0, 0);
      mctx.clearRect(0, 0, W, H);
      mctx.imageSmoothingEnabled = true;
      mctx.imageSmoothingQuality = "high";
      mctx.filter = edgeFilter;          // blur + alpha-snap → clean contour
      mctx.drawImage(dye, 0, 0, W, H);
      mctx.filter = "none";
    };

    const drawCover = () => {
      const ir = img.width / img.height, rr = W / H;
      let dw, dh;
      if (ir > rr) { dh = H; dw = H * ir; } else { dw = W; dh = W / ir; }
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    };
    const composite = () => {
      ctx.clearRect(0, 0, W, H);
      drawCover();
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(mask, 0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
    };

    // pointer torch + portrait parallax vars
    let px = -999, py = -999, lastMove = -9999, spx = -999, spy = -999;
    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      px = e.clientX - r.left; py = e.clientY - r.top;
      if (spx < -900) { spx = px; spy = py; }
      lastMove = performance.now();
      host.style.setProperty("--phx", (px / W - 0.5).toFixed(3));
      host.style.setProperty("--phy", (py / H - 0.5).toFixed(3));
    };
    const onLeave = () => {
      host.style.setProperty("--phx", "0");
      host.style.setProperty("--phy", "0");
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    if (PRM) {
      const paintStatic = () => {
        if (!ready) return;
        mctx.clearRect(0, 0, W, H);
        const g = mctx.createRadialGradient(W * 0.6, H * 0.5, 0, W * 0.6, H * 0.5, Math.max(W, H) * 0.5);
        g.addColorStop(0, "rgba(255,255,255,0.85)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        mctx.fillStyle = g; mctx.fillRect(0, 0, W, H);
        composite();
      };
      img.onload = () => { ready = true; paintStatic(); };
      paintStatic();
      return () => {
        ro.disconnect();
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
      };
    }

    // splat dye + velocity into the grid around a normalised point (sig in cells).
    // Center is fractional (no rounding) so a moving source glides smoothly
    // instead of stuttering cell-to-cell.
    const splat = (nx, ny, dx, dy, amt, sig) => {
      const cx = 1 + nx * FCOLS, cy = 1 + ny * FROWS;
      const ci = Math.round(cx), cj = Math.round(cy);
      const rad = Math.ceil(sig * 2.4), s2 = 2 * sig * sig;
      for (let j = -rad; j <= rad; j++) for (let i = -rad; i <= rad; i++) {
        const gi = ci + i, gj = cj + j;
        if (gi < 1 || gi > FCOLS || gj < 1 || gj > FROWS) continue;
        const ddx = gi - cx, ddy = gj - cy;
        const fall = Math.exp(-(ddx * ddx + ddy * ddy) / s2);
        const k = IX(gi, gj);
        fd[k] += amt * fall; fu[k] += dx * fall; fv[k] += dy * fall;
      }
    };

    // ambient sources travel smooth left→right zig-zag paths; their dye is pushed
    // along the direction of travel so it streams fluently rather than shivering.
    const ghosts = [
      { ph: 0.0, fx: 0.00052, fy: 0.00098, ax: 0.36, ay: 0.18, oy: 0.42 },
      { ph: 3.4, fx: 0.00045, fy: 0.00082, ax: 0.34, ay: 0.16, oy: 0.56 },
    ];
    const ghostPos = (gg, time) => [
      0.5 + gg.ax * Math.sin(time * gg.fx + gg.ph),
      gg.oy + gg.ay * Math.sin(time * gg.fy + gg.ph * 1.7),
    ];

    let raf = 0;
    const t0 = performance.now();
    const frame = (now) => {
      const t = now - t0;
      const dt = 0.1;

      fu.fill(0); fv.fill(0); fd.fill(0);

      // ambient zig-zag streams — velocity is the path's own direction of travel
      for (let g = 0; g < ghosts.length; g++) {
        const gg = ghosts[g];
        const p0 = ghostPos(gg, t);
        const p1 = ghostPos(gg, t + 20);
        const vx = (p1[0] - p0[0]) * W * 0.85;
        const vy = (p1[1] - p0[1]) * H * 0.85;
        splat(p0[0], p0[1], vx, vy, 5.5, 5.5);
      }

      // cursor: a large soft dye blob that follows, nudged gently along travel
      let pvx = 0, pvy = 0;
      if (spx > -900) { pvx = px - spx; pvy = py - spy; spx += pvx * 0.5; spy += pvy * 0.5; }
      if (now - lastMove < 150 && px > -900) {
        const gx = Math.max(-5, Math.min(5, pvx * 0.13));
        const gy = Math.max(-5, Math.min(5, pvy * 0.13));
        splat(px / W, py / H, gx, gy, 22, 6);
      }

      // ---- solve: velocity, then dye ----
      addSource(u, fu, dt); addSource(v, fv, dt);
      project(u, v, u0, v0);
      let s = u0; u0 = u; u = s; s = v0; v0 = v; v = s;
      advect(1, u, u0, u0, v0, dt); advect(2, v, v0, u0, v0, dt);
      project(u, v, u0, v0);
      addSource(dens, fd, dt);
      s = dens0; dens0 = dens; dens = s;
      advect(0, dens, dens0, u, v, dt);
      for (let i = 0; i < GN; i++) { dens[i] *= 0.945; u[i] *= 0.95; v[i] *= 0.95; }

      if (ready) { renderDye(); composite(); }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas className="hero-reveal" ref={canvasRef} aria-hidden="true" />;
}

/* transparent-cutout portrait; subtle cursor parallax driven by --phx/--phy */
function HeroPortrait({ src }) {
  return (
    <div className="hero-portrait">
      <img src={src} alt="Kent Chong" draggable="false" />
    </div>
  );
}

/* ---------- method step scrub ----------
   Scroll-scrubbed reveal for the "How I build" steps: a progress line draws
   down the rail while each step fades/slides in, tied to scroll position.
   No-op (steps stay visible via CSS defaults) without GSAP or with PRM. */
function useStepScrub() {
  const ref = _mRef(null);
  _mEffect(() => {
    const el = ref.current;
    const G = window.gsap, ST = window.ScrollTrigger;
    if (!el || !G || !ST || PRM) return;
    G.registerPlugin(ST);
    const line = el.querySelector(".mt-line i");
    const steps = el.querySelectorAll(".mt-step");
    const tl = G.timeline({
      scrollTrigger: { trigger: el, start: "top 72%", end: "bottom 55%", scrub: 0.6 },
    });
    if (line) tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: steps.length }, 0);
    steps.forEach((s, i) => {
      tl.fromTo(s, { opacity: 0.14, x: -16 }, { opacity: 1, x: 0, ease: "none", duration: 0.85 }, i);
    });
    return () => { if (tl.scrollTrigger) tl.scrollTrigger.kill(); tl.kill(); };
  }, []);
  return ref;
}

/* split a string into per-letter spans for stagger animation */
function SplitText({ text, className = "" }) {
  const chars = String(text).split("");
  return (
    <span className={"split " + className} aria-label={text}>
      {chars.map((c, i) => (
        <span key={i} className="split-c" style={{ "--i": i }} aria-hidden="true">
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

/* ---------- career cube (06 — Foundation) ----------
   A floating, slowly spinning three.js cube; each of the 6 faces is a career
   era (CanvasTexture: years + label), the 3 eras mapped to opposite-face
   pairs. Hovering a face eases the spin to a stop, lights that face, and
   reports its era so the section can project the matching detail card. */
function CareerCube({ eras, onEra }) {
  const hostRef = _mRef(null);

  _mEffect(() => {
    const host = hostRef.current;
    if (!host || typeof THREE === "undefined") return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.set(0, 0, 9.5);

    // face texture: dark panel, lime frame + faint grid, mono years, big label
    const makeFace = (era, hot) => {
      const c = document.createElement("canvas");
      c.width = c.height = 512;
      const g = c.getContext("2d");
      // BoxGeometry face UVs present this texture rotated 180°; pre-rotate so
      // the text reads upright on the cube (grid + border are symmetric)
      g.translate(512, 512);
      g.scale(-1, -1);
      g.fillStyle = "#10162B";
      g.fillRect(0, 0, 512, 512);
      g.strokeStyle = "rgba(255,255,255,0.05)";
      g.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(128 * i, 24); g.lineTo(128 * i, 488); g.stroke();
        g.beginPath(); g.moveTo(24, 128 * i); g.lineTo(488, 128 * i); g.stroke();
      }
      g.strokeStyle = hot ? "#ccff00" : "rgba(204,255,0,0.30)";
      g.lineWidth = hot ? 12 : 4;
      g.strokeRect(24, 24, 464, 464);
      g.textAlign = "center";
      g.fillStyle = hot ? "#ccff00" : "rgba(255,255,255,0.55)";
      g.font = "600 30px 'JetBrains Mono', monospace";
      g.fillText(era.years.toUpperCase(), 256, 214);
      g.fillStyle = hot ? "#ffffff" : "#ccff00";
      g.font = "800 70px 'Saira Condensed', sans-serif";
      g.fillText(era.label.toUpperCase(), 256, 300);
      const tx = new THREE.CanvasTexture(c);
      tx.anisotropy = 4;
      return tx;
    };
    const FACE_ERA = [0, 1, 2, 0, 1, 2];      // +x,-x,+y,-y,+z,-z
    const cold = FACE_ERA.map((e) => makeFace(eras[e], false));
    const hot = FACE_ERA.map((e) => makeFace(eras[e], true));
    const mats = cold.map((t) => new THREE.MeshBasicMaterial({ map: t }));
    const geo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    const cube = new THREE.Mesh(geo, mats);
    cube.rotation.set(0.28, -0.42, 0);
    scene.add(cube);

    const setSize = () => {
      const r = host.getBoundingClientRect();
      const s = Math.max(1, r.width);
      renderer.setSize(s, s, false);
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(host);

    const el = renderer.domElement;
    const ray = new THREE.Raycaster();
    const ptr = new THREE.Vector2();
    let hovered = -1;
    let speed = PRM ? 0 : 1, targetSpeed = PRM ? 0 : 1;   // idle auto-spin factor
    let momX = 0, momY = 0;                               // flick momentum
    // drag state
    let dragging = false, moved = false, lastX = 0, lastY = 0, dvX = 0, dvY = 0;

    // light/select a face: highlight it + project its era into the card
    const light = (face) => {
      if (face === hovered) return;
      if (hovered >= 0) { mats[hovered].map = cold[hovered]; mats[hovered].needsUpdate = true; }
      if (face >= 0) {
        mats[face].map = hot[face]; mats[face].needsUpdate = true;
        onEra && onEra(FACE_ERA[face]);
      }
      hovered = face;
    };
    const faceAt = (e) => {
      const r = el.getBoundingClientRect();
      ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ptr.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(ptr, camera);
      const hit = ray.intersectObject(cube)[0];
      return hit ? hit.face.materialIndex : -1;
    };

    const onMove = (e) => {
      if (dragging) {
        const dx = e.clientX - lastX, dy = e.clientY - lastY;
        cube.rotation.y += dx * 0.01;
        cube.rotation.x += dy * 0.01;
        dvX = dx * 0.01; dvY = dy * 0.01;
        lastX = e.clientX; lastY = e.clientY;
        if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
        return;
      }
      // hover: light the face under the cursor + hold the cube still
      const f = faceAt(e);
      light(f);
      targetSpeed = f >= 0 ? 0 : (PRM ? 0 : 1);
      el.style.cursor = f >= 0 ? "grab" : "default";
    };
    const onDown = (e) => {
      dragging = true; moved = false;
      lastX = e.clientX; lastY = e.clientY; dvX = dvY = 0;
      momX = momY = 0; targetSpeed = 0; speed = 0;   // freeze auto-spin while grabbed
      el.style.cursor = "grabbing";
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
    };
    const onUp = (e) => {
      if (!dragging) return;
      dragging = false;
      try { el.releasePointerCapture(e.pointerId); } catch (_) {}
      if (moved) {
        momX = dvX; momY = dvY;                       // flick → momentum spin
        el.style.cursor = "grab";
      } else {
        light(faceAt(e));                             // tap/click → select face
        targetSpeed = 0;
        el.style.cursor = "grab";
      }
    };
    const onLeave = () => { if (!dragging) { light(-1); targetSpeed = PRM ? 0 : 1; el.style.cursor = "default"; } };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onLeave);
    el.style.cursor = "grab";
    el.style.touchAction = "none";

    let raf = 0;
    const t0 = performance.now();
    const frame = (now) => {
      const t = (now - t0) / 1000;
      if (dragging) {
        // rotation is driven directly by the pointer; hold still otherwise
      } else if (Math.abs(momX) > 0.0004 || Math.abs(momY) > 0.0004) {
        // flick momentum: keep the user's spin, decaying toward idle
        cube.rotation.y += momX; cube.rotation.x += momY;
        momX *= 0.94; momY *= 0.94;
      } else {
        momX = momY = 0;
        speed += (targetSpeed - speed) * 0.08;   // smooth stop / resume
        cube.rotation.y += 0.006 * speed;
        cube.rotation.x += 0.0026 * speed;
        cube.position.y = Math.sin(t * 0.9) * 0.14 * speed;  // float damps with spin
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onLeave);
      geo.dispose();
      mats.forEach((m) => m.dispose());
      cold.concat(hot).forEach((t) => t.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="cube-host" ref={hostRef} aria-hidden="true" />;
}

Object.assign(window, {
  useReveal, useCountUp, useSeen, useScrollProgress, useNavOnDark,
  useMagnetic, Magnetic, HeroReveal, HeroPortrait, SplitText, useStepScrub,
  CareerCube,
  PRM_MOTION: PRM,
});
