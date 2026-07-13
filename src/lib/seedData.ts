import { PortfolioItem, PDFDoc, Testimonial, FAQItem, SectionContent, ServiceItem } from "../types.js";

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: "proj-1",
    title: "NEO-TOKYO: Cyberpunk Drone Chase",
    category: "VFX",
    description: "A fast-paced futuristic cinematic trailer combining full CGI drone designs, real-life Tokyo tracking shots, complex compositing, and sound synthesis.",
    clientName: "Cyberpunk Syndicate",
    date: "2026-04-12",
    softwareUsed: ["After Effects", "Cinema 4D", "Nuke", "DaVinci Resolve"],
    duration: "2 min 15s",
    tags: ["Cyberpunk", "VFX", "Compositing", "Cinematic"],
    videoUrl: "/api/stream-video/neo-tokyo.mp4",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    order: 1
  },
  {
    id: "proj-2",
    title: "Elysian Bloom - Luxury Brand Teaser",
    category: "Commercial",
    description: "Elegant macro liquid simulation and photorealistic gold modeling showcasing the organic design of a luxury cosmetic brand bottle.",
    clientName: "Elysian Paris",
    date: "2026-05-30",
    softwareUsed: ["Blender", "Octane Render", "Premiere Pro", "After Effects"],
    duration: "45s",
    tags: ["Fluid Simulation", "Commercial", "Luxury", "3D Animation"],
    videoUrl: "/api/stream-video/elysian.mp4",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    order: 2
  },
  {
    id: "proj-3",
    title: "The Silent Orbit - Sci-Fi Short",
    category: "Short Films",
    description: "Tense dramatic short depicting an astronaut lost in orbit, featuring advanced color grading, realistic spatial reflections, and immersive audio staging.",
    clientName: "Aether Pictures",
    date: "2026-03-01",
    softwareUsed: ["DaVinci Resolve", "After Effects", "Unreal Engine 5"],
    duration: "5 min 20s",
    tags: ["Sci-Fi", "Grading", "CGI Integration", "Drama"],
    videoUrl: "/api/stream-video/silent-orbit.mp4",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    order: 3
  },
  {
    id: "proj-4",
    title: "Meta-Logo: Quantum Engine",
    category: "Motion Graphics",
    description: "Highly intricate multi-layered brand intro featuring hyper-realistic microchip wiring and quantum state particle streams for a tech leader.",
    clientName: "Quantum Corp",
    date: "2026-06-15",
    softwareUsed: ["After Effects", "Houdini", "Cinema 4D"],
    duration: "15s",
    tags: ["Logo Animation", "Quantum", "Particles", "Tech"],
    videoUrl: "/api/stream-video/meta-logo.mp4",
    thumbnail: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    order: 4
  },
  {
    id: "proj-5",
    title: "Apex Gaming: Ultimate Keycaps Showcase",
    category: "3D",
    description: "Macro industrial design showreel focusing on mechanical key switches, metallic housing, and dynamic typing acoustics.",
    clientName: "Apex Gear",
    date: "2026-02-28",
    softwareUsed: ["Cinema 4D", "Redshift", "Premiere Pro"],
    duration: "1 min 05s",
    tags: ["Industrial", "3D Product", "Haptics", "Showcase"],
    videoUrl: "/api/stream-video/apex.mp4",
    thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    order: 5
  },
  {
    id: "proj-6",
    title: "How Space Travel Will Change by 2050",
    category: "YouTube",
    description: "Full-length educational documentary editing containing bespoke custom infographics, fast-paced overlay cuts, and 4K sound masterclass mixing.",
    clientName: "The Cosmos Channel (2M subs)",
    date: "2026-01-18",
    softwareUsed: ["Premiere Pro", "After Effects", "Photoshop"],
    duration: "12 min 30s",
    tags: ["Documentary", "YouTube Pro", "Infographics", "Retention"],
    videoUrl: "/api/stream-video/cosmos.mp4",
    thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
    order: 6
  }
];

export const DEFAULT_PDFS: PDFDoc[] = [
  {
    id: "pdf-1",
    title: "Frame Forge - Corporate Media Package 2026",
    category: "Package",
    description: "Official agency deck showcasing tiered service offerings, production cycles, pricing matrices, and customization policies.",
    fileUrl: "/api/documents/corporate_package_2026.pdf",
    fileName: "corporate_package_2026.pdf",
    downloadsAllowed: true,
    order: 1
  },
  {
    id: "pdf-2",
    title: "Professional Post-Production Price List",
    category: "Price List",
    description: "Detailed per-minute rate list for audio post-production, multi-camera syncing, standard color grading, and CGI rendering nodes.",
    fileUrl: "/api/documents/price_list_2026.pdf",
    fileName: "price_list_2026.pdf",
    downloadsAllowed: false,
    order: 2
  },
  {
    id: "pdf-3",
    title: "Frame Forge Agency Brochure",
    category: "Brochure",
    description: "A compact booklet describing our visual identity guidelines, hardware suite, team roster, and notable brand collaborations.",
    fileUrl: "/api/documents/agency_brochure.pdf",
    fileName: "agency_brochure.pdf",
    downloadsAllowed: true,
    order: 3
  }
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Alex Rivera",
    company: "Neon Horizon Studios",
    role: "Marketing Director",
    rating: 5,
    comment: "Frame Forge didn't just edit our product launch video, they built an absolute masterpiece. The 3D integration and lighting treatments are indistinguishable from full CGI Hollywood works. Our conversion increased by 40%!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    order: 1
  },
  {
    id: "test-2",
    name: "Marcus Vance",
    company: "Cosmos Channel",
    role: "Lead Creator",
    rating: 5,
    comment: "Working with them was seamless. Retention rates on our latest 15-minute documentary skyrocketed because their pacing, custom maps, and infographic animations are insanely engaging. They have completely forged our channel's aesthetic.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    order: 2
  },
  {
    id: "test-3",
    name: "Samantha Blair",
    company: "Aura Cosmetics",
    role: "Brand Executive",
    rating: 5,
    comment: "The fluid physics simulations they generated for our brand commercial was pure art. Highly communicative, professional, and delivered a 60 FPS cinematic product way before our target timeline. Absolute visual perfectionists.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    order: 3
  }
];

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is your typical turnaround time for a project?",
    answer: "Typical post-production timelines are 3-5 business days for social assets (Reels/TikToks), 7-10 days for standard commercials/corporate promos, and 2-4 weeks for complex VFX/3D-heavy compositions. Every project undergoes initial visual treatment drafts before formal editing begins.",
    order: 1
  },
  {
    id: "faq-2",
    question: "Do you provide professional scriptwriting and storyboarding?",
    answer: "Yes! Part of our 'Forging' package is comprehensive pre-production. We have native scriptwriters and storyboard layout designers who model visual frameworks in wireframes before we shoot, keyframe, or render.",
    order: 2
  },
  {
    id: "faq-3",
    question: "Can I request specific color palettes and audio design?",
    answer: "Absolutely. We provide world-class color grading (using DaVinci Resolve Studio with calibrated OLED monitors) and customized cinematic sound effects (foley, ambient synthesis, custom scores, and full mixing). You can supply reference tracks or visual treatments.",
    order: 3
  },
  {
    id: "faq-4",
    question: "How do you protect project secrecy and corporate files?",
    answer: "We sign custom bilateral NDAs prior to any media transmission. Our local staging servers are secured with encrypted offline nodes, and finished files are streamed securely via encrypted tokens to prevent downloading or external leaks before formal release.",
    order: 4
  }
];

export const DEFAULT_CONTENT: SectionContent = {
  heroTitle: "WE DON'T EDIT VIDEOS.\nWE FORGE EXPERIENCES.",
  heroSubtitle: "FRAME FORGE transforms ordinary footage into cinematic visual stories.",
  aboutTitle: "WHO WE ARE",
  aboutText: "Frame Forge is an elite creative post-production laboratory specializing in high-end CGI, visual effects, and fluid pacing. We partner with leading startups, filmmakers, and digital builders globally to turn standard captures into high-concept artistic campaigns. We operate with cutting-edge workflows to ensure every frame is refined, polished, and powerful.",
  aboutStats: [
    { label: "Cinematic Campaigns Forged", value: "350+" },
    { label: "Active Channels & Brands", value: "85+" },
    { label: "Awwwards & VFX Nominations", value: "14" },
    { label: "Render Engines Running", value: "24/7" }
  ],
  contactEmail: "frameforgestudios.001@gmail.com",
  contactPhone: "",
  contactWhatsapp: "",
  contactInstagram: "https://instagram.com/frameforge",
  contactLinkedIn: "https://linkedin.com/company/frameforge",
  contactLocation: "G-Block, Bandra Kurla Complex, Mumbai, MH, India",
  contactBusinessHours: "Mon - Sat: 10:00 AM - 08:00 PM IST",
  logoUrl: ""
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Premium Video Editing",
    badge: "Editorial",
    desc: "Narrative pacing, seamless multi-cam assembly, and custom sound design.",
    fullDescription: "Our premium editing process focuses on advanced narrative pacing, sound integration, and seamless transitions. We carefully structure your raw footage into high-retention content, selecting perfect key moments and syncing foley, atmospheric music, and dialogues. This ensures maximum pacing, cinematic narrative flow, and high engagement on any viewing platform.",
    iconName: "Film",
    order: 1
  },
  {
    id: "srv-2",
    title: "Bespoke Motion Graphics",
    badge: "Motion Design",
    desc: "Kinetic typography, custom title idents, and dynamic data graphics.",
    fullDescription: "We design tailored motion graphics including kinetic typography, vector layouts, and beautiful animated title designs. From high-energy social hooks to clean infographic overlays, our layouts are tailored to reinforce brand values. Every asset is keyframed customly from scratch, assuring smooth eases and perfect synchronization with your project's pace.",
    iconName: "Layers",
    order: 2
  },
  {
    id: "srv-3",
    title: "VFX & Compositing",
    badge: "Visual Effects",
    desc: "Chroma-key matching, environmental expansions, and digital tracking.",
    fullDescription: "Our VFX suite specializes in seamless green-screen keying, advanced tracking, clean plate camera projections, and digital makeup. We integrate virtual objects and cinematic environmental backdrops to turn low-budget setups into high-concept realities, assuring pixel-perfect compositing, matching lights, grain, and correct spatial focal lengths.",
    iconName: "Sparkles",
    order: 3
  },
  {
    id: "srv-4",
    title: "Product 3D Animation",
    badge: "CGI & 3D",
    desc: "Liquid loops, product rendering, and photorealistic ray-traced materials.",
    fullDescription: "Using state-of-the-art physics solvers, we create mesmerizing liquid simulations, high-fidelity mechanical assemblies, and ultra-realistic material designs. Ideal for cosmetic renders, luxury goods, and tech product teasers, our CGI team leverages global illumination and Ray-Traced engines to construct hyper-tactile promotional loops that look incredibly premium.",
    iconName: "Boxes",
    order: 4
  },
  {
    id: "srv-5",
    title: "Commercials & Teasers",
    badge: "Ads",
    desc: "Short-form cinematic ads and social launch teasers designed to convert.",
    fullDescription: "We edit and direct short-form visual advertisements built to convert. By structuring fast-paced hooks within the first 3 seconds, we create intense, visually saturated commercial sequences. These custom social teasers and product launches are engineered specifically to boost client click-through rates and retain viewers' immediate attention span.",
    iconName: "Target",
    order: 5
  },
  {
    id: "srv-6",
    title: "Color Science & Grading",
    badge: "Color",
    desc: "Bespoke LUT creation, skin recovery, and classic film emulation.",
    fullDescription: "With deep color space transforms, we forge unique look treatments that establish your film's visual tone. Using DaVinci Resolve, we offer skin-tone recovery, custom LUT creation, and cinematic film emulation. This shapes light and shadows, elevating the visual aesthetic of your projects into professional, high-end cinema.",
    iconName: "Palette",
    order: 6
  }
];
