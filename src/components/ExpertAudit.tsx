import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Gauge, 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Cpu, 
  Database, 
  ShieldAlert, 
  Search, 
  Play, 
  RotateCcw, 
  Sparkles,
  Award,
  ArrowRight,
  Server
} from "lucide-react";

interface ExpertAuditProps {
  lang: "en" | "ar";
}

export function ExpertAudit({ lang }: ExpertAuditProps) {
  const [selectedTarget, setSelectedTarget] = useState<"standard" | "optimized">("optimized");
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [auditDone, setAuditDone] = useState(false);
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);

  const metricsList = [
    { nameEn: "DNS & TLS Handshake", nameAr: "ربط النطاق وأمان الطبقة الآمنة", standardVal: "280ms", optimizedVal: "25ms" },
    { nameEn: "Time To First Byte (TTFB)", nameAr: "زمن استجابة السيرفر الأولية", standardVal: "850ms", optimizedVal: "90ms" },
    { nameEn: "First Contentful Paint (FCP)", nameAr: "أول ظهور مرئي للعناصر", standardVal: "2.4s", optimizedVal: "0.4s" },
    { nameEn: "Largest Contentful Paint (LCP)", nameAr: "زمن تحميل الصفحة الرئيسي الكلي", standardVal: "4.8s", optimizedVal: "1.1s" },
    { nameEn: "Cumulative Layout Shift (CLS)", nameAr: "أمان تحرّك عناصر التصميم", standardVal: "0.24 (Poor)", optimizedVal: "0.01 (Perfect)" },
    { nameEn: "JS Bundle Size (Gzip/Brotli)", nameAr: "حجم الأكواد البرمجية المحملة", standardVal: "3.2 MB", optimizedVal: "340 KB" },
    { nameEn: "Database N+1 Query Time", nameAr: "زمن استعلام قواعد البيانات بالصفحة", standardVal: "140ms (25 queries)", optimizedVal: "8ms (1 clean query)" }
  ];

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setIsRunning(false);
            setAuditDone(true);
            return 100;
          }
          const increment = selectedTarget === "optimized" ? 12 : 6;
          return Math.min(p + increment, 100);
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isRunning, selectedTarget]);

  useEffect(() => {
    if (isRunning) {
      const step = Math.min(Math.floor((progress / 100) * metricsList.length), metricsList.length - 1);
      setCurrentMetricIndex(step);
    }
  }, [progress, isRunning, metricsList.length]);

  const handleStartAudit = () => {
    setProgress(0);
    setAuditDone(false);
    setIsRunning(true);
  };

  const gaps = [
    {
      titleEn: "1. Slow Web Loading Speed & Hydration Bloat",
      titleAr: "١. بطء التحميل وتضخم ملفات الجافาสكريبت",
      icon: Gauge,
      shortcomingEn: "Competitor legacy sites load generic 4MB+ JS bundles, causing slow TTFB on local 3G/4G networks and massive site desertion.",
      shortcomingAr: "المواقع التقليدية تحمل مكتبات ضخمة تتجاوز 4 ميغابايت، مما يعزز زمن الارتداد وموت سرعة التحميل على شبكات الجيل الرابع المحلية.",
      solutionEn: "We code-split routing, apply asset compression, and use lightweight modern UI elements to ensure a responsive < 1.2s load time.",
      solutionAr: "نقوم بتقسيم كود وتوجيه الصفحات يدوياً (Code Splitting)، واستخدام تقنيات الضغط الحديثة Brotli لضمان تجاوب فائق خلال ثانية واحدة فقط.",
      tags: ["Brotli compression", "Tree Shaking", "Code Splitting"]
    },
    {
      titleEn: "2. Database N+1 Loop Failures & High Server Cost",
      titleAr: "٢. تراجع معالجة قواعد البيانات وتكرار الاستعلامات",
      icon: Database,
      shortcomingEn: "Shallow developers write loop-nested SQL queries (fetching data inside an active row render block), sparking up to 300 database hits for a simple user list.",
      shortcomingAr: "تكتب الأكواد بشكل مباشر للمصفوفات دون تفعيل تجميع الاستعلامات المسبقة، مما يطلب مئات الاتصالات بقاعدة البيانات لزيارة بسيطة من العميل.",
      solutionEn: "We strictly pre-map database relationships using Django's select_related/prefetch_related or Drizzle's elegant relational models to resolve queries in 1 single clean hit.",
      solutionAr: "ندير جداول البيانات بحرفية، مفعّلين الاستدعاء المسبق والمشترك لتقليص زيارات قاعدة البيانات إلى استعلام واحد نظيف بأقل من 8 أجزاء من الثانية.",
      tags: ["Query Optimization", "Index mapping", "Eager loading"]
    },
    {
      titleEn: "3. Broken Arabic/English Bidirectional Design (RTL)",
      titleAr: "٣. تفكك التصميم الثنائي التعريب (عربي / إنجليزي)",
      icon: Award,
      shortcomingEn: "Most portals use cheap translator plugins that flip UI containers incorrectly, breaking page proportions, font hierarchies, and Arabic typography flow.",
      shortcomingAr: "تعتمد المواقع على إضافات ترجمة مجانية تعكس التصميم بشكل عشوائي، مما يعيق توازن الهوامش ويشوه دقة الخطوط وانسيابية واجهات المستخدم العربية.",
      solutionEn: "We engineer structural dual-languages on the CSS & HTML schema level, optimizing margins and Arabic layouts with Cairo/Outfit typography grids properly mapped for both directions.",
      solutionAr: "نؤسس تخطيطاً ثنائياً هيكلياً على مستوى محرك التصميم ومكونات الواجهة لإدارة الهوامش وتدفق الخطوط ومراعاة الثقافة البصرية للمستخدم العربي والترجمة الإنسانية.",
      tags: ["Professional RTL Setup", "Cairo Typography Grid", "Bilingual State Engine"]
    },
    {
      titleEn: "4. Missing Technical SEO & Empty Metadata SSR Headers",
      titleAr: "٤. غياب أرشفة محركات البحث (SEO) والواصفات الميتاداتا",
      icon: Search,
      shortcomingEn: "Standard SPAs (React) are completely blank to search core Google engines, resulting in zero organic ranking and double the cost in paid ads.",
      shortcomingAr: "تعاني المواقع المبنية بواجهات برمجية من محتوى فارغ بمحركات بحث جوجل نتيجة التحميل المتأخر للأكواد، مما يدمر محاولات الظهور العضوي وتكلفة باهظة بالإعلانات المتروكة.",
      solutionEn: "We inject clean metadata directly, utilize dynamic server headers, structured JSON-LD schemes, and clean Sitemap generation, securing organic search authority.",
      solutionAr: "نوفر البنية الزاحفة والتحميل الاستباقي للواصفات والأرشفة الهيكلية من خلال (Metadata Injections / JSON-LD) لضمان تصدر محرك البحث بجدارة.",
      tags: ["JSON-LD Schema", "Sitemap Automation", "Dynamic Metadata Struct"]
    },
    {
      titleEn: "5. Defenseless API Securities & Long-lived Token Risks",
      titleAr: "٥. ضعف الحماية الأمنية للواجهات وحفظ البيانات الحساسة",
      icon: ShieldAlert,
      shortcomingEn: "Common sites store secret keys and long-lived JWTs directly in readable browser localStorage or allow wild open CORS patterns, inviting severe API hijacking.",
      shortcomingAr: "تحتفظ الأنظمة برموز الدخول الحساسة داخل المتصفح العام بقيمة تخزين مكشوفة، مع فتح الصلاحيات بالكامل دون تصفية نطاقات الطلب، مما يهدد باختراق بيانات العملاء.",
      solutionEn: "We secure API communications using HttpOnly cookies, establish micro-segmented JWT lifetimes, set tight CORS patterns, and implement rate limiting.",
      solutionAr: "نحصّن قنوات الاتصال بالكامل ونخزن الرموز المشفرة بملفات تعريفية معزولة (HttpOnly Secure Cookies) مع فرض جدران حماية ومسارات موثقة للواجهات والأمن السحابي.",
      tags: ["HttpOnly Isolation", "CORS Configuration", "Cryptographic Signing"]
    }
  ];

  return (
    <div className="space-y-12">
      {/* 1. INTERACTIVE REAL-TIME AUDIT DIAGNOSTIC */}
      <div className="p-8 rounded-3xl bg-[#09090c]/40 backdrop-blur-sm border border-slate-90030/90 hover:border-amber-900/20 transition-all duration-300 relative overflow-hidden">
        {/* Decorative ambient gold glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-950/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 font-bold">
              {lang === "ar" ? "تشخيص الأداء والمقارنة اللحظية" : "Interactive Performance Optimization Simulator"}
            </span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            {lang === "ar" ? "محاكي سرعة الخوادم والتحميل الفوري" : "Osama Esmael Speed Diagnostics VS Legacy Portals"}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-light">
            {lang === "ar" 
              ? "تفقد الفروقات الفنية والسرعة المهندسة لصفحتنا والأنظمة التي نبنيها بالمقارنة مع مطوري المواقع والمنصات التقليدية في السوق لعام ٢٠٢٦."
              : "Execute a mock PageSpeed/Audit diagnostics benchmark comparing typical legacy code setups to our performance-optimized, high-speed architectures."
            }
          </p>
        </div>

        {/* CONTROLS */}
        <div className="mt-8 grid sm:grid-cols-12 gap-6 items-center border-t border-slate-900/60 pt-6">
          <div className="sm:col-span-6 flex gap-3">
            <button
              onClick={() => setSelectedTarget("standard")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase cursor-pointer border transition-all text-center ${
                selectedTarget === "standard" 
                  ? "bg-red-950/20 border-red-900/50 text-red-400" 
                  : "bg-zinc-950/60 border-zinc-900 text-zinc-500 hover:text-zinc-350"
              }`}
            >
              📊 {lang === "ar" ? "منصات السوق التقليدية" : "Legacy Competitor Suite"}
            </button>
            <button
              onClick={() => setSelectedTarget("optimized")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase cursor-pointer border transition-all text-center ${
                selectedTarget === "optimized" 
                  ? "bg-gold-950/30 border-gold-800/40 text-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.06)]" 
                  : "bg-zinc-950/60 border-zinc-900 text-zinc-500 hover:text-zinc-350"
              }`}
            >
              👑 {lang === "ar" ? "بنيتنا المحسنة" : "Our High-Speed Engine"}
            </button>
          </div>

          <div className="sm:col-span-6 flex justify-end">
            <button
              onClick={handleStartAudit}
              disabled={isRunning}
              className={`px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 font-bold uppercase text-xs tracking-wider text-[#09090b] transition-all flex items-center gap-2 active:scale-95 cursor-pointer ${
                isRunning ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isRunning ? (
                <>
                  <Server className="h-4 w-4 animate-spin" />
                  <span>{lang === "ar" ? "جاري فحص الشفرة..." : "Running Load Test..."}</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>{lang === "ar" ? "تشغيل الفحص الفني" : "Execute Speed Audit"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* PROGRESS BAR */}
        {(isRunning || auditDone) && (
          <div className="mt-8 space-y-4">
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-500">
                {lang === "ar" ? "فئة النظام المحدد:" : "Target Setup:"}{" "}
                <strong className={selectedTarget === "optimized" ? "text-gold-400" : "text-red-400"}>
                  {selectedTarget === "optimized" ? (lang === "ar" ? "محرك أسامة إسماعيل عالي الاستجابة" : "Osama High-Performance Core") : (lang === "ar" ? "منصة عادية غير محسنة" : "Legacy Unoptimized Stack")}
                </strong>
              </span>
              <span className={selectedTarget === "optimized" ? "text-gold-400" : "text-red-400"}>
                {progress}%
              </span>
            </div>

            <div className="w-full bg-zinc-950/80 h-3 rounded-full overflow-hidden border border-zinc-900">
              <div 
                className={`h-full transition-all duration-150 rounded-full ${
                  selectedTarget === "optimized" ? "bg-gold-400 shadow-[0_0_10px_#d4af37]" : "bg-red-500"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Simulated Live Diagnostic Stream */}
            {isRunning && (
              <div className="text-[11px] font-mono text-zinc-400 animate-pulse flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
                <span>
                  {lang === "ar" ? "يتم اختبار:" : "Testing:"} {lang === "ar" ? metricsList[currentMetricIndex].nameAr : metricsList[currentMetricIndex].nameEn} ...
                </span>
              </div>
            )}
          </div>
        )}

        {/* AUDIT COMPARISON RESULTS */}
        {auditDone && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-6 border-t border-slate-900/60 grid md:grid-cols-2 gap-8"
          >
            {/* Left side: Gauge Score */}
            <div className="bg-[#050508] p-6 rounded-2xl border border-zinc-900/60 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative flex items-center justify-center h-36 w-36">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-zinc-900"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="38"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className={selectedTarget === "optimized" ? "text-gold-400" : "text-red-500"}
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 38}
                    strokeDashoffset={2 * Math.PI * 38 * (1 - (selectedTarget === "optimized" ? 0.99 : 0.42))}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="38"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className={`text-4xl font-mono font-black ${selectedTarget === "optimized" ? "text-gold-400" : "text-red-400"}`}>
                    {selectedTarget === "optimized" ? "99" : "42"}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono font-bold">
                    {lang === "ar" ? "أداء الأكواد" : "Performance Score"}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white uppercase font-mono">
                  {selectedTarget === "optimized" ? (lang === "ar" ? "أداء فائق الفئة" : "Elite Grade Certified") : (lang === "ar" ? "تقييم أداء ضعيف" : "Sub-Standard Legacy Load")}
                </h4>
                <p className="text-xs text-zinc-500 max-w-xs mt-1.5">
                  {selectedTarget === "optimized"
                    ? (lang === "ar" ? "تحميل فوري مع استغلال أمثل لذاكرة التخزين وبروتوكولات Brotli لتوفير أقصى سرعة وباقة إنترنت العميل." : "Instant responsive rendering utilizing code-splitting and compression to deliver excellent retention rate.")
                    : (lang === "ar" ? "تحميل الأكواد والملفات غير المضغوطة بشكل تسلسلي مما يعيق ظهور الشاشة لمدة تتجاوز 4 ثوان." : "Bloated execution flow delaying the time to first visible UI and increasing bounce penalty dramatically.")
                  }
                </p>
              </div>
            </div>

            {/* Right side: Matrix Table */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono uppercase bg-zinc-900 text-zinc-500 px-2 py-1 rounded inline-block">
                ⏱️ {lang === "ar" ? "تفاصيل تقييم المؤشر القياسي" : "Detailed Diagnostics Metrics Ledger"}
              </span>

              <div className="space-y-2">
                {metricsList.map((m, mIdx) => (
                  <div key={mIdx} className="p-3 bg-zinc-950/40 rounded-lg border border-zinc-900/60 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-400 font-sans">{lang === "ar" ? m.nameAr : m.nameEn}</span>
                    <div className="flex gap-4 items-center">
                      <span className="text-zinc-600 line-through text-[10px]">{m.standardVal}</span>
                      <span className={`font-bold ${selectedTarget === "optimized" ? "text-gold-400" : "text-red-400"}`}>
                        {selectedTarget === "optimized" ? m.optimizedVal : m.standardVal}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 2. THE STRUCTURAL DEFICIENCIES & COMPETITOR GAP ASSESSMENT */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">
            {lang === "ar" ? "أسباب تعثر المواقع في السوق ومواطن القصور" : "Core Deficiencies in Local Platforms & Our Defense"}
          </h3>
          <p className="text-[10px] font-mono text-gold-400 uppercase tracking-[0.23em] font-bold">
            {lang === "ar" ? "تحليل هندسي شامل لتكون منافساً حقيقياً" : "Bespoke audit to build market-dominating systems"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-4">
          {gaps.map((g, idx) => {
            const IconComp = g.icon;
            return (
              <TiltCardCustom
                key={idx}
                className="p-6 rounded-3xl bg-[#09090c]/40 border border-slate-900 flex flex-col justify-between hover:border-slate-800 transition-all duration-300 relative group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-600">AUDIT GAP #{idx+1}</span>
                    <span className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-gold-400">
                      <IconComp className="h-4 w-4" />
                    </span>
                  </div>

                  <h4 className="text-base font-black text-white uppercase tracking-tight group-hover:text-gold-300 transition-colors">
                    {lang === "ar" ? g.titleAr : g.titleEn}
                  </h4>

                  <div className="space-y-3.5">
                    {/* GAP / SHORTCOMING */}
                    <div className="p-3 bg-red-950/15 border border-red-900/30 rounded-xl space-y-1">
                      <span className="text-[9px] font-mono text-red-400 font-bold block uppercase tracking-wider">
                        ⚠️ {lang === "ar" ? "نقص السوق وتراجع الأداء:" : "Legacy Market Shortcoming:"}
                      </span>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                        {lang === "ar" ? g.shortcomingAr : g.shortcomingEn}
                      </p>
                    </div>

                    {/* OUR BLUEPRINT SOLUTION */}
                    <div className="p-3 bg-gold-950/20 border border-gold-800/20 rounded-xl space-y-1">
                      <span className="text-[9px] font-mono text-gold-400 font-bold block uppercase tracking-wider">
                        👑 {lang === "ar" ? "الحل الهندسي العالي المنافسة:" : "Osama Ismail System Standard:"}
                      </span>
                      <p className="text-[11px] text-zinc-350 leading-relaxed font-light">
                        {lang === "ar" ? g.solutionAr : g.solutionEn}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-950 mt-4">
                  {g.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[8px] font-mono px-2 py-0.5 bg-zinc-950 rounded border border-zinc-900 text-zinc-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCardCustom>
            );
          })}
        </div>
      </div>

      {/* 3. SPEED & COMPRESSIVE STANDARDS SUMMARY CALLOUT */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-gold-950/20 to-zinc-950 border border-gold-800/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5">
          <span className="text-[9px] uppercase font-mono tracking-widest text-gold-400 font-bold block">
            {lang === "ar" ? "الامتياز الفني كمعيار أساسي" : "SYSTEM PERFORMANCE ASSURANCE CERTIFICATE"}
          </span>
          <h4 className="text-lg font-black text-white uppercase tracking-tight">
            {lang === "ar" ? "هل ترغب في فحص وأرشفة موقعك الحالي مجاناً؟" : "Want a custom Speed & SecOps check on your active project?"}
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-light max-w-2xl">
            {lang === "ar"
              ? "تفوق على منافسيك بتقديم موقع يفتح تماماً بأقل من ثانية واحدة مع توفير باقة الزائر، بالإضافة لحماية كاملة للاتصالات والبيانات الفيدرالية والمؤسسية."
              : "Do not let poor code structures leak customer trust and traffic. Osama Esmael crafts clean architectures engineered to win organic authority and load instantly on mobile."
            }
          </p>
        </div>

        <a
          href="#consultation-form"
          className="px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-[#09090b] text-[10px] font-bold font-mono uppercase tracking-wider text-center shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <span>{lang === "ar" ? "تأمين مشروعك الآن" : "Secure Development"}</span>
          <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

// Internal reusable lightweight tilt card wrapper to decouple from main layout dependencies
function TiltCardCustom({ children, className }: { children: React.ReactNode; className?: string; key?: any }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCoords({ x: x / 30, y: -(y / 30) });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${className} transition-all duration-300 relative`}
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${coords.y}deg) rotateY(${coords.x}deg) scale3d(1.006, 1.006, 1.006)` : "none"
      }}
    >
      <div 
        className="absolute inset-[0.5px] rounded-[inherit] transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered ? "radial-gradient(circle 120px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 175, 55, 0.08) 0%, transparent 100%)" : "none",
          opacity: isHovered ? 1 : 0
        }}
      />
      {children}
    </div>
  );
}
