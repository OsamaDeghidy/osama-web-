import React, { useState } from "react";
import { 
  motion, AnimatePresence 
} from "motion/react";
import { 
  Lock, Check, Save, LogOut, User, Link2, Globe, FileText, 
  Sparkles, ShieldCheck, RefreshCw, Layers, Phone, CreditCard, 
  Briefcase, Edit3, Trash2, Plus, Image, UploadCloud, Smile,
  Eye, EyeOff, Terminal, Settings, MessageSquare, Award
} from "lucide-react";

export interface CaseStudyItem {
  id: string;
  titleEn: string;
  titleAr: string;
  clientEn: string;
  clientAr: string;
  industryEn: string;
  industryAr: string;
  category: "backend" | "ecommerce" | "mobile" | "custom" | "fastapi_nestjs" | "react_next";
  metric: string;
  metricLabelEn: string;
  metricLabelAr: string;
  descEn: string;
  descAr: string;
  deliverablesEn: string[];
  deliverablesAr: string[];
  tags: string[];
  visible?: boolean;
  imageUrl?: string;
}

export interface TechnologyAllianceItem {
  name: string;
  typeEn: string;
  typeAr: string;
}

export interface CorporateProfile {
  founderName: string;
  founderTitleAr: string;
  founderTitleEn: string;
  heroDescAr: string;
  heroDescEn: string;
  avatarBase64: string; // custom upload base64
  logoText: string;
  logoImgBase64: string; // custom upload base64 logo
  whatsapp: string;
  nafezly: string;
  linkedin: string;
  upwork: string;
  youtube: string;
  facebook: string;
  tiktok: string;
  paypal: string;
  indeed: string;
  liveProjects: Array<{
    title: string;
    descAr: string;
    descEn: string;
    url: string;
    category: string;
    metric: string;
  }>;

  // --- Show / Hide Controls (Toggles) ---
  showServices: boolean;
  showCalculator: boolean;
  showSandbox: boolean; // "Django Code" (or Portfolio Tab)
  showAiConsultant: boolean; // "Live Advisor"
  showStory: boolean; // "Credentials / Team / Testimonials"

  // --- Services Details ---
  servicesList: Array<{
    id: string;
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
    iconName: "Terminal" | "ShoppingBag" | "Smartphone" | "Cpu";
    bulletPointsEn: string[];
    bulletPointsAr: string[];
  }>;

  // --- Budget Config Details ---
  baseRateBackend: number;
  baseRateEcommerce: number;
  baseRateMobile: number;
  baseRateCustom: number;
  baseRateFastApiNest: number;
  baseRateReactNext: number;

  calcFeatures: Array<{
    tier: "backend" | "ecommerce" | "mobile" | "custom" | "fastapi_nestjs" | "react_next";
    nameEn: string;
    nameAr: string;
    price: number;
    hours: number;
  }>;

  // --- Case Studies (Proven Deployments) ---
  caseStudiesList: CaseStudyItem[];

  // --- Technology Partners / Alliances ---
  partnersList: TechnologyAllianceItem[];

  // --- Django Code Settings ---
  defaultDjangoCode: string;
  djangoSnippetTitleEn: string;
  djangoSnippetTitleAr: string;

  // --- Live Advisor Settings ---
  advisorWelcomeEn: string;
  advisorWelcomeAr: string;
  advisorPlaceholderEn: string;
  advisorPlaceholderAr: string;

  // --- Credentials/Testimonials Settings ---
  testimonials: Array<{
    name: string;
    roleEn: string;
    roleAr: string;
    textEn: string;
    textAr: string;
  }>;
}

export const DEFAULT_PROFILE: CorporateProfile = {
  founderName: "Osama Esmael",
  founderTitleAr: "رئيس مهندسي الأنظمة والمؤسس لوكالة OSERA",
  founderTitleEn: "Founder & Lead Cloud Systems Architect",
  heroDescAr: "يقوم أسامة إسماعيل بابتكار بنيات معمارية متقدمة لخوادم دجانغو (Django)، وتأمين بوابات دفع سحابية فائقة القوة ومزامنة فورية دون اتصال لخدمة ألاف المستخدمين.",
  heroDescEn: "Osama Esmael designs and architects high-concurrency Django backend clusters, integrated payment ledgers, and secure offline-first mobile systems ready for global scale.",
  avatarBase64: "", // fallbacks to realistic avatar in App.tsx
  logoText: "OSERA SYSTEMS",
  logoImgBase64: "",
  whatsapp: "01066906132",
  nafezly: "https://nafezly.com/u/osama_el_deghady",
  linkedin: "https://www.linkedin.com/in/osama-deghadey-941552255/",
  upwork: "https://www.upwork.com/freelancers/~01bf4f5af0779c48e8?mp_source=share",
  youtube: "https://youtube.com/@osamaesmail-y3p?si=IXi4umn-kN0QnNZp",
  facebook: "https://www.facebook.com/share/1cFNBCGtwA/",
  tiktok: "https://www.tiktok.com/@oserasoft1?_r=1&_t=ZS-978QFxX0dCW",
  paypal: "https://www.paypal.me/OsamaDeghady",
  indeed: "https://profile.indeed.com/?hl=en_EG&co=EG&from=gnav-homepage",
  liveProjects: [
    {
      title: "Osara AI Platform",
      descAr: "نظام وحوار الذكاء الاصطناعي لتوليد الأكواد المعيارية السريعة وعقود النظم الموزعة",
      descEn: "Advanced AI conversational assistant for system generation & design templates",
      url: "https://www.osara-ai.com/",
      category: "AI & Automation",
      metric: "Active System"
    },
    {
      title: "Enterprise Core Manager",
      descAr: "لوحة تحكم سحابية لإدارة البيانات الضخمة للمؤسسات الشريكة وأداء السيرفرات",
      descEn: "Centralized big-data cloud management panel for container performance metrics",
      url: "http://64.227.108.135/login",
      category: "Infrastructure",
      metric: "99.99% Uptime"
    },
    {
      title: "OMS Connect Pack",
      descAr: "منصة ذكية لإدارة طلبات الشحن واللوجستيات وتتبع المخزون لحظة بلحظة",
      descEn: "Order and shipment logistics ecosystem with real-time background queues",
      url: "https://oms.connect-pack.com/",
      category: "Logistics",
      metric: "Sync Enabled"
    },
    {
      title: "A-List Home Pros",
      descAr: "نظام حجز وتعيين خدمات الصيانة السكنية المتقدمة للشركات والعملاء بفلوريدا",
      descEn: "Enterprise service matching and live scheduled booking web portal in US",
      url: "https://www.alisthomepros.com/",
      category: "Web Engines",
      metric: "Live Production"
    },
    {
      title: "RSN Arabiya News Net",
      descAr: "منصة معتمدة لنشر وإدارة المحتوى الإخباري العربي عبر استبيانات وأنظمة تداول مؤمنة",
      descEn: "High-throughput Arab news network and content architecture",
      url: "https://www.rsnalarabiya.info/",
      category: "Media Systems",
      metric: "Approved Portal"
    },
    {
      title: "Kero Trade Global",
      descAr: "المنصة العالمية للتجارة الدولية والخدمات اللوجستية وتتبع الشحنات والتبادل التجاري المتكامل",
      descEn: "Secure international commercial exchange, enterprise supply flows and trade logistics network",
      url: "https://www.kero-trade.com/en",
      category: "Global Trade",
      metric: "Live Production"
    }
  ],

  // --- Show / Hide Controls (Toggles) ---
  showServices: true,
  showCalculator: true,
  showSandbox: true,
  showAiConsultant: true,
  showStory: true,

  // --- Services Details ---
  servicesList: [
    {
      id: "django",
      titleEn: "Django & Python Engineering",
      titleAr: "هندسة بايثون ودجانغو (Django)",
      descEn: "Architecting elite backends with robust scalability and defensive coding strategies.",
      descAr: "بناء وتصميم خلفيات برمجية فائقة الأداء والقوة لتسهيل التوسع ومعالجة البيانات الضخمة.",
      iconName: "Terminal",
      bulletPointsEn: [
        "Custom RESTful & GraphQL API layout (Django REST Framework)",
        "N+1 query eradication via rigorous ORM database tuning",
        "Asynchronous tasks with Celery, Redis, and RabbitMQ",
        "Comprehensive unit and integration testing setups (pytest, coverage)",
        "Strict security posture: SQLi, XSS, and CSRF robust hardening"
      ],
      bulletPointsAr: [
        "تصميم وبرمجة واجهات RESTful & GraphQL باستخدام DRF",
        "استئصال مشكلات استعلامات N+1 وضبط أداء الـ ORM بقوة",
        "تشغيل المهام الخلفية وغير المتزامنة بـ Celery و Redis",
        "بيئة اختبار كاملة للتحقق من سلامة الأكواد بـ PyTest",
        "تأمين صارم ضد ثغرات الاختراق SQLi و CSRF"
      ]
    },
    {
      id: "ecommerce",
      titleEn: "Enterprise E-Commerce Systems",
      titleAr: "أنظمة التجارة الإلكترونية للمؤسسات والأعمال",
      descEn: "Designing high-conversion transactional architectures with near-zero latency.",
      descAr: "تصميم أنظمة تجارة مرنة تدعم بوابات دفع متعددة ومزامنة فورية للمخازن واللوجستيات.",
      iconName: "ShoppingBag",
      bulletPointsEn: [
        "Tailored checkout engines designed to support surges in traffic",
        "Granular multi-tiered inventory and warehouse sync APIs",
        "Flawless multi-provider gateways with automated reconciliation",
        "Scalable multi-tenant vendor management administration panels",
        "Full analytics telemetry, cart abandonment hooks and metrics trackers"
      ],
      bulletPointsAr: [
        "بناء بوابات فحص ودفع سريعة تدعم مئات الطلبات بالدقيقة",
        "ربط فوري للمخازن الذكية وسرعة تحديث كميات المنتجات",
        "بوابات دفع الكتروني آمنة (Stripe, PayPal, Paymob) مع تسوية آلية",
        "لوحات تحكم قوية ومتعددة التجار لإدارة المبيعات والعملاء",
        "تتبع دقيق لمعدلات التحويل ومراقبة السلال المتروكة تلقائياً"
      ]
    },
    {
      id: "mobile",
      titleEn: "Sleek iOS & Android Mobile Apps",
      titleAr: "تطبيقات الهواتف الذكية iOS وأندرويد",
      descEn: "Developing responsive native and cross-platform apps linked to robust backends.",
      descAr: "ابتكار واجهات مستخدم ملساء تضمن أداءً فائق الجودة والسرعة وحل مشاكل المزامنة الأرضية.",
      iconName: "Smartphone",
      bulletPointsEn: [
        "Offline-first mobile synchronization strategies",
        "Fluid tactile gestures and motion transitions",
        "Fast native capabilities (Biometrics, Push Notifications, Bluetooth)",
        "Optimized localized memory models and lightweight storage hooks",
        "Automated Play Store & App Store deployment pipelines"
      ],
      bulletPointsAr: [
        "تطبيق آليات المزامنة الأرضية الأولى دون اتصال (Offline-first)",
        "واجهات تفاعلية جذابة وحركات انتقالية سلسة باللمس",
        "ربط المزايا البرمجية الأصلية (البصمة، الإشعارات، البلوتوث)",
        "بيئة تخزين محلية خفيفة وسريعة وسيرفر وسيط معالج",
        "تكامل هندسي لنشر التطبيقات آلياً على متاجر آبل وجوجل"
      ]
    },
    {
      id: "custom",
      titleEn: "Custom SaaS & Cloud Systems",
      titleAr: "أنظمة السحاب وحلول الـ SaaS المخصصة",
      descEn: "Crafting bespoke administrative tools and analytics engines built from your requirements.",
      descAr: "تطوير لوحات إحصائية ذكية وتكامل برمجي لجميع أعمالك لتسهيل الرقابة والإدارة الفعالة.",
      iconName: "Cpu",
      bulletPointsEn: [
        "Scalable database models (PostgreSQL, Redis, Elasticsearch)",
        "Robust role-based permission grids with activity logs",
        "Secure OAuth and Single Sign-On (SSO) integrations",
        "Real-time reactive visual reporting and analytics",
        "Self-healing cloud infrastructure layouts ready to scale"
      ],
      bulletPointsAr: [
        "تصميم قواعد بيانات معيارية سريعة كـ Postgres و Elasticsearch",
        "نظام متطور لتوزيع الصلاحيات وسجلات تتبع العمليات للشركاء",
        "توثيق الدخول الموحد بـ OAuth و Google & Microsoft SSO",
        "لوحات بيانية سريعة تقدم تقارير إحصائية مرئية فورية",
        "تجهيز بيئات سحابية معزولة لحماية الخوادم والتعافي الذاتي"
      ]
    }
  ],

  // --- Budget Config Details ---
  baseRateBackend: 3500,
  baseRateEcommerce: 5000,
  baseRateMobile: 6500,
  baseRateCustom: 6000,
  baseRateFastApiNest: 4000,
  baseRateReactNext: 4500,

  calcFeatures: [
    { tier: "backend", nameEn: "Database Migration", nameAr: "ترحيل وتأمين قواعد البيانات", price: 600, hours: 5 },
    { tier: "backend", nameEn: "Admin Dashboard", nameAr: "لوحة التحكم للمشرف", price: 1200, hours: 10 },
    { tier: "backend", nameEn: "API Key Management", nameAr: "إدارة مفاتيح الـ API والتأمين", price: 800, hours: 6 },
    { tier: "backend", nameEn: "Celery Task Queues", nameAr: "طوابير مهام سيلري الخلفية الموزعة", price: 1800, hours: 15 },
    { tier: "backend", nameEn: "SaaS Multi-Tenancy", nameAr: "تعدد بيئات العمل الحرة SaaS", price: 2500, hours: 20 },
    { tier: "backend", nameEn: "Redis Caching Integration", nameAr: "تنصيب خوادم Redis للتخزين المؤقت", price: 1000, hours: 8 },

    { tier: "ecommerce", nameEn: "Stripe Payment Gateway", nameAr: "بوابة دفع سترايب وعقود العملات", price: 1200, hours: 10 },
    { tier: "ecommerce", nameEn: "Global tax & Shipping Rates", nameAr: "حساب الضرائب وسلاسل الشحن", price: 1500, hours: 12 },
    { tier: "ecommerce", nameEn: "Abandoned Cart Flow Manager", nameAr: "إدارة السلال المهجورة والإشعارات التلقائية", price: 1800, hours: 15 },
    { tier: "ecommerce", nameEn: "Invoice Automatic Engine", nameAr: "منظومة توليد الفواتير الآلية PDF", price: 1000, hours: 8 },
    { tier: "ecommerce", nameEn: "Multi-vendor Payout Ledger", nameAr: "توزيع مبيعات شركاء المتجر", price: 3200, hours: 25 },

    { tier: "mobile", nameEn: "Offline SQLite Database Sync", nameAr: "مزامنة بيانات SQLite دون إنترنت", price: 2000, hours: 16 },
    { tier: "mobile", nameEn: "Push Notifications Interface", nameAr: "لوحة بث الإشعارات فورياً", price: 900, hours: 7 },
    { tier: "mobile", nameEn: "Biometric Auth integrations", nameAr: "توثيق البصمة والوجه الآمن", price: 800, hours: 6 },
    { tier: "mobile", nameEn: "Localized Cache Memory Map", nameAr: "تنظيم وإدارة الذاكرة المؤقتة للخرائط", price: 1500, hours: 12 },

    { tier: "custom", nameEn: "Advanced Role-Based Permission Grid", nameAr: "صلاحيات الأدوار والمشرفين", price: 1800, hours: 14 },
    { tier: "custom", nameEn: "SSO (Single Sign-On / SAML)", nameAr: "تسجيل الدخول الموحد للمؤسسات", price: 2200, hours: 18 },
    { tier: "custom", nameEn: "Interactive SVG Reporting Charts", nameAr: "تقارير بيانية تفاعلية متطورة مرئية", price: 1500, hours: 12 },
    { tier: "custom", nameEn: "Self-Healing Docker Manifests", nameAr: "بنيات خوادم حاويات معزولة للتعافي", price: 2500, hours: 20 },

    { tier: "fastapi_nestjs", nameEn: "High-Concurrency Async Endpoints", nameAr: "مخرجات واجهة برمجية غير متزامنة فائقة السرعة (FastAPI)", price: 1500, hours: 12 },
    { tier: "fastapi_nestjs", nameEn: "NestJS Dependency Injection Engine", nameAr: "حقن الاعتمادية وتأدية معايير هاردن NestJS", price: 1850, hours: 15 },
    { tier: "fastapi_nestjs", nameEn: "Real-time WebSockets Sync Gateway", nameAr: "بوابة بث ويب سوكيت لربط ومزامنة اللحظية", price: 1200, hours: 10 },
    { tier: "fastapi_nestjs", nameEn: "Pydantic State Validation Guard", nameAr: "حماية وفحص البيانات الصارمة بـ Pydantic", price: 750, hours: 6 },

    { tier: "react_next", nameEn: "Next.js SSR/ISR Web Optimization", nameAr: "التوليد الثابت للواجهات وتكامل SSR لـ Next.js", price: 1605, hours: 13 },
    { tier: "react_next", nameEn: "Tailwind UI Adaptive Design System", nameAr: "هيكل واجهات تفاعلية ملساء بـ Tailwind CSS", price: 955, hours: 8 },
    { tier: "react_next", nameEn: "Vercel Multi-Region Edge Hosting", nameAr: "تكامل النشر وتوزيع الكاش على خوادم Vercel", price: 1100, hours: 9 },
    { tier: "react_next", nameEn: "Modular Hydrated Local Store (Redux)", nameAr: "إدارة ومزامنة حالة لوحة التحكم المعقدة", price: 1400, hours: 11 }
  ],

  // --- Django Code Settings ---
  defaultDjangoCode: `from django.db import models
from django.db.models import Prefetch

# Defected slow N+1 view optimization draft
class OrderListView(views.APIView):
    def get(self, request):
        # ❌ CRITICAL: N+1 query bug
        # Loop over orders hits the DB on every single customer
        orders = Order.objects.all()
        data = []
        for o in orders:
            data.append({
                "id": o.id,
                "customer": o.customer.email, # Drops speed
                "items_count": o.items.count() # Extra query
            })
        return Response(data)`,
  djangoSnippetTitleEn: "Live Django Performance Sandbox Optimizer",
  djangoSnippetTitleAr: "مختبر تعديل وبناء أكواد وحلول دجانغو المتقدمة السريعة",

  // --- Live Advisor Settings ---
  advisorWelcomeEn: "Greetings! I am the OSERA AI Assistant. How can I help you design, scale or optimize your system architectures today?",
  advisorWelcomeAr: "أهلاً بك! أنا مستشار الذكاء الاصطناعي لـ OSERA. كيف يمكنني مساعدتك في تصميم وتوسيع وهندسة خوادمك وقواعد بياناتك المعقدة اليوم؟",
  advisorPlaceholderEn: "Ask about Django optimization, AWS server setups, or cost calculators...",
  advisorPlaceholderAr: "اسأل عن تسريع استعلامات دجانغو، تشغيل خوادم AWS، أو طريقة حساب تكلفة برنامجك...",

  // --- Credentials/Testimonials Settings ---
  testimonials: [
    {
      name: "Eng. Fahad Al-Otaibi",
      roleEn: "CTO, Najd Logistics",
      roleAr: "رئيس قطاع التكنولوجيا بـ نجد للخدمات اللوجستية",
      textEn: "Excellent ORM optimization. Resolved query bottlenecks instantly, increasing delivery speed by 3.2X.",
      textAr: "دقة استثنائية في معالجة تسريبات الاستعلامات N+1 في قواعد البيانات. تسريع النظام بنسبة ٣٢٠٪."
    },
    {
      name: "Andrew MacLean",
      roleEn: "VP of Engineering, Apex Retail",
      roleAr: "نائب الممثل الهندسي بـ Apex العالمية",
      textEn: "Highly reliable checkout flows. Handled 12,000 req/min smoothly using custom Redis caching.",
      textAr: "أعدنا بناء تدفقات الدفع بنجاح. أداء مستقر ومثالي لرموز Redis الكاش تحت أصعب ضغوط المبيعات."
    },
    {
      name: "Sara Al-Harbi",
      roleEn: "Product Director, SouqVibe B2B",
      roleAr: "مديرة منتجات منصة سوق فايب الإقليمية",
      textEn: "The offline-first sync engine is flawless. Captures geopoints perfectly without cellular data.",
      textAr: "ميزة المزامنة الأرضية دون اتصال بالشبكة طفرة حقيقية. يجمع الإحداثيات محلياً ويدمجها تلقائياً بالخادم."
    }
  ],

  // --- Case Studies (Proven Deployments) ---
  caseStudiesList: [
    {
      id: "kerotrade",
      titleEn: "Premium Financial Trading LMS & Analytics Platform",
      titleAr: "منصة أكاديمية التداول المالي (LMS)",
      clientEn: "Kero Trade",
      clientAr: "كيرو تريد Kero Trade",
      industryEn: "E-Learning & Financial",
      industryAr: "التعليم الإلكتروني والتداول المالي",
      category: "react_next",
      metric: "100%",
      metricLabelEn: "Secure Video Protection",
      metricLabelAr: "تأمين شامل لمنع تسريب الفيديوهات",
      descEn: "Developed a premium, dual-language (AR/EN) trading LMS. Engineered a secure video streaming player integrating Bunny CDN (HLS) with dynamic watermark overlays to prevent piracy. Implemented a high-performance MongoDB backend and custom admin panel.",
      descAr: "برمجة منصة تعليمية للتداول المالي. تم تصميم مشغل فيديو فائق الحماية لمنع التحميل أو السرقة باستخدام Bunny CDN، مع علامات مائية ديناميكية، وبناء لوحة تحكم متكاملة لإدارة الدورات والمبيعات مع قاعدة بيانات MongoDB.",
      deliverablesEn: ["Next.js Full-Stack", "Bunny CDN Integration", "MongoDB Backend", "Secure Auth & Watermarks"],
      deliverablesAr: ["تطوير شامل بـ Next.js", "تأمين الفيديوهات Bunny CDN", "قاعدة بيانات MongoDB", "حماية وتسجيل الدخول الموحد"],
      tags: ["Next.js", "Bunny CDN", "MongoDB", "Tailwind CSS", "Framer Motion"],
      imageUrl: "/portfolio/kerotrade.png",
      visible: true
    },
    {
      id: "alisthome",
      titleEn: "Next.js 15 Platform Overhaul: Dynamic Pricing System",
      titleAr: "منصة الحجوزات وربط المقاولين في أمريكا",
      clientEn: "A-List Home Pros",
      clientAr: "A-List Home Pros",
      industryEn: "Home Services & Contracting",
      industryAr: "خدمات المنازل والمقاولات",
      category: "react_next",
      metric: "100%",
      metricLabelEn: "SEO & Production Score",
      metricLabelAr: "توافق SEO وسرعة الاستجابة",
      descEn: "Modernized a South Florida contractor matching platform. Replaced static pages with a responsive, high-end 3-tier membership system featuring custom Framer Motion animations and direct Stripe checkout integrations.",
      descAr: "إعادة بناء شاملة لمنصة ربط المقاولين في فلوريدا. تحويلها لنظام اشتراكات متطور 3-Tiers متصل ببوابة الدفع Stripe مباشرة، مع تحسين هائل للـ SEO وتأثيرات بصرية حركية حديثة.",
      deliverablesEn: ["Next.js 15 Migration", "Stripe Checkout", "3-Tier Membership", "SEO & Metadata Tuning"],
      deliverablesAr: ["الترقية لـ Next.js 15", "بوابة دفع Stripe", "نظام عضويات المقاولين", "تحسين محركات البحث SEO"],
      tags: ["Next.js", "React", "Tailwind CSS", "Stripe", "Framer Motion"],
      imageUrl: "/portfolio/alisthome.png",
      visible: true
    },
    {
      id: "rsn",
      titleEn: "Next.js & Supabase Event Management Platform",
      titleAr: "منصة إدارة الفعاليات وتأمين الحشود",
      clientEn: "RSN Alarabiya",
      clientAr: "رسن العربية RSN",
      industryEn: "Crowd Management & Security",
      industryAr: "إدارة الحشود وتأمين الفعاليات",
      category: "react_next",
      metric: "High",
      metricLabelEn: "Performance & Security (RLS)",
      metricLabelAr: "أمان البيانات والأداء",
      descEn: "Developed a premium, high-performance web application for a leading crowd management firm in Saudi Arabia. Designed fully responsive service grids with dynamic routing and managed Supabase Row-Level Security (RLS) policies.",
      descAr: "تطوير منصة رقمية فاخرة لشركة سعودية رائدة في تأمين الحشود. بنيت بـ Next.js مع قاعدة بيانات Supabase. شملت العمليات توجيه ديناميكي للخدمات، وضبط أنظمة أمان قاعدة البيانات (RLS).",
      deliverablesEn: ["Supabase Integration", "Row-Level Security (RLS)", "Dynamic Routing", "Database Migrations"],
      deliverablesAr: ["تكامل مع Supabase", "قواعد أمان RLS", "توجيه صفحات ديناميكي", "إدارة وترحيل البيانات"],
      tags: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "React"],
      imageUrl: "/portfolio/rsn.png",
      visible: true
    }
  ],

  // --- Technology Partners / Alliances ---
  partnersList: [
    { name: "Python Core", typeEn: "Runtime Node", typeAr: "بيئة تشغيل لغة بايثون" },
    { name: "Django 5.1", typeEn: "Security Framework", typeAr: "إطار عمل محمي متكامل" },
    { name: "AWS Cloud", typeEn: "EC2 & Aurora Server", typeAr: "خوادم ومطافي أمازون السحابية" },
    { name: "PostgreSQL", typeEn: "Relational DB", typeAr: "قواعد البيانات العلاقية الأقوى" },
    { name: "Redis Engine", typeEn: "InMemory Cache", typeAr: "محرك تخزين الكاش فائق السرعة" },
    { name: "React 19", typeEn: "Client Engine", typeAr: "محرك بناء واجهات الويب الحية" },
    { name: "Docker Compose", typeEn: "SecOps Isolation", typeAr: "عزل وتشغيل الحاويات المؤمنة" },
    { name: "Celery Queue", typeEn: "Async Worker Task", typeAr: "معالجة طوابير المهام الخلفية" }
  ]
};

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "ar";
  profile: CorporateProfile;
  onSaveProfile: (updated: CorporateProfile) => void;
}

export function AdminPanel({ isOpen, onClose, lang, profile, onSaveProfile }: AdminPanelProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Edit states initialized from passed profile
  const [formData, setFormData] = useState<CorporateProfile>(() => ({
    ...DEFAULT_PROFILE,
    ...profile
  }));
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Active sub-tab inside admin workspace
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<
    "general" | "social" | "services" | "calculator" | "sandbox" | "advisor" | "credential" | "casestudies"
  >("general");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "admin" && password.trim() === "admin") {
      setIsLoggedIn(true);
      setFormData({ ...DEFAULT_PROFILE, ...profile });
      setLoginError("");
    } else {
      setLoginError(lang === "ar" ? "خطأ في اسم المستخدم أو كلمة المرور!" : "Invalid admin username or password!");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "avatarBase64" | "logoImgBase64") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        [field]: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setTimeout(() => {
      onSaveProfile(formData);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleProjectChange = (idx: number, field: string, val: string) => {
    const updatedProjects = [...formData.liveProjects];
    updatedProjects[idx] = {
      ...updatedProjects[idx],
      [field]: val
    };
    setFormData(prev => ({ ...prev, liveProjects: updatedProjects }));
  };

  const handleAddProject = () => {
    setFormData(prev => ({
      ...prev,
      liveProjects: [
        ...prev.liveProjects,
        {
          title: "New Scalable Project",
          descAr: "مشروع حي جديد تم نشره بواسطة أسامة إسماعيل",
          descEn: "Newly deployed systems engineered by Osama Esmael",
          url: "https://",
          category: "Cloud Systems",
          metric: "Active"
        }
      ]
    }));
  };

  const handleRemoveProject = (idx: number) => {
    const updatedProjects = formData.liveProjects.filter((_, i) => i !== idx);
    setFormData(prev => ({ ...prev, liveProjects: updatedProjects }));
  };

  // Service helpers
  const handleServiceChange = (idx: number, field: string, val: any) => {
    const updatedServices = [...formData.servicesList];
    updatedServices[idx] = {
      ...updatedServices[idx],
      [field]: val
    };
    setFormData(prev => ({ ...prev, servicesList: updatedServices }));
  };

  // Calculator helpers
  const handleFeaturePriceHoursChange = (idx: number, field: "price" | "hours", val: number) => {
    const updatedList = [...formData.calcFeatures];
    updatedList[idx] = {
      ...updatedList[idx],
      [field]: val
    };
    setFormData(prev => ({ ...prev, calcFeatures: updatedList }));
  };

  const handleFeatureNameChange = (idx: number, langKey: "nameEn" | "nameAr", val: string) => {
    const updatedList = [...formData.calcFeatures];
    updatedList[idx] = {
      ...updatedList[idx],
      [langKey]: val
    };
    setFormData(prev => ({ ...prev, calcFeatures: updatedList }));
  };

  // Testimonials helpers
  const handleTestimonialChange = (idx: number, field: string, val: string) => {
    const updatedList = [...formData.testimonials];
    updatedList[idx] = {
      ...updatedList[idx],
      [field]: val
    };
    setFormData(prev => ({ ...prev, testimonials: updatedList }));
  };

  const handleAddTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        {
          name: "New Client",
          roleEn: "CTO, Company LLC",
          roleAr: "رئيس الخدمات الفنية",
          textEn: "Outstanding software quality and pristine clean modular code structures.",
          textAr: "جودة برمجية متناهية وتنصيب مميز للبنيات في خوادم الإنتاج الكبرى."
        }
      ]
    }));
  };

  const handleRemoveTestimonial = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== idx)
    }));
  };

  // Case Studies Helper methods
  const handleCaseStudyChange = (idx: number, field: string, val: any) => {
    const list = [...formData.caseStudiesList];
    list[idx] = {
      ...list[idx],
      [field]: val
    };
    setFormData(prev => ({ ...prev, caseStudiesList: list }));
  };

  const handleAddCaseStudy = () => {
    setFormData(prev => ({
      ...prev,
      caseStudiesList: [
        ...prev.caseStudiesList,
        {
          id: `case-${Date.now()}`,
          titleEn: "New Enterprise Deployment",
          titleAr: "بنية تحتية وتشغيل مؤسسي جديد",
          clientEn: "Global Client Ltd.",
          clientAr: "شركة الشريك العالمي المحدودة",
          industryEn: "Finance & Security",
          industryAr: "الخدمات المالية والأمان البرمجي",
          category: "custom",
          metric: "99.99%",
          metricLabelEn: "Performance Uptime Ensure",
          metricLabelAr: "ضمان تشغيل واستقرار النظام السحابي",
          descEn: "Engineered scalable service loops, optimized heavy SQL pipelines and microservices deployments.",
          descAr: "عمليات ضبط وتحسين استعلامات قواعد البيانات المعقدة وقنوات الرفع والتشغيل المستمر.",
          deliverablesEn: ["Infrastructure tuning", "Failover recovery layout"],
          deliverablesAr: ["ضبط مسارات الخوادم والـ CDN", "إعداد خطط التعافي والنسخ الاحتياطي"],
          tags: ["FastAPI", "Postgres", "Docker", "SaaS"],
          visible: true
        }
      ]
    }));
  };

  const handleRemoveCaseStudy = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      caseStudiesList: prev.caseStudiesList.filter((_, i) => i !== idx)
    }));
  };

  // Tech Partners Helper methods
  const handlePartnerChange = (idx: number, field: string, val: string) => {
    const list = [...formData.partnersList];
    list[idx] = {
      ...list[idx],
      [field]: val
    };
    setFormData(prev => ({ ...prev, partnersList: list }));
  };

  const handleAddPartner = () => {
    setFormData(prev => ({
      ...prev,
      partnersList: [
        ...prev.partnersList,
        {
          name: "Next-gen Tech",
          typeEn: "Modern Integration Framework",
          typeAr: "إطار تكامل حديث متطور"
        }
      ]
    }));
  };

  const handleRemovePartner = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      partnersList: prev.partnersList.filter((_, i) => i !== idx)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      {/* Container Card */}
      <div 
        className="relative w-full max-w-5xl bg-[#09090d] border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8)] text-white flex flex-col h-[90vh]"
        style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
      >
        {/* Header */}
        <div className="p-5 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="h-4 w-4 text-cyan-400 animate-pulse" />
            <h3 className="font-sans font-black uppercase text-xs tracking-widest text-white">
              {lang === "ar" ? "لوحة التحكم المتكاملة لـ OSERA (كل الأقسام)" : "OSERA Integrated Command Centre"}
            </h3>
            <span className="px-2 py-0.5 rounded bg-cyan-950/45 text-[9px] font-mono border border-cyan-800/40 text-cyan-400 font-bold">
              {lang === "ar" ? "مسؤول معتمد" : "Root Admin Console"}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="px-3 py-1 bg-zinc-900 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-widest font-mono"
          >
            {lang === "ar" ? "خروج [X]" : "Close [X]"}
          </button>
        </div>

        {/* LOGO PREVIEW & CORE DATA IF LOGGED OUT */}
        {!isLoggedIn ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-gold-400 to-gold-650 flex items-center justify-center mx-auto mb-2 shadow-gold-500/10 shadow-lg">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <h4 className="font-black text-white text-lg uppercase tracking-wider">
                {lang === "ar" ? "الدخول الآمن للأدمن" : "Secure System Authentication"}
              </h4>
              <p className="text-[10px] text-zinc-450 leading-relaxed max-w-xs mx-auto">
                {lang === "ar" 
                  ? "الرجاء توفير بيانات المفاتيح المعتمدة لبوابة الإدارة (admin / admin)" 
                  : "Please supply credentials to access OSERA real-time state manipulation."}
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                  {lang === "ar" ? "اسم المستخدم" : "Access Identity"}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-600 pointer-events-none">
                    <User className="h-3.5 w-3.5" />
                  </span>
                  <input 
                    type="text" 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="e.g. admin"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                  {lang === "ar" ? "كلمة المرور" : "Security Keyphrase"}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-600 pointer-events-none">
                    <Lock className="h-3.5 w-3.5" />
                  </span>
                  <input 
                    type="password" 
                    value={password}
                    placeholder="••••••••"
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-950/20 border border-red-900/40 text-red-400 rounded-xl text-[10px] text-center">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-700 hover:from-gold-400 hover:to-gold-600 text-white text-xs uppercase tracking-widest font-black transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{lang === "ar" ? "أبـدأ الاتصـال" : "Deploy Connection"}</span>
              </button>
            </form>
          </div>
        ) : (
          /* WORKSPACE (Logged In) */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left/Right Sidebar controls */}
            <div className="w-full md:w-64 bg-zinc-950 border-r border-zinc-900 p-4 flex flex-col gap-1 shrink-0 overflow-y-auto custom-scrollbar">
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest block px-2 mb-2">
                {lang === "ar" ? "تبويبات التعديل" : "Workspace Hub"}
              </span>

              <button
                onClick={() => setActiveAdminSubTab("general")}
                className={`w-full text-start py-2.5 px-3 rounded-xl text-[11px] font-bold flex items-center gap-2 transition cursor-pointer ${
                  activeAdminSubTab === "general" ? "bg-cyan-950/40 border border-cyan-800/30 text-cyan-400" : "text-zinc-400 hover:bg-zinc-900"
                }`}
              >
                <User className="h-3.5 w-3.5" />
                <span>{lang === "ar" ? "المعلومات العامة والصور" : "General Info & Images"}</span>
              </button>

              <button
                onClick={() => setActiveAdminSubTab("social")}
                className={`w-full text-start py-2.5 px-3 rounded-xl text-[11px] font-bold flex items-center gap-2 transition cursor-pointer ${
                  activeAdminSubTab === "social" ? "bg-cyan-950/40 border border-cyan-800/30 text-cyan-400" : "text-zinc-400 hover:bg-zinc-900"
                }`}
              >
                <Link2 className="h-3.5 w-3.5" />
                <span>{lang === "ar" ? "قنوات التواصل والمحفظة" : "Social Links & Projects"}</span>
              </button>

              {/* SERVICE MANAGER & TOGGLES */}
              <button
                onClick={() => setActiveAdminSubTab("services")}
                className={`w-full text-start py-2.5 px-3 rounded-xl text-[11px] font-bold flex items-center justify-between transition cursor-pointer ${
                  activeAdminSubTab === "services" ? "bg-cyan-950/40 border border-cyan-800/30 text-cyan-400" : "text-zinc-400 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5" />
                  <span>1. {lang === "ar" ? "الخدمات والحلول" : "Services Segment"}</span>
                </div>
                {formData.showServices ? (
                  <Eye className="h-3 w-3 text-cyan-400 shrink-0" />
                ) : (
                  <EyeOff className="h-3 w-3 text-red-500 shrink-0" />
                )}
              </button>

              {/* BUDGET CONFIG MANAGER & TOGGLES */}
              <button
                onClick={() => setActiveAdminSubTab("calculator")}
                className={`w-full text-start py-2.5 px-3 rounded-xl text-[11px] font-bold flex items-center justify-between transition cursor-pointer ${
                  activeAdminSubTab === "calculator" ? "bg-cyan-950/40 border border-cyan-800/30 text-cyan-400" : "text-zinc-400 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>2. {lang === "ar" ? "حاسبة الميزانية" : "Budget Builder"}</span>
                </div>
                {formData.showCalculator ? (
                  <Eye className="h-3 w-3 text-cyan-400 shrink-0" />
                ) : (
                  <EyeOff className="h-3 w-3 text-red-500 shrink-0" />
                )}
              </button>

              {/* DJANGO CODE SNIPPET / SANDBOX & TOGGLES */}
              <button
                onClick={() => setActiveAdminSubTab("sandbox")}
                className={`w-full text-start py-2.5 px-3 rounded-xl text-[11px] font-bold flex items-center justify-between transition cursor-pointer ${
                  activeAdminSubTab === "sandbox" ? "bg-cyan-950/40 border border-cyan-800/30 text-cyan-400" : "text-zinc-400 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>3. {lang === "ar" ? "مختبر الكود دجانغو" : "Django Lab Snippet"}</span>
                </div>
                {formData.showSandbox ? (
                  <Eye className="h-3 w-3 text-cyan-400 shrink-0" />
                ) : (
                  <EyeOff className="h-3 w-3 text-red-500 shrink-0" />
                )}
              </button>

              {/* LIVE ADVISOR & TOGGLES */}
              <button
                onClick={() => setActiveAdminSubTab("advisor")}
                className={`w-full text-start py-2.5 px-3 rounded-xl text-[11px] font-bold flex items-center justify-between transition cursor-pointer ${
                  activeAdminSubTab === "advisor" ? "bg-cyan-950/40 border border-cyan-800/30 text-cyan-400" : "text-zinc-400 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>4. {lang === "ar" ? "شات بوت مستشار الذكاء" : "Live Advisor Chatbot"}</span>
                </div>
                {formData.showAiConsultant ? (
                  <Eye className="h-3 w-3 text-cyan-400 shrink-0" />
                ) : (
                  <EyeOff className="h-3 w-3 text-red-500 shrink-0" />
                )}
              </button>

              {/* CREDENTIALS / TEAM & TOGGLES */}
              <button
                onClick={() => setActiveAdminSubTab("credential")}
                className={`w-full text-start py-2.5 px-3 rounded-xl text-[11px] font-bold flex items-center justify-between transition cursor-pointer ${
                  activeAdminSubTab === "credential" ? "bg-cyan-950/40 border border-cyan-800/30 text-cyan-400" : "text-zinc-400 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5" />
                  <span>5. {lang === "ar" ? "أعضاء الفريق والشهادات" : "Advisory Credentials"}</span>
                </div>
                {formData.showStory ? (
                  <Eye className="h-3 w-3 text-cyan-400 shrink-0" />
                ) : (
                  <EyeOff className="h-3 w-3 text-red-500 shrink-0" />
                )}
              </button>

              {/* CASE STUDIES & TECHNOLOGY ALLIANCES */}
              <button
                onClick={() => setActiveAdminSubTab("casestudies")}
                className={`w-full text-start py-2.5 px-3 rounded-xl text-[11px] font-bold flex items-center justify-between transition cursor-pointer ${
                  activeAdminSubTab === "casestudies" ? "bg-cyan-950/40 border border-cyan-800/30 text-cyan-400" : "text-zinc-400 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5" />
                  <span>6. {lang === "ar" ? "دراسات الحالة والتحالفات" : "Case Studies & Partners"}</span>
                </div>
                <Eye className="h-3 w-3 text-cyan-400 shrink-0" />
              </button>

              <div className="mt-auto pt-4 border-t border-zinc-900 px-2 flex flex-col gap-3">
                <div className="text-[10px] text-zinc-550 leading-relaxed font-mono">
                  {lang === "ar" ? "احفظ التغييرات أسفل اللوحة لتنشيطها وحفظها محلياً." : "Changes are stored securely in browser's persistent sandbox state."}
                </div>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-red-950/20 hover:text-red-400 border border-zinc-850 hover:border-red-900/30 text-[10px] font-mono text-zinc-450 transition cursor-pointer flex items-center justify-center gap-1.5 font-bold"
                >
                  <LogOut className="h-3 w-3" />
                  <span>{lang === "ar" ? "خروج آمن" : "Secure Logoff"}</span>
                </button>
              </div>
            </div>

            {/* Workspace details view block */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              {/* TAB SUB-VIEW 1: GENERAL & IMAGES UPLOADER */}
              {activeAdminSubTab === "general" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-wider">{lang === "ar" ? "المعلومات الشخصية والشعار" : "Founder Credentials & Logo Layout"}</h4>
                    <p className="text-[10px] text-zinc-500 mt-1">{lang === "ar" ? "اضبط أسماء وتوصيف وشعارات الهيدر والإنترو الكلي" : "Configure main founder identifiers, localized landing pitch, and base media portraits."}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 font-mono text-zinc-200">
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">{lang === "ar" ? "اسم المؤسس" : "Founder Real Name"}</label>
                      <input 
                        type="text"
                        value={formData.founderName}
                        onChange={e => setFormData(prev => ({ ...prev, founderName: e.target.value }))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">{lang === "ar" ? "شعار الشركة النصي" : "Company Text Logo"}</label>
                      <input 
                        type="text"
                        value={formData.logoText}
                        onChange={e => setFormData(prev => ({ ...prev, logoText: e.target.value }))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">{lang === "ar" ? "المسمى الوظيفي (English)" : "Professional Title (English)"}</label>
                      <input 
                        type="text"
                        value={formData.founderTitleEn}
                        onChange={e => setFormData(prev => ({ ...prev, founderTitleEn: e.target.value }))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">{lang === "ar" ? "المسمى الوظيفي (عربي)" : "Professional Title (Arabic)"}</label>
                      <input 
                        type="text"
                        value={formData.founderTitleAr}
                        onChange={e => setFormData(prev => ({ ...prev, founderTitleAr: e.target.value }))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">{lang === "ar" ? "وصف الهيرو التعريفي بالإنجليزية" : "Hero Subtitle Description (English)"}</label>
                    <textarea 
                      rows={3}
                      value={formData.heroDescEn}
                      onChange={e => setFormData(prev => ({ ...prev, heroDescEn: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-250 font-sans focus:outline-none focus:border-cyan-500/50 resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">{lang === "ar" ? "وصف الهيرو التعريفي بالعربية" : "Hero Subtitle Description (Arabic)"}</label>
                    <textarea 
                      rows={3}
                      value={formData.heroDescAr}
                      onChange={e => setFormData(prev => ({ ...prev, heroDescAr: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-250 font-sans focus:outline-none focus:border-cyan-500/50 resize-none"
                    />
                  </div>

                  {/* 3D PROFILE PHOTO & LOGO BASE64 FILE CONVERTERS */}
                  <div className="p-4 rounded-2xl bg-[#0e0e14] border border-cyan-500/10 space-y-4">
                    <div className="flex items-center gap-1.5">
                      <Image className="h-4 w-4 text-cyan-400" />
                      <span className="text-[10px] font-mono text-white src-text uppercase tracking-widest font-black">
                        {lang === "ar" ? "رفع الهوية البصرية الحصرية" : "Slick Visual Branding Uploaders"}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Avatar upload */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                          {lang === "ar" ? "صورة المؤسسة البروفايل (Portrait)" : "Osama Portrait Picture"}
                        </span>
                        <div className="flex items-center gap-4 bg-zinc-950 p-3 rounded-xl border border-zinc-850">
                          <div className="h-14 w-14 rounded-xl bg-zinc-900 overflow-hidden border border-zinc-800 shrink-0 relative flex items-center justify-center">
                            {formData.avatarBase64 ? (
                              <img src={formData.avatarBase64} alt="Pre" className="h-full w-full object-cover" />
                            ) : (
                              <div className="text-[8px] text-zinc-600 text-center font-mono uppercase">{lang === "ar" ? "أوتوماتيكي" : "System Def"}</div>
                            )}
                          </div>
                          <div>
                            <input 
                              type="file" 
                              id="avatar-upload"
                              accept="image/*"
                              onChange={e => handleImageUpload(e, "avatarBase64")}
                              className="hidden"
                            />
                            <label 
                              htmlFor="avatar-upload"
                              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-805 hover:border-cyan-500/40 text-[10px] text-zinc-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                            >
                              <UploadCloud className="h-3.5 w-3.5 text-cyan-400" />
                              <span>{lang === "ar" ? "اختيار صورة" : "Swap Photo"}</span>
                            </label>
                            <span className="text-[7px] text-zinc-600 block mt-1">Accepts transparent backgrounds.</span>
                          </div>
                        </div>
                      </div>

                      {/* Logo image upload */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                          {lang === "ar" ? "لوجو الهيدر المخصص (Base64)" : "Custom Base64 Header Logo"}
                        </span>
                        <div className="flex items-center gap-4 bg-zinc-950 p-3 rounded-xl border border-zinc-850">
                          <div className="h-14 w-14 rounded-xl bg-zinc-900 overflow-hidden border border-zinc-800 shrink-0 relative flex items-center justify-center">
                            {formData.logoImgBase64 ? (
                              <img src={formData.logoImgBase64} alt="Logo" className="h-full w-full object-cover" />
                            ) : (
                              <div className="text-[8px] text-zinc-650 text-center font-mono uppercase">{lang === "ar" ? "نصي فقط" : "Text Only"}</div>
                            )}
                          </div>
                          <div>
                            <input 
                              type="file" 
                              id="logo-upload"
                              accept="image/*"
                              onChange={e => handleImageUpload(e, "logoImgBase64")}
                              className="hidden"
                            />
                            <label 
                              htmlFor="logo-upload"
                              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-805 hover:border-cyan-500/40 text-[10px] text-zinc-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                            >
                              <UploadCloud className="h-3.5 w-3.5 text-cyan-400" />
                              <span>{lang === "ar" ? "رفع لوجو مصور" : "Upload Image"}</span>
                            </label>
                            <span className="text-[7px] text-zinc-600 block mt-1">SVG/PNG with transparent canvas.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB SUB-VIEW 2: SOCIAL COMMUNICATIONS */}
              {activeAdminSubTab === "social" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-wider">{lang === "ar" ? "روابط التواصل والمشاريع" : "Strategic Coordinates & Live Deployments"}</h4>
                    <p className="text-[10px] text-zinc-500 mt-1">{lang === "ar" ? "امتداد المحاور وقنوات التواصل لمناقشة الأعمال والمشاريع النشطة" : "Maintain direct links to your Whatsapp, Paypal retains and coordinate cards."}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-black">WhatsApp Egypt Country ID</label>
                      <input 
                        type="text"
                        value={formData.whatsapp}
                        onChange={e => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                        className="w-full bg-zinc-950 border border-emerald-920 rounded-xl p-2.5 text-xs text-zinc-200 font-mono transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-cyan-450 uppercase tracking-widest block">PayPal Invoicing URL</label>
                      <input 
                        type="text"
                        value={formData.paypal}
                        onChange={e => setFormData(prev => ({ ...prev, paypal: e.target.value }))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">LinkedIn Profile URL</label>
                      <input 
                        type="text"
                        value={formData.linkedin}
                        onChange={e => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-300 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">Nafezly 독립 Portfolio</label>
                      <input 
                        type="text"
                        value={formData.nafezly}
                        onChange={e => setFormData(prev => ({ ...prev, nafezly: e.target.value }))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-300 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">Upwork Premium URL</label>
                      <input 
                        type="text"
                        value={formData.upwork}
                        onChange={e => setFormData(prev => ({ ...prev, upwork: e.target.value }))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-300 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">Indeed Gateway URL</label>
                      <input 
                        type="text"
                        value={formData.indeed}
                        onChange={e => setFormData(prev => ({ ...prev, indeed: e.target.value }))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-300 font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-900">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="text-xs font-black uppercase text-white font-mono">{lang === "ar" ? "قائمة روابط مشاريعك النشطة" : "Active Live Project Cards"}</h5>
                      <button
                        onClick={handleAddProject}
                        className="px-3 py-1 rounded bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 font-mono text-[9px] uppercase hover:bg-cyan-900/40 cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        <span>{lang === "ar" ? "أضف مشروع" : "Add Project"}</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.liveProjects.map((p, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 flex flex-col gap-2">
                          <div className="flex justify-between items-center bg-zinc-900 px-3 py-1 rounded">
                            <span className="text-[9px] font-black text-cyan-400">Project #{idx+1}</span>
                            <button 
                              onClick={() => handleRemoveProject(idx)}
                              className="text-red-500 hover:text-red-400 text-[9px] font-mono uppercase cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="grid sm:grid-cols-3 gap-2">
                            <input 
                              type="text"
                              value={p.title}
                              placeholder="Title"
                              onChange={e => handleProjectChange(idx, "title", e.target.value)}
                              className="bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-white"
                            />
                            <input 
                              type="text"
                              value={p.url}
                              placeholder="URL Link"
                              onChange={e => handleProjectChange(idx, "url", e.target.value)}
                              className="bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-white font-mono"
                            />
                            <input 
                              type="text"
                              value={p.category}
                              placeholder="Category Tag"
                              onChange={e => handleProjectChange(idx, "category", e.target.value)}
                              className="bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-white"
                            />
                          </div>
                          <div className="grid sm:grid-cols-2 gap-2">
                            <input 
                              type="text"
                              value={p.descAr}
                              placeholder="وصف عربي"
                              onChange={e => handleProjectChange(idx, "descAr", e.target.value)}
                              className="bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-350"
                            />
                            <input 
                              type="text"
                              value={p.descEn}
                              placeholder="English Brief Description"
                              onChange={e => handleProjectChange(idx, "descEn", e.target.value)}
                              className="bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-350"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 1. SERVICES MANAGEMENT SUBTAB */}
              {activeAdminSubTab === "services" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-2xl">
                    <div>
                      <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider">{lang === "ar" ? "التحكم في قسم الخدمات والحلول" : "1. Services Segment Controls"}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">{lang === "ar" ? "أظهر أو أخف القسم بالكامل، وعدل تفاصيل الخدمات الأربع بالتفصيل" : "Toggle the entire Services Tab visibility, and edit detailed titles, descriptions & lists."}</p>
                    </div>

                    <button
                      onClick={() => setFormData(prev => ({ ...prev, showServices: !prev.showServices }))}
                      className={`px-4 py-2 text-xs font-mono font-black rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                        formData.showServices 
                          ? "bg-cyan-950/45 border-cyan-805 text-cyan-400" 
                          : "bg-red-950/20 border-red-900/40 text-red-400"
                      }`}
                    >
                      {formData.showServices ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      <span>{formData.showServices ? (lang === "ar" ? "مرئي بالموقع" : "Visible Live") : (lang === "ar" ? "مخفي في الموقع" : "Hidden")}</span>
                    </button>
                  </div>

                  {formData.showServices && (
                    <div className="space-y-6">
                      {formData.servicesList.map((svc, sIdx) => (
                        <div key={svc.id} className="p-5 rounded-2xl bg-[#09090d] border border-zinc-850 space-y-4">
                          <div className="flex items-center gap-2 text-white font-mono border-b border-zinc-900 pb-2">
                            <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-950 text-cyan-400 font-bold font-mono">#{sIdx+1} - ID: {svc.id.toUpperCase()}</span>
                            <span className="text-xs font-black uppercase">{svc.titleEn}</span>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{lang === "ar" ? "الاسم المكتوب (EN)" : "Service Title (EN)"}</label>
                              <input 
                                type="text"
                                value={svc.titleEn}
                                onChange={e => handleServiceChange(sIdx, "titleEn", e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded-lg text-xs font-sans text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{lang === "ar" ? "الاسم المكتوب (AR)" : "Service Title (AR)"}</label>
                              <input 
                                type="text"
                                value={svc.titleAr}
                                onChange={e => handleServiceChange(sIdx, "titleAr", e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded-lg text-xs font-sans text-white text-right"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{lang === "ar" ? "الوصف البصري (English)" : "Service Sub-Description (English)"}</label>
                            <textarea 
                              rows={2}
                              value={svc.descEn}
                              onChange={e => handleServiceChange(sIdx, "descEn", e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-xs text-zinc-300 resize-none font-sans"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{lang === "ar" ? "الوصف البصري (عربي)" : "Service Sub-Description (Arabic)"}</label>
                            <textarea 
                              rows={2}
                              value={svc.descAr}
                              onChange={e => handleServiceChange(sIdx, "descAr", e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-xs text-zinc-300 resize-none font-sans text-right"
                            />
                          </div>

                          {/* Bullet points config (raw lines comma separated) */}
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{lang === "ar" ? "النقاط الفرعية (EN) - مفصول باسطر جديدة" : "Bullet Points Focus (EN) - Line separated"}</label>
                              <textarea 
                                rows={4}
                                value={svc.bulletPointsEn.join("\n")}
                                onChange={e => handleServiceChange(sIdx, "bulletPointsEn", e.target.value.split("\n"))}
                                className="w-full h-24 bg-zinc-950 border border-zinc-800 p-2 rounded-lg text-[10px] font-mono text-zinc-400"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{lang === "ar" ? "النقاط الفرعية (عربي) - مفصول باسطر جديدة" : "Bullet Points Focus (AR) - Line separated"}</label>
                              <textarea 
                                rows={4}
                                value={svc.bulletPointsAr.join("\n")}
                                onChange={e => handleServiceChange(sIdx, "bulletPointsAr", e.target.value.split("\n"))}
                                className="w-full h-24 bg-zinc-950 border border-zinc-800 p-2 rounded-lg text-[10px] font-mono text-zinc-400 text-right"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 2. BUDGET CONFIGURATION SUBTAB */}
              {activeAdminSubTab === "calculator" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-2xl">
                    <div>
                      <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider">{lang === "ar" ? "التحكم في حاسبة الميزانية" : "2. Budget builder controls"}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">{lang === "ar" ? "أظهر حاسبة التقدير المالي للعملاء أو أخفها، وحدّث القيم والأسعار الأساسية" : "Toggle Calculator visibility, edit class baseline prices & feature cost multipliers."}</p>
                    </div>

                    <button
                      onClick={() => setFormData(prev => ({ ...prev, showCalculator: !prev.showCalculator }))}
                      className={`px-4 py-2 text-xs font-mono font-black rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                        formData.showCalculator 
                          ? "bg-cyan-950/45 border-cyan-805 text-cyan-400" 
                          : "bg-red-950/20 border-red-900/40 text-red-400"
                      }`}
                    >
                      {formData.showCalculator ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      <span>{formData.showCalculator ? (lang === "ar" ? "مرئي بالموقع" : "Visible Live") : (lang === "ar" ? "مخفي في الموقع" : "Hidden")}</span>
                    </button>
                  </div>

                  {formData.showCalculator && (
                    <div className="space-y-6">
                      <div className="p-4 bg-[#0e0e14] rounded-xl border border-zinc-850 space-y-4">
                        <h5 className="text-xs font-mono font-black text-white uppercase">{lang === "ar" ? "أسعار الفئات الأساسية لتعشيق النظم Baseline Pricing" : "Baseline Class Service Pricing"}</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                            <span className="text-[8px] font-mono text-zinc-500 block uppercase">1. Django API Backend</span>
                            <input 
                              type="number"
                              value={formData.baseRateBackend}
                              onChange={e => setFormData(prev => ({ ...prev, baseRateBackend: Number(e.target.value) }))}
                              className="w-full bg-transparent border-none outline-none focus:ring-0 text-white font-mono font-bold text-xs mt-1"
                            />
                          </div>
                          <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                            <span className="text-[8px] font-mono text-zinc-500 block uppercase">2. E-Commerce Systems</span>
                            <input 
                              type="number"
                              value={formData.baseRateEcommerce}
                              onChange={e => setFormData(prev => ({ ...prev, baseRateEcommerce: Number(e.target.value) }))}
                              className="w-full bg-transparent border-none outline-none focus:ring-0 text-white font-mono font-bold text-xs mt-1"
                            />
                          </div>
                          <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                            <span className="text-[8px] font-mono text-zinc-500 block uppercase">3. Mobile Applications</span>
                            <input 
                              type="number"
                              value={formData.baseRateMobile}
                              onChange={e => setFormData(prev => ({ ...prev, baseRateMobile: Number(e.target.value) }))}
                              className="w-full bg-transparent border-none outline-none focus:ring-0 text-white font-mono font-bold text-xs mt-1"
                            />
                          </div>
                          <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                            <span className="text-[8px] font-mono text-zinc-500 block uppercase">4. Bespoke SaaS Platforms</span>
                            <input 
                              type="number"
                              value={formData.baseRateCustom}
                              onChange={e => setFormData(prev => ({ ...prev, baseRateCustom: Number(e.target.value) }))}
                              className="w-full bg-transparent border-none outline-none focus:ring-0 text-white font-mono font-bold text-xs mt-1"
                            />
                          </div>
                        </div>
                      </div>

                      {/* FEATURES PRICEMENTS & SYSTEM ESTIMATE HOURS */}
                      <div className="space-y-3 font-mono">
                        <h5 className="text-xs font-mono font-black text-white uppercase px-1">{lang === "ar" ? "قائمة تسعير المكونات والخيارات الفردية" : "Granular Feature Cost Matrix"}</h5>
                        <div className="grid gap-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                          {formData.calcFeatures.map((f, fIdx) => (
                            <div key={fIdx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[11px]">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold">{f.tier.toUpperCase()}</span>
                                  <span className="text-white font-bold">{f.nameEn}</span>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-2 text-[10px]">
                                  <input 
                                    type="text"
                                    value={f.nameEn}
                                    placeholder="English Label"
                                    onChange={e => handleFeatureNameChange(fIdx, "nameEn", e.target.value)}
                                    className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-white"
                                  />
                                  <input 
                                    type="text"
                                    value={f.nameAr}
                                    placeholder="العنوان بالعربية"
                                    onChange={e => handleFeatureNameChange(fIdx, "nameAr", e.target.value)}
                                    className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-white text-right"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="w-24 bg-zinc-900 p-1.5 rounded border border-zinc-800 text-center">
                                  <span className="text-[7px] text-zinc-500 block">PRICE ($)</span>
                                  <input 
                                    type="number"
                                    value={f.price}
                                    onChange={e => handleFeaturePriceHoursChange(fIdx, "price", Number(e.target.value))}
                                    className="w-full bg-transparent text-center border-none focus:ring-0 font-bold text-white text-[11px]"
                                  />
                                </div>
                                <div className="w-20 bg-zinc-900 p-1.5 rounded border border-zinc-800 text-center">
                                  <span className="text-[7px] text-zinc-500 block">HOURS</span>
                                  <input 
                                    type="number"
                                    value={f.hours}
                                    onChange={e => handleFeaturePriceHoursChange(fIdx, "hours", Number(e.target.value))}
                                    className="w-full bg-transparent text-center border-none focus:ring-0 font-bold text-cyan-400 text-[11px]"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. DJANGO CODE / SANDBOX LAB CONFIG SUBTAB */}
              {activeAdminSubTab === "sandbox" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-2xl">
                    <div>
                      <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider">{lang === "ar" ? "التحكم في مختبر الأكواد دجانغو" : "3. Django performance sandbox / Portfolio Tab"}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">{lang === "ar" ? "أخف أو أظهر تبويب روابط الأنظمة ومختبر الأكواد، وعدّل الكود وخط الصياغة" : "Toggle Portfolio and sandbox layout, and specify default defects python script."}</p>
                    </div>

                    <button
                      onClick={() => setFormData(prev => ({ ...prev, showSandbox: !prev.showSandbox }))}
                      className={`px-4 py-2 text-xs font-mono font-black rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                        formData.showSandbox 
                          ? "bg-cyan-950/45 border-cyan-805 text-cyan-400" 
                          : "bg-red-950/20 border-red-900/40 text-red-400"
                      }`}
                    >
                      {formData.showSandbox ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      <span>{formData.showSandbox ? (lang === "ar" ? "مرئي بالموقع" : "Visible Live") : (lang === "ar" ? "مخفي في الموقع" : "Hidden")}</span>
                    </button>
                  </div>

                  {formData.showSandbox && (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{lang === "ar" ? "عنوان تبويب البورتفوليو الكلي (EN)" : "Tab Portfolio Display Title (EN)"}</label>
                          <input 
                            type="text"
                            value={formData.djangoSnippetTitleEn}
                            onChange={e => setFormData(prev => ({ ...prev, djangoSnippetTitleEn: e.target.value }))}
                            className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{lang === "ar" ? "عنوان تبويب البورتفوليو الكلي (AR)" : "Tab Portfolio Display Title (AR)"}</label>
                          <input 
                            type="text"
                            value={formData.djangoSnippetTitleAr}
                            onChange={e => setFormData(prev => ({ ...prev, djangoSnippetTitleAr: e.target.value }))}
                            className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-xs text-white text-right"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 font-mono">
                        <label className="text-[9px] text-zinc-400 uppercase tracking-widest block">Default Defective Python Code Template (For playground & optimizer defaults)</label>
                        <textarea 
                          rows={12}
                          value={formData.defaultDjangoCode}
                          onChange={e => setFormData(prev => ({ ...prev, defaultDjangoCode: e.target.value }))}
                          className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-xs text-zinc-350 leading-relaxed font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 4. LIVE ADVISOR CHATBOT SUBTAB */}
              {activeAdminSubTab === "advisor" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-2xl">
                    <div>
                      <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider">{lang === "ar" ? "التحكم في شات بوت مستشار الذكاء" : "4. AI Advisor chatbot controls"}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">{lang === "ar" ? "أظهر مستشار الشات بوت في زاوية الموقع أو أخفه، وعدل الرسالة الترحيبية الهادية" : "Toggle Chatbot bubble visibility and customize welcome greetings text & prompt cues."}</p>
                    </div>

                    <button
                      onClick={() => setFormData(prev => ({ ...prev, showAiConsultant: !prev.showAiConsultant }))}
                      className={`px-4 py-2 text-xs font-mono font-black rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                        formData.showAiConsultant 
                          ? "bg-cyan-950/45 border-cyan-805 text-cyan-400" 
                          : "bg-red-950/20 border-red-900/40 text-red-400"
                      }`}
                    >
                      {formData.showAiConsultant ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      <span>{formData.showAiConsultant ? (lang === "ar" ? "مرئي بالموقع" : "Visible Live") : (lang === "ar" ? "مخفي في الموقع" : "Hidden")}</span>
                    </button>
                  </div>

                  {formData.showAiConsultant && (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{lang === "ar" ? "الرسالة الترحيبية للشات بوت (EN)" : "Chatbot Welcome Greeting (EN)"}</label>
                          <textarea 
                            rows={3}
                            value={formData.advisorWelcomeEn}
                            onChange={e => setFormData(prev => ({ ...prev, advisorWelcomeEn: e.target.value }))}
                            className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-xs text-white resize-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{lang === "ar" ? "الرسالة الترحيبية للشات بوت (AR)" : "Chatbot Welcome Greeting (AR)"}</label>
                          <textarea 
                            rows={3}
                            value={formData.advisorWelcomeAr}
                            onChange={e => setFormData(prev => ({ ...prev, advisorWelcomeAr: e.target.value }))}
                            className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-xs text-white resize-none text-right"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 font-sans">
                        <div className="space-y-1">
                          <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{lang === "ar" ? "مدخل الإيحاء المستعرض (EN)" : "Input placeholder suggestions (EN)"}</label>
                          <input 
                            type="text"
                            value={formData.advisorPlaceholderEn}
                            onChange={e => setFormData(prev => ({ ...prev, advisorPlaceholderEn: e.target.value }))}
                            className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded-lg text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{lang === "ar" ? "مدخل الإيحاء المستعرض (AR)" : "Input placeholder suggestions (AR)"}</label>
                          <input 
                            type="text"
                            value={formData.advisorPlaceholderAr}
                            onChange={e => setFormData(prev => ({ ...prev, advisorPlaceholderAr: e.target.value }))}
                            className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded-lg text-xs text-white text-right"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 5. CREDENTIALS AND TESTS TIMELINE SUBTAB */}
              {activeAdminSubTab === "credential" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-2xl">
                    <div>
                      <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider">{lang === "ar" ? "التحكم في الفريق والشهادات والتقييمات" : "5. Advisory Credentials & Reviews"}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">{lang === "ar" ? "أظهر تبويب أعضاء الفريق والتقييمات أو أخفها، مع إمكانية تحديث وتقييمات العملاء الموثقة" : "Toggle credentials panel, and modify professional enterprise customer reviews."}</p>
                    </div>

                    <button
                      onClick={() => setFormData(prev => ({ ...prev, showStory: !prev.showStory }))}
                      className={`px-4 py-2 text-xs font-mono font-black rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                        formData.showStory 
                          ? "bg-cyan-950/45 border-cyan-805 text-cyan-400" 
                          : "bg-red-950/20 border-red-900/40 text-red-400"
                      }`}
                    >
                      {formData.showStory ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      <span>{formData.showStory ? (lang === "ar" ? "مرئي بالموقع" : "Visible Live") : (lang === "ar" ? "مخفي في الموقع" : "Hidden")}</span>
                    </button>
                  </div>

                  {formData.showStory && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                        <h5 className="text-xs font-mono font-black text-white uppercase">{lang === "ar" ? "قائمة ريفيوهات العملاء المعتمدة" : "Verified Customer Reviews"}</h5>
                        <button
                          onClick={handleAddTestimonial}
                          className="px-3.5 py-1 rounded bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 font-mono text-[9px] uppercase hover:bg-cyan-900/40 cursor-pointer"
                        >
                          + {lang === "ar" ? "إضافة ريفيو" : "Add Review"}
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.testimonials.map((t, tIdx) => (
                          <div key={tIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-850 space-y-3">
                            <div className="flex justify-between items-center bg-zinc-900 px-3 py-1.5 rounded -m-4 mb-2 border-b border-zinc-800">
                              <span className="text-[9px] font-mono font-black text-cyan-400">Reviewer #{tIdx+1} - {t.name}</span>
                              <button 
                                onClick={() => handleRemoveTestimonial(tIdx)}
                                className="text-red-500 hover:text-red-400 text-[9px] font-mono uppercase cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-2">
                              <div className="space-y-1">
                                <label className="text-[8px] font-mono text-zinc-500">Name</label>
                                <input 
                                  type="text"
                                  value={t.name}
                                  onChange={e => handleTestimonialChange(tIdx, "name", e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[8px] font-mono text-zinc-500">Role (EN)</label>
                                <input 
                                  type="text"
                                  value={t.roleEn}
                                  onChange={e => handleTestimonialChange(tIdx, "roleEn", e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-200"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[8px] font-mono text-zinc-500">Role (AR)</label>
                                <input 
                                  type="text"
                                  value={t.roleAr}
                                  onChange={e => handleTestimonialChange(tIdx, "roleAr", e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-200 text-right"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Review En Dialogue</label>
                              <input 
                                type="text"
                                value={t.textEn}
                                onChange={e => handleTestimonialChange(tIdx, "textEn", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-300"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Review Ar Dialogue</label>
                              <input 
                                type="text"
                                value={t.textAr}
                                onChange={e => handleTestimonialChange(tIdx, "textAr", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-300 text-right"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 6. CASE STUDIES & PARTNERS SUBTAB */}
              {activeAdminSubTab === "casestudies" && (
                <div className="space-y-8">
                  {/* CASE STUDIES MANAGER */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                      <div>
                        <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider">
                          {lang === "ar" ? "دراسات لوحة الأعمال والمشاريع (القدرات المثبتة)" : "6a. Elite Proven Deployments & Case Studies"}
                        </h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5">
                          {lang === "ar" ? "إضافة أو تعديل أو إخفاء دراسات الحالة في صفحة عرض المشاريع" : "Configure case studies, live metrics, details, visible status, and deliverable items."}
                        </p>
                      </div>
                      <button
                        onClick={handleAddCaseStudy}
                        className="px-3 py-1.5 rounded bg-amber-950/40 border border-amber-805/40 text-amber-400 font-mono text-[10px] uppercase hover:bg-amber-900/30 cursor-pointer"
                      >
                        + {lang === "ar" ? "إضافة دراسة حالة" : "Add Case Study"}
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.caseStudiesList && formData.caseStudiesList.map((cs, csIdx) => (
                        <div key={cs.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-850 space-y-3">
                          <div className="flex justify-between items-center bg-zinc-900 px-3 py-1.5 rounded -m-4 mb-2 border-b border-zinc-800">
                            <span className="text-[9px] font-mono font-black text-amber-400">
                              {lang === "ar" ? `دراسة حالة #${csIdx+1} - ` : `Case Study #${csIdx+1} - `} {cs.clientEn} ({cs.id})
                            </span>
                            <div className="flex items-center gap-3">
                              {/* Visible toggle */}
                              <button
                                onClick={() => handleCaseStudyChange(csIdx, "visible", !cs.visible)}
                                className={`text-[9px] font-mono uppercase font-black cursor-pointer px-2 py-0.5 rounded ${cs.visible ? "bg-emerald-950/40 text-emerald-400" : "bg-red-950/40 text-red-400"}`}
                              >
                                {cs.visible ? (lang === "ar" ? "نشط ومستعرض" : "Active & Shown") : (lang === "ar" ? "مخفي بالموقع" : "Hidden")}
                              </button>
                              <button 
                                onClick={() => handleRemoveCaseStudy(csIdx)}
                                className="text-red-500 hover:text-red-400 text-[9px] font-mono uppercase cursor-pointer"
                              >
                                {lang === "ar" ? "حذف" : "Delete"}
                              </button>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-3">
                            {/* Client (EN / AR) */}
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Client Name & Brand (EN)</label>
                              <input 
                                type="text"
                                value={cs.clientEn}
                                onChange={e => handleCaseStudyChange(csIdx, "clientEn", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Client Name & Brand (AR)</label>
                              <input 
                                type="text"
                                value={cs.clientAr}
                                onChange={e => handleCaseStudyChange(csIdx, "clientAr", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-white text-right"
                              />
                            </div>

                            {/* Title (EN / AR) */}
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">System Title (EN)</label>
                              <input 
                                type="text"
                                value={cs.titleEn}
                                onChange={e => handleCaseStudyChange(csIdx, "titleEn", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">System Title (AR)</label>
                              <input 
                                type="text"
                                value={cs.titleAr}
                                onChange={e => handleCaseStudyChange(csIdx, "titleAr", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-white text-right"
                              />
                            </div>

                            {/* Industry & Area (EN / AR) */}
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Industry & Area En</label>
                              <input 
                                type="text"
                                value={cs.industryEn}
                                onChange={e => handleCaseStudyChange(csIdx, "industryEn", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-350"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Industry & Area Ar</label>
                              <input 
                                type="text"
                                value={cs.industryAr}
                                onChange={e => handleCaseStudyChange(csIdx, "industryAr", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-350 text-right"
                              />
                            </div>

                            {/* Class Category Selection */}
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Primary Project Class</label>
                              <select
                                value={cs.category}
                                onChange={e => handleCaseStudyChange(csIdx, "category", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-white"
                              >
                                <option value="backend">Django API / Python Core</option>
                                <option value="fastapi_nestjs">FastAPI / NestJS Backend</option>
                                <option value="react_next">React / Next.js Web App</option>
                                <option value="mobile">Mobile App / Swift & Kotlin</option>
                                <option value="ecommerce">E-Commerce / Gateways</option>
                                <option value="custom">Bespoke SaaS / Corporate</option>
                              </select>
                            </div>

                            {/* Showcase Metric & Label EN/AR */}
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Core Performance Metric</label>
                              <input 
                                type="text"
                                value={cs.metric}
                                placeholder="E.g. 1.2M+ / 100% / 2.1s"
                                onChange={e => handleCaseStudyChange(csIdx, "metric", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-emerald-400 font-bold"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Metric Underlabel Name (EN)</label>
                              <input 
                                type="text"
                                value={cs.metricLabelEn}
                                onChange={e => handleCaseStudyChange(csIdx, "metricLabelEn", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-400"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Metric Underlabel Name (AR)</label>
                              <input 
                                type="text"
                                value={cs.metricLabelAr}
                                onChange={e => handleCaseStudyChange(csIdx, "metricLabelAr", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-400 text-right"
                              />
                            </div>
                          </div>

                          {/* Description (EN / AR) */}
                          <div className="space-y-1">
                            <label className="text-[8px] font-mono text-zinc-500">Case Description (EN)</label>
                            <textarea 
                              rows={2}
                              value={cs.descEn}
                              onChange={e => handleCaseStudyChange(csIdx, "descEn", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-300"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[8px] font-mono text-zinc-500">Case Description (AR)</label>
                            <textarea 
                              rows={2}
                              value={cs.descAr}
                              onChange={e => handleCaseStudyChange(csIdx, "descAr", e.target.value)}
                              className="w-full bg-[#101015] border border-zinc-800 p-2 rounded text-[10px] text-zinc-300 text-right"
                            />
                          </div>

                          {/* Deliverables En, Deliverables Ar, Tags */}
                          <div className="grid sm:grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Deliverables En (Comma separated)</label>
                              <input 
                                type="text"
                                value={cs.deliverablesEn ? cs.deliverablesEn.join(", ") : ""}
                                onChange={e => handleCaseStudyChange(csIdx, "deliverablesEn", e.target.value.split(",").map(x => x.trim()))}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-350"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Deliverables Ar (Comma separated)</label>
                              <input 
                                type="text"
                                value={cs.deliverablesAr ? cs.deliverablesAr.join(", ") : ""}
                                onChange={e => handleCaseStudyChange(csIdx, "deliverablesAr", e.target.value.split(",").map(x => x.trim()))}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-350 text-right"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Tags / Tech (Comma separated)</label>
                              <input 
                                type="text"
                                value={cs.tags ? cs.tags.join(", ") : ""}
                                onChange={e => handleCaseStudyChange(csIdx, "tags", e.target.value.split(",").map(x => x.trim()))}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-amber-400 font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TECHNOLOGY PARTNERS MANAGER */}
                  <div className="space-y-4 pt-6 border-t border-zinc-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider">
                          {lang === "ar" ? "التحالفات والشركاء التكنولوجيين" : "6b. Dedicated Technology Integration Alliances"}
                        </h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5">
                          {lang === "ar" ? "إضافة أو تعديل قائمة شركاء التقنية والأنظمة المعرّبة للطرفين" : "Configure bilingual technology network details (e.g. AWS, Django, PostgreSQL) shown in active banners."}
                        </p>
                      </div>
                      <button
                        onClick={handleAddPartner}
                        className="px-3 py-1.5 rounded bg-amber-950/40 border border-amber-805/40 text-amber-400 font-mono text-[10px] uppercase hover:bg-amber-900/30 cursor-pointer"
                      >
                        + {lang === "ar" ? "إضافة شريك تقني" : "Add Tech Partner"}
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {formData.partnersList && formData.partnersList.map((p, pIdx) => (
                        <div key={pIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-850 space-y-2.5">
                          <div className="flex justify-between items-center bg-zinc-900 px-2.5 py-1 rounded -m-3.5 mb-1.5 border-b border-zinc-800">
                            <span className="text-[9px] font-mono font-black text-zinc-400">
                              Partner #{pIdx+1} - {p.name}
                            </span>
                            <button 
                              onClick={() => handleRemovePartner(pIdx)}
                              className="text-red-500 hover:text-red-400 text-[9px] font-mono uppercase cursor-pointer"
                            >
                              {lang === "ar" ? "حذف" : "Remove"}
                            </button>
                          </div>

                          <div className="space-y-2 pt-1.5">
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono text-zinc-500">Partner & Logo Name</label>
                              <input 
                                type="text"
                                value={p.name}
                                onChange={e => handlePartnerChange(pIdx, "name", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-white font-black"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <label className="text-[8px] font-mono text-zinc-500">Service Role / Type (EN)</label>
                                <input 
                                  type="text"
                                  value={p.typeEn}
                                  onChange={e => handlePartnerChange(pIdx, "typeEn", e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-300"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[8px] font-mono text-zinc-500">Service Role / Type (AR)</label>
                                <input 
                                  type="text"
                                  value={p.typeAr}
                                  onChange={e => handlePartnerChange(pIdx, "typeAr", e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-zinc-300 text-right"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Footer actions */}
        {isLoggedIn && (
          <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>{lang === "ar" ? "تعديلات مشفرة محلياً" : "Fully Synchronized Browser Node"}</span>
            </div>

            <div className="flex items-center gap-2">
              {saveSuccess && (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-emerald-400 text-[10px] font-mono uppercase tracking-widest font-black mr-2 bg-emerald-950/40 border border-emerald-900/40 px-3 py-1.5 rounded-lg"
                >
                  {lang === "ar" ? "حفظ وتعديل فوري بنجاح! ✓" : "Dynamic Hot-Reload Deployed! ✓"}
                </motion.span>
              )}

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-700 hover:from-gold-400 hover:to-gold-600 text-white font-black text-xs uppercase tracking-widest transition cursor-pointer flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>{lang === "ar" ? "جاري بناء الهيكل..." : "Saving..."}</span>
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    <span>{lang === "ar" ? "حفظ التغييرات" : "Commit Changes"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
