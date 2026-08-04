/* Data for the site — single source of truth */

/* The seven years before code, compressed to three beats.
   Full detail lives in the résumé, not the homepage. */
const BEFORE = [
  {
    years: "2015 — 2018",
    label: "Engineering",
    line: "Civil engineer. Construction sites first, then structural design. Learned that intent only counts once someone can walk into it.",
    receipts: [
      "MRT Line 2 · River of Life · KTM Gemas–JB · structural design",
      "5-storey build, 3 basements · Holland Village, Singapore",
      "Supervised 12 contractors · 82-pt CONQUAS score",
      "Mentored junior engineers & interns",
      "MEng Industrial Mgmt · BEng Civil Engineering",
    ],
  },
  {
    years: "2018 — 2022",
    label: "Markets",
    line: "International B2B marketing, then real estate, leading a team of seven. Learned that systems only work if a human wants to use them.",
    receipts: [
      "B2B marketing across 15+ countries",
      "Exhibited: SIAL Paris · GULFOOD Dubai · FOOD EXPO HK",
      "Led team of 7 · trained core team of 3",
      "RM120M group sales · 2021",
      "Top Project Sales Award · RM24M in one project",
    ],
  },
  {
    years: "2022 — now",
    label: "Data & AI",
    line: "The bench I stopped changing. Data analyst and full stack developer at Gruda Technologies; AI coach at LEAD. Building, data, and AI in one job.",
    receipts: [
      "thebingo.ai · conversational BI, live",
      "Full stack client apps · auth, data models, deploys",
      "Data pipelines · SQL · Python · Java",
      "Dashboards · Looker Studio · AWS QuickSight",
      "AI automation with n8n · production prompt design",
      "LEAD · 4 certified AI coaching tracks",
    ],
  },
];

const STACK = [
  { name: "JavaScript · React", tag: "Code" },
  { name: "Node.js", tag: "Code" },
  { name: "SQL", tag: "Data" },
  { name: "Python", tag: "Code" },
  { name: "n8n", tag: "Automation" },
  { name: "Prompt Engineering", tag: "AI" },
  { name: "Claude · GPT APIs", tag: "AI" },
  { name: "Looker Studio", tag: "Viz" },
  { name: "AWS QuickSight", tag: "Viz" },
  { name: "Data Pipelines", tag: "Systems" },
  { name: "GSAP", tag: "Frontend" },
  { name: "Netlify", tag: "Ship" },
];

const CERTS = [
  { name: "B2B Marketing Foundations", from: "LinkedIn Learning" },
  { name: "Content Marketing Foundations", from: "LinkedIn Learning" },
  { name: "Marketing Foundations: The Marketing Funnel", from: "LinkedIn Learning" },
  { name: "Lead Generation Foundations", from: "LinkedIn Learning" },
];

const EDUCATION = [
  { name: "Master of Engineering, Industrial Management", from: "Universiti Putra Malaysia", years: "2016 — 2018" },
  { name: "Bachelor of Engineering, Civil Engineering",  from: "Infrastructure University Kuala Lumpur", years: "2011 — 2014" },
];

const LANGUAGES = [
  { name: "English",   level: "Professional" },
  { name: "Mandarin",  level: "Native" },
  { name: "Cantonese", level: "Native" },
  { name: "Malay",     level: "Professional" },
];

const SERVICES_OFFERED = [
  { name: "Web App Development",      desc: "Full stack builds for client businesses. Scoped, shipped, maintained" },
  { name: "AI Automation",            desc: "n8n workflows that take the repetitive work off your team's plate" },
  { name: "Analytics & Dashboards",   desc: "Raw events to decisions. Pipelines into Looker Studio & QuickSight" },
  { name: "Corporate AI Training",    desc: "Four certified tracks: Automation · Data Science · Vibe Coding · Data Engineering" },
  { name: "AI Integration Consulting", desc: "Production-grade prompts and AI features inside your existing systems" },
];

const WORK = [
  {
    label: "01 / AI Analytics Platform",
    title: "thebingo.ai · Conversational BI",
    desc:  "An AI analytics app I build on. Ask it a business question and it generates the dashboards, the insights, and what it thinks you should do about it. It's the one project where all three parts of my job meet: the full stack build, the analytics engine, and AI that has to survive real users.",
    stamp: "Live",
    url:   "https://thebingo.ai",
    img:   "assets/portfolio-bingoai.webp",
  },
  {
    label: "02 / Vibe Coding × Automation",
    title: "Web apps shipped with AI, wired by n8n",
    desc:  "Internal tools and client-facing apps built through an AI-assisted loop: spec, prompt, evaluate, ship. n8n handles the automation around them, from intake and enrichment through notifications and reporting. The same method I teach, running in production.",
    stamp: "Method",
    img:   "assets/portfolio-2.webp",
  },
  {
    label: "03 / Client Builds",
    title: "Business web apps for real operations",
    desc:  "End-to-end builds for client businesses. Operations, booking, and reporting tools, with the parts nobody demos done properly: auth, data models, deploys, analytics wired in from day one. Case studies in write-up; names on request.",
    stamp: "Shipped",
    img:   "assets/portfolio-1.webp",
  },
  {
    label: "04 / Coaching Program",
    title: "AI cohorts for corporate professionals",
    desc:  "Certified training I co-deliver at LEAD covering AI Automation, AI for Data Engineering, AI for Data Science and Analytics, and AI Vibe Coding. Built for professionals who have to use these tools on Monday morning.",
    stamp: "Recurring",
    img:   "assets/portfolio-coaching.webp",
  },
];

const WRITING = [
  { date: "Jun 2026",  title: "Craft over passion: why I keep changing lanes",             where: "Personal essay",   url: "articles/craftsman-mindset.html" },
  { date: "Jun 2026",  title: "What civil engineering taught me about shipping software",  where: "Personal essay",   url: "articles/civil-engineering-software.html" },
  { date: "Jun 2026",  title: "Prompts as products: designing for evaluation, not vibes",  where: "Field notes",       url: "articles/prompts-as-products.html" },
  { date: "Jun 2026",  title: "The 12-year throughline: how building stays the same",      where: "Personal essay",   url: "articles/twelve-year-throughline.html" },
  { date: "Available", title: "AI Automation for Mid-to-Senior Leaders",                   where: "Workshop · LEAD",  url: "articles/ai-automation-leaders.html" },
];

const PERSONAL = [
  { k: "Based in",      v: "Greater Kuala Lumpur, Malaysia" },
  { k: "Speaks",        v: "English · Mandarin · Cantonese · Malay" },
  { k: "Reads",         v: "Engineering history. Operator memoirs. Anything by Stewart Brand." },
  { k: "Builds on",     v: "Long walks. Strong coffee. Whiteboards before code." },
  { k: "Listens to",    v: "Lo-fi when shipping. Cantopop on the drive home." },
  { k: "Currently",     v: "Building thebingo.ai & client apps at Gruda · coaching four AI tracks at LEAD" },
];

const HOBBIES = [
  { icon: "◎", label: "Sport",      desc: "Basketball · Badminton · Swimming · Billiards" },
  { icon: "⬡", label: "Play",       desc: "Boardgames when the group's free. Karting, recently. Possibly too much." },
  { icon: "◈", label: "Food",       desc: "Makes the effort to find good food in every city. Can cook too." },
  { icon: "◫", label: "Draws",      desc: "Lines on paper. Not always buildings, but usually." },
];

const TAGLINES = [
  "I build software with AI. I coach people to do the same.",
  "Full stack builder. Data analyst. AI coach.",
  "Ship the app. Wire the data. Teach the method.",
  "Engineer by training. Builder by craft.",
];

const ROTATOR_WORDS = [
  "web apps",
  "AI systems",
  "dashboards",
  "automations",
  "builders",
];

// expose globally for other Babel scripts
window.SITE_DATA = {
  BEFORE, STACK, CERTS, EDUCATION, LANGUAGES, SERVICES_OFFERED, WORK,
  WRITING, PERSONAL, HOBBIES, TAGLINES, ROTATOR_WORDS,
};
