import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionTemplate } from "motion/react";
import {
  Terminal,
  ShoppingBag,
  Smartphone,
  Cpu,
  Layers,
  ShieldCheck,
  Check,
  ArrowRight,
  Clock,
  Sparkles,
  Code,
  Settings,
  Play,
  Database,
  AlertTriangle,
  CheckCircle2,
  Globe,
  HelpCircle,
  Lightbulb,
  DollarSign,
  Award,
  TrendingUp,
  Send,
  FileText,
  ChevronRight,
  User,
  Users,
  Briefcase,
  Lock,
  ExternalLink,
  Link2,
  Youtube,
  Facebook,
  Phone,
  CreditCard
} from "lucide-react";

import { services, caseStudies, defaultPythonSnippet } from "./data";
import {
  BlueprintRequest,
  BlueprintResponse,
  DjangoOptimizeRequest,
  DjangoOptimizeResponse,
  CaseStudy
} from "./types";

import { ThreeDBackground } from "./components/ThreeDBackground";
import { ParticleSeparator } from "./components/ParticleSeparator";
import { Hero3DScene } from "./components/Hero3DScene";
import { CodeDiffViewer } from "./components/CodeDiffViewer";
import { AIAssistantChat } from "./components/AIAssistantChat";

// Admin Panel Integration
import { AdminPanel, CorporateProfile, DEFAULT_PROFILE } from "./components/AdminPanel";
import { ExpertAudit } from "./components/ExpertAudit";

// Import generated images for rich storytelling
import djangoBackendImg from "./assets/images/django_backend_1781124397120.png";
import ecommerceCheckoutImg from "./assets/images/ecommerce_checkout_1781124410003.png";
import mobileOfflineImg from "./assets/images/mobile_offline_1781124422469.png";
import saasDashboardImg from "./assets/images/saas_dashboard_1781124434321.png";
import osamaAvatarImg from "./assets/images/osama_avatar_1781124448446.png";
import osamaRealisticAvatarImg from "./assets/images/osama_realistic_avatar_1781223721581.jpg";
import safarAvatarImg from "./assets/images/safar_avatar_1781124464403.png";
import ryanAvatarImg from "./assets/images/ryan_avatar_1781124475112.png";
import saraAvatarImg from "./assets/images/sara_avatar_1781124487502.png";
import alhussienAvatarImg from "./assets/images/alhussien_avatar_1781220394365.jpg";

// 3D Interactive Mouse-Tilt Component with Neon Glare reflection
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  key?: any;
}

function TiltCard({ children, className = "", glowColor = "rgba(6, 182, 212, 0.18)" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Stable phase-shifted floating animation values per instance to prevent sync lock
  const floatDuration = useRef(4.5 + Math.random() * 2).current;
  const floatDelay = useRef(Math.random() * -5).current;

  // Create motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map relative position to degree rotations
  const rotateX = useTransform(y, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-14, 14]);

  // Smooth springs for rotation
  const rotateXSpring = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 150, damping: 20 });

  // Map and smooth glare coordinates
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glareXSpring = useSpring(glareX, { stiffness: 150, damping: 20 });
  const glareYSpring = useSpring(glareY, { stiffness: 150, damping: 20 });

  // Smooth scaling on hover
  const scaleSpring = useSpring(1, { stiffness: 200, damping: 25 });
  // Opacity spring for glare highlight
  const opacitySpring = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Express mouse coordinate relatively from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseEnter = () => {
    scaleSpring.set(1.025);
    opacitySpring.set(1);
  };

  const handleMouseLeave = () => {
    scaleSpring.set(1);
    opacitySpring.set(0);
    x.set(0);
    y.set(0);
  };

  // Generate dynamic CSS radial gradient using useMotionTemplate
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareXSpring}% ${glareYSpring}%, ${glowColor} 0%, transparent 60%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-[inherit] overflow-hidden ${className}`}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: floatDuration,
        delay: floatDelay,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        scale: scaleSpring,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
        style={{
          opacity: opacitySpring,
          background: glareBg,
        }}
      />
      <div 
        className="h-full w-full" 
        style={{ 
          transform: "translateZ(20px)",
          transformStyle: "preserve-3d"
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

// Fluent Translation Dictionary for English & Arabic compatibility
const LOCALIZED_DICT = {
  en: {
    dir: "ltr" as const,
    navServices: "Services",
    navCalculator: "Budget Builder",
    navSandbox: "Portfolio & Links",
    navAiPlanner: "AI Advisor",
    navStory: "Credentials",
    initiateProtocol: "Contact",
    heroBadge: "Enterprise Partner — 2026 Standards",
    heroTitlePart1: "THE CORE",
    heroTitlePart2: "OF SCALE.",
    heroDesc: "Osama Esmael architects high-performance Django backends, enterprise E-commerce engines, and secure offline-first subsystems designed for absolute scale.",
    buildProjectBlueprint: "Architect Project Blueprint",
    verifyEstimatedCost: "Check Price Estimates",
    aiCopilotButton: "Consult AI Assistant",
    suggestedPromptTitle: "Instant Co-Pilot Solutions",
    globalRank: "Rank",
    topRated: "TOP RATED +",
    jobSuccess: "Success Rate",
    verified100: "100% VERIFIED",
    govStatus: "Gov Authorization",
    grantRecipient: "APPROVED",
    founderTitle: "Founder & System Architect",
    uptimeSla: "Uptime SLA",
    mobileCore: "Mobile Core",
    hybridPerf: "Native Integration",
    learnMore: "Metrics",
    
    // Testimonials
    testimonialsTitle: "ENTERPRISE TRUST",
    testimonialsSubtitle: "Verified performance reviews from active enterprises",
    review1Name: "Eng. Fahad Al-Otaibi",
    review1Role: "CTO, Najd Logistics",
    review1Text: "Excellent ORM optimization. Resolved query bottlenecks instantly, increasing delivery speed by 3.2X.",
    
    review2Name: "Andrew MacLean",
    review2Role: "VP of Engineering, Apex Retail",
    review2Text: "Highly reliable checkout flows. Handled 12,000 req/min smoothly using custom Redis caching.",
    
    review3Name: "Sara Al-Harbi",
    review3Role: "Product Director, SouqVibe B2B",
    review3Text: "The offline-first sync engine is flawless. Captures geopoints perfectly without cellular data.",
    
    review4Name: "Dr. Marcus Vance",
    review4Role: "Director, BioSentry Auto",
    review4Text: "Extremely secure architecture. Delivered pristine clean code, robust JWT, and automated tests.",
    
    // Team Section
    teamTitle: "OSERA ADVISORY TEAM",
    teamSubtitle: "Elite systems engineers and haptic front-end specialist partners",
    roleLead: "Lead Systems Architect & Founder",
    roleFrontend: "Senior Interactive & Frontend Architect",
    roleSecOps: "SecOps & Cloud DevOps Specialist",
    roleQA: "QA & REST/GraphQL Lead",
    roleSales: "Head of Sales",
    compTest: "Code Assurance",
    calculateBudget: "Calculate Budget",
    provenDeployments: "PROVEN DEPLOYMENTS",
    enterpriseResults: "Live architectural systems delivering critical performance metrics",
    deliveredCapabilities: "CAPABILITIES:",
    
    // Partners Section
    partnersTitle: "TECHNOLOGY INTEGRATION ALLIANCES",
    partnersSubtitle: "Official technology networks, cloud suppliers, and standards",
    partnerTxt: "Integration Verified"
  },
  ar: {
    dir: "rtl" as const,
    navServices: "الخدمات والحلول",
    navCalculator: "حاسبة الميزانية",
    navSandbox: "الروابط والمشاريع الحية",
    navAiPlanner: "مستشار الذكاء",
    navStory: "الاعتمادات والفريق",
    initiateProtocol: "اتصال",
    heroBadge: "شريك برمجيات معتمد — معايير ٢٠٢٦",
    heroTitlePart1: "النظام الأساسي",
    heroTitlePart2: "للتوسع الضخم.",
    heroDesc: "يقوم أسامة إسماعيل ببناء خوادم دجانغو (Django) فائقة السرعة، أنظمة التجارة السحابية الكبرى، وتطبيقات الهواتف الداعمة للمزامنة دون اتصال.",
    buildProjectBlueprint: "مخطط الهيكل البرمجي",
    verifyEstimatedCost: "احسب التقدير المالي",
    aiCopilotButton: "استشارة الذكاء الفورية",
    suggestedPromptTitle: "حلول معمارية بلمسة واحدة",
    globalRank: "التصنيف والتقييم العالمي",
    topRated: "مصنف كممتاز +",
    jobSuccess: "معدل نجاح المشاريع",
    verified100: "100% موثق",
    govStatus: "الاعتماد المؤسسي الرسمي",
    grantRecipient: "ممول معتمد للابتكار",
    founderTitle: "رئيس مهندسي الأنظمة والمؤسس",
    uptimeSla: "اتفاقية التشغيل SLA",
    mobileCore: "النظام الهجين للهواتف",
    hybridPerf: "تطوير أصيل Swift + Kotlin",
    learnMore: "حساب الميزانية والهيكل البرمجي",

    // Testimonials
    testimonialsTitle: "شهادات موثقة للمؤسسات",
    testimonialsSubtitle: "آراء وتقييمات الأداء الصادرة عن تشغيل خوادم الإنتاج الكبرى",
    review1Name: "م. فهد العتيبي",
    review1Role: "رئيس قطاع التكنولوجيا بـ نجد",
    review1Text: "دقة استثنائية في معالجة تسريبات الاستعلامات N+1 في قواعد البيانات. تسريع النظام بنسبة ٣٢٠٪.",
    
    review2Name: "أندرو ماكلين",
    review2Role: "مدير هندسة الأنظمة، Apex Retail",
    review2Text: "أعدنا بناء تدفقات الدفع بنجاح. أداء مستقر ومثالي لرموز Redis الكاش تحت أصعب ضغوط المبيعات.",
    
    review3Name: "أ. سارة الحربي",
    review3Role: "مديرة منتجات سوق فايب B2B",
    review3Text: "ميزة المزامنة الأرضية دون اتصال بالشبكة طفرة حقيقية. يجمع الإحداثيات محلياً ويدمجها تلقائياً بالخادم.",
    
    review4Name: "د. ماركوس فانس",
    review4Role: "مؤسس بايو سنتري",
    review4Text: "بناء دفاعي محصّن للغاية. استلمنا أكواد برمجية واضحة وموثقة، وفحص متطور للرموز الأمنية (JWT).",
    
    // Team Section
    teamTitle: "أعضاء وعمداء الفريق التقني",
    teamSubtitle: "خبراء أنظمة وحماية متعاونين لتصميم ودعم خوادمك السحابية بأعلى دقة وسرعة",
    roleLead: "رئيس معمار الأنظمة والمؤسس",
    roleFrontend: "كبيرة مهندسي الاستعراض التفاعلي والـ 3D",
    roleSecOps: "أخصائي حماية وسيرفرات وDevOps",
    roleQA: "رئيسة جودة الأنظمة وأتمتة الاختبارات",
    roleSales: "رئيس قسم المبيعات",
    compTest: "ضمان جودة الأكواد",
    calculateBudget: "حساب التقدير المالي",
    provenDeployments: "الأنظمة المنشورة والمثبتة",
    enterpriseResults: "مؤشرات أداء فعلية في بيئات تشغيل إنتاج حية للمؤسسات الشريكة",
    deliveredCapabilities: "القدرات الفنية:",
    
    // Partners Section
    partnersTitle: "الشركاء والتحالفات التكنولوجية",
    partnersSubtitle: "الشبكات وبوابات الدفع والسحابات الرقمية العالمية التي نعمل معها كشريك مسجل",
    partnerTxt: "شراكة معتمدة"
  }
};

export default function App() {
  // Global 3D mouse trackers and smooth parallax springs
  const globalMouseX = useMotionValue(0);
  const globalMouseY = useMotionValue(0);
  
  const globalXSpring = useSpring(globalMouseX, { stiffness: 82, damping: 24 });
  const globalYSpring = useSpring(globalMouseY, { stiffness: 82, damping: 24 });

  // Map mouse positions to 3D translation coordinates with varying depths (parallax layer tiers)
  const floatX1 = useTransform(globalXSpring, [-0.5, 0.5], [-35, 35]);
  const floatY1 = useTransform(globalYSpring, [-0.5, 0.5], [-35, 35]);

  const floatX2 = useTransform(globalXSpring, [-0.5, 0.5], [45, -45]);
  const floatY2 = useTransform(globalYSpring, [-0.5, 0.5], [45, -45]);

  const floatX3 = useTransform(globalXSpring, [-0.5, 0.5], [-18, 18]);
  const floatY3 = useTransform(globalYSpring, [-0.5, 0.5], [18, -18]);

  // Global background warp coordinates
  const globalBgRotateX = useTransform(globalYSpring, [-0.5, 0.5], [4, -4]);
  const globalBgRotateY = useTransform(globalXSpring, [-0.5, 0.5], [-4, 4]);

  // 3D Grid Perspective Floor background reactive values
  const floorRotateX = useTransform(globalYSpring, [-0.5, 0.5], [62, 68]);
  const floorRotateY = useTransform(globalXSpring, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const relX = (e.clientX / window.innerWidth) - 0.5;
      const relY = (e.clientY / window.innerHeight) - 0.5;
      globalMouseX.set(relX);
      globalMouseY.set(relY);
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  // Navigation & Tabs State
  const [lang, setLang] = useState<"en" | "ar">("ar");
  const t = LOCALIZED_DICT[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.title = lang === "ar"
      ? "OSERA | أسامة إسماعيل - مهندس أنظمة ومستشار سيرفرات Django"
      : "OSERA | Osama Esmael - Systems Architect & Django Core Expert";
  }, [lang, t.dir]);

  const [activeTab, setActiveTab] = useState<"services" | "calculator" | "sandbox" | "ai-consultant" | "story">("services");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Corporate Profile State (persisted via localStorage)
  const [profile, setProfile] = useState<CorporateProfile>(() => {
    try {
      const stored = localStorage.getItem("osera_corporate_profile");
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PROFILE, ...parsed };
      }
    } catch (e) {
      console.error("Failed to restore corporate profile from localStorage", e);
    }
    return DEFAULT_PROFILE;
  });

  // Redirect activeTab to first visible tab if activeTab gets hidden in admin console
  useEffect(() => {
    const isTabVisible = (tab: string) => {
      if (tab === "services") return profile.showServices !== false;
      if (tab === "calculator") return profile.showCalculator !== false;
      if (tab === "sandbox") return profile.showSandbox !== false;
      if (tab === "ai-consultant") return profile.showAiConsultant !== false;
      if (tab === "story") return profile.showStory !== false;
      return true;
    };

    if (!isTabVisible(activeTab)) {
      const tabsOrdered = ["services", "calculator", "sandbox", "ai-consultant", "story"] as const;
      const firstVisible = tabsOrdered.find(tab => isTabVisible(tab));
      if (firstVisible) {
        setActiveTab(firstVisible);
      }
    }
  }, [profile, activeTab]);

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const saveProfile = (updated: CorporateProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem("osera_corporate_profile", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to store corporate profile", e);
    }
  };

  // OSERA AI Assistant Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPrepopulated, setChatPrepopulated] = useState<string | undefined>(undefined);

  const triggerChatWithQuery = (query: string) => {
    setChatPrepopulated(query);
    setChatOpen(true);
  };

  // Playground / Sandbox State
  const [codeSnippet, setCodeSnippet] = useState(() => {
    return profile.defaultDjangoCode || defaultPythonSnippet;
  });

  useEffect(() => {
    if (profile.defaultDjangoCode) {
      setCodeSnippet(profile.defaultDjangoCode);
    }
  }, [profile.defaultDjangoCode]);

  const [optimizationDesc, setOptimizationDesc] = useState("Avoid Django database N+1 loop slows down order listing API");
  const [optimizeLoading, setOptimizeLoading] = useState(false);
  const [optimizeResult, setOptimizeResult] = useState<DjangoOptimizeResponse | null>(null);

  // AI Architect consultation state
  const [projectRequirements, setProjectRequirements] = useState("");
  const [projectType, setProjectType] = useState("Custom Python Backend / API Engine");
  const [targetBudget, setTargetBudget] = useState("$5,000 - $10,000 (Mid-Scale Enterprise)");
  const [targetTimeline, setTargetTimeline] = useState("4 to 6 Weeks");
  const [blueprintLoading, setBlueprintLoading] = useState(false);
  const [blueprintResult, setBlueprintResult] = useState<BlueprintResponse | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Prefill templates for AI Planner
  const plannerTemplates = [
    {
      title: "Django Multi-Warehouse API",
      text: "Develop a Django logistics API supporting multiple inventories, instant webhook-based order processing, synchronized task polling, and automatic SMS alerts with complete testing coverage.",
      type: "Custom Python Backend / API Engine",
      budget: "$10,000 - $25,000 (High-Performance Core)",
      timeline: "6 to 8 Weeks"
    },
    {
      title: "Multi-Vendor Marketplace Checkout",
      text: "Construct a customized e-commerce cart and multi-tenant checkout gateway. Need high efficiency under surge conditions, integrated Stripe billing, automatic invoice creation on Celery queues, and a lightweight admin panel.",
      type: "Enterprise E-Commerce Systems",
      budget: "$25,000 - $50,000+ (High-Availability Cloud)",
      timeline: "8 to 12 Weeks"
    },
    {
      title: "Offline Sync Field Tracking App",
      text: "Mobile survey tool with offline caching inside SQLite. Synchronizes automatic server packets back to a Django/Postgres hub with coordinate calculation and secure background JWT credentials sync.",
      type: "Sleek iOS & Android Mobile Apps",
      budget: "$10,000 - $25,000 (High-Performance Core)",
      timeline: "6 to 8 Weeks"
    }
  ];

  // Price Calculator States
  const [calcTier, setCalcTier] = useState<"backend" | "ecommerce" | "mobile" | "custom" | "fastapi_nestjs" | "react_next">("backend");
  const [featuresSelected, setFeaturesSelected] = useState<string[]>([
    "Database Migration",
    "Admin Dashboard",
    "API Key Management"
  ]);

  const featureOptions: Record<string, { name: string; price: number; hours: number }[]> = React.useMemo(() => {
    const list = profile.calcFeatures || DEFAULT_PROFILE.calcFeatures;
    const result: Record<string, { name: string; price: number; hours: number }[]> = {
      backend: [],
      ecommerce: [],
      mobile: [],
      custom: [],
      fastapi_nestjs: [],
      react_next: []
    };

    list.forEach(feat => {
      const tierId = feat.tier;
      if (result[tierId]) {
        const localizedName = lang === "ar" ? (feat.nameAr || feat.nameEn) : feat.nameEn;
        result[tierId].push({
          name: localizedName,
          price: feat.price,
          hours: feat.hours
        });
      }
    });

    return result;
  }, [profile.calcFeatures, lang]);

  // Keep selected features synchronized when calculating changes
  useEffect(() => {
    // Pick the first 3 by default on switch
    const currentOptions = featureOptions[calcTier] || [];
    const defaults = currentOptions.slice(0, 3).map((f) => f.name);
    setFeaturesSelected(defaults);
  }, [calcTier, featureOptions]);

  const toggleFeature = (name: string) => {
    if (featuresSelected.includes(name)) {
      if (featuresSelected.length > 1) {
        setFeaturesSelected(featuresSelected.filter((f) => f !== name));
      }
    } else {
      setFeaturesSelected([...featuresSelected, name]);
    }
  };

  // Base Prices and Rates
  const baseRates = {
    backend: profile.baseRateBackend ?? 3500,
    ecommerce: profile.baseRateEcommerce ?? 5000,
    mobile: profile.baseRateMobile ?? 6500,
    custom: profile.baseRateCustom ?? 6000,
    fastapi_nestjs: profile.baseRateFastApiNest ?? 4000,
    react_next: profile.baseRateReactNext ?? 4500
  };

  const getCalculatedMetrics = () => {
    const base = baseRates[calcTier];
    const selectedList = featureOptions[calcTier].filter((f) =>
      featuresSelected.includes(f.name)
    );
    const addedPrice = selectedList.reduce((sum, f) => sum + f.price, 0);
    const addedHours = selectedList.reduce((sum, f) => sum + f.hours, 0);

    const totalPrice = base + addedPrice;
    const totalHours = 40 + addedHours; // 40 base architecture setup hours
    const weeksEstimate = Math.ceil(totalHours / 25); // assuming 25 focused dev hours/week

    return {
      price: totalPrice,
      hours: totalHours,
      weeks: weeksEstimate
    };
  };

  const calcMetrics = getCalculatedMetrics();

  // API Call: Django Optimizer Playground
  const handleDjangoOptimization = async () => {
    setOptimizeLoading(true);
    setOptimizeResult(null);
    try {
      const response = await fetch("/api/django-optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeSnippet,
          description: optimizationDesc
        })
      });
      const data = await response.json();
      if (response.ok) {
        setOptimizeResult(data);
      } else {
        setOptimizeResult({
          rating: 0,
          issues: ["System configuration error detected."],
          optimizedCode: codeSnippet,
          explanation: data.error || "Failed to reach Gemini optimization server."
        });
      }
    } catch (e: any) {
      setOptimizeResult({
        rating: 0,
        issues: ["Server response timeout."],
        optimizedCode: codeSnippet,
        explanation: "API route unresolved. Double check backend connections."
      });
    } finally {
      setOptimizeLoading(false);
    }
  };

  // API Call: Consultation Planner / Blueprint Developer
  const handleBlueprintGeneration = async () => {
    if (!projectRequirements.trim()) return;
    setBlueprintLoading(true);
    setBlueprintResult(null);
    try {
      const response = await fetch("/api/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requirements: projectRequirements,
          projectType,
          budget: targetBudget,
          timeline: targetTimeline
        })
      });
      const data = await response.json();
      if (response.ok) {
        setBlueprintResult(data);
      } else {
        setBlueprintResult({
          projectTitle: "Architectural Mapping Offline",
          recommendedStack: {
            frontend: "React, Tailwind",
            backend: "Django REST, PostgresQL",
            infrastructure: "Cloud Native"
          },
          architectureHighlights: ["API configuration missed.", "Please verify key authorization."],
          timelinePhases: [],
          expertAdvice: data.error || "The server could not communicate with Google AI services. Please verify your Gemini API Key in Settings > Secrets.",
          estimatedComplexity: "Standard Scope"
        });
      }
    } catch (e: any) {
      setBlueprintResult({
        projectTitle: "Blueprint Generation Terminated",
        recommendedStack: {
          frontend: "React, Tailwind CSS",
          backend: "Django framework (Python)",
          infrastructure: "Docker deployment"
        },
        architectureHighlights: ["Endpoint issue detected"],
        timelinePhases: [],
        expertAdvice: "Could not establish server connection to process blueprint. Confirm dev server execution.",
        estimatedComplexity: "Undetermined"
      });
    } finally {
      setBlueprintLoading(false);
    }
  };

  const handleUseTemplate = (tmpl: typeof plannerTemplates[number]) => {
    setProjectRequirements(tmpl.text);
    setProjectType(tmpl.type);
    setTargetBudget(tmpl.budget);
    setTargetTimeline(tmpl.timeline);
    // Smooth scroll to formulation board
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div dir={t.dir} className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-400 antialiased relative overflow-x-hidden">
      
      {/* Immersive 3D Interactive Canvas Background */}
      <ThreeDBackground />
      
      {/* 3D Moving Perspective Grid Floor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ perspective: "800px" }}>
        <motion.div 
          style={{ 
            rotateX: floorRotateX,
            rotateY: floorRotateY,
            z: -50,
            transformStyle: "preserve-3d"
          }}
          className="grid-3d-floor absolute top-0 left-[-50%] w-[200%] h-[1200px] opacity-45" 
        />
      </div>

      {/* Floating 3D Cosmic glassmorphic elements responding to responsive mouse parallax coordinates */}
      <motion.div
        style={{ x: floatX1, y: floatY1, rotate: 15 }}
        className="absolute top-48 left-[8%] w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500/15 to-blue-500/5 border border-cyan-500/25 shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-[3px] pointer-events-none z-10 hidden lg:block"
      />
      <motion.div
        style={{ x: floatX2, y: floatY2, rotate: -25 }}
        className="absolute bottom-[20%] right-[10%] w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500/15 to-purple-500/5 border border-indigo-500/25 shadow-[0_0_30px_rgba(99,102,241,0.1)] backdrop-blur-[2px] pointer-events-none z-10 hidden lg:block"
      />
      <motion.div
        style={{ x: floatX3, y: floatY3 }}
        className="absolute top-1/3 right-[12%] w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/15 border border-blue-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)] backdrop-blur-[3px] pointer-events-none z-10 hidden lg:block"
      />
      <motion.div
        style={{ x: floatX2, y: floatY1, rotate: 45 }}
        className="absolute top-[50%] left-[5%] w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 shadow-[0_0_25px_rgba(168,85,247,0.08)] backdrop-blur-[2px] pointer-events-none z-10 hidden lg:block"
      />
      <motion.div
        style={{ x: floatX1, y: floatY3, rotate: -15 }}
        className="absolute top-[70%] right-[6%] w-28 h-28 rounded-3xl bg-gradient-to-tr from-blue-500/10 to-cyan-500/5 border border-blue-500/15 shadow-[0_0_30px_rgba(59,130,246,0.05)] backdrop-blur-[1px] pointer-events-none z-10 hidden lg:block"
      />
      <motion.div
        style={{ x: floatX3, y: floatY2, rotate: 10 }}
        className="absolute top-[85%] left-[12%] w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/10 to-indigo-500/5 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.08)] backdrop-blur-[2px] pointer-events-none z-10 hidden lg:block"
      />

      {/* Decorative ambient background glows & floating depth items */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] -mr-[13rem] -mt-[13rem] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-900/5 rounded-full blur-[110px] pointer-events-none animate-pulse" />

      {/* Floating Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-900/60 bg-[#050505]/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            {profile.logoImgBase64 ? (
              <img 
                src={profile.logoImgBase64} 
                alt="Logo" 
                className="h-8 w-auto object-contain shrink-0 max-w-[150px]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-2xl font-black tracking-[-0.075em] flex items-center gap-1 text-white">
                {profile.logoText || "OSERA"} <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full inline-block animate-pulse"></span>
              </div>
            )}
            <div className="hidden sm:block">
              <span className="ml-[6px] text-[9px] uppercase font-bold tracking-[0.23em] text-cyan-550 block">
                Digital Systems
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/30 p-1 border border-zinc-800/20 rounded-full">
            {profile.showServices !== false && (
              <button
                onClick={() => { setActiveTab("services"); }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] transition-all cursor-pointer ${activeTab === "services" ? "bg-zinc-800/80 text-cyan-400 font-extrabold shadow-sm" : "text-slate-400 hover:text-white"}`}
              >
                {t.navServices}
              </button>
            )}
            {profile.showCalculator !== false && (
              <button
                onClick={() => { setActiveTab("calculator"); }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] transition-all cursor-pointer ${activeTab === "calculator" ? "bg-zinc-800/80 text-cyan-400 font-extrabold shadow-sm" : "text-slate-400 hover:text-white"}`}
              >
                {t.navCalculator}
              </button>
            )}
            {profile.showSandbox !== false && (
              <button
                onClick={() => { setActiveTab("sandbox"); }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] transition-all cursor-pointer ${activeTab === "sandbox" ? "bg-zinc-800/80 text-cyan-400 font-extrabold shadow-sm" : "text-slate-400 hover:text-white"}`}
              >
                {t.navSandbox}
              </button>
            )}
            {profile.showAiConsultant !== false && (
              <button
                onClick={() => { setActiveTab("ai-consultant"); }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] transition-all cursor-pointer ${activeTab === "ai-consultant" ? "bg-zinc-800/80 text-cyan-400 font-extrabold shadow-sm" : "text-slate-400 hover:text-white"}`}
              >
                {t.navAiPlanner}
              </button>
            )}
            {profile.showStory !== false && (
              <button
                onClick={() => { setActiveTab("story"); }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] transition-all cursor-pointer ${activeTab === "story" ? "bg-zinc-800/80 text-cyan-400 font-extrabold shadow-sm" : "text-slate-400 hover:text-white"}`}
              >
                {t.navStory}
              </button>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {/* Admin Portal Control */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-3 py-1.5 border border-zinc-805 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#06b6d2] bg-cyan-950/10 hover:bg-cyan-950/30 hover:border-cyan-500/30 font-mono flex items-center gap-1.5 transition cursor-pointer"
              title="Admin Portal Console"
            >
              <Lock className="h-3 w-3" />
              <span>{lang === "ar" ? "لوحة الإدارة" : "Admin"}</span>
            </button>

            {/* Dynamic Interactive Language Toggler */}
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="px-3.5 py-1.5 border border-cyan-800/40 rounded-full text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/50 transition-all flex items-center gap-1.5 cursor-pointer font-mono shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
            >
              <Globe className="h-3 w-3 animate-spin duration-10000" />
              {lang === "ar" ? "English" : "العربية"}
            </button>

            <a
              href="#interactive-planner-anchor"
              onClick={() => { setActiveTab("ai-consultant"); }}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 border border-slate-800 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-white hover:bg-white hover:text-black transition-all"
            >
              <Sparkles className="h-3 w-3 text-cyan-400" />
              {t.initiateProtocol}
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-200 cursor-pointer"
            >
              <Terminal className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-[#050505] border-t border-zinc-800/60 flex flex-col gap-2">
            {profile.showServices !== false && (
              <button
                onClick={() => { setActiveTab("services"); setMobileMenuOpen(false); }}
                className="text-start py-2 px-3 text-xs uppercase tracking-widest font-bold text-zinc-300 hover:bg-zinc-900 rounded-lg cursor-pointer"
              >
                {t.navServices}
              </button>
            )}
            {profile.showCalculator !== false && (
              <button
                onClick={() => { setActiveTab("calculator"); setMobileMenuOpen(false); }}
                className="text-start py-2 px-3 text-xs uppercase tracking-widest font-bold text-zinc-300 hover:bg-zinc-900 rounded-lg cursor-pointer"
              >
                {t.navCalculator}
              </button>
            )}
            {profile.showSandbox !== false && (
              <button
                onClick={() => { setActiveTab("sandbox"); setMobileMenuOpen(false); }}
                className="text-start py-2 px-3 text-xs uppercase tracking-widest font-bold text-zinc-300 hover:bg-zinc-900 rounded-lg cursor-pointer"
              >
                {t.navSandbox}
              </button>
            )}
            {profile.showAiConsultant !== false && (
              <button
                onClick={() => { setActiveTab("ai-consultant"); setMobileMenuOpen(false); }}
                className="text-start py-2 px-3 text-xs uppercase tracking-widest font-bold text-zinc-300 hover:bg-zinc-900 rounded-lg cursor-pointer"
              >
                {t.navAiPlanner}
              </button>
            )}
            {profile.showStory !== false && (
              <button
                onClick={() => { setActiveTab("story"); setMobileMenuOpen(false); }}
                className="text-start py-2 px-3 text-xs uppercase tracking-widest font-bold text-zinc-300 hover:bg-zinc-900 rounded-lg cursor-pointer"
              >
                {t.navStory}
              </button>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-12 md:py-24 mx-auto max-w-7xl lg:px-8 border-b border-zinc-900/40 overflow-hidden">
        {/* Ambient background glows for premium modern feel */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none select-none animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none select-none animate-pulse duration-[8000ms]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-cyan-400 mb-2 uppercase tracking-widest">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              {t.heroBadge}
            </div>
            
            <h1 className="text-[52px] sm:text-[84px] lg:text-[102px] leading-[0.88] font-black tracking-[-0.05em] text-white">
              {t.heroTitlePart1} <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
                {t.heroTitlePart2}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-450 max-w-2xl font-light leading-relaxed mb-6 border-l-2 border-slate-800/80 pl-8">
              {lang === "ar" ? profile.heroDescAr : profile.heroDescEn}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveTab("ai-consultant");
                  document.getElementById("interactive-planner-anchor")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 py-3.5 text-xs uppercase font-extrabold tracking-widest text-[#050505] transition-all font-sans shadow-lg shadow-cyan-950/20 active:scale-95 cursor-pointer"
              >
                <span>{t.buildProjectBlueprint}</span>
                <Sparkles className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setActiveTab("calculator");
                  document.getElementById("interactive-planner-anchor")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-800 px-6 py-3.5 text-xs uppercase font-extrabold tracking-widest text-zinc-200 transition hover:bg-zinc-850 cursor-pointer"
              >
                <span>{t.verifyEstimatedCost}</span>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </button>
              <button
                onClick={() => setChatOpen(true)}
                className="flex items-center gap-2 rounded-full bg-zinc-950 border border-cyan-500/20 focus:border-cyan-400 hover:border-cyan-400 px-6 py-3.5 text-xs uppercase font-extrabold tracking-widest text-cyan-450 hover:text-cyan-300 transition cursor-pointer"
              >
                <div className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-450"></span>
                </div>
                <span>{t.aiCopilotButton}</span>
              </button>
            </div>

            {/* Suggested Interactive Prompt Quick-Chips */}
            <div className="pt-6 border-t border-slate-900/40">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">
                {t.suggestedPromptTitle}
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    ar: "كيف تسرع استعلامات دجانغو المبطئة؟ 🚀",
                    en: "Optimize slow Django query loop bottlenecks 🚀"
                  },
                  {
                    ar: "ما هي معايير هيكلة خوادم أوسامة إسماعيل؟ 🛠️",
                    en: "Review Osama Esmael robust cloud system design 🛠️"
                  },
                  {
                    ar: "برمجة دفع إلكتروني آمن 💳",
                    en: "Build secure multi-currency SaaS payments 💳"
                  }
                ].map((chip, idx) => {
                  const label = lang === "ar" ? chip.ar : chip.en;
                  return (
                    <button
                      key={idx}
                      onClick={() => triggerChatWithQuery(label)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.8 rounded-full bg-zinc-950/40 hover:bg-zinc-900 text-[11px] text-zinc-400 hover:text-cyan-300 border border-zinc-900 hover:border-cyan-800/20 transition cursor-pointer"
                    >
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 h-full flex flex-col gap-4 py-8">
            <Hero3DScene />
          </div>
        </div>

        {/* Global Stats bar embedded elegantly */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto pt-16 border-t border-slate-800/40 mt-16">
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2 tracking-[0.15em]">{t.globalRank}</div>
            <div className="text-lg font-bold text-white">{t.topRated}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2 tracking-[0.15em]">{t.jobSuccess}</div>
            <div className="text-lg font-bold text-white">{t.verified100}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2 tracking-[0.15em]">{t.govStatus}</div>
            <div className="text-lg font-bold text-white font-sans">{t.grantRecipient}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1 tracking-widest">{t.founderTitle}</div>
            <div className="text-2xl font-black uppercase tracking-[-0.05em] text-white">OSAMA E<span className="text-slate-700 font-normal">.</span></div>
          </div>
        </div>
      </section>

      {/* Main Control Panel anchor */}
      <div id="interactive-planner-anchor" className="scroll-mt-24" />

      {/* Subtle particle separator */}
      <ParticleSeparator />

      {/* Section Tab bar */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="flex border-b border-slate-900/80 overflow-x-auto pb-px gap-1 scrollbar-none">
          {profile.showServices !== false && (
            <button
              onClick={() => setActiveTab("services")}
              className={`py-4 px-6 border-b-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === "services" ? "border-cyan-400 text-cyan-400 font-black" : "border-transparent text-slate-500 hover:text-zinc-200"}`}
            >
              <Layers className="h-4 w-4" />
              1. Services
            </button>
          )}
          {profile.showCalculator !== false && (
            <button
              onClick={() => setActiveTab("calculator")}
              className={`py-4 px-6 border-b-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === "calculator" ? "border-cyan-400 text-cyan-400 font-black" : "border-transparent text-slate-500 hover:text-zinc-200"}`}
            >
              <DollarSign className="h-4 w-4" />
              2. Budget Config
            </button>
          )}
          {profile.showSandbox !== false && (
            <button
              onClick={() => setActiveTab("sandbox")}
              className={`py-4 px-6 border-b-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === "sandbox" ? "border-cyan-400 text-cyan-400 font-black" : "border-transparent text-slate-500 hover:text-zinc-200"}`}
            >
              <Terminal className="h-4 w-4" />
              3. Django Code
            </button>
          )}
          {profile.showAiConsultant !== false && (
            <button
              onClick={() => setActiveTab("ai-consultant")}
              className={`py-4 px-6 border-b-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === "ai-consultant" ? "border-cyan-400 text-cyan-400 font-black" : "border-transparent text-slate-500 hover:text-zinc-200"}`}
            >
              <Sparkles className="h-4 w-4" />
              4. Live Advisor
            </button>
          )}
          {profile.showStory !== false && (
            <button
              onClick={() => setActiveTab("story")}
              className={`py-4 px-6 border-b-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === "story" ? "border-cyan-400 text-cyan-400 font-black" : "border-transparent text-slate-500 hover:text-zinc-200"}`}
            >
              <Award className="h-4 w-4" />
              5. Credentials
            </button>
          )}
        </div>

        {/* Tab Contents */}
        <div className="pt-10">
          
          {/* TAB 1: SERVICES & MASTERY */}
          {activeTab === "services" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Service Cards */}
              <div className="grid md:grid-cols-2 gap-8">
                {(profile.servicesList || services).map((svc) => {
                  const title = lang === 'ar' ? (svc.titleAr || svc.title) : (svc.titleEn || svc.title);
                  const description = lang === 'ar' ? (svc.descAr || svc.description) : (svc.descEn || svc.description);
                  const bullets = lang === 'ar' ? (svc.bulletPointsAr || svc.bulletPoints || []) : (svc.bulletPointsEn || svc.bulletPoints || []);
                  const serviceImages: Record<string, string> = {
                    django: djangoBackendImg,
                    ecommerce: ecommerceCheckoutImg,
                    mobile: mobileOfflineImg,
                    custom: saasDashboardImg
                  };
                  return (
                    <TiltCard
                      key={svc.id}
                      className="p-8 rounded-3xl bg-[#09090c]/50 backdrop-blur-sm border border-slate-900/80 flex flex-col justify-between hover:border-slate-800 transition-all duration-300 relative overflow-hidden group"
                      glowColor="rgba(6, 182, 212, 0.15)"
                    >
                      <div>
                        <div className="flex items-center gap-3.5 mb-6">
                          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-cyan-950/40 border border-cyan-800/50 text-cyan-400">
                            {svc.iconName === "Terminal" && <Terminal className="h-5 w-5" />}
                            {svc.iconName === "ShoppingBag" && <ShoppingBag className="h-5 w-5" />}
                            {svc.iconName === "Smartphone" && <Smartphone className="h-5 w-5" />}
                            {svc.iconName === "Cpu" && <Cpu className="h-5 w-5" />}
                          </div>
                          <h3 className="text-xl font-black text-white tracking-tight uppercase">{title}</h3>
                        </div>
                        
                        {serviceImages[svc.id] && (
                          <div className="mb-6 rounded-2xl overflow-hidden border border-slate-900 aspect-[16/9] relative group-hover:border-slate-800 transition-colors">
                            <img
                              src={serviceImages[svc.id]}
                              alt={title}
                              className="w-full h-full object-cover select-none filter brightness-90 hover:brightness-100 transition-all duration-500 hover:scale-[1.02]"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        <p className="text-zinc-400 text-sm mb-6 leading-relaxed bg-[#050505]/40 p-4 rounded-xl border border-slate-900/60 font-mono">
                          {description}
                        </p>
                        
                        <ul className="space-y-3">
                          {bullets.map((point, index) => (
                            <li key={index} className="flex gap-2.5 items-start text-xs text-zinc-400">
                              <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-cyan-950 text-cyan-400">
                                <Check className="h-2.5 w-2.5" />
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-900/60 flex items-center justify-between">
                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                          Standard Code Assurance
                        </span>
                        <button
                          onClick={() => {
                            setCalcTier(svc.id as any);
                            setActiveTab("calculator");
                          }}
                          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          Calculate Budget <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>

              {/* Case Studies */}
              <div className="space-y-8 pt-8">
                <div className="text-center max-w-xl mx-auto">
                  <h3 className="text-3xl font-black tracking-tight text-white uppercase">Proven Deployments</h3>
                  <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.23em] font-bold mt-1.5">
                    Enterprise results from production files
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {(profile.caseStudiesList && profile.caseStudiesList.length > 0 ? profile.caseStudiesList : DEFAULT_PROFILE.caseStudiesList)
                    .filter(cs => cs.visible !== false)
                    .map((cs) => (
                      <TiltCard
                        key={cs.id}
                        className="p-6 rounded-3xl bg-[#09090c]/40 backdrop-blur-sm border border-slate-900/80 flex flex-col justify-between hover:border-amber-900/40 transition-all duration-300"
                        glowColor="rgba(212, 175, 55, 0.12)"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[9px] uppercase tracking-widest px-2 py-1 bg-zinc-900 border border-zinc-805 text-zinc-400 rounded-md font-mono">
                              {lang === "ar" ? cs.industryAr : cs.industryEn}
                            </span>
                            <span className="text-xs font-mono font-bold text-amber-400">{lang === "ar" ? cs.clientAr : cs.clientEn}</span>
                          </div>
                          <h4 className="text-lg font-black text-white mb-3 tracking-tight uppercase">{lang === "ar" ? cs.titleAr : cs.titleEn}</h4>
                          <p className="text-xs text-zinc-400 leading-relaxed mb-4">{lang === "ar" ? cs.descAr : cs.descEn}</p>
                          
                          <div className="mb-4 font-mono">
                            <span className="text-[10px] text-zinc-500 font-semibold block mb-2 uppercase tracking-wider">
                              {lang === "ar" ? "المخرجات والتطويرات:" : "DELIVERED CAPABILITIES:"}
                            </span>
                            <div className="flex flex-col gap-1.5">
                              {(lang === "ar" ? cs.deliverablesAr : cs.deliverablesEn).map((del, i) => (
                                <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-300">
                                  <CheckCircle2 className="h-3 w-3 text-amber-400 shrink-0" />
                                  <span>{del}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-900 mb-4 text-center">
                            <span className="block text-3xl font-extrabold text-amber-400 font-mono">{cs.metric}</span>
                            <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold">{lang === "ar" ? cs.metricLabelAr : cs.metricLabelEn}</span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {cs.tags.map((tag, i) => (
                              <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800 text-zinc-400">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </TiltCard>
                    ))}
                </div>
              </div>

              {/* TECHNOLOGY ALLIANCES INFINITE AUTO-MARQUEE */}
              <div className="pt-16 border-t border-slate-900/60 overflow-hidden relative">
                <div className="text-center max-w-xl mx-auto mb-8">
                  <h3 className="text-xs uppercase font-black tracking-[0.25em] text-amber-400 mb-2">
                    {t.partnersTitle}
                  </h3>
                  <p className="text-xs text-zinc-500 font-light font-sans px-4">
                    {t.partnersSubtitle}
                  </p>
                </div>

                {/* Depth Mask Shadow */}
                <div className="absolute left-0 top-16 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-16 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

                <div className="flex gap-6 overflow-hidden select-none py-2 relative">
                  <div className="flex gap-6 shrink-0 min-w-full justify-around animate-marquee whitespace-nowrap">
                    {(profile.partnersList && profile.partnersList.length > 0 ? profile.partnersList : DEFAULT_PROFILE.partnersList).map((partner, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#0a0a0c]/80 border border-slate-900 rounded-2xl hover:border-amber-900/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.05)] transition-all cursor-default"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <div className="text-start">
                          <div className="text-xs font-black text-white">{partner.name}</div>
                          <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                            {lang === "ar" ? partner.typeAr : partner.typeEn}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-6 shrink-0 min-w-full justify-around animate-marquee whitespace-nowrap" aria-hidden="true">
                    {(profile.partnersList && profile.partnersList.length > 0 ? profile.partnersList : DEFAULT_PROFILE.partnersList).map((partner, idx) => (
                      <div
                        key={idx + 200}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#0a0a0c]/80 border border-slate-900 rounded-2xl hover:border-amber-900/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.05)] transition-all cursor-default"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <div className="text-start">
                          <div className="text-xs font-black text-white">{partner.name}</div>
                          <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                            {lang === "ar" ? partner.typeAr : partner.typeEn}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: BUDGET & TIMELINE CALCULATOR */}
          {activeTab === "calculator" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-8"
            >
              {/* Left Config Panel */}
              <div className="lg:col-span-7 bg-zinc-950/40 border border-zinc-900 p-8 rounded-2xl glow-blue space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Scope Blueprint Configurator</h3>
                  <p className="text-sm text-zinc-400">
                    Tick standard functional capabilities to construct your project scope estimate instantly.
                  </p>
                </div>

                {/* Tier Selection */}
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block mb-3">
                    {lang === "ar" ? "الفئة الأساسية للمشروع" : "Project Primary Class"}
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5">
                    {[
                      { id: "backend", label: lang === "ar" ? "دجانغو بايثون" : "Django API", desc: lang === "ar" ? "نواة بايثون" : "Python Core" },
                      { id: "fastapi_nestjs", label: lang === "ar" ? "FastAPI / NestJS" : "FastAPI / NestJS", desc: lang === "ar" ? "محرك غير متزامن" : "Async Engine" },
                      { id: "react_next", label: lang === "ar" ? "React / Next.js" : "React / Next.js", desc: lang === "ar" ? "واجهات الويب" : "Client Web" },
                      { id: "mobile", label: lang === "ar" ? "تطبيقات هواتف" : "Mobile Apps", desc: lang === "ar" ? "فلاتر / نيتف" : "Flutter / Native" },
                      { id: "ecommerce", label: lang === "ar" ? "بوابات ومتاجر" : "E-Commerce", desc: lang === "ar" ? "دفع الكتروني" : "Global Gateways" },
                      { id: "custom", label: lang === "ar" ? "حلول مخصصة" : "Bespoke SaaS", desc: lang === "ar" ? "مؤسسي متكامل" : "Corporate Core" }
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => { setCalcTier(tier.id as any); }}
                        className={`p-3 text-left rounded-xl transition-all border ${calcTier === tier.id ? "bg-cyan-950/20 border-cyan-800 text-cyan-300" : "bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900 text-zinc-400"}`}
                      >
                        <span className="block text-xs font-bold">{tier.label}</span>
                        <span className="text-[9px] opacity-70 block mt-0.5 font-mono">{tier.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features Checklist */}
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block mb-3">
                    Configure Capabilities Needed
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {featureOptions[calcTier].map((feat) => {
                      const isSelected = featuresSelected.includes(feat.name);
                      return (
                        <button
                          key={feat.name}
                          onClick={() => { toggleFeature(feat.name); }}
                          className={`flex items-start justify-between p-3.5 rounded-lg border text-left transition-all ${isSelected ? "bg-zinc-905 border-cyan-800/80 text-white" : "bg-zinc-950/70 border-zinc-900 text-zinc-500 hover:border-zinc-800"}`}
                        >
                          <div className="space-y-1">
                            <span className="text-xs font-semibold block">{feat.name}</span>
                            <span className="text-[10px] text-zinc-500 block font-mono">
                              +{feat.hours} expert engineering hours
                            </span>
                          </div>
                          <div className={`mt-0.5 h-4 w-4 shrink-0 rounded flex items-center justify-center border ${isSelected ? "bg-cyan-500 border-cyan-500 text-zinc-950" : "border-zinc-800"}`}>
                            {isSelected && <Check className="h-3 w-3 block stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Clear and Simple timeline calculation */}
                <div className="bg-[#0c0c10] p-4.5 rounded-xl border border-zinc-900">
                  <div className="flex gap-2 items-start">
                    <Clock className="h-4.5 w-4.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-300">Deliverable Architecture Timeline</h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                        Features are built using strict agile test-driven guidelines. Each release goes through an integrated CI/CD staging deploy process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Summary Panel */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-2xl flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest block mb-1">
                      REAL-TIME SUMMARY ESTIMATION
                    </span>
                    <h3 className="text-xl font-bold text-white mb-6">Interactive Budget Sheet</h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2.5 border-b border-zinc-900 text-sm">
                        <span className="text-zinc-500">Base Class Integration</span>
                        <span className="font-mono text-zinc-300">${baseRates[calcTier].toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-start py-2.5 border-b border-zinc-900 text-sm">
                        <span className="text-zinc-500">
                          Selected Modules ({featuresSelected.length})
                        </span>
                        <div className="text-right">
                          <span className="font-mono block text-zinc-300">
                            +${featureOptions[calcTier]
                              .filter((f) => featuresSelected.includes(f.name))
                              .reduce((sum, f) => sum + f.price, 0)
                              .toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2.5 text-sm">
                        <span className="text-zinc-500">Standard Code Assurance</span>
                        <span className="text-cyan-400 text-xs px-2 py-0.5 bg-cyan-950/30 border border-cyan-800/40 rounded-full font-mono uppercase font-black">
                          INCLUDED
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-zinc-900 space-y-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-0.5">
                          Calculated Cost
                        </span>
                        <span className="text-3xl sm:text-4xl font-black font-mono text-white bg-gradient-to-r from-zinc-50 to-zinc-300 bg-clip-text text-transparent">
                          ${calcMetrics.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-0.5">
                          Duration
                        </span>
                        <span className="text-lg font-bold font-mono text-cyan-400">
                          {calcMetrics.weeks} WMD Weeks
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-900/30 rounded-xl border border-zinc-900/60 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">Estimated Project Hours:</span>
                      <span className="font-bold text-white">{calcMetrics.hours} High-Focus Hours</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => {
                          setProjectType(
                            calcTier === "backend"
                              ? "Custom Python Backend / API Engine"
                              : calcTier === "ecommerce"
                                ? "Enterprise E-Commerce Systems"
                                : calcTier === "mobile"
                                  ? "Sleek iOS & Android Mobile Apps"
                                  : "Custom SaaS & Cloud Systems"
                          );
                          setProjectRequirements(
                            lang === "ar"
                              ? `برجاء هندسة وتطوير نظام (${calcTier}) مع التركيز على الخصائص والمواصفات التالية: ${featuresSelected.join(", ")}.`
                              : `Please build a ${calcTier} system focusing on these custom capabilities: ${featuresSelected.join(", ")}.`
                          );
                          setActiveTab("ai-consultant");
                          document.getElementById("interactive-planner-anchor")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 font-bold uppercase text-[11px] tracking-widest text-[#09090b] transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                      >
                        <span>{lang === "ar" ? "تعديل وطرح الخطة الفنية بالذكاء الاصطناعي" : "Draft Technical Plan with AI"}</span>
                        <Sparkles className="h-4 w-4" />
                      </button>

                      <a
                        href={`https://wa.me/20${profile.whatsapp}?text=${encodeURIComponent(
                          lang === "ar" 
                            ? `مرحباً أسامة إسماعيل، قمت بتقدير الميزانية لمشروعي عبر حاسبة الأنظمة:\n\n- فئة النظام: ${calcTier}\n- التكلفة التقديرية: $${calcMetrics.price.toLocaleString()}\n- فترة الإنجاز المتوقعة: ${calcMetrics.weeks} أسابيع\n- الخصائص والمواصفات المختارة:\n${featuresSelected.map(f => `  • ${f}`).join("\n")}\n\nيرجى مراجعة التفاصيل لتأكيد بدء العمل على المشروع.`
                            : `Hello Osama Ismail, I calculated a custom project blueprint on your web platform:\n\n- Project Class: ${calcTier}\n- Estimated Cost: $${calcMetrics.price.toLocaleString()}\n- Expected Timeline: ${calcMetrics.weeks} WMD Weeks\n- Selected Specs:\n${featuresSelected.map(f => `  • ${f}`).join("\n")}\n\nLet's coordinate starting this project!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold uppercase text-[11px] tracking-widest text-white transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                      >
                        <span>{lang === "ar" ? "تأكيد وإرسال التقدير والمواصفات للواتساب" : "Confirm & Send Estimate to WhatsApp"}</span>
                        <svg className="h-4.5 w-4.5 text-white fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.86L2.51 22l4.31-1.38C8.36 21.41 10.13 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.75 13.92c-.22.61-1.13 1.15-1.63 1.25-.46.09-.96.11-2.91-.65-2.5-1.02-4.1-3.57-4.22-3.73-.13-.17-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.2-.21.5-.32.81-.32h.27c.22 0 .5.08.73.61.23.56.77 1.88.84 2.01.07.13.11.29.02.46-.09.18-.2.29-.38.51-.18.23-.38.41-.55.6-.19.19-.39.39-.17.77.22.38.97 1.6 2.07 2.58 1.42 1.27 2.62 1.66 2.99 1.84.37.18.59.15.81-.11.22-.26.97-1.13 1.23-1.51.26-.38.53-.32.89-.18.37.13 2.33 1.1 2.73 1.3s.67.3.77.48c.11.18.11 1.05-.11 1.66z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Budget timeline checklist detail */}
                <div className="p-5 rounded-2xl bg-zinc-950/20 border border-zinc-900 text-xs text-zinc-400 leading-relaxed">
                  <span className="block font-bold text-white uppercase tracking-wider text-[10px] mb-2">
                    OSERA GUARANTEE STRUCTURE
                  </span>
                  Our metrics are based on realistic industry standards for high-value code output. We provide clear weekly status releases, direct Slack communication loops with the project architect, and full GitHub codebase handovers.
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: LIVE SYSTEMS PORTFOLIO & PROFESSIONAL HUB */}
          {activeTab === "sandbox" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <div className="max-w-3xl mx-auto text-center space-y-3">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.25em] font-black bg-cyan-950/30 px-3 py-1.5 border border-cyan-900/40 rounded-full">
                  {lang === "ar" ? "حقيبة الأنظمة والحلول الحية للمؤسسات" : "Vetted Commercial Production Systems"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  {lang === "ar" ? "بوابة المشاريع والروابط الاحترافية لـ أسامة إسماعيل" : "Osama Esmael Production Ecosystem"}
                </h2>
                <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
                  {lang === "ar"
                    ? "استكشف البوابات والمنصات المعقدة المنشورة في بيئة الإنتاج الفعلي، وتواصل فوري لمناقشة المتطلبات الفنية لمشروعك."
                    : "Directly monitor complex systems, logistics portals, and enterprise platforms engineered in live production. Click below to explore."}
                </p>
              </div>

              {/* Main Matrix Grid Split */}
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* 1. Projects Portfolio Panel (8/12 Columns) */}
                <div className="lg:col-span-8 space-y-6">
                  <h3 className="text-xs font-mono font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-455 animate-ping" />
                    {lang === "ar" ? "الأنظمة والمنصات المنشورة حياً" : "Live Corporate Deployments Ledger"}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {profile.liveProjects.map((proj, idx) => (
                      <TiltCard
                        key={idx}
                        className="bg-[#09090c]/50 border border-slate-900/60 p-6 rounded-3xl hover:border-slate-800 hover:shadow-[0_0_25px_rgba(6,182,212,0.06)] flex flex-col justify-between transition-all duration-300"
                        glowColor="rgba(6, 182, 212, 0.12)"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <span className="px-2.5 py-0.5 rounded text-[8px] font-mono font-black border border-cyan-800/40 bg-cyan-950/20 text-cyan-300 uppercase tracking-widest">
                              {proj.category || "Cloud App"}
                            </span>
                            <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                              {proj.metric || "Online"}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <h4 className="text-base font-black text-white tracking-tight uppercase group-hover:text-cyan-400 transition-colors">
                              {proj.title}
                            </h4>
                            <p className="text-xs text-zinc-400 leading-relaxed font-light min-h-[38px]">
                              {lang === "ar" ? proj.descAr : proj.descEn}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-900 mt-5 flex justify-between items-center">
                          <span className="text-[9px] font-mono text-zinc-500">
                            ID: OSR-0{idx + 1}
                          </span>
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-cyan-400 hover:text-cyan-300 transition-all font-sans"
                          >
                            <span>{lang === "ar" ? "زيارة المنصة" : "Launch Engine"}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </TiltCard>
                    ))}
                  </div>
                </div>

                {/* 2. Communication Ports & Links (4/12 Columns) */}
                <div className="lg:col-span-4 space-y-6">
                  <h3 className="text-xs font-mono font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                    {lang === "ar" ? "روابط وقنوات تواصل معتمدة" : "Authorized Communication Ports"}
                  </h3>

                  <div className="p-6 bg-[#09090c]/70 border border-slate-900/60 rounded-3xl space-y-5">
                    
                    {/* Founder Brief info card */}
                    <div className="flex items-center gap-4 pb-4 border-b border-slate-900">
                      <div className="h-12 w-12 rounded-2xl bg-zinc-950 overflow-hidden border border-zinc-800 relative z-20 shrink-0">
                        <img 
                          src={profile.avatarBase64 || osamaRealisticAvatarImg} 
                          alt="Founder" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white uppercase">{profile.founderName || "Osama Esmael"}</h4>
                        <span className="text-[9px] text-cyan-400 font-mono block tracking-wider uppercase">
                          {lang === "ar" ? "منسق وقائد الإنتاج" : "Principal Systems Architect"}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-3.5">
                      {/* WhatsApp Port */}
                      <a
                        href={`https://wa.me/20${profile.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-900/30 hover:border-emerald-500/40 rounded-2xl flex items-center justify-between group transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                            <Phone className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-white block">WhatsApp Egypt</span>
                            <span className="text-[9px] text-[#22c55e] font-mono">{lang === "ar" ? "تواصل وتنسيق فوري" : "Instant direct gateway"}</span>
                          </div>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                      </a>

                      {/* LinkedIn Port */}
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-950/20 hover:bg-blue-950/40 border border-blue-900/30 hover:border-blue-500/40 rounded-2xl flex items-center justify-between group transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-zinc-950 transition-colors">
                            <Link2 className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-white block">LinkedIn Professional</span>
                            <span className="text-[9px] text-zinc-500 font-mono">{lang === "ar" ? "الملف الوظيفي والشركاء" : "Corporate profile"}</span>
                          </div>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                      </a>

                      {/* Nafezly Port */}
                      <a
                        href={profile.nafezly}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-zinc-950/40 hover:bg-zinc-900/40 border border-zinc-850 hover:border-cyan-500/40 rounded-2xl flex items-center justify-between group transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-cyan-550/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-colors">
                            <Briefcase className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-white block">Nafezly Portfolio</span>
                            <span className="text-[9px] text-zinc-500 font-mono">{lang === "ar" ? "منصة مستقل (ناجزلي)" : "Arabic freelance engine"}</span>
                          </div>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                      </a>

                      {/* Upwork Port */}
                      <a
                        href={profile.upwork}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-zinc-950/40 hover:bg-zinc-900/40 border border-zinc-850 hover:border-emerald-500/40 rounded-2xl flex items-center justify-between group transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-[#14a800]/10 flex items-center justify-center text-[#14a800] group-hover:bg-[#14a800] group-hover:text-zinc-950 transition-colors">
                            <Briefcase className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-white block">Upwork Freelancer</span>
                            <span className="text-[9px] text-[#14a800] font-mono">Top Rated Expert</span>
                          </div>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                      </a>

                      {/* YouTube Port */}
                      <a
                        href={profile.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 hover:border-red-500/40 rounded-2xl flex items-center justify-between group transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-zinc-950 transition-colors">
                            <Youtube className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-white block">YouTube Lectures</span>
                            <span className="text-[9px] text-zinc-500 font-mono">{lang === "ar" ? "مخزن المحاضرات وقوائم التعليم" : "Video masterclasses"}</span>
                          </div>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                      </a>

                      {/* PayPal Port */}
                      <a
                        href={profile.paypal}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#003087]/15 hover:bg-[#003087]/30 border border-[#003087]/45 hover:border-[#0070ba]/40 rounded-2xl flex items-center justify-between group transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-[#0070ba]/10 flex items-center justify-center text-[#0070ba] group-hover:bg-[#0070ba] group-hover:text-zinc-950 transition-colors">
                            <CreditCard className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-white block">PayPal Gateway</span>
                            <span className="text-[9px] text-[#0070ba] font-mono">{lang === "ar" ? "مستحقات وتثبيت الميزانيات" : "Retainer deposit invoice link"}</span>
                          </div>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                      </a>

                      {/* Indeed Port */}
                      {profile.indeed && (
                        <a
                          href={profile.indeed}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-blue-950/15 hover:bg-blue-950/30 border border-blue-900/30 rounded-2xl flex items-center justify-between group transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-400 group-hover:text-zinc-950 transition-colors">
                              <Globe className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="text-xs font-black text-white block">Indeed Platform</span>
                              <span className="text-[9px] text-zinc-500 font-mono">{lang === "ar" ? "بوابة التوظيف المعتمدة" : "Job application verified"}</span>
                            </div>
                          </div>
                          <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                        </a>
                      )}

                      {/* TikTok & Facebook footer rows for complete integration */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <a
                          href={profile.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 bg-zinc-950 rounded-xl border border-zinc-850 text-center text-[10px] font-mono text-zinc-400 hover:text-white hover:border-zinc-700 transition"
                        >
                          TikTok Channel
                        </a>
                        <a
                          href={profile.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 bg-zinc-950 rounded-xl border border-zinc-850 text-center text-[10px] font-mono text-zinc-400 hover:text-white hover:border-zinc-700 transition"
                        >
                          Facebook Pro
                        </a>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: LIVE AI CONSULTANT & BLUEPRINT BUILDER */}
          {activeTab === "ai-consultant" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <div className="max-w-3xl mx-auto text-center space-y-2">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">AI consultation & Technical Blueprint generator</h2>
                <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
                  Avoid vague proposals. Outline your core idea below, specify budget limits and timelines, and let our Gemini core systems builder construct a thorough Silicon-Valley-standard architectural specification ready for review.
                </p>
              </div>

              {/* Prefill templates helper */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#06b6d2] text-center">
                  Prefill consultation templates to speed up review:
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {plannerTemplates.map((tmpl) => (
                    <button
                      key={tmpl.title}
                      onClick={() => handleUseTemplate(tmpl)}
                      className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-left hover:border-zinc-800 hover:bg-zinc-900/30 transition-all space-y-1.5 focus:outline-none focus:border-[#06b6d2]"
                    >
                      <span className="block text-xs font-bold text-white font-sans">{tmpl.title}</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed font-light line-clamp-2">
                        {tmpl.text}
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-[#06b6d2] font-mono pt-1">
                        <span>{tmpl.timeline}</span>
                        <span>{tmpl.budget.split(" ")[0]}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Formulation panel & output view */}
              <div id="consultation-form" className="grid lg:grid-cols-12 gap-8 pt-6">
                
                {/* Board config */}
                <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 p-8 rounded-2xl space-y-6 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div>
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">
                        Project Capabilities Class
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-850 px-3.5 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                      >
                        <option>Custom Python Backend / API Engine</option>
                        <option>Enterprise E-Commerce Systems</option>
                        <option>Sleek iOS & Android Mobile Apps</option>
                        <option>Custom SaaS & Cloud Systems</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">
                        Proposed Budget Limits
                      </label>
                      <select
                        value={targetBudget}
                        onChange={(e) => setTargetBudget(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-850 px-3.5 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                      >
                        <option>$3,500 - $5,000 (Basic Integration)</option>
                        <option>$5,000 - $10,000 (Mid-Scale Enterprise)</option>
                        <option>$10,000 - $25,000 (High-Performance Core)</option>
                        <option>$25,000 - $50,050 (High-Availability Cloud)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">
                        Target Handover Timeline
                      </label>
                      <select
                        value={targetTimeline}
                        onChange={(e) => setTargetTimeline(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-850 px-3.5 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                      >
                        <option>3 to 4 Weeks</option>
                        <option>4 to 6 Weeks</option>
                        <option>6 to 8 Weeks</option>
                        <option>8 to 12 Weeks</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">
                        Describe Core Features, Users & Goal
                      </label>
                      <textarea
                        value={projectRequirements}
                        onChange={(e) => setProjectRequirements(e.target.value)}
                        className="w-full h-44 bg-zinc-900/40 border border-zinc-850 rounded-xl p-4 text-xs font-sans text-zinc-300 focus:outline-none focus:border-cyan-500 leading-relaxed resize-none"
                        placeholder="e.g. Build an offline survey manager app with robust coordinate calculation synchronizing to SQL/Django API models..."
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-900">
                    <button
                      onClick={handleBlueprintGeneration}
                      disabled={blueprintLoading || !projectRequirements.trim()}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:bg-zinc-850 disabled:from-zinc-900 disabled:to-zinc-900 disabled:text-zinc-650 disabled:border-zinc-850 font-extrabold uppercase text-xs tracking-widest text-[#09090b] transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      {blueprintLoading ? (
                        <>
                          <div className="h-3 w-3 shrink-0 animate-spin rounded-full border border-zinc-950 border-t-transparent" />
                          <span>Architecting Blueprint Systems...</span>
                        </>
                      ) : (
                        <>
                          <span>Formulate Enterprise Blueprint</span>
                          <Sparkles className="h-4.5 w-4.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Blueprint Render board */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    {blueprintResult ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.99 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 glow-cyan flex-1 flex flex-col justify-between space-y-8"
                      >
                        {/* Blueprint header */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest px-2.5 py-1 bg-cyan-950/20 border border-cyan-800/40 rounded-full font-bold">
                              Technical Blueprint Draft
                            </span>
                            <span className="text-xs font-mono text-zinc-500">
                              OSERA Systems Lab
                            </span>
                          </div>

                          <div>
                            <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block">
                              Assigned Project Title:
                            </span>
                            <h3 className="text-2xl font-black text-white bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                              {blueprintResult.projectTitle}
                            </h3>
                          </div>
                        </div>

                        {/* Technology Stack recommendations */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4.5">
                          <div className="p-4 bg-zinc-900/30 rounded-xl border border-zinc-900">
                            <span className="text-[9px] text-[#06b6d2] font-mono uppercase tracking-widest block mb-1">
                              Frontend Core
                            </span>
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                              {blueprintResult.recommendedStack.frontend}
                            </p>
                          </div>
                          <div className="p-4 bg-zinc-900/30 rounded-xl border border-zinc-900">
                            <span className="text-[9px] text-[#06b6d2] font-mono uppercase tracking-widest block mb-1">
                              Backend & Database
                            </span>
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                              {blueprintResult.recommendedStack.backend}
                            </p>
                          </div>
                          <div className="p-4 bg-zinc-900/30 rounded-xl border border-zinc-900">
                            <span className="text-[9px] text-[#06b6d2] font-mono uppercase tracking-widest block mb-1">
                              Infrastructure
                            </span>
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                              {blueprintResult.recommendedStack.infrastructure}
                            </p>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-3">
                          <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider block font-mono">
                            Crucial Security & Performance Gates:
                          </span>
                          <div className="grid gap-2.5">
                            {blueprintResult.architectureHighlights.map((highlight, index) => (
                              <div key={index} className="flex gap-2.5 items-start text-xs text-zinc-350 bg-[#0d0d12] p-3 rounded-xl border border-zinc-900 leading-relaxed">
                                <ShieldCheck className="h-4.5 w-4.5 mt-0.5 text-emerald-400 shrink-0" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Timeline accordion */}
                        {blueprintResult.timelinePhases && blueprintResult.timelinePhases.length > 0 && (
                          <div className="space-y-3">
                            <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider block font-mono">
                              Development Phases Timeline:
                            </span>
                            <div className="grid gap-3">
                              {blueprintResult.timelinePhases.map((phase, idx) => (
                                <div key={idx} className="p-4 bg-zinc-900/10 border border-zinc-900 rounded-xl space-y-2">
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-white font-sans">{phase.phase}</span>
                                    <span className="font-mono text-cyan-400 text-[11px] font-semibold">{phase.duration}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {phase.deliverables.map((del, dIdx) => (
                                      <span key={dIdx} className="text-[10px] bg-zinc-900 px-2 py-0.5 rounded text-zinc-400 font-mono border border-zinc-800">
                                        ✓ {del}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tech Advisory */}
                        <div className="p-5 bg-cyan-950/10 border border-cyan-800/20 rounded-2xl">
                          <label className="text-[9px] font-mono text-cyan-300 uppercase tracking-widest block mb-2">
                            Systems Architect Handover Note:
                          </label>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            {blueprintResult.expertAdvice}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-zinc-900 flex flex-col md:flex-row gap-3.5 items-center justify-between text-[11px] font-mono">
                          <div className="flex items-center gap-4">
                            <span className="text-zinc-500">
                              Estimated Complexity: <strong className="text-cyan-400">{blueprintResult.estimatedComplexity}</strong>
                            </span>
                            <span className="text-zinc-400">
                              Status: <strong className="text-emerald-400 uppercase">Draft Generated</strong>
                            </span>
                          </div>

                          <a
                            href={`https://wa.me/20${profile.whatsapp}?text=${encodeURIComponent(
                              lang === "ar"
                                ? `مرحباً أسامة إسماعيل، لقد قمت بتوليد المخطط الفني لمشروعي باستخدام مستشار الذكاء الاصطناعي:\n\n- فئة النظام: ${projectType}\n- الميزانية المحددة: ${targetBudget}\n- فترة الإنجاز المطلوبة: ${targetTimeline}\n- عنوان المشروع المقترح: ${blueprintResult.projectTitle}\n- الواجهة الأمامية: ${blueprintResult.recommendedStack.frontend}\n- قواعد البيانات والخلفية: ${blueprintResult.recommendedStack.backend}\n- البنية التحتية: ${blueprintResult.recommendedStack.infrastructure}\n- تعقيد النظام: ${blueprintResult.estimatedComplexity}\n\nيرجى مراجعة المخطط الفني والتحقق من متطلبات الإطلاق.`
                                : `Hello Osama Ismail, I generated a technical system blueprint using your AI system builder:\n\n- System Class: ${projectType}\n- Stated Budget: ${targetBudget}\n- Stated Timeline: ${targetTimeline}\n- Proposed Project Title: ${blueprintResult.projectTitle}\n- Frontend Stack: ${blueprintResult.recommendedStack.frontend}\n- Backend & Database: ${blueprintResult.recommendedStack.backend}\n- Infrastructure Stack: ${blueprintResult.recommendedStack.infrastructure}\n- Estimated Complexity: ${blueprintResult.estimatedComplexity}\n\nLet's discuss and schedule starting development!`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                          >
                            <span>{lang === "ar" ? "مشاركة وإرسال المخطط الفني للواتساب" : "Share & Send Blueprint to WhatsApp"}</span>
                            <svg className="h-4 w-4 text-white fill-current" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.86L2.51 22l4.31-1.38C8.36 21.41 10.13 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.75 13.92c-.22.61-1.13 1.15-1.63 1.25-.46.09-.96.11-2.91-.65-2.5-1.02-4.1-3.57-4.22-3.73-.13-.17-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.2-.21.5-.32.81-.32h.27c.22 0 .5.08.73.61.23.56.77 1.88.84 2.01.07.13.11.29.02.46-.09.18-.2.29-.38.51-.18.23-.38.41-.55.6-.19.19-.39.39-.17.77.22.38.97 1.6 2.07 2.58 1.42 1.27 2.62 1.66 2.99 1.84.37.18.59.15.81-.11.22-.26.97-1.13 1.23-1.51.26-.38.53-.32.89-.18.37.13 2.33 1.1 2.73 1.3s.67.3.77.48c.11.18.11 1.05-.11 1.66z"/>
                            </svg>
                          </a>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-zinc-950/40 border border-zinc-900 rounded-3xl p-8 text-center flex flex-col items-center justify-center flex-1 min-h-[500px]">
                        <div className="h-12 w-12 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mb-4">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <h4 className="text-base font-bold text-white mb-2">Technical Blueprint Drafting Hub</h4>
                        <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                          Define your systems requirements or prefill standard criteria blocks on the left, then trigger the compilation workflow. Gemini will build complete structure models, databases recommendations, key timelines and expert lead architect reviews.
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 5: OSERA CREDENTIALS & WORKFLOW */}
          {activeTab === "story" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Founder Profile */}
              <div className="grid md:grid-cols-12 gap-8 bg-[#09090c]/50 backdrop-blur-sm border border-slate-900/80 p-8 rounded-3xl">
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-32 w-32 rounded-3xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[1.5px] relative shrink-0">
                    <div className="absolute inset-0 bg-cyan-400 rounded-3xl blur-md opacity-25 animate-pulse" />
                    <div className="h-full w-full rounded-[22px] bg-[#050505] overflow-hidden relative">
                      <img
                        src={profile.avatarBase64 || osamaRealisticAvatarImg}
                        alt="Osama Esmael - Systems Architect"
                        className="h-full w-full object-cover select-none filter brightness-95 hover:brightness-105 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black tracking-tight text-white uppercase">{profile.founderName || "Osama Esmael"}</h4>
                    <span className="text-xs text-cyan-400 uppercase font-mono tracking-[0.2em] block mt-1">
                      {lang === "ar" ? profile.founderTitleAr : profile.founderTitleEn}
                    </span>
                  </div>
                  <div className="px-3.5 py-1 bg-zinc-900 rounded-full border border-zinc-800 text-[10px] text-zinc-400 font-mono">
                    {lang === "ar" ? "رئيس المهندسين المعتمدين" : "Top-Rated Dev"}
                  </div>
                </div>

                <div className="md:col-span-8 space-y-6">
                  <div>
                    <span className="text-[10px] text-cyan-500 uppercase font-mono tracking-widest block mb-1">
                      VETTED DEVELOPMENT EXPERT
                    </span>
                    <h3 className="text-3xl font-black tracking-tight text-white uppercase">
                      {lang === "ar" ? "خبرة هندسية موثقة للمؤسسات" : "Proven Enterprise Backend Authority"}
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {lang === "ar" 
                      ? "يطور أسامة بنية تحتية سحابية موزعة، بوابات دفع آمنة، وأنظمة لوجستية معقدة للمؤسسات العالمية، متبعاً أحدث المعايير الهندسية القياسية لعام ٢٠٢٦."
                      : "Osama architects high-performance distributed cloud backends, payment ledgers, and secure logistics engines for global enterprises following clean 2026 standards."
                    }
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex gap-3 items-start text-xs">
                      <ShieldCheck className="h-5 w-5 text-[#06b6d2] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-bold uppercase tracking-wide">
                          {lang === "ar" ? "نجاح مضمون بنسبة ١٠٠٪" : "100% Client Success"}
                        </strong>
                        <span className="text-zinc-500">
                          {lang === "ar" ? "رضا تام من شركاء الأعمال الكبرى" : "Continuous enterprise client satisfaction"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start text-xs">
                      <Award className="h-5 w-5 text-[#06b6d2] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-bold uppercase tracking-wide">
                          {lang === "ar" ? "اعتماد رسمي ومنح ريادية" : "State Approved Enterprise"}
                        </strong>
                        <span className="text-zinc-500">
                          {lang === "ar" ? "مشاريع حاصلة على الثقة والتمويل التقني المعترف به" : "Recipient of government development grants"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VERIFIED RATING & TESTS SECTION */}
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto">
                  <h3 className="text-2xl font-black tracking-tight text-white uppercase">{t.testimonialsTitle}</h3>
                  <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.23em] font-bold mt-1">
                    {t.testimonialsSubtitle}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pb-4">
                  {(profile.testimonials || DEFAULT_PROFILE.testimonials).map((tItem, i) => {
                    const name = tItem.name;
                    const role = lang === "ar" ? tItem.roleAr : tItem.roleEn;
                    const text = lang === "ar" ? tItem.textAr : tItem.textEn;
                    const badges = ["+320% Speed", "12k req/min", "Offline GPS Lock", "SecOps Audit Pass"];
                    const badge = badges[i % badges.length];
                    return (
                      <TiltCard
                        key={i}
                        className="p-6 rounded-3xl bg-[#09090c]/60 border border-slate-905 hover:border-slate-800 transition-all duration-300 flex flex-col justify-between"
                        glowColor="rgba(6, 182, 212, 0.15)"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-1 text-cyan-400 text-xs">
                              {"★".repeat(5)}
                              <span className="text-[10px] text-zinc-500 ml-1 font-mono">(5.0/5.0)</span>
                            </div>
                            <span className="text-[9px] font-mono px-2 py-0.5 bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 rounded">
                              {badge}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed italic font-light font-sans">
                            " {text} "
                          </p>
                        </div>
                        <div className="flex items-center gap-3 pt-6 border-t border-slate-900 mt-4">
                          <div className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-black text-cyan-400">
                            {name[0] || "U"}
                          </div>
                          <div>
                            <div className="text-xs font-black text-white">{name}</div>
                            <div className="text-[9px] text-zinc-500 font-mono">{role}</div>
                          </div>
                        </div>
                      </TiltCard>
                    );
                  })}
                </div>
              </div>

              {/* STRATEGIC TEAM SECTION */}
              <div className="space-y-6 pt-6">
                <div className="text-center max-w-xl mx-auto">
                  <h3 className="text-2xl font-black tracking-tight text-white uppercase">{t.teamTitle}</h3>
                  <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.23em] font-bold mt-1">
                    {t.teamSubtitle}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {[
                    { name: profile.founderName || "Osama Esmael", role: lang === "ar" ? profile.founderTitleAr : profile.founderTitleEn, skills: ["Django Core", "AWS Architect", "DB N+1 Ops"], avatar: profile.avatarBase64 || osamaRealisticAvatarImg },
                    { name: "Alhussien Othman", role: t.roleSales, skills: lang === "ar" ? ["عقود الشركات", "اتفاقيات الخدمة", "تكامل الأعمال"] : ["Enterprise Deals", "SLA Negotiate", "B2B Accounts"], avatar: alhussienAvatarImg },
                    { name: "Safar L. Al-Otaibi", role: t.roleFrontend, skills: ["React 19", "Tailwind v4", "3D WebGL"], avatar: safarAvatarImg },
                    { name: "Dr. Ryan Vance", role: t.roleSecOps, skills: ["JWT Isolation", "PyTest SecOps", "Docker Swarm"], avatar: ryanAvatarImg },
                    { name: "Sara B. Al-Hussain", role: t.roleQA, skills: ["API Automation", "K6 Speed check", "Schema Lock"], avatar: saraAvatarImg },
                  ].map((member, i) => (
                    <TiltCard
                      key={i}
                      className="p-6 rounded-3xl bg-[#09090c]/70 border border-slate-90/90 flex flex-col justify-between hover:border-slate-800 hover:shadow-[0_0_20px_rgba(6,182,212,0.06)] transition-all duration-300 group"
                      glowColor="rgba(6, 182, 212, 0.12)"
                    >
                      <div className="space-y-4">
                        <div className="h-16 w-16 rounded-2xl bg-zinc-950 overflow-hidden border border-zinc-800 relative z-20 group-hover:border-cyan-500/50 transition-all duration-300 shrink-0">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="h-full w-full object-cover select-none filter brightness-90 hover:brightness-105 transition-all duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors uppercase">{member.name}</h4>
                          <p className="text-[10px] text-zinc-500 block mt-1 font-mono uppercase tracking-wider">{member.role}</p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-6 mt-6 border-t border-slate-950">
                        <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-black block">{t.deliveredCapabilities}</span>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((s, idx) => (
                            <span key={idx} className="text-[8px] font-mono px-2 py-0.5 bg-zinc-950/80 rounded border border-zinc-900 text-zinc-400">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </div>

              {/* Dev Methodology Showcase */}
              <div className="space-y-6 pt-6">
                <div className="text-center max-w-xl mx-auto">
                  <h3 className="text-2xl font-black tracking-tight text-white uppercase">
                    {lang === "ar" ? "معايير الأكواد والتسليم لعام ٢٠٢٦" : "Our 2026 Production Standards"}
                  </h3>
                  <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.23em] font-bold mt-1">
                    {lang === "ar" ? "نموذج الأمان والهندسة الدفاعية" : "Defensive software development metrics"}
                  </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                  {[{ id: "01", title: lang === "ar" ? "تخطيط قواعد البيانات" : "Rigorous Schema", desc: lang === "ar" ? "تأسيس خريطة بيانات تفصيلية وتجهيز استعلامات نظيفة مع تفعيل كاش الفهرسة قبل بدء أي كتابة برمجية." : "Clear initial relational entity maps, strict database constraints, indexing, and migration planning done before code commit." },
                    { id: "02", title: lang === "ar" ? "فحص الجودة التلقائي" : "Static Auditing", desc: lang === "ar" ? "استخدام مدققات جودة آلية تمنع أي تسريب للموديلات أو تداخل للمتغيرات قبل الدخول في السيرفر الفعلي." : "Automated pipeline screening using strict TypeScript constraints and python automated formatters." },
                    { id: "03", title: lang === "ar" ? "جدولة الخوادم المتزامنة" : "Async Scaling", desc: lang === "ar" ? "فصل العمليات الثقيلة على خوادم Redis وقوائم Celery لضمان تجاوب فائق ومنع انقطاع السيرفر تحت أي حمل." : "Unloading blocking heavy loops onto Background worker queues continuously to assure absolute responsiveness." },
                    { id: "04", title: lang === "ar" ? "الأمن والدفاع الدفاعي" : "Absolute Security", desc: lang === "ar" ? "تشفير الرموز (JWT) والتحقق التام من بوابات الدفع وجدران الحماية لتأمين بيانات شركتك بشكل كلي." : "Securing token endpoints, sanitizing raw queries, and adding complete cryptographic validations automatically." }
                  ].map((step, idx) => (
                    <div key={idx} className="p-8 rounded-3xl bg-[#09090c]/50 backdrop-blur-sm border border-slate-900 space-y-3 hover:border-slate-800 transition-all duration-300">
                      <span className="text-sm font-mono text-cyan-400 block">{step.id} //</span>
                      <span className="text-lg font-black tracking-tight text-white uppercase block">{step.title}</span>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* EXPERT AUDIT & WEB LOADING PERFORMANCE CENTER */}
              <div className="pt-12 border-t border-slate-900/60">
                <ExpertAudit lang={lang} />
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* Subtle particle separator */}
      <ParticleSeparator />

      {/* Brief Consultation Planner Footer Form */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20 border-t border-slate-900/60 mt-12 bg-transparent" id="consultation-form">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] text-cyan-400 uppercase tracking-[0.2em] font-mono block">
              SCHEDULE YOUR SYSTEMS BRIEFING
            </span>
            <h3 className="text-3xl font-black tracking-tight text-white uppercase sm:text-4xl">Let's Construct a Superior Platform</h3>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              We resolve slow performance, design scalable database connections, and engineer bulletproof platforms. Submit structural inquiries or schedule custom architecture planning directly.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                <span className="h-5 w-5 shrink-0 flex items-center justify-center rounded-full bg-cyan-950 text-cyan-400">
                  <Check className="h-3 w-3" />
                </span>
                <span>100% Code Portability & Handover Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                <span className="h-5 w-5 shrink-0 flex items-center justify-center rounded-full bg-cyan-950 text-cyan-400">
                  <Check className="h-3 w-3" />
                </span>
                <span>NDA & Secure Developer Agreement Provided</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                <span className="h-5 w-5 shrink-0 flex items-center justify-center rounded-full bg-cyan-950 text-cyan-400">
                  <Check className="h-3 w-3" />
                </span>
                <span>Direct Slack access to Lead Architect</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#09090c]/50 backdrop-blur-sm border border-slate-900/80 p-8 rounded-3xl space-y-6">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-6 text-center space-y-4"
              >
                <div className="h-14 w-14 rounded-full bg-emerald-950/40 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-black text-white uppercase tracking-tight">Systems Briefing Registered</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Osama Esmael and our systems design team have received your request and will coordinate a direct secure contact loop on your business email shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 font-mono mt-4 cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </motion.div>
            ) : (
              <>
                <h4 className="text-xl font-black tracking-tight text-white uppercase">Consultation Brief Form</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1.5 font-mono">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Katherine Wright"
                      className="w-full bg-zinc-900/40 border border-slate-900/80 px-3.5 py-2.5 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1.5 font-mono">Business Email</label>
                    <input
                      type="email"
                      placeholder="e.g., katherine@enterprise.com"
                      className="w-full bg-zinc-900/40 border border-slate-900/80 px-3.5 py-2.5 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1.5 font-mono">What system are we engineering?</label>
                  <textarea
                    rows={3}
                    placeholder="Give a brief description of the technical platform or bottleneck..."
                    className="w-full bg-zinc-900/40 border border-slate-900/80 p-3.5 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-cyan-500 resize-none font-mono"
                  />
                </div>

                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full py-4 bg-white hover:bg-zinc-200 text-[#050505] font-black uppercase text-xs tracking-[0.2em] rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  Submit Systems Inquiry
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Corporate footer footer */}
      <footer className="mx-auto max-w-7xl px-6 lg:px-8 py-8 border-t border-zinc-900 text-center flex flex-col md:flex-row md:justify-between items-center gap-4">
        <span className="text-[11px] text-zinc-500">
          © {new Date().getFullYear()} OSERA. All rights reserved. Osama Esmael, Certified Systems Architect.
        </span>

        <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
          Built with <span className="text-cyan-400">Gemini 3.5 Flash</span> Server API.
        </span>
      </footer>

      {/* OSERA Site-Wide Intelligent Chatbot Co-pilot */}
      <AIAssistantChat
        lang={lang}
        isOpen={chatOpen}
        onClose={() => {
          setChatOpen(false);
          setChatPrepopulated(undefined);
        }}
        onOpen={() => setChatOpen(true)}
        prepopulatedQuestion={chatPrepopulated}
        customWelcomeEn={profile.advisorWelcomeEn}
        customWelcomeAr={profile.advisorWelcomeAr}
        customPlaceholderEn={profile.advisorPlaceholderEn}
        customPlaceholderAr={profile.advisorPlaceholderAr}
      />

      {/* Corporate Admin Panel Editor */}
      <AdminPanel
        lang={lang}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        profile={profile}
        onSaveProfile={saveProfile}
      />
    </div>
  );
}
