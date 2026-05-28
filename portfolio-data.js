/**
 * Portfolio project details — loaded before script.js.
 * Each key matches a `data-portfolio-id` attribute in the HTML.
 */
// eslint-disable-next-line no-unused-vars
var portfolioDetails = {
    'eda-automation-qa': {
        title: 'EDA QA Automation – Synopsys',
        subtitle: 'Electronic Design Automation – EDA Software Division',
        platforms: 'Platforms: Linux x64 / ARM / PPC / Windows',
        technologies: 'Technologies: Python, bash, Perl, tcl, GitHub Action, Git, Perforce, EDA toolchains (GDSII, OASIS)',
        responsibilities: [
            'Designed and maintained automated test frameworks to validate EDA tools handling layout and binary file formats (GDSII, OASIS, LEF/DEF).',
            'Developed regression systems to test geometric accuracy, layer integrity, and binary consistency across multiple architectures (x86_64, ARM64, PPC64).',
            'Automated functional, performance, and regression tests for high-precision design tools used in semiconductor manufacturing.',
            'Built validation pipelines that ensure bit-level accuracy in file conversions and transformations between multiple design representations.',
            'Collaborated with development teams to identify and resolve cross-platform inconsistencies, improving the stability of critical design tools.',
            'Integrated automated test execution into CI/CD workflows (GitHub Action), enabling nightly test coverage and automated reporting.',
            'Contributed to QA infrastructure improvements — refactored scripts, standardized test frameworks, and optimized log analysis to reduce false positives.',
            'Performed failure pattern analysis and introduced self-verifying tests for geometry-based algorithms, enhancing overall quality metrics.'
        ],
        examples: [
            { title: 'Binary Validation Suite:', description: 'Created a Python-based automation scripts to compare GDSII and OASIS files at a binary and geometric level, ensuring sub-micron precision across different compute platforms.' },
            { title: 'Cross-Platform Regression Framework:', description: 'Built a scalable test system for Linux (ARM, PPC, x86) and Windows that validates end-to-end flow, including file generation, transformation, and visualization.' },
            { title: 'Continuous Quality Dashboard:', description: 'Designed reporting automation that aggregates regression results from distributed systems, enabling QA and dev teams to track accuracy trends over time.' }
        ]
    },
    'layout-portal': {
        title: 'Layout Portal – Synopsys',
        subtitle: 'Automation Engineer – Electronic Design Automation (Internal Tools & Infrastructure)',
        platforms: 'Tech Stack: Python (Flask), JavaScript (Vanilla), MySQL, LSF, Linux',
        technologies: 'Project: Automated Layout Monitoring & Metrics System',
        responsibilities: [
            'Developed an end-to-end web-based automation system named Layout Portal, designed to monitor and analyze layout repositories for EDA design teams.',
            'Built a clean, lightweight vanilla JavaScript interface for browsing and visualizing layout metrics, repository status, and extraction results.',
            'Implemented a Flask-based API with MySQL database, handling real-time updates, task scheduling, and automatic data recovery.',
            'Integrated with LSF (Load Sharing Facility) for distributed task execution, enabling parallel extraction of layout metrics across compute nodes.',
            'Developed continuous repository monitoring that watches multiple EDA layout repositories and detects changes (new layouts, modified cells, or deleted files).',
            'Created dynamic extraction system that triggers user-defined scripts, tools, or commands to extract updated layout metrics automatically on each detected change.',
            'Built self-healing database automation routines that detect and repair missing tables or corrupted entries, ensuring database integrity with zero manual intervention.',
            'Implemented comprehensive reporting with sortable, filterable tables, Excel and CSV export capabilities, and advanced search/filter functionality.'
        ],
        examples: [
            { title: 'System Architecture:', description: 'Built scalable and extensible modular architecture that allows new metric extractors or tool integrations without system downtime. Supports multiple projects and compute environments.' },
            { title: 'Automation Engine:', description: 'Integrated distributed task execution using LSF, enabling parallel extraction of layout metrics across compute nodes for improved performance and scalability.' },
            { title: 'Impact & Achievements:', description: 'Enabled fully automated, 24/7 layout monitoring across multiple design teams with no manual supervision. Reduced layout metric extraction time by over 90%, freeing engineers to focus on analysis. Improved data reliability through automated recovery and consistency checks. Became a central internal portal used by EDA teams for layout verification, performance tracking, and quality reporting.' }
        ]
    },
    'oasis-portal': {
        title: 'Oasis Portal – Synopsys',
        subtitle: 'Automation Engineer – Electronic Design Automation (Internal Tools & Validation Systems)',
        platforms: 'Tech Stack: Python (Flask), JavaScript (Vanilla), MySQL, LSF, Linux',
        technologies: 'Project: Interactive OASIS File Visualization & Validation System',
        responsibilities: [
            'Developed a comprehensive web-based application named Oasis Portal, designed to parse, visualize, and validate OASIS layout files — one of the key binary formats used in EDA workflows.',
            'Implemented a backend parser that decodes OASIS binary files into structured data, displaying their hierarchical content in an interactive tree-style interface.',
            'Built binary-level editing capabilities allowing users to perform direct modifications such as adding, removing, or editing records via drag-and-drop, checkboxes, and context menus.',
            'Implemented real-time validation that automatically highlights structural or binary errors caused by user edits, showing precise feedback on which part of the file becomes invalid.',
            'Developed custom scenario creation system supporting saving modified OASIS files — even those that are intentionally invalid — to enable QA teams to create negative and boundary test cases.',
            'Integrated backend validation scripts executed through LSF, verifying file integrity, record structure, and cross-reference consistency on the fly.',
            'Built full automation and data management with MySQL database integration storing file versions, validation logs, and edit history, making every test case searchable, traceable, and reproducible.',
            'Created responsive vanilla JavaScript frontend for fluid navigation through large hierarchical datasets, supporting advanced search, filtering, and visualization of record relationships.'
        ],
        examples: [
            { title: 'OASIS Parsing & Visualization:', description: 'Implemented a backend parser that decodes OASIS binary files into structured data, displaying their hierarchical content in an interactive tree-style interface for engineers and QA teams.' },
            { title: 'Binary-Level Editing & Validation:', description: 'Built direct modification capabilities with drag-and-drop, checkboxes, and context menus. System automatically highlights structural or binary errors with precise feedback, supporting creation of negative and boundary test cases.' },
            { title: 'Impact & Achievements:', description: 'Provided QA and development teams with a powerful in-house tool for analyzing and experimenting with OASIS layouts at a binary level. Enabled automated validation of malformed or incomplete formats, improving negative testing coverage. Reduced manual test-case preparation time by over 70%. Enhanced debugging and training workflows by offering a visual representation of binary data, bridging the gap between raw file structure and practical EDA tool behavior.' }
        ]
    },
    'ai-agent-integration': {
        title: 'AI Chat & Agent Integration System',
        subtitle: 'Staff Software Engineer scope — QA Automation · Full-Stack · AI agent & workflow automation',
        platforms: 'Tech Stack: LLM APIs, JavaScript, Python, prompt orchestration, workflow automation',
        technologies: 'Project: Embedded AI Chat, Task-Focused Agents, and Skill-File Driven Workflows',
        responsibilities: [
            'Integrated AI chat capabilities directly into internal product and engineering workflows to reduce context-switching and improve team velocity.',
            'Designed and implemented specialized AI agents for focused tasks such as QA analysis, test scenario generation, and delivery support.',
            'Created reusable skill-file architecture to standardize prompts, constraints, and output patterns across teams and use cases.',
            'Built guardrails for response quality, role boundaries, and task-specific behavior to improve reliability in production workflows.',
            'Aligned AI assistant behavior with existing CI/CD and QA processes so teams could adopt AI tooling without disrupting delivery.',
            'Worked cross-functionally with engineering stakeholders to prioritize high-impact agent use cases and rollout plans.'
        ],
        examples: [
            { title: 'AI Chat in Engineering Systems:', description: 'Implemented in-context AI chat experiences that help developers and QA engineers retrieve relevant guidance and execute common tasks from within existing tools.' },
            { title: 'Task-Specific Agent Development:', description: 'Built modular AI agents tailored to practical workflows (quality checks, troubleshooting support, and execution guidance), improving throughput and reducing repetitive manual effort.' },
            { title: 'Skill-File Framework:', description: 'Developed maintainable skill files and conventions that capture team standards and domain knowledge, enabling consistent, repeatable AI-assisted execution across projects.' }
        ],
        image: 'assets/images/Automation-AI.webp'
    },
    chikoja: {
        title: 'Chi Koja — Telegram Bot & Visitor Site',
        subtitle: 'End-to-end automation for a Persian-facing community supergroup in Yerevan — business ads, moderation, and discovery',
        platforms: 'Stack: Python 3.12+, aiogram 3 (async Telegram Bot API), aiohttp, SQLite, Groq (Llama-class LLM), Nginx + TLS webhook, systemd, GitHub Actions deploy',
        technologies: 'Live bot @ChiKojaBot · Visitor site & webhook host: chikoja.payam-dehkordy.com · Repo: github.com/Payam-Dehkordy/ChiKoja',
        responsibilities: [
            'Designed and shipped a production Telegram supergroup bot that runs silently in-channel: deterministic moderation (links, flood, foreign bots on join), optional Groq-powered LLM classification for advertisement vs spam, monthly token budgeting, and duplicate / fuzzy-dedupe guardrails.',
            'Implemented SQLite-backed persistence: tracked messages, escalated /report flow with admin DM notifications, configurable post-retention purge from Telegram while retaining audit rows, and an AI-ingested catalog indexed by a fixed Persian taxonomy (category / subcategory only).',
            'Built private-chat UX with aiogram: /catalog navigates an inline keyboard and forwards original group posts (not bot-generated summaries) so users browse real ads by leaf; DM commands, rules, and help in Persian where appropriate.',
            'Delivered ops-ready deployment: HTTPS webhook behind Nginx, environment-driven configuration, and CI/CD (rsync + service restart) for repeatable releases.',
            'Shipped a static bilingual visitor landing page (English / Persian) served from the same deploy — marketing front door separate from bot runtime.',
        ],
        examples: [
            { title: 'AI + automation boundary:', description: 'LLM used for classification and catalog labeling against an explicit taxonomy; retrieval and browsing stay deterministic (SQLite + forwards) — no chatty LLM in /catalog DM flows.' },
            { title: 'Reliability & cost controls:', description: 'Concurrency limits on Groq calls, UTC-month token ledger, graceful handling when AI is skipped — posts remain visible unless deterministic rules fire.' },
            { title: 'Community fit:', description: 'Tailored for Iranian business listings in Armenia ("Chi? Koja? Yerevan") with operator-tunable moderation and a clear path from public group → private catalog discovery.' },
        ],
        liveUrl: 'https://chikoja.payam-dehkordy.com',
    },
    clienthunter: {
        title: 'ClientHunter — Qualification & Review Platform',
        subtitle: 'Local-first automation pipeline with rule-based scoring, SQLite persistence, and a live operational dashboard',
        platforms: 'Stack: Python 3.12+ (stdlib HTTP / HTML / XML), SQLite, argparse CLI, vanilla JavaScript, threaded local HTTP server, certifi',
        technologies: 'Project: Sitemap-driven ingestion, multi-stage qualification gates, evidence storage, CSV export, and browser-based review UI · Repo: github.com/Payam-Dehkordy/ClientHunter',
        responsibilities: [
            'Designed a modular Python application (domain, network, persistence, services, CLI) for repeatable batch runs with polite request pacing and explicit failure handling.',
            'Built discovery and structured page parsing to extract signals, normalize records, and persist full audit evidence in SQLite.',
            'Implemented rule-based qualification layers (tier detection, recency windows, health checks) so only high-confidence rows surface in the primary dataset.',
            'Delivered a local live report: Python-served static UI, JSON API over SQLite, auto-refresh during runs, and user decision flags that survive re-processing.',
            'Shipped developer ergonomics: exclusive process locking, stale-lock recovery, log tailing, environment-based configuration, and unit tests for qualification logic.',
        ],
        examples: [
            { title: 'Pipeline architecture:', description: 'Separated transport, parsing, classification, and storage so rules evolve without rewriting fetch logic — the same layered style used across other automation projects.' },
            { title: 'Operational dashboard:', description: 'Browser report with filters, freshness controls, qualified-only views, and hide/show decisions — SQLite remains the single source of truth with no generated snapshot drift.' },
            { title: 'Reliability controls:', description: 'Cross-process locks, heartbeat updates during long runs, TLS verification, and graceful shutdown that keeps the review server available after batch completion until the operator exits.' },
        ],
        image: 'assets/images/ClientHunter-logo.svg',
    },
    'maggy-beauty': {
        title: 'Maggy Beauty – E-Commerce Platform',
        subtitle: 'QA Engineer – Maggy Beauty (Startup) - E-commerce Platform (Web & Mobile)',
        platforms: 'Tech Stack: Web (React, HTML/CSS, JS), Backend (Node.js), MySQL, REST API, Payment Gateway Integration',
        technologies: 'Project: End-to-End Manual Testing for Maggy Beauty E-Commerce Platform',
        responsibilities: [
            'Performed comprehensive manual quality assurance for Maggy Beauty, an early-stage startup developing an online beauty and cosmetics store covering product browsing, shopping cart, payment gateway, and order management modules.',
            'Executed end-to-end manual testing across the full customer journey — from registration and product discovery to checkout and order confirmation.',
            'Designed and maintained detailed test plans, cases, and execution reports covering functional, usability, UI, and regression testing.',
            'Conducted cross-browser and device testing to ensure consistent experience across Chrome, Safari, Edge, and mobile devices.',
            'Validated REST API integrations between the frontend, backend, and third-party services such as payment processors and shipping APIs.',
            'Verified database transactions and data consistency for user accounts, product inventory, and order history in MySQL.',
            'Collaborated with developers to reproduce, document, and prioritize defects, ensuring timely fixes in agile development cycles.',
            'Performed UI/UX validation, focusing on responsiveness, accessibility, and visual accuracy against design specifications. Executed smoke, regression, and acceptance testing before each production release to maintain a stable deployment pipeline.'
        ],
        examples: [
            { title: 'Testing Scope & Responsibilities:', description: 'Comprehensive manual testing covering end-to-end customer journey, cross-browser/device compatibility, REST API validation, database integrity verification, and UI/UX validation across web and mobile platforms.' },
            { title: 'Agile Collaboration:', description: 'Worked closely with development team in agile cycles to reproduce, document, and prioritize defects. Established structured QA workflow and documentation process for startup environment.' },
            { title: 'Impact & Achievements:', description: 'Ensured a bug-free launch of the Maggy Beauty e-commerce platform with a 95% reduction in post-release defects. Improved user experience through detailed UI feedback and consistency checks. Contributed to early product success by identifying critical edge-case failures in checkout and API synchronization before public launch.' }
        ]
    },
    'sahakyan-law': {
        title: 'Sahakyan Law Office – Redesign & Redevelopment',
        subtitle: 'Full-stack redevelopment for a corporate law firm in Yerevan',
        platforms: 'Tech Stack: Native PHP 8.2+, modular PHP-rendered pages, vanilla JavaScript, modular CSS, structured data, dynamic sitemap',
        technologies: 'Project: SahakyanLaw.com – WordPress redesign and migration to a native stack with SEO-focused architecture',
        responsibilities: [
            'Redesigned and redeveloped the website from a WordPress-based implementation into a native PHP stack with reusable partials and centralized page metadata.',
            'Built clean, maintainable server-rendered pages with vanilla JavaScript and modular CSS for performance and long-term reliability.',
            'Implemented advanced technical SEO: canonical strategy, Open Graph/Twitter metadata, JSON-LD, robots handling, clean URLs, and dynamic sitemap generation.',
            'Improved information architecture across Home, About, Services, Practice Areas, and Contact pages for clearer user journeys and conversion flow.',
            'Implemented multilingual content architecture (Armenian, English, Persian, and Russian) to support native-language legal service discovery.',
            'Integrated secure contact API capabilities with validation and anti-abuse controls to support production-grade lead capture.',
            'Optimized loading behavior, media strategy, and page rendering for stronger Core Web Vitals and mobile responsiveness.'
        ],
        examples: [
            { title: 'WordPress to Native Stack Migration:', description: 'Replaced a CMS-centric architecture with a modular native PHP codebase and shared configuration system, making future updates faster, safer, and easier to maintain.' },
            { title: 'SEO System Redesign:', description: 'Implemented a full SEO framework including per-page metadata, structured data coverage, social previews, dynamic sitemap support, and indexation controls aligned with search best practices.' },
            { title: 'Business Impact:', description: 'Delivered a faster, more discoverable, and easier-to-manage legal services platform with improved content clarity, stronger technical SEO, and better readiness for continued growth.' }
        ],
        image: 'assets/images/Sahakyan-Law-Office.png',
        liveUrl: 'https://sahakyanlaw.com'
    },
    'neogym-concept': {
        title: 'NeoGym — Fitness Club Website (Concept)',
        subtitle: 'Readable disclosure (humans, crawlers, AI): this URL is a staged portfolio / concept build for demonstration — it is not the official NeoGym commercial website.',
        platforms: 'Stack: PHP 8.x (modular server-rendered pages), vanilla JavaScript, modular CSS, Nginx + PHP-FPM, MySQL · Localization: English (default), Armenian (hy), Russian (ru), Persian (fa) with locale-prefixed routes · Technical SEO: canonical URLs, meta/OG/Twitter, JSON-LD, dynamic sitemap, robots.txt, hreflang alternates where configured · Cloud: Cloudflare (DNS, TLS, caching, WAF) · Hosting: DigitalOcean droplet · Deploy: GitHub Actions + rsync-style releases',
        technologies: 'Live concept demo: https://neogym.payam-dehkordy.com/ — Keywords & topics for search/crawler context (portfolio showcase): NeoGym-style fitness club presentation; gym Yerevan Armenia; memberships, classes, bonuses, locations; multilingual fitness marketing site; internationalization; WebP/static media pipeline — demonstration only, not an endorsement by or official property of a live gym brand.',
        responsibilities: [
            'Built a production-shaped PHP site scaffold (shared partials, centralized config, secure contact API patterns) aligned with maintainable deploy boundaries — intended as a client-ready architecture demo staged on a portfolio subdomain.',
            'Implemented multilingual UX and routing: default English plus Armenian, Russian, and Persian locale segments so content and navigation stay coherent across languages (readable URLs for humans and indexable locale variants for search engines).',
            'Applied multilingual SEO signals: hreflang-style alternate linkage where configured, per-locale page framing, and structured metadata so robots and AI summaries can infer language intent and page relationships.',
            'Engineered edge-to-origin delivery with Cloudflare in front of Nginx + PHP-FPM on a DigitalOcean VPS — TLS, caching policies, and operational hardening consistent with small-business launch patterns.',
            'Automated releases via GitHub Actions so the staged site stays reproducible; documented cutover paths for a future client-owned domain.',
            'Optimized front-end delivery (responsive sections, media discipline, Core Web Vitals-minded loading) for a credible fitness-brand landing experience.',
        ],
        examples: [
            { title: 'Disclosure (please read):', description: 'The deployment at neogym.payam-dehkordy.com is a concept / portfolio demonstration. It may resemble a real-world gym marketing site for showcase purposes, but it should not be mistaken for an official NeoGym corporate or franchise web property unless separately confirmed by the business owner.' },
            { title: 'Localization & URL strategy:', description: 'Beyond translation strings, the site uses locale-aware routing (e.g. /hy/, /ru/, /fa/ prefixes for non-default languages) so Armenian-, Russian-, and Persian-speaking visitors land in-context — important for real gyms in Yerevan serving multilingual members. This also helps crawlers map equivalent pages across languages.' },
            { title: 'Discoverability for robots & AI assistants:', description: 'Human-visible headings and body copy are complemented by machine-readable cues: semantic HTML landmarks, JSON-LD where implemented, Open Graph/Twitter cards for previews, sitemap/robots alignment, and keyword-rich but honest text around fitness club themes (classes, memberships, training, branches in Yerevan) so search engines and AI retrieval can categorize the demo accurately while the disclosure above prevents confusion about authority.' },
        ],
        liveUrl: 'https://neogym.payam-dehkordy.com/',
    },
    'ladyzone-concept': {
        title: 'LadyZone — Studio Website (Concept)',
        subtitle: 'Readable disclosure (humans, crawlers, AI): this URL is a staged portfolio / concept build for demonstration — it is not an official corporate web property unless separately confirmed by the brand owner.',
        platforms: 'Stack: PHP 8.x (modular server-rendered pages), vanilla JavaScript, modular CSS, Nginx + PHP-FPM · Localization: English (default), Armenian (hy), Russian (ru), Persian (fa) with locale-prefixed routes · Technical SEO: canonical URLs, meta/OG/Twitter, JSON-LD, dynamic sitemap, robots.txt · Cloud: Cloudflare (DNS, TLS, caching, WAF) · Hosting: DigitalOcean droplet · Deploy: GitHub Actions + rsync-style releases',
        technologies: 'Live concept demo: https://ladyzone.payam-dehkordy.com/ — Keywords & topics for search/crawler context (portfolio showcase): beauty studio landing page; services, classes, branches/locations map; multilingual marketing site; internationalization; performance-focused server-rendered UI — demonstration only.',
        responsibilities: [
            'Delivered a production-shaped PHP site with reusable partials and shared tokens (CSS + JS) to keep UI behavior consistent across locales and screen sizes.',
            'Implemented multilingual routing and typography scaling for English, Armenian, Russian, and Persian, including RTL support where applicable.',
            'Built interactive homepage sections (hero video, branch selector + map pins, responsive layout tuning) with careful mobile and Safari behavior handling.',
            'Hardened technical SEO and metadata patterns (canonical strategy, social cards, structured data where configured) so the concept is readable by crawlers and AI without misrepresenting authority.',
            'Automated deploys via GitHub Actions to keep the concept demo reproducible and easy to iterate.',
        ],
        examples: [
            { title: 'Disclosure (please read):', description: 'The deployment at ladyzone.payam-dehkordy.com is a concept / portfolio demonstration. It should not be treated as an official LadyZone corporate site unless separately confirmed by the business owner.' },
            { title: 'Multilingual UX (LTR + RTL):', description: 'Locale-prefixed routes and locale-aware typography allow the same layout to work across English, Armenian, Russian, and Persian without breaking spacing or interaction targets.' },
            { title: 'Mobile & Safari quality:', description: 'Special care for real-device behavior: responsive geometry, touch targets, and lifecycle events (e.g., returning to Safari) so the experience stays stable beyond desktop Chrome.' },
        ],
        image: 'assets/images/LadyZone-logo.svg',
        liveUrl: 'https://ladyzone.payam-dehkordy.com/',
    },
    'daily-cups': {
        title: 'Daily Cups – Logo Design',
        subtitle: 'Branding & Logo Design – Daily Cups Take-Away Cafe, Yerevan',
        platforms: 'Tool: Adobe Illustrator',
        technologies: 'Project: Logo Design for Take-Away Cafe',
        responsibilities: [
            'Designed a complete logo identity for Daily Cups, a take-away cafe in Yerevan.',
            'Created brand logo using Adobe Illustrator with focus on modern, appealing design suitable for cafe branding.'
        ],
        examples: [
            { title: 'Design Process:', description: 'Developed logo design using Adobe Illustrator, creating a distinctive brand identity for the take-away cafe that reflects the establishment\'s character and appeal.' }
        ],
        image: 'assets/images/Daily-cups.svg'
    },
    'goldenarms': {
        title: 'GoldenArms – Logo Design',
        subtitle: 'Brand Identity for an Armenian Holding Company',
        platforms: 'Tool: Adobe Illustrator',
        technologies: 'Project: Corporate Logo & Visual Identity System',
        responsibilities: [
            'Designed a distinctive logo and wordmark for GoldenArms, a diversified Armenian holding with logistics, import/export, and investment divisions.',
            'Created a scalable identity system for use across corporate materials, signage, and digital platforms.'
        ],
        examples: [
            { title: 'Concept & Symbolism:', description: "Visually, the logo weaves together the silhouette of Mount Ararat and a winding road. The road, subtly hidden in the mark, alludes to GoldenArms's vital logistics and import/export services. 'Arms' stands as both an abbreviation for 'Armenians' and an embrace—signaling national reach and unity." },
            { title: 'Design Direction:', description: 'Clean geometry, precise spacing, and a restrained gold-on-dark palette convey stability, ambition, and trust—qualities associated with a modern holding company.' },
            { title: 'Applications:', description: 'Crafted responsive variants (primary, compact mark, monochrome) and a minimal usage guide for consistent deployment across print and web.' }
        ],
        image: 'assets/images/GoldenArms.svg'
    },
    'robs-furniture': {
        title: "Rob's Furniture & Mattresses – Shopify E-Commerce",
        subtitle: "Web Developer / Designer – Rob's Furniture & Mattresses (Canada)",
        platforms: "Platform: Shopify – Custom Theme, UI/UX, Payment Integration",
        technologies: "Project: RobsFurniture.ca – Complete Online Store Setup",
        responsibilities: [
            "Led end-to-end Shopify store build: store setup, theme customization, catalog structure, checkout, and launch.",
            "Designed a modern, conversion-driven UI/UX tailored to showcase furniture, promotions, and brand partners.",
            "Imported product data, defined navigation menus & categories, integrated payment, shipping, and tax settings.",
            "Developed promotions & financing banners, featuring 'WE OFFER FINANCING!' integration with Fairstone Financial.",
            "Optimized responsive experience—seamless on desktop, tablet, and mobile with intuitive calls to action.",
            "Configured Shopify domain/hosting, facilitated successful go-live, and monitored key e-commerce KPIs."
        ],
        examples: [
            { title: "Creative Approach:", description: "Married modern e-commerce functionality with the brand's comfort-focused ethos—the homepage greets visitors with 'Discover the Art of Comfort.' Imagery and sectioning prioritize both aesthetics and easy furniture discovery." },
            { title: "Store Structure & Payments:", description: "Built product and collection structure to surface categories like sofas, mattresses, and promotions. Integrated payment/checkout flows tailored to furniture delivery and fulfillment." },
            { title: "Results & Impact:", description: "Launched a stable, scalable Shopify experience. Storefront highlights financing, partner brands, and offers—communicating value to shoppers. Built on a flexible Shopify foundation for future marketing and growth." }
        ]
    },
    'robs-rebrand': {
        title: "Rob's Furniture – Rebrand",
        subtitle: "Branding & Visual Identity Refresh for Canadian Retailer",
        platforms: "Tool: Adobe Illustrator",
        technologies: "Project: Visual Identity System, Logo, and Brand Guide",
        responsibilities: [
            "Spearheaded a comprehensive rebranding for Rob's Furniture, including logo, palette, typography, and branded assets.",
            "Developed a friendlier, modernized look while retaining the brand's warmth and reputation for comfort.",
            "Created assets for multi-channel use (print, web, signage) supporting the brand's next phase of marketing."
        ],
        examples: [
            { title: "Logo Evolution:", description: "The redesigned logo introduces smoother curves and bold type, evoking both approachability and long-lasting comfort. Palette and typographic refresh tie into the store's message: Discover the Art of Comfort." },
            { title: "Visual Elements:", description: "Brand graphics incorporate patterns inspired by furniture textures—softened lines, earth tones, and accent colors. Versioning and lockups support digital and signage applications." },
            { title: "Impact:", description: "Rebrand delivers consistent, relatable visuals that resonate in-store and online. Customers now connect with an updated, contemporary identity without losing the legacy feel of Rob's." }
        ],
        image: "assets/images/Rob's-detail.svg"
    },
    'parsa-world-rebrand': {
        title: 'Parsa World Agency – Rebrand',
        subtitle: 'Visual Identity Refresh for Digital & Social Platforms',
        platforms: 'Tool: Adobe Illustrator',
        technologies: 'Project: Logo Modernization and Brand Consistency',
        responsibilities: [
            'Refined the core Parsa World Agency logo, modernizing its shape for digital and social branding.',
            'Preserved key legacy elements so the visual lineage and existing brand recognition are retained.',
            'Adapted the logo to a circular format, improving its fit and appearance for avatars, app icons, and responsive web contexts.'
        ],
        examples: [
            { title: 'Legacy Meets Modern:', description: 'The new design preserves the spirit and color palette of the original rectangular logo while evolving to a contemporary, round layout—perfect for social profiles and device/app interfaces.' },
            { title: 'Strategic Adaptation:', description: 'A circular mark integrates more naturally into today\u2019s round-cornered or circular UI environments. The update ensures the brand looks cohesive across platforms.' },
            { title: 'Brand Consistency:', description: 'By carefully modernizing the form while honoring brand history, the identity remains credible and instantly recognizable, but feels current on every platform.' }
        ],
        image: 'assets/images/Parsa-detail.png'
    }
};
