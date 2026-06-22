import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, X, Send, Sparkles, AlertCircle, RefreshCw, User, 
  ExternalLink, Phone, MessageCircle, Link, CreditCard, Award, 
  Workflow, Zap, Shield, HelpCircle, Laptop, Share2
} from "lucide-react";
import osamaRealImg from "../assets/images/osama_realistic_avatar_1781223721581.jpg";
import alhussienAvatarImg from "../assets/images/alhussien_avatar_1781220394365.jpg";

interface Message {
  role: "user" | "model";
  text: string;
}

interface AIAssistantChatProps {
  lang: "en" | "ar";
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  prepopulatedQuestion?: string;
  customWelcomeEn?: string;
  customWelcomeAr?: string;
  customPlaceholderEn?: string;
  customPlaceholderAr?: string;
  whatsapp?: string;
}

export function AIAssistantChat({ 
  lang, 
  isOpen, 
  onClose, 
  onOpen, 
  prepopulatedQuestion,
  customWelcomeEn,
  customWelcomeAr,
  customPlaceholderEn,
  customPlaceholderAr,
  whatsapp = "01066906132"
}: AIAssistantChatProps) {
  // Tabs: "chat" | "portfolio" | "contact"
  const [activeTab, setActiveTab] = useState<"chat" | "portfolio" | "contact">("chat");

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = () => {
      try {
        const stored = localStorage.getItem("osera_corporate_profile");
        if (stored) {
          setProfile(JSON.parse(stored));
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadProfile();
    window.addEventListener("storage", loadProfile);
    return () => window.removeEventListener("storage", loadProfile);
  }, []);

  const rawWhatsapp = profile?.whatsapp || whatsapp || "201066906132";
  const cleanWhatsapp = rawWhatsapp.startsWith("20") 
    ? rawWhatsapp 
    : (rawWhatsapp.startsWith("0") ? "20" + rawWhatsapp.substring(1) : "20" + rawWhatsapp);

  const waLink = `https://wa.me/${cleanWhatsapp}`;

  const [messages, setMessages] = useState<Message[]>([]);

  // Update initial messages on mount or greeting change
  useEffect(() => {
    setMessages([
      {
        role: "model",
        text: lang === "ar" 
          ? (customWelcomeAr || "مرحباً بك! أنا المستشار الذكي لمنظومة OSERA البرمجية. يمكنني مساعدتك في تخطيط هيكلة خادمك، تحسين استعلامات Django السريعة، إعداد طبقات الدفع المشفرة، أو تنسيق تواصل مباشر مع أسامة إسماعيل (المؤسس). كيف يمكنني دعمك اليوم؟") 
          : (customWelcomeEn || "Welcome! I am the OSERA Enterprise Technical Lead Assistant. I can help you stoneprint high-performance Django architectures, eliminate database N+1 bottlenecks, handle cash caching schemes, or coordinate a secure meeting with our founder Osama Esmael. How can I help you today?")
      }
    ]);
  }, [lang, customWelcomeEn, customWelcomeAr]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages list updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, activeTab]);

  // Handle preset prepopulated questions
  useEffect(() => {
    if (prepopulatedQuestion && isOpen) {
      setActiveTab("chat");
      handleSendMessage(prepopulatedQuestion);
    }
  }, [prepopulatedQuestion, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    const userMsg: Message = { role: "user", text: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    let currentProfile = null;
    try {
      const stored = localStorage.getItem("osera_corporate_profile");
      if (stored) {
        currentProfile = JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to read profile from localStorage in chatbot", e);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: updatedMessages,
          profileContext: currentProfile
        }),
      });

      if (!response.ok) {
        throw new Error(lang === "ar" ? "خطأ في الاتصال بالسيرفر السحابي لـ OSERA" : "Unable to reach OSERA intelligence servers");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { role: "model", text: data.text || "" }]);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || (lang === "ar" ? "فشل إرسال الاستفسار، يرجى المحاولة لاحقاً" : "Failed to generate AI response"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleSendMessage(inputValue);
  };

  const ArabicPrompts = [
    "أريد طلب تسعير لمشروع جديد",
    "احتاج تصميم هيكلة سحابية لنظام مبيعات",
    "كيف يمكنني التواصل مع أسامة عبر الواتساب؟",
    "لدي فكرة تطبيق وأريد استشارة معمارية"
  ];

  const EnglishPrompts = [
    "I want to request pricing for a new project",
    "Design structure for high-throughput ecommerce servers",
    "How can I contact Osama on WhatsApp?",
    "I have an app idea and need architectural consulting"
  ];

  const suggestChips = lang === "ar" ? ArabicPrompts : EnglishPrompts;

  // Rich Deployed Projects Portfolio Links
  const portfolioProjects = [
    {
      title: "Osara AI Platform",
      desc_ar: "نظام وحوار الذكاء الاصطناعي لإدارة وتوليد الأكواد المعيارية",
      desc_en: "Advanced AI conversational engine for system code scaffolding",
      url: "https://www.osara-ai.com/",
      category: "AI & Generation"
    },
    {
      title: "Core Enterprise Portal",
      desc_ar: "بوابة نظام الإدارة المتكاملة وتحليل البيانات الكبرى للخوادم",
      desc_en: "Consolidated enterprise control & big data cloud management node",
      url: "http://64.227.108.135/login",
      category: "Infrastructure"
    },
    {
      title: "OMS Connect Pack",
      desc_ar: "منصة ذكية لإدارة طلبات الشحن وتتبع سلاسل التوريد لحظة بلحظة",
      desc_en: "Order and shipment logistics ecosystem with real-time sync",
      url: "https://oms.connect-pack.com/",
      category: "Logistics"
    },
    {
      title: "A-List Home Pros",
      desc_ar: "نظام حجز وتنسيق خدمات الصيانة الذكية للشركات الأمريكية",
      desc_en: "Enterprise service matching and real-time scheduling system",
      url: "https://www.alisthomepros.com/",
      category: "Web & Engine"
    },
    {
      title: "Arabiya RSN Network",
      desc_ar: "بناء وتوزيع المحتوى والمسارات الإخبارية السريعة بقواعد متطورة",
      desc_en: "High-performance arab news aggregation and system network",
      url: "https://www.rsnalarabiya.info/",
      category: "Media Systems"
    }
  ];

  // Social Channels & Contact links
  const contactLinks = [
    {
      name: lang === "ar" ? "مراسلة واتساب الفورية" : "Direct WhatsApp Call",
      val: cleanWhatsapp,
      icon: <Phone className="h-4 w-4 text-gold-400 shrink-0" />,
      url: waLink,
      bg: "hover:bg-gold-950/40 hover:border-gold-500/30",
      lbl: lang === "ar" ? "مصر (+20)" : "Egypt (+20)"
    },
    {
      name: lang === "ar" ? "منصة مستقل (ناجزلي)" : "Nafezly Freelance Profile",
      val: "@osama_el_deghady",
      icon: <Workflow className="h-4 w-4 text-amber-500 shrink-0" />,
      url: "https://nafezly.com/u/osama_el_deghady",
      bg: "hover:bg-amber-950/30 hover:border-amber-500/30",
      lbl: lang === "ar" ? "عربي" : "Arabic Platform"
    },
    {
      name: lang === "ar" ? "رابط الدفع المؤمن (PayPal)" : "Secure Booking Deposit (PayPal)",
      val: "paypal.me/OsamaDeghady",
      icon: <CreditCard className="h-4 w-4 text-sky-400 shrink-0" />,
      url: "https://www.paypal.me/OsamaDeghady",
      bg: "hover:bg-sky-950/40 hover:border-sky-500/30",
      lbl: lang === "ar" ? "حجز وتأكيد المشاريع" : "Project Retainers"
    },
    {
      name: "Upwork Premium Freelancer",
      val: "Osama Esmael (Top Rated)",
      icon: <Award className="h-4 w-4 text-gold-400 shrink-0" />,
      url: "https://www.upwork.com/freelancers/~01bf4f5af0779c48e8?mp_source=share",
      bg: "hover:bg-gold-950/30 hover:border-gold-500/30",
      lbl: "Verified Upwork"
    },
    {
      name: "LinkedIn Strategic Network",
      val: "Osama Deghadey",
      icon: <Share2 className="h-4 w-4 text-stone-400 shrink-0" />,
      url: "https://www.linkedin.com/in/osama-deghadey-941552255/",
      bg: "hover:bg-stone-950/30 hover:border-stone-500/30",
      lbl: "Professional ID"
    },
    {
      name: "YouTube Tech Channel",
      val: "@osamaesmail-y3p",
      icon: <Laptop className="h-4 w-4 text-red-400 shrink-0" />,
      url: "https://youtube.com/@osamaesmail-y3p?si=IXi4umn-kN0QnNZp",
      bg: "hover:bg-red-950/30 hover:border-red-500/30",
      lbl: "System Lectures"
    },
    {
      name: "TikTok Tech Portal",
      val: "@oserasoft1",
      icon: <MessageSquare className="h-4 w-4 text-gold-400 shrink-0" />,
      url: "https://www.tiktok.com/@oserasoft1?_r=1&_t=ZS-978QFxX0dCW",
      bg: "hover:bg-gold-950/30 hover:border-gold-500/30",
      lbl: "Short Tech Insights"
    },
    {
      name: "Indeed Verification Profile",
      val: "Osama System Lead Profile",
      icon: <HelpCircle className="h-4 w-4 text-zinc-400 shrink-0" />,
      url: "https://profile.indeed.com/?hl=en_EG&co=EG&from=gnav-homepage",
      bg: "hover:bg-zinc-950/30 hover:border-zinc-500/30",
      lbl: "Indeed EG"
    },
    {
      name: "Facebook Corporate Contact",
      val: "Osama Esmael Page",
      icon: <MessageCircle className="h-4 w-4 text-stone-500 shrink-0" />,
      url: "https://www.facebook.com/share/1cFNBCGtwA/",
      bg: "hover:bg-stone-950/20 hover:border-stone-500/20",
      lbl: "Community Portal"
    }
  ];

  return (
    <>
      {/* 1. Backdrop Outside Click-to-Dismiss Filter */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-45 cursor-pointer"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* 2. Smaller Floating 3D Msg Icon Launcher */}
      {!isOpen && (
        <motion.button
          id="osera-chat-launcher"
          onClick={onOpen}
          initial={{ scale: 0, opacity: 0, y: 30 }}
          animate={{ 
            scale: typeof window !== 'undefined' && window.navigator.webdriver ? 1 : [1, 1.02, 1],
            opacity: 1, 
            y: typeof window !== 'undefined' && window.navigator.webdriver ? 0 : [0, -4, 0]
          }}
          transition={typeof window !== 'undefined' && window.navigator.webdriver ? { duration: 0.1 } : {
            scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
          }}
          whileHover={{ 
            scale: 1.15,
            rotate: [0, -5, 5, 0],
            boxShadow: "0 0 35px rgba(201, 168, 76, 0.45)"
          }}
          whileTap={{ scale: 0.9 }}
          title={lang === "ar" ? "مستشار الذكاء والنظم" : "OSERA Cloud Co-pilot"}
          className="fixed bottom-6 right-6 z-50 h-13 w-13 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-navy-600 text-white flex items-center justify-center shadow-[0_8px_32px_rgba(201,168,76,0.3)] ring-2 ring-gold-300/40 cursor-pointer select-none"
        >
          <div className="relative">
            {/* Pulsing outer indicator ring */}
            <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500"></span>
            </span>
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
        </motion.button>
      )}

      {/* 3. Immersive Interactive 3D/Glass Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="osera-chat-panel"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 360 }}
            className={`fixed bottom-6 ${lang === "ar" ? "left-6" : "right-6"} z-50 w-[94%] sm:w-[420px] h-[590px] max-h-[85vh] rounded-3xl bg-[#08080c]/98 border border-zinc-800/90 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden backdrop-blur-xl`}
            style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
          >
            {/* Deep elegant header */}
            <div className="p-4 bg-zinc-950/90 border-b border-zinc-900/60 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="relative flex -space-x-1.5">
                  <div className="h-9 w-9 rounded-full border border-amber-500/50 overflow-hidden bg-zinc-950 z-10 shadow-lg">
                    <img src={osamaRealImg} alt="Osama E." className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="h-9 w-9 rounded-full border border-teal-500/50 overflow-hidden bg-zinc-950 translate-x-1 shadow-lg">
                    <img src={alhussienAvatarImg} alt="Alhussien" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div>
                  <div>
                    <span className="text-xs font-black text-white tracking-wide">OSERA System Co-pilot</span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse mt-0.5 inline-block ml-1"></span>
                  </div>
                  <span className="text-[9px] text-amber-400 uppercase font-mono tracking-widest block mt-0.5">
                    {lang === "ar" ? "التحقق المعماري والمحافظ البرمجية" : "Technical Lead & Account Hub"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button 
                  onClick={onClose}
                  className="p-1.5 rounded-xl hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Luxurious Inner 3D Tabs Selector to Hook Client */}
            <div className="grid grid-cols-3 p-1.5 bg-zinc-950 border-b border-zinc-900 text-[11px] font-sans font-black uppercase text-center shrink-0">
              <button
                onClick={() => setActiveTab("chat")}
                className={`py-1.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "chat" 
                    ? "bg-gradient-to-r from-amber-950/80 to-zinc-950/80 text-amber-400 border border-amber-800/30 shadow-[inset_0_1px_4px_rgba(201,168,76,0.15)]" 
                    : "text-zinc-550 hover:text-zinc-350"
                }`}
              >
                <Sparkles className="h-3 w-3" />
                <span>{lang === "ar" ? "مستشار الذكاء" : "Advisory"}</span>
              </button>

              <button
                onClick={() => setActiveTab("portfolio")}
                className={`py-1.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "portfolio" 
                    ? "bg-gradient-to-r from-amber-950/80 to-zinc-950/80 text-amber-400 border border-amber-800/30 shadow-[inset_0_1px_4px_rgba(201,168,76,0.15)]" 
                    : "text-zinc-550 hover:text-zinc-350"
                }`}
              >
                <Laptop className="h-3 w-3" />
                <span>{lang === "ar" ? "خوادم حية" : "Live Apps"}</span>
              </button>

              <button
                onClick={() => setActiveTab("contact")}
                className={`py-1.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "contact" 
                    ? "bg-gradient-to-r from-amber-950/80 to-zinc-950/80 text-amber-400 border border-amber-800/30 shadow-[inset_0_1px_4px_rgba(201,168,76,0.15)]" 
                    : "text-zinc-550 hover:text-zinc-350"
                }`}
              >
                <Phone className="h-3 w-3" />
                <span>{lang === "ar" ? "قنوات التواصل" : "Contact"}</span>
              </button>
            </div>

            {/* Dynamic Viewport Container */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gradient-to-b from-[#060609]/40 to-[#0e0e15]/65">
              
              {/* TAB 1: AI Chat Assistant with interactive inputs */}
              {activeTab === "chat" && (
                <div ref={scrollRef} className="space-y-4 font-sans text-xs pb-2 scroll-smooth">
                  {messages.map((msg, i) => {
                    const isModel = msg.role === "model";
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2.5 ${isModel ? "justify-start" : "justify-end"}`}
                      >
                        {isModel && (
                          <div className="h-6 w-6 rounded-full bg-amber-950 border border-amber-500/30 flex items-center justify-center shrink-0">
                            <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
                          </div>
                        )}
                        <div
                          className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-relaxed break-words relative overflow-hidden border ${
                            isModel
                              ? "bg-zinc-950/40 border-slate-900/60 text-zinc-200"
                              : "bg-gradient-to-r from-amber-950/50 to-zinc-950/15 border-amber-900/40 text-amber-150"
                          }`}
                        >
                          {msg.text.split("\n\n").map((para, pIdx) => (
                            <p key={pIdx} className={pIdx > 0 ? "mt-2" : ""}>
                              {para}
                            </p>
                          ))}
                        </div>
                        {!isModel && (
                          <div className="h-6 w-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                            <User className="h-3 w-3 text-zinc-400" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {isLoading && (
                    <div className="flex gap-2.5 justify-start">
                      <div className="h-6 w-6 rounded-full bg-amber-950 border border-amber-500/30 flex items-center justify-center shrink-0">
                        <Sparkles className="h-3 w-3 text-amber-450 animate-spin" />
                      </div>
                      <div className="px-3.5 py-2.5 rounded-2xl bg-zinc-950/40 border border-slate-900/80 text-zinc-400 flex items-center gap-2">
                        <RefreshCw className="h-3 w-3 animate-spin text-amber-400" />
                        <span>{lang === "ar" ? "يتدفق من عقل الاستشاري الرقمي..." : "Formatting solution guidance..."}</span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="flex gap-2 justify-center">
                      <div className="bg-red-910/20 border border-red-900/30 text-red-400 px-3 py-2 rounded-xl text-[10px] flex items-center gap-1.5 w-full">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{error}</span>
                      </div>
                    </div>
                  )}

                  {/* Suggestion Quick Chips (Only displayed if conversation is starting) */}
                  {messages.length < 3 && (
                    <div className="pt-4 border-t border-zinc-900/40 space-y-2">
                      <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block">
                        {lang === "ar" ? "مسارات فحص واقتراح سريعة:" : "Dynamic Queries:"}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {suggestChips.map((preset, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(preset)}
                            className="px-2.5 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-left border border-zinc-900 text-[10px] text-zinc-400 hover:text-amber-300 transition-all duration-200 cursor-pointer block truncate max-w-full"
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Live Portfolio Apps ("خوادم حية" - High professionalism to pull clients) */}
              {activeTab === "portfolio" && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#09090d]/80 border border-amber-500/15 text-center mb-1">
                    <Award className="h-5 w-5 text-amber-450 mx-auto mb-1.5 animate-bounce" />
                    <h5 className="font-black text-white uppercase text-xs tracking-wider">
                      {lang === "ar" ? "منصات ومشاريع إنتاج حية" : "Live Production Portfolio"}
                    </h5>
                    <p className="text-[9px] text-zinc-400 max-w-xs mx-auto leading-relaxed mt-1">
                      {lang === "ar" 
                        ? "أنظمة وتطبيقات متكاملة تم تطويرها وهيكلتها لصالح شركات كبرى لخدمة الآلاف يومياً بكل ثبات وهيكليات معتمدة." 
                        : "Distributed systems and optimized frameworks engineered for global reach, operating securely with high availability."}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {portfolioProjects.map((p, idx) => (
                      <motion.a
                        key={idx}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.01, y: -2 }}
                        className="block p-3 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900/70 border border-zinc-900 hover:border-amber-500/30 transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[9px] font-mono text-amber-450 uppercase font-black bg-amber-950/40 px-2 py-0.5 rounded-md">
                              {p.category}
                            </span>
                            <h6 className="font-extrabold text-white text-[12px] mt-1.5 group-hover:text-amber-400 transition-colors">
                              {p.title}
                            </h6>
                            <p className="text-[10px] text-zinc-450 leading-relaxed mt-1">
                              {lang === "ar" ? p.desc_ar : p.desc_en}
                            </p>
                          </div>
                          <div className="h-7 w-7 rounded-lg bg-zinc-900 group-hover:bg-amber-950 flex items-center justify-center text-zinc-500 group-hover:text-amber-400 transition-colors border border-zinc-800 shrink-0">
                            <ExternalLink className="h-3 w-3" />
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Strategic Connect Node & Payment retainer (direct billing, social metrics) */}
              {activeTab === "contact" && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#09090d]/80 border border-emerald-500/15 text-center mb-1">
                    <Zap className="h-5 w-5 text-emerald-405 mx-auto mb-1.5 animate-pulse" />
                    <h5 className="font-black text-white uppercase text-xs tracking-wider">
                      {lang === "ar" ? "قنوات التواصل وبدء التعاقد" : "Strategic Channels & Retainers"}
                    </h5>
                    <p className="text-[9px] text-zinc-400 max-w-xs mx-auto leading-relaxed mt-1">
                      {lang === "ar" 
                        ? "ابدأ تواصلك المباشر مع أسامة إسماعيل، أو اكفل حجز مكانك للمشروع مسبقاً عبر حساب بايبال الرسمي المعتمد." 
                        : "Secure instantly scheduled milestones, review social verification logs, or check secure digital gateways."}
                    </p>
                  </div>

                  <div className="grid gap-2">
                    {contactLinks.map((c, idx) => (
                      <motion.a
                        key={idx}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.01 }}
                        className={`flex items-center justify-between p-3 rounded-2xl bg-zinc-950/60 border border-zinc-900/80 transition-all duration-300 group cursor-pointer ${c.bg}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-zinc-900 text-zinc-400 group-hover:text-white transition-colors flex items-center justify-center border border-zinc-800 shrink-0">
                            {c.icon}
                          </div>
                          <div>
                            <h6 className="font-extrabold text-zinc-100 text-[11px] group-hover:text-white transition-colors">
                              {c.name}
                            </h6>
                            <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">
                              {c.val}
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-zinc-500 group-hover:text-amber-400 transition-colors uppercase bg-zinc-900 px-2 py-1 rounded-lg">
                          {c.lbl}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Input form - ONLY visible when "chat" tab is selected, otherwise we show a beautiful action footer */}
            {activeTab === "chat" ? (
              <div className="flex flex-col border-t border-zinc-900/60 bg-zinc-950/95">
                <form 
                  onSubmit={handleFormSubmit}
                  className="p-3 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      lang === "ar"
                        ? (customPlaceholderAr || "اكتب استفسارك التقني هنا...")
                        : (customPlaceholderEn || "Ask about backend architectures, N+1...")
                    }
                    disabled={isLoading}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold rounded-xl transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                  >
                    <Send className="h-4.5 w-4.5" />
                  </button>
                </form>

                {/* Fixed Conversion Action Buttons */}
                <div className="px-3 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
                  <a 
                    href={`${waLink}?text=${encodeURIComponent(lang === 'ar' ? 'أهلاً م. أسامة، أريد طلب تسعير وتفاصيل عن مشروع جديد...' : 'Hello Osama, I want to request pricing for a new project...')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-450 border border-amber-500/30 rounded-lg px-2 py-1.5 text-[10px] font-bold transition-colors whitespace-nowrap"
                  >
                    <Phone className="h-3 w-3" />
                    {lang === "ar" ? "طلب تسعير (واتساب)" : "Request Quote (WA)"}
                  </a>
                  <a 
                    href={`${waLink}?text=${encodeURIComponent(lang === 'ar' ? 'أهلاً م. أسامة، أريد التواصل بخصوص عمل أو مشروع...' : 'Hello Osama, I want to contact you regarding business or projects...')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600 rounded-lg px-2 py-1.5 text-[10px] font-bold transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="h-3 w-3" />
                    {lang === "ar" ? "تواصل مباشر" : "Direct Contact"}
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-zinc-950/95 border-t border-zinc-900/60 flex items-center justify-between text-[10px] text-zinc-500 shrink-0 select-none">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3 text-amber-500" />
                  <span>{lang === "ar" ? "منظومة مؤمنة بالكامل" : "Fully Secure Layer"}</span>
                </span>
                <span className="font-mono">
                  {lang === "ar" ? "أوسيرا © ٢٠٢٦" : "OSERA SYSTEMS © 2026"}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
