/* Data for the site — single source of truth */

const TIMELINE = [
  {
    year: "2026",
    yearEnd: "now",
    role: "Coach",
    company: "LEAD",
    material: "people",
    bullets: [
      "Facilitate technical upskilling for corporate professionals and senior executives at multinationals — AI Automation, Data Engineering, Analytics.",
      "Mentor high-performing cohorts through the practical implementation of data-driven solutions.",
      "Partner with Lead Trainers to deliver a premium learning experience — technical troubleshooting, deep-dive discussions.",
      "Bridge theoretical training and real-world application for established industry professionals.",
    ],
  },
  {
    year: "2022",
    yearEnd: "now",
    role: "Data Analyst & Full Stack Developer",
    company: "Gruda Technologies",
    material: "data",
    bullets: [
      "Build analytics solutions in SQL, Python, and Java — extraction, transformation, system logic.",
      "Maintain data pipelines, validation processes, and backend integrations for reliable datasets.",
      "Design interactive dashboards in Looker Studio and AWS QuickSight.",
      "Lead AI automation and transformation work — prompt design, AI capabilities integrated into existing workflows.",
      "Translate business requirements into scalable technical and AI-enabled solutions.",
    ],
  },
  {
    year: "2020",
    yearEnd: "2022",
    role: "Real Estate Consultant · Team Leader",
    company: "Hartamas Real Estate (M) Sdn Bhd",
    material: "sales",
    bullets: [
      "Helped manage a team of 7 across several new condominium developments.",
      "Led a core team of 3 — sales training, character and skill building.",
      "Secured a total of RM120 million in group sales in 2021.",
      "Top Project Sales Award 2021 — RM24 million personal gross sales in a single project.",
      "Ran Facebook and Instagram marketing — content production, copywriting.",
    ],
  },
  {
    year: "2018",
    yearEnd: "2020",
    role: "Marketing Business Development Executive",
    company: "Asia Big Power Sdn Bhd",
    material: "markets",
    bullets: [
      "Marketed company products across 15+ countries with proven sales records.",
      "Expanded distribution into local modern trade markets.",
      "Ran company marketing and branding projects — traditional and digital.",
      "Represented the company at MATRADE international business matching events.",
      "Attended SIAL Paris, SIAL Indonesia, GULFOOD Dubai, FOOD EXPO Hong Kong, MIHAS Malaysia.",
      "Contributed to new product development and market research for F&B.",
    ],
  },
  {
    year: "2016",
    yearEnd: "2018",
    role: "Structural Design Engineer",
    company: "Sepakat Setia Perunding Sdn Bhd",
    material: "structures",
    bullets: [
      "Managed two major project tasks — guiding junior engineers, mentoring interns.",
      "Structural design on MRT Line 2 (Sungai Buloh – Serdang – Putrajaya).",
      "Structural design on the River Of Life (ROL) Project.",
      "Structural design on KTM Gemas – Johor Bahru Line.",
      "Worked across engineering and architecture sectors to deliver projects.",
    ],
  },
  {
    year: "2015",
    yearEnd: "2016",
    role: "Site Engineer",
    company: "Incorporated Builders Pte Ltd · Singapore",
    material: "concrete",
    bullets: [
      "Managed the construction site of a 5-storey commercial building (3 basement levels) at Taman Warna, Holland Village.",
      "Supervised 12 contractors across structural and architectural works — in-house, external, subcontractors.",
      "Achieved an 82-point CONQUAS score from Building and Construction Authority, Singapore.",
    ],
  },
  {
    year: "2012",
    yearEnd: "2014",
    role: "Sales Development Representative",
    company: "Pitaberry Sdn Bhd",
    material: "first sales",
    bullets: [
      "Functioned as sales developer at international events in Malaysia and Singapore.",
      "Participated in local major exhibitions to promote company products.",
      "Responsible for event venue set-up and marketing activities.",
      "Served as Event Treasurer — managed event cash flow.",
    ],
  },
];

const STACK = [
  { name: "SQL", tag: "Data" },
  { name: "Python", tag: "Code" },
  { name: "Java", tag: "Code" },
  { name: "Looker Studio", tag: "Viz" },
  { name: "AWS QuickSight", tag: "Viz" },
  { name: "Prompt Design", tag: "AI" },
  { name: "AI Automation", tag: "AI" },
  { name: "Data Pipelines", tag: "Systems" },
  { name: "Dashboards", tag: "Viz" },
  { name: "Backend Integrations", tag: "Systems" },
  { name: "B2B Marketing", tag: "Growth" },
  { name: "Content Strategy", tag: "Growth" },
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
  { name: "AI & Data Coaching",          desc: "Hands-on cohorts for L&D and senior leaders" },
  { name: "AI Automation Workshops",     desc: "Practical AI adoption in real workflows" },
  { name: "Data Pipeline Consulting",    desc: "Build, validate, instrument" },
  { name: "Analytics Engineering",       desc: "From raw events to executive dashboards" },
  { name: "Prompt Design & Integration", desc: "Production-grade prompts that survive prod" },
];

const WORK = [
  {
    label: "01 / AI Analytics Platform",
    title: "thebingo.ai — Conversational BI",
    desc:  "Built an AI-driven analytics application that scales how business teams interact with data. Auto-generates dashboards, delivers automated insights and strategic recommendations. Acts as an on-demand virtual Data Scientist, bridging raw data and actionable business execution.",
    stamp: "Live",
    url:   "https://thebingo.ai",
    img:   "assets/portfolio-bingoai.png",
  },
  {
    label: "02 / Data Platform",
    title: "Operational dashboards rebuilt on QuickSight",
    desc:  "A migration from manual reports to a single source of truth for ops & sales leadership. Cut weekly reporting time from days to minutes.",
    stamp: "In Progress",
    img:   "assets/portfolio-1.png",
  },
  {
    label: "03 / AI Automation",
    title: "Prompt-driven document workflows",
    desc:  "Designed a library of evaluated prompts integrated into existing pipelines — replacing repetitive analyst work with auditable AI steps.",
    stamp: "In Progress",
    img:   "assets/portfolio-2.png",
  },
  {
    label: "04 / Coaching Program",
    title: "AI Automation cohort for senior leaders",
    desc:  "Certified training courses I co-deliver covering AI Automation, AI for Data Engineering, AI for Data Science and Analytics, and AI Vibe Coding. Built for corporate professionals who need to actually use these tools, not just understand them.",
    stamp: "Recurring",
    img:   "assets/portfolio-coaching.png",
  },
  {
    label: "05 / Real Estate Sales",
    title: "RM120M in group sales · 2021",
    desc:  "Before data. Led a team of 7. The systems thinking I use today started here — leads as a pipeline, conversions as a funnel, training as throughput.",
    stamp: "Past life",
    img:   "assets/portfolio-4.png",
  },
];

const WRITING = [
  { date: "Jun 2026",  title: "Craft over passion — why I keep changing lanes",            where: "Personal essay",   url: "articles/craftsman-mindset.html" },
  { date: "Jun 2026",  title: "What civil engineering taught me about shipping software",  where: "Personal essay",   url: "articles/civil-engineering-software.html" },
  { date: "Jun 2026",  title: "Prompts as products — designing for evaluation, not vibes", where: "Field notes",       url: "articles/prompts-as-products.html" },
  { date: "Jun 2026",  title: "The 12-year throughline — how building stays the same",     where: "Personal essay",   url: "articles/twelve-year-throughline.html" },
  { date: "Available", title: "AI Automation for Mid-to-Senior Leaders",                   where: "Workshop · LEAD",  url: "articles/ai-automation-leaders.html" },
];

const PERSONAL = [
  { k: "Based in",      v: "Greater Kuala Lumpur, Malaysia" },
  { k: "Speaks",        v: "English · Mandarin · Cantonese · Malay" },
  { k: "Reads",         v: "Engineering history. Operator memoirs. Anything by Stewart Brand." },
  { k: "Builds on",     v: "Long walks. Strong coffee. Whiteboards before code." },
  { k: "Listens to",    v: "Lo-fi when shipping. Cantopop on the drive home." },
  { k: "Currently",     v: "Coaching senior leaders on AI adoption · building data systems at Gruda" },
];

const HOBBIES = [
  { icon: "◎", label: "Sport",      desc: "Basketball · Badminton · Swimming · Billiards" },
  { icon: "⬡", label: "Play",       desc: "Boardgames when the group's free. Karting — recent obsession." },
  { icon: "◈", label: "Food",       desc: "Makes the effort to find good food in every city. Can cook too." },
  { icon: "◫", label: "Draws",      desc: "Lines on paper. Not always buildings, but usually." },
];

const TAGLINES = [
  "I build. Bridges, businesses, data, and AI.",
  "From structures to systems.",
  "Engineer by training. Builder by instinct.",
  "Ten years building. Different materials each time.",
];

const ROTATOR_WORDS = [
  "bridges",
  "businesses",
  "pipelines",
  "systems",
  "teams",
  "AI",
];

// expose globally for other Babel scripts
window.SITE_DATA = {
  TIMELINE: TIMELINE.slice().reverse(), STACK, CERTS, EDUCATION, LANGUAGES, SERVICES_OFFERED, WORK,
  WRITING, PERSONAL, HOBBIES, TAGLINES, ROTATOR_WORDS,
};
