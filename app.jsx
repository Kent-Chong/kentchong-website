/* app.jsx — composition, loading, light/dark zones, Direction A/B tweak */

const { useEffect: _aEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dir": "a",
  "accent": "#C7F94B",
  "density": "roomy",
  "tagline": 1,
  "showNumbers": true,
  "showLab": true
}/*EDITMODE-END*/;

const DIR_ACCENT = { a: "#C7F94B", b: "#FF5A1F" };

function accentInk(hex) {
  const h = String(hex).replace("#", "");
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, "0");
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return "#0A0E1A";
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (r * 299 + g * 587 + b * 114) > 140000 ? "#0A0E1A" : "#FFFFFF";
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();
  const prog = useScrollProgress();

  _aEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-dir", t.dir);
    root.setAttribute("data-density", t.density);
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--accent-ink", accentInk(t.accent));
  }, [t.dir, t.density, t.accent]);

  const taglines = window.SITE_DATA.TAGLINES;
  const tagline = taglines[t.tagline % taglines.length];

  // switching direction resets accent to that direction's signature colour
  const setDir = (v) => setTweak({ dir: v, accent: DIR_ACCENT[v] });

  return (
    <>
      <div className="scroll-prog" style={{ width: "100%", transform: `scaleX(${prog})` }} />
      <Nav />

      <div className="lightzone">
        <Hero tagline={tagline} />
        <About />
      </div>

      <div className="seam"><div className="seam-rule" /></div>

      <div className="darkzone">
        {t.showNumbers && <Numbers />}
        <Career />
        <Craftsman />
        <Capabilities />
        <Stack />
        <Work />
        <Services />
        {t.showLab && <Lab />}
        <Credentials />
        <Writing />
        <Personal />
        <Contact />
        <Footer />
      </div>

      <Egg />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Direction">
          <TweakRadio
            label="Style"
            value={t.dir}
            onChange={setDir}
            options={[{ value: "a", label: "Circuit" }, { value: "b", label: "Marque" }]}
          />
        </TweakSection>

        <TweakSection label="Accent">
          <TweakColor
            label="Signal"
            value={t.accent}
            onChange={(v) => setTweak("accent", v)}
            options={["#C7F94B", "#FF5A1F", "#29E0C9", "#FFD23F", "#5B8CFF", "#F2F0E9"]}
          />
        </TweakSection>

        <TweakSection label="Layout">
          <TweakRadio
            label="Density"
            value={t.density}
            onChange={(v) => setTweak("density", v)}
            options={[{ value: "roomy", label: "Roomy" }, { value: "compact", label: "Compact" }]}
          />
          <TweakSelect
            label="Tagline"
            value={String(t.tagline)}
            onChange={(v) => setTweak("tagline", Number(v))}
            options={taglines.map((tg, i) => ({ value: String(i), label: tg }))}
          />
        </TweakSection>

        <TweakSection label="Sections">
          <TweakToggle label="By the numbers" value={t.showNumbers} onChange={(v) => setTweak("showNumbers", v)} />
          <TweakToggle label="Prompt lab" value={t.showLab} onChange={(v) => setTweak("showLab", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
