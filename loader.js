/* Scramble-decode loader + fluid-swirl exit.
   KENT slots flicker through the brush glyphs (fbridoux-style) and lock
   left-to-right, CHONG types, the caret blinks ~2s, then a stable-fluids
   dye field (same solver as the hero's HeroReveal) erases the dark cover
   with destination-out - the page appears through swirling liquid holes. */
(function () {
  var loader = document.getElementById('loader');
  if (!loader) return;
  var canvas = document.getElementById('ldSwirl');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // ?slowload (or ?slowload=10) slows every beat for tuning
  var slowM = /slowload(?:=(\d+))?/.exec(location.search);
  var slow = slowM ? (parseInt(slowM[1], 10) || 4) : 1;
  var TICK = 58 * slow;          // fbridoux cadence; 22 ticks total ≈ 1.3s scramble
  var LOCK_EVERY = 4;            // ticks per letter lock
  var PRE_TICKS = 6;             // all-scramble ticks before first lock
  var CARET_HOLD = 1300 * slow;  // caret blinks this long before the swirl
  var INK = '#0A0E1A';           // dark cover = var(--bg)
  var done = false, opening = false;

  function finish() {
    if (done) return;
    done = true;
    document.body.classList.add('loaded');
    loader.classList.add('done');
  }
  // safety: never trap the user behind the loader
  setTimeout(finish, 11000 * slow);

  /* ---------- dark cover canvas (replaces any panels) ---------- */
  var ctx = canvas && canvas.getContext('2d');
  var W = 1, H = 1;
  var dpr = Math.min(2, window.devicePixelRatio || 1);
  function paintCover() {
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = INK;
    ctx.fillRect(0, 0, W, H);
  }
  function setSize() {
    if (!canvas) return;
    W = Math.max(1, window.innerWidth); H = Math.max(1, window.innerHeight);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    paintCover();
  }
  setSize();
  window.addEventListener('resize', setSize);

  /* ---------- scramble ---------- */
  var slots = Array.prototype.slice.call(loader.querySelectorAll('.ld-slot'));
  var GLYPHS = ['kgK', 'kgE', 'kgN', 'kgT'];

  if (reduce || !slots.length || !ctx) {
    loader.classList.add('kent-done');
    setTimeout(function () { loader.classList.add('opening'); finish(); }, 400);
    return;
  }

  var boxes = {};
  (function measure() {
    var use = slots[0].querySelector('use');
    GLYPHS.forEach(function (g) {
      use.setAttribute('href', '#' + g);
      var b = use.getBBox();
      boxes[g] = { x: b.x, w: b.width, h: b.height, cx: b.x + b.width / 2 };
    });
    use.setAttribute('href', '#' + slots[0].getAttribute('data-final'));
  })();

  function show(slot, g, mirror) {
    var fin = boxes[slot.getAttribute('data-final')];
    var src = boxes[g];
    var use = slot.querySelector('use');
    use.setAttribute('href', '#' + g);
    var s = fin.h / src.h;
    var t = 'translate(' + (fin.cx - s * src.cx).toFixed(1) + ' 0) scale(' + s.toFixed(3) + ')';
    if (mirror) t += ' scale(-1,1) translate(' + (-(2 * src.x + src.w)).toFixed(1) + ' 0)';
    use.setAttribute('transform', t);
  }
  function lock(slot) {
    var use = slot.querySelector('use');
    use.setAttribute('href', '#' + slot.getAttribute('data-final'));
    use.removeAttribute('transform');
    slot.classList.add('is-locked');
  }

  function typeChong() {
    loader.classList.add('kent-done');
    var types = loader.querySelectorAll('.type');
    if (!types.length) return setTimeout(openSwirl, CARET_HOLD);
    types[types.length - 1].addEventListener('animationend', function () {
      setTimeout(openSwirl, CARET_HOLD);   // caret keeps blinking through this
    }, { once: true });
    setTimeout(openSwirl, (2500 + CARET_HOLD / slow) * slow); // stale-CSS guard
  }

  var tick = 0, locked = 0;
  var iv = setInterval(function () {
    tick++;
    if (tick > PRE_TICKS && (tick - PRE_TICKS) % LOCK_EVERY === 0 && locked < slots.length) {
      lock(slots[locked]);
      locked++;
      if (locked === slots.length) {
        clearInterval(iv);
        setTimeout(typeChong, 150 * slow);
        return;
      }
    }
    for (var i = locked; i < slots.length; i++) {
      var g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      show(slots[i], g, Math.random() < 0.4);
    }
  }, TICK);

  /* ---------- organic blob sweep exit (les-arbres-fruitiers style) ---------- */
  function openSwirl() {
    if (opening || done) return;
    opening = true;
    loader.classList.add('opening');          // logo fades (CSS)
    // body.loaded waits for Phase B so the hero settles during the reveal

    // gooey edge filter - same id the hero uses; reuse or create
    var edgeFilter = 'none';
    if (document.getElementById('fluidEdge')) { edgeFilter = 'url(#fluidEdge)'; }
    else {
      var NS = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('width', '0'); svg.setAttribute('height', '0');
      svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none';
      var f = document.createElementNS(NS, 'filter');
      f.setAttribute('id', 'fluidEdge');
      f.setAttribute('x', '-20%'); f.setAttribute('y', '-20%');
      f.setAttribute('width', '140%'); f.setAttribute('height', '140%');
      f.setAttribute('color-interpolation-filters', 'sRGB');
      var blur = document.createElementNS(NS, 'feGaussianBlur');
      blur.setAttribute('in', 'SourceGraphic');
      blur.setAttribute('stdDeviation', '7');
      blur.setAttribute('result', 'b');
      var cm = document.createElementNS(NS, 'feColorMatrix');
      cm.setAttribute('in', 'b'); cm.setAttribute('type', 'matrix');
      cm.setAttribute('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9');
      f.appendChild(blur); f.appendChild(cm); svg.appendChild(f);
      document.body.appendChild(svg);
      edgeFilter = 'url(#fluidEdge)';
    }

    // organic blob sweep (les-arbres-fruitiers style, theme-colored):
    // Phase A - a lime liquid blob floods in from the top-right corner and
    // covers the screen; Phase B - a second blob follows the same path and
    // peels the lime away, revealing the page. Blob = 9-lobe radial bezier
    // silhouette with a gentle animated wobble, like their Lottie mask.
    var diag = Math.sqrt(W * W + H * H);
    var ox = W * 1.06, oy = -H * 0.06;          // origin just off top-right
    var raf = 0;
    var t0 = performance.now();
    var PHASE_A = 550, PHASE_B = 620;
    var loadedFlagged = false;

    function blobPath(c, R, t, seed) {
      var N = 9;
      var pts = [];
      for (var k = 0; k < N; k++) {
        var phi = (k / N) * Math.PI * 2;
        var wob = 1 + 0.14 * Math.sin(3 * phi + seed + t * 0.002)
                    + 0.08 * Math.sin(5 * phi - seed * 1.7 + t * 0.0016);
        pts.push([ox + R * wob * Math.cos(phi), oy + R * wob * Math.sin(phi)]);
      }
      // smooth closed curve: quadratics through segment midpoints
      c.beginPath();
      var m0 = [(pts[0][0] + pts[N - 1][0]) / 2, (pts[0][1] + pts[N - 1][1]) / 2];
      c.moveTo(m0[0], m0[1]);
      for (k = 0; k < N; k++) {
        var p = pts[k], nx = pts[(k + 1) % N];
        c.quadraticCurveTo(p[0], p[1], (p[0] + nx[0]) / 2, (p[1] + nx[1]) / 2);
      }
      c.closePath();
    }
    function easeInOut(p) { return p * p * (3 - 2 * p); }

    function frame(now) {
      if (done) { cancelAnimationFrame(raf); return; }
      var t = now - t0;

      if (t <= PHASE_A) {
        // lime floods in over the dark cover (logo fading via .opening)
        var R = easeInOut(t / PHASE_A) * diag * 1.35;
        paintCover();
        ctx.globalCompositeOperation = 'source-over';
        // leading-edge fringe, slightly larger, theme-dark tint
        ctx.fillStyle = 'rgba(10,14,26,0.55)';
        blobPath(ctx, R * 1.07, t, 2.1);
        ctx.fill();
        ctx.fillStyle = '#ccff00';
        blobPath(ctx, R, t, 2.1);
        ctx.fill();
      } else {
        // lime peels away along the same diagonal, revealing the page
        if (!loadedFlagged) {
          loadedFlagged = true;
          document.body.classList.add('loaded');   // hero settle + h1 rise now
        }
        var q = Math.min(1, (t - PHASE_A) / PHASE_B);
        var R2 = easeInOut(q) * diag * 1.35;
        // repaint full lime, then erase the follower blob
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#ccff00';
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'destination-out';
        blobPath(ctx, R2, t, 4.7);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        if (q >= 1) { finish(); return; }
      }

      if (t > PHASE_A + PHASE_B + 800) {
        // graceful failsafe
        canvas.style.transition = 'opacity 0.3s';
        canvas.style.opacity = '0';
        setTimeout(finish, 320);
        return;
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }
})();
