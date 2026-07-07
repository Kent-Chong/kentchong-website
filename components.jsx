/* components.jsx — section components for kentchong.com KINETIC */

const { useState: _cState, useEffect: _cEffect, useRef: _cRef } = React;

/* ---------- section header ---------- */
function SHead({ idx, title, tag }) {
  return (
    <div className="s-head">
      <div className="idx reveal">{idx}</div>
      <h2 className="ttl reveal d1">{title}</h2>
      <div className="tag reveal d2">{tag}</div>
    </div>
  );
}

/* ---------- nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = _cState(false);
  const onDark = useNavOnDark();
  const ctaRef = useMagnetic(0.4);
  _cEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const cls = "nav" + (scrolled ? " scrolled" : "") + (onDark ? " on-dark" : "");
  return (
    <nav className={cls}>
      <a className="brand" href="#top" aria-label="Kent Chong — home">
        <KCWordmark markSize={32} tile={true} />
        <span className="status"><span className="dot" />KL</span>
      </a>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#craft">Craft</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#lab">Lab</a></li>
      </ul>
      <a className="nav-cta magnetic" href="#contact" ref={ctaRef}>Get in touch →</a>
    </nav>
  );
}

/* ---------- hero ---------- */
function Hero({ tagline }) {
  const words = window.SITE_DATA.ROTATOR_WORDS;
  const [idx, setIdx] = _cState(0);
  const [leaving, setLeaving] = _cState(null);
  const btnA = useMagnetic(0.3);
  const btnB = useMagnetic(0.3);

  _cEffect(() => {
    if (window.PRM_MOTION) return;
    const t = setInterval(() => {
      setLeaving(idx);
      setTimeout(() => { setIdx((i) => (i + 1) % words.length); setLeaving(null); }, 480);
    }, 2400);
    return () => clearInterval(t);
  }, [idx, words.length]);

  // widest word sets the slot width so layout doesn't jump
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <header className="hero" id="top">
      <HeroReveal src="assets/hero-bg.png" />
      <div className="hero-veil" />
      <div className="shell" style={{ width: "100%", display: "flex", flexDirection: "column", flex: 1 }}>
        <div className="hero-top">
          <div className="ht-meta">
            <span className="eyebrow">Full Stack Developer · Data &amp; AI Coach</span>
            <span className="mono" style={{ color: "var(--ink-mut)" }}>↳ kentchong.com</span>
          </div>
          <div className="ht-loc">
            Greater Kuala Lumpur<br />Open for select work<br />{new Date().getFullYear()}
          </div>
        </div>

        <div className="hero-inner">
          <div className="hero-headline">
            <h1>
              <span className="line"><span>I build</span></span>
              <span className="line">
                <span>
                  <span className="rotator">
                    <span className="slot" style={{ minWidth: `${widest.length}ch` }}>
                      {words.map((w, i) => {
                        let c = "";
                        if (i === idx && leaving !== idx) c = "is-active";
                        if (i === leaving) c = "is-leaving";
                        return <span key={w} className={c}>{w}<span style={{ color: "var(--ink)" }}>.</span></span>;
                      })}
                    </span>
                  </span>
                </span>
              </span>
            </h1>
          </div>
        </div>

        <div className="hero-foot">
          <div>
            <p className="hero-tagline"><strong>{tagline}</strong> Full stack apps, data analytics, and AI training cohorts — built and taught from Kuala Lumpur.</p>
            <div className="hero-cta-row">
              <a className="btn primary magnetic" href="#work" ref={btnA}><span className="btn-l">See the work</span></a>
              <a className="btn magnetic" href="#craft" ref={btnB}><span className="btn-l">The craft</span></a>
            </div>
          </div>
          <div className="hero-scrollcue">
            <span>Scroll</span>
            <div className="ln" />
          </div>
        </div>
      </div>
      <HeroPortrait src="assets/kent-portrait.png" />
    </header>
  );
}

/* ---------- about ---------- */
function About() {
  return (
    <section className="s shell" id="about" data-lightzone-end>
      <SHead idx="01 — About" title={<>The craft I'm <em>keeping</em>.</>} tag="The story" />
      <div className="about-body">
        <div className="about-main reveal">
          <p className="about-lead">
            I build software with <span className="accent">AI</span> — and coach people to do the same.
          </p>
          <div className="about-text">
            <p>
              My week splits between two benches. At <span className="mark">Gruda Technologies</span> I work as a
              full stack developer and data analyst — web apps for client businesses, data pipelines, dashboards,
              and thebingo.ai, an AI-driven analytics platform. At <span className="mark">LEAD</span> I coach
              corporate professionals through four certified AI tracks: Automation, Data Science, Vibe Coding,
              and Data Engineering.
            </p>
            <p>
              I build the way I teach: AI-assisted from the first line. Spec it, prompt it, evaluate it, harden it —
              <span className="mark"> vibe coding</span> done as engineering, not luck. n8n handles the automation
              between the apps.
            </p>
            <p>
              Before code I built other things — rail lines as a <span className="mark">civil engineer</span>,
              RM120 million in property sales leading a team of seven. That range is the footnote, not the headline:
              it's why I can talk to the engineer and the boardroom in the same meeting. The craft I'm mastering
              now is this one, and I'm not changing benches again.
            </p>
            <p className="about-sig">— Kent</p>
          </div>
        </div>
        <aside className="about-aside reveal d2">
          <div className="row"><span className="k">Now</span><span className="v">Full Stack Dev · AI Coach</span></div>
          <div className="row"><span className="k">At</span><span className="v">Gruda · LEAD</span></div>
          <div className="row"><span className="k">Based</span><span className="v">Greater KL</span></div>
          <div className="row"><span className="k">Focus</span><span className="v">Web apps · Data · AI</span></div>
          <div className="row"><span className="k">Teaching</span><span className="v">4 certified AI tracks</span></div>
        </aside>
      </div>
    </section>
  );
}

/* ---------- the craft (three pillars) ---------- */
function Craft() {
  const caps = [
    { tag: "Build", h: "Full stack web apps, shipped with AI.", p: "Client business apps end to end — frontend, backend, deploy. I vibe code with discipline: spec, prompt, evaluate, harden. n8n automations glue the systems together.", li: ["JavaScript · React · Node", "Vibe coding workflow", "n8n AI automation", "Netlify · serverless"] },
    { tag: "Analyze", h: "Data that survives contact with the business.", p: "Pipelines, validation, dashboards. I write the SQL, design the schema, and own the gap between what stakeholders ask for and what the numbers will actually support. thebingo.ai is this craft, productized.", li: ["SQL · Python", "Looker Studio · QuickSight", "Pipelines & validation", "thebingo.ai"] },
    { tag: "Coach", h: "The method, taught hands-on.", p: "Certified AI training for corporate professionals and senior leaders at LEAD. The wins come from turning theory into something a Monday morning can absorb.", li: ["AI Automation", "AI Data Science & Analytics", "AI Vibe Coding", "AI Data Engineering"] },
  ];
  return (
    <section className="s shell" id="craft">
      <SHead idx="02 — The craft" title={<>Build. Analyze. <em>Coach</em>.</>} tag="One discipline" />
      <div className="cap-grid">
        {caps.map((c, k) => (
          <div className={"cap reveal d" + (k + 1)} key={k}>
            <span className="tag">{c.tag}</span>
            <h3>{c.h}</h3>
            <p>{c.p}</p>
            <ul>{c.li.map((x, j) => <li key={j}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- how I build (method, GSAP scrub) ---------- */
function Method() {
  const steps = [
    { n: "01", h: "Spec",     p: "Write the contract first. What it does, what done means, what can break." },
    { n: "02", h: "Prompt",   p: "Vibe code against the spec — AI writes fast, I steer. Small pieces, tight loops." },
    { n: "03", h: "Evaluate", p: "Read every line that matters. Test the paths the money and the data travel." },
    { n: "04", h: "Harden",   p: "Auth, validation, error paths, monitoring — the unglamorous 20% that makes it real." },
    { n: "05", h: "Ship",     p: "Deploy, instrument, watch. n8n automates whatever repeats." },
  ];
  const ref = useStepScrub();
  return (
    <section className="s shell" id="method">
      <SHead idx="04 — Method" title={<>Vibe coding, as <em>engineering</em>.</>} tag="How I build" />
      <div className="method">
        <div className="mt-intro reveal">
          <p>
            "Vibe coding" gets dismissed as luck. Done properly it's a discipline — the AI supplies
            speed, the engineer supplies judgment. This is the loop I run on every build, and the
            one I teach in the AI Vibe Coding track.
          </p>
        </div>
        <div className="mt-steps" ref={ref}>
          <div className="mt-line" aria-hidden="true"><i /></div>
          {steps.map((s, k) => (
            <div className="mt-step" key={k}>
              <span className="n">{s.n}</span>
              <div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- craftsman mindset (ethos) ---------- */
function Craftsman() {
  return (
    <section className="s shell" id="ethos">
      <SHead idx="05 — Ethos" title={<>Skills over <em>passion</em>.</>} tag="Core value" />
      <div className="craft">
        <div className="craft-lead reveal">
          <p>
            I changed materials for ten years.<br />This is the one I'm keeping.
          </p>
        </div>
        <div className="craft-body reveal d1">
          <p>
            The advice to chase what you love gets the order backwards. Passion is the
            <span className="mark"> output</span> of getting genuinely good at something rare and
            valuable — not the input you start with. So I bet on the work itself: deliberate
            practice, real reps, skills that compound.
          </p>
          <p>
            For a decade that meant stacking <span className="mark">career capital</span> across
            structures, sales, and data. Now the capital is spent — on this bench. Building software
            with AI, making data useful, teaching the method. Same seat every morning, deliberately,
            for the long term. Depth is the point now.
          </p>
          <a className="craft-cta" href="articles/craftsman-mindset.html">Read the essay →</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- before code (the decade as a spinning 3D cube) ----------
   A three.js cube floats and spins; each face is a career era. Hovering a
   face stops the cube and projects that era's detail card (keyed remount
   restarts the flash animation). */
function BeforeCode() {
  const eras = window.SITE_DATA.BEFORE;
  const [active, setActive] = _cState(0);
  const b = eras[active];
  return (
    <section className="s shell" id="before">
      <SHead idx="06 — Foundation" title={<>Before <em>code</em>.</>} tag="2012 → 2022" />
      <div className="before-intro reveal">
        <p>Ten years of other benches. Each one pays into this one. Spin the cube — hover a face to open it.</p>
      </div>
      <div className="before-3d reveal">
        <div className="before-cube">
          <CareerCube eras={eras} onEra={setActive} />
        </div>
        <div className="bf bf-card" key={active} role="status" aria-live="polite">
          <div className="bf-years">{b.years}</div>
          <div className="bf-label">{b.label}</div>
          <p>{b.line}</p>
          <ul>{b.receipts.map((r, j) => <li key={j}>{r}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- stack ---------- */
function Stack() {
  const items = window.SITE_DATA.STACK;
  const doubled = [...items, ...items];
  return (
    <section className="s shell" id="stack">
      <SHead idx="07 — Toolkit" title={<>What I <em>reach for</em>.</>} tag="Daily drivers" />
      <div className="stack reveal">
        <div className="stack-track">
          {doubled.map((it, k) => (
            <span className="item" key={k}>
              <span className="tg">{it.tag}</span>{it.name}<span className="dot">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- work ---------- */
function Work() {
  return (
    <section className="s shell" id="work">
      <SHead idx="03 — Selected" title={<>Some of what I've <em>shipped</em>.</>} tag="Case studies in progress" />
      <div className="work-grid">
        {window.SITE_DATA.WORK.map((w, i) => {
          const live = !w.stamp.toLowerCase().includes("soon");
          const Tag = w.url ? "a" : "article";
          const extra = w.url ? { href: w.url, target: "_blank", rel: "noreferrer noopener" } : {};
          return (
            <Tag className="work reveal" key={i} {...extra}>
              <div className={"thumb" + (w.img ? " has-img" : "")}>
                {w.img && <img src={w.img} alt={w.title} className="thumb-img" />}
                {w.img && <div className="thumb-veil" />}
                {!w.img && <span className="big-n">{String(i + 1).padStart(2, "0")}</span>}
                <span className={"stamp" + (live ? " live" : "")}>{w.stamp}</span>
              </div>
              <div className="lbl"><span>{w.label}</span><span>→</span></div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- services ---------- */
function Services() {
  return (
    <section className="s shell" id="services">
      <SHead idx="08 — Together" title={<>Available <em>for</em>.</>} tag="Services" />

      <div className="services">
        <div className="svc-intro reveal">
          <p>
            I take on a small number of engagements at a time — usually one coaching cohort and one build in parallel.
            If you need a web app built, workflows automated, analytics that actually drive decisions, or a team
            trained to use AI properly, talk to me early.
          </p>
        </div>
        <div className="svc-list reveal d1">
          {window.SITE_DATA.SERVICES_OFFERED.map((s, i) => (
            <a className="svc-row" href="#contact" key={i}>
              <div className="n">{String(i + 1).padStart(2, "0")}</div>
              <div><div className="nm">{s.name}</div><div className="ds">{s.desc}</div></div>
              <div className="ar">→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- lab ---------- */
function Lab() {
  const PRESETS = [
    "Summarize what Kent builds, in three honest bullets.",
    "Pitch Kent's AI Vibe Coding course to a skeptical CTO in two sentences.",
    "What did Kent do before code?",
  ];
  // Playful status lines cycled while the model thinks.
  const THINKING = [
    "Reading Kent's context…",
    "Consulting the neurons…",
    "Weighing a few honest words…",
    "Composing a reply…",
  ];
  const [prompt, setPrompt] = _cState(PRESETS[0]);
  const [output, setOutput] = _cState("");
  const [loading, setLoading] = _cState(false);
  const [typing, setTyping] = _cState(false);
  const [phase, setPhase] = _cState(0);
  const typeTimer = _cRef(null);
  const phaseTimer = _cRef(null);

  // Type text out char-by-char (fast); honor reduced-motion by dumping it.
  const typeOut = (text) => {
    clearInterval(typeTimer.current);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !text) { setOutput(text); setTyping(false); return; }
    setTyping(true);
    let i = 0;
    typeTimer.current = setInterval(() => {
      i += 2; // 2 chars/tick @ 12ms ≈ fast but readable
      setOutput(text.slice(0, i));
      if (i >= text.length) { clearInterval(typeTimer.current); setOutput(text); setTyping(false); }
    }, 12);
  };

  _cEffect(() => () => { clearInterval(typeTimer.current); clearInterval(phaseTimer.current); }, []);

  const run = async () => {
    if (!prompt.trim() || loading) return;
    clearInterval(typeTimer.current);
    setLoading(true); setTyping(false); setOutput(""); setPhase(0);
    phaseTimer.current = setInterval(() => setPhase((p) => (p + 1) % THINKING.length), 1400);
    try {
      // Calls the serverless proxy (api/complete.js), which holds the API key
      // and the site context server-side. Client sends only the user's prompt.
      const r = await fetch("/api/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await r.json();
      const text = data.text || data.error || "// no response — try again.";
      clearInterval(phaseTimer.current);
      setLoading(false);
      typeOut(text);
      // GA4: lightweight prompt event (preview only; full text logged server-side).
      if (window.gtag) window.gtag("event", "prompt_run", {
        prompt_preview: prompt.slice(0, 100),
        prompt_len: prompt.length,
        is_preset: PRESETS.includes(prompt),
        ok: !data.error,
      });
    } catch (e) {
      clearInterval(phaseTimer.current);
      setLoading(false);
      typeOut("// network error — try again in a moment.");
    }
  };
  const onKey = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") run(); };

  return (
    <section className="s shell" id="lab">
      <SHead idx="09 — Prompt lab" title={<>Talk to my <em>site</em>.</>} tag="Live · powered by Claude" />
      <div className="lab">
        <div className="lab-intro reveal">
          <p>
            A small demo: this box calls a language model with context about me. Ask it to summarize my work,
            draft a pitch for a coaching session, or roast my career path. It's a tiny version of the AI-into-workflow
            integration I build for clients.
          </p>
          <p style={{ marginTop: 18, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mut-on)" }}>
            Try a preset, or write your own.
          </p>
        </div>
        <div className="lab-card reveal d1">
          <div className="head"><span>claude · kentchong.com/lab</span><span className="dots"><span /><span /><span /></span></div>
          <label>Presets</label>
          <div className="presets">{PRESETS.map((p, i) => <button key={i} onClick={() => setPrompt(p)}>{`0${i + 1}`}</button>)}</div>
          <label>Your prompt</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={onKey} rows={3} placeholder="ask anything about Kent…" />
          <div className="actions">
            <span className="hint">⌘/Ctrl + Enter to run</span>
            <button className="run" onClick={run} disabled={loading}>{loading ? "Thinking…" : "Run prompt →"}</button>
          </div>
          <div className={"out" + (output || loading ? "" : " empty")}>
            {loading
              ? <span className="thinking"><span className="tdots"><i /><i /><i /></span>{THINKING[phase]}</span>
              : (output || "// output appears here")}
            {typing && <span className="cur" />}
          </div>
          <p style={{ marginTop: 12, fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mut-on)" }}>
            Prompts are logged anonymously to improve this demo.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- credentials ---------- */
function Credentials() {
  const D = window.SITE_DATA;
  return (
    <section className="s shell" id="credentials">
      <SHead idx="10 — Record" title={<>Papers &amp; <em>proofs</em>.</>} tag="Formal record" />
      <div className="cred">
        <div className="cred-col reveal">
          <h3>Education</h3>
          <ul>{D.EDUCATION.map((e, i) => <li key={i}>{e.name}<span className="meta">{e.from} · {e.years}</span></li>)}</ul>
        </div>
        <div className="cred-col reveal d1">
          <h3>Certifications</h3>
          <ul>{D.CERTS.map((c, i) => <li key={i}>{c.name}<span className="meta">{c.from}</span></li>)}</ul>
        </div>
        <div className="cred-col reveal d2">
          <h3>Languages</h3>
          <ul>{D.LANGUAGES.map((l, i) => <li key={i}>{l.name}<span className="lvl">{l.level}</span></li>)}</ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- writing ---------- */
function Writing() {
  return (
    <section className="s shell" id="writing">
      <SHead idx="11 — In public" title={<>Working it out <em>in public</em>.</>} tag="Drafts · talks · notes" />
      <div className="wlist reveal">
        {window.SITE_DATA.WRITING.map((w, i) => {
          const Tag = w.url ? "a" : "div";
          const extra = w.url ? { href: w.url } : {};
          return (
            <Tag className="wrow" key={i} {...extra}>
              <div className="date">{w.date}</div>
              <div className="ttl">{w.title}</div>
              <div className="where">{w.where}</div>
              <div className="ar">→</div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- personal ---------- */
function Personal() {
  return (
    <section className="s shell" id="personal">
      <SHead idx="12 — Off-clock" title={<>Outside the <em>CV</em>.</>} tag="Personal" />
      <div className="personal">
        <h3 className="ph reveal">A working spec for the human, not the résumé.</h3>
        <div className="items reveal d1">
          {window.SITE_DATA.PERSONAL.map((p, i) => (
            <div className="item" key={i}><div className="k">{p.k}</div><div className="v">{p.v}</div></div>
          ))}
        </div>
        <div className="hobby-grid reveal d2">
          {window.SITE_DATA.HOBBIES.map((h, i) => (
            <div className="hobby-card" key={i}>
              <span className="hobby-icon">{h.icon}</span>
              <div className="hobby-label">{h.label}</div>
              <div className="hobby-desc">{h.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */
function Contact() {
  const m = useMagnetic(0.18);
  return (
    <section className="s shell contact" id="contact">
      <img className="contact-wm" src="assets/kc-wordmark-white.png" alt="" aria-hidden="true" draggable="false" />
      <SHead idx="13 — Inbox open" title={<>Let's build <em>something</em>.</>} tag="Get in touch" />
      <h2 className="big reveal">
        Email <a href="mailto:kennethcmk12@gmail.com" className="magnetic" ref={m}>kennethcmk12@gmail.com</a> — I read every note.
      </h2>
      <div className="small reveal d1">
        <div className="lnk"><span className="k">Email</span><a href="mailto:kennethcmk12@gmail.com">kennethcmk12@gmail.com</a></div>
        <div className="lnk"><span className="k">LinkedIn</span><a href="https://www.linkedin.com/in/kent-chong" target="_blank" rel="noreferrer">/in/kent-chong</a></div>
        <div className="lnk"><span className="k">GitHub</span><a href="https://github.com/Kent-Chong" target="_blank" rel="noreferrer">/Kent-Chong</a></div>
        <div className="lnk"><span className="k">Location</span><a>Greater KL</a></div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="foot">
      <div className="kc-wordmark" style={{ gap: 10 }}><KCMark size={26} variant="tile" /><span className="kc-name" style={{ fontSize: 18 }}>Kent Chong</span></div>
      <div className="easter">psst — type <b>build</b></div>
      <div>© {new Date().getFullYear()} · Built by hand</div>
    </footer>
  );
}

/* ---------- easter egg ---------- */
function Egg() {
  const [open, setOpen] = _cState(false);
  const buf = _cRef("");
  _cEffect(() => {
    const onKey = (e) => {
      if (open && e.key === "Escape") { setOpen(false); return; }
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : "";
      buf.current = (buf.current + k).slice(-8);
      if (buf.current.endsWith("build")) setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <div className={"egg" + (open ? " open" : "")} onClick={() => setOpen(false)}>
      <div className="inner" onClick={(e) => e.stopPropagation()}>
        <h3>You found it.</h3>
        <p>// entered via <span className="key">b</span><span className="key">u</span><span className="key">i</span><span className="key">l</span><span className="key">d</span></p>
        <p>A note from inside the workshop: this site is hand-built, every line reasoned over — the same way I'd build a data pipeline, a sales motion, or a five-storey commercial building in Holland Village.</p>
        <p>If you found this and you're hiring, mentoring, or want to build something together — mention <b>"the workshop"</b> when you email <b>kennethcmk12@gmail.com</b>. I'll know.</p>
        <button className="close" onClick={() => setOpen(false)}>Close workshop</button>
      </div>
    </div>
  );
}

Object.assign(window, {
  SHead, Nav, Hero, About, Craft, Method, Craftsman, BeforeCode, Stack, Work,
  Services, Lab, Credentials, Writing, Personal, Contact, Footer, Egg,
});
