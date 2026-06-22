import { CaseStudy, ServiceDetail } from "./types";

export const services: ServiceDetail[] = [
  {
    id: "django",
    title: "Django & Python Engineering",
    description: "Architecting elite backends with robust scalability and defensive coding strategies.",
    iconName: "Terminal",
    colorAccent: "gold",
    bulletPoints: [
      "Custom RESTful & GraphQL API layout (Django REST Framework)",
      "N+1 query eradication via rigorous ORM database tuning",
      "Asynchronous tasks with Celery, Redis, and RabbitMQ",
      "Comprehensive unit and integration testing setups (pytest, coverage)",
      "Strict security posture: SQLi, XSS, and CSRF robust hardening"
    ]
  },
  {
    id: "ecommerce",
    title: "Enterprise E-Commerce Systems",
    description: "Designing high-conversion transactional architectures with near-zero latency.",
    iconName: "ShoppingBag",
    colorAccent: "platinum",
    bulletPoints: [
      "Tailored checkout engines designed to support surges in traffic",
      "Granular multi-tiered inventory and warehouse sync APIs",
      "Flawless multi-provider gateways with automated reconciliation",
      "Scalable multi-tenant vendor management administration panels",
      "Full analytics telemetry, cart abandonment hooks and metrics trackers"
    ]
  },
  {
    id: "mobile",
    title: "Sleek iOS & Android Mobile Apps",
    description: "Developing responsive native and cross-platform apps linked to robust backends.",
    iconName: "Smartphone",
    colorAccent: "gold",
    bulletPoints: [
      "Offline-first mobile synchronization strategies",
      "Fluid tactile gestures and motion transitions",
      "Fast native capabilities (Biometrics, Push Notifications, Bluetooth)",
      "Optimized localized memory models and lightweight storage hooks",
      "Automated Play Store & App Store deployment pipelines"
    ]
  },
  {
    id: "custom",
    title: "Custom SaaS & Cloud Systems",
    description: "Crafting bespoke administrative tools and analytics engines built from your business requirements.",
    iconName: "Cpu",
    colorAccent: "platinum",
    bulletPoints: [
      "Scalable database models (PostgreSQL, Redis, Elasticsearch)",
      "Robust role-based permission grids with activity logs",
      "Secure OAuth and Single Sign-On (SSO) integrations",
      "Real-time reactive visual reporting and analytics",
      "Self-healing cloud infrastructure layouts ready to scale"
    ]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: "kerotrade",
    title: "Premium Financial Trading LMS & Analytics Platform",
    client: "Kero Trade",
    industry: "E-Learning & Financial",
    category: "custom",
    metric: "100%",
    metricLabel: "Video Protection",
    description: "Developed a premium, dual-language (AR/EN) trading LMS. Engineered a secure video streaming player integrating Bunny CDN (HLS) with dynamic watermark overlays to prevent piracy. Implemented a high-performance MongoDB backend and custom admin panel.",
    deliverables: ["Next.js Full-Stack", "Bunny CDN Integration", "MongoDB Backend", "Secure Auth & Watermarks"],
    tags: ["Next.js", "Bunny CDN", "MongoDB", "Tailwind CSS", "Framer Motion"],
    imageUrl: "/portfolio/kerotrade.png"
  },
  {
    id: "alisthome",
    title: "Platform Overhaul: Dynamic Pricing & Ecosystem",
    client: "A-List Home Pros",
    industry: "Home Services & Contracting",
    category: "custom",
    metric: "100%",
    metricLabel: "SEO & Production Score",
    description: "Modernized a South Florida contractor matching platform. Replaced static pages with a responsive, high-end 3-tier membership system featuring custom Framer Motion animations and direct Stripe checkout integrations.",
    deliverables: ["Next.js 15 Migration", "Stripe Checkout", "3-Tier Membership", "SEO & Metadata Tuning"],
    tags: ["Next.js", "React", "Tailwind CSS", "Stripe", "SEO Optimization"],
    imageUrl: "/portfolio/alisthome.png"
  },
  {
    id: "rsn",
    title: "Next.js & Supabase Event Management Platform",
    client: "RSN Alarabiya",
    industry: "Crowd Management & Security",
    category: "custom",
    metric: "High",
    metricLabel: "Security & Performance",
    description: "Developed a premium, high-performance web application for a leading crowd management firm in Saudi Arabia. Designed fully responsive service grids with dynamic routing and managed Supabase Row-Level Security (RLS) policies.",
    deliverables: ["Supabase Integration", "Row-Level Security (RLS)", "Dynamic Routing", "Database Migrations"],
    tags: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "React"],
    imageUrl: "/portfolio/rsn.png"
  }
];

export const defaultPythonSnippet = `# Help standard Django ORM avoid the N+1 query issue
# and optimize this slow API endpoint!

from django.http import JsonResponse
from .models import Order

def slow_order_list(request):
    # This loop triggers a query for EACH order's customer and address!
    orders = Order.objects.filter(status='completed')
    data = []
    
    for order in orders:
        data.append({
            'order_id': order.id,
            'amount': order.total_amount,
            
            # CRITICAL SLOWDOWN:
            'customer_name': order.customer.name, 
            'shipping_address': order.address.street_line
        })
        
    return JsonResponse({'orders': data})`;
