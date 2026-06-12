import { CaseStudy, ServiceDetail } from "./types";

export const services: ServiceDetail[] = [
  {
    id: "django",
    title: "Django & Python Engineering",
    description: "Architecting elite backends with robust scalability and defensive coding strategies.",
    iconName: "Terminal",
    colorAccent: "cyan",
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
    colorAccent: "blue",
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
    colorAccent: "purple",
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
    colorAccent: "violet",
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
    id: "logistics",
    title: "Enterprise Food Logistics API Engine",
    client: "Delivora Inc.",
    industry: "Logistics & Supply Chain",
    category: "django",
    metric: "1.2M+",
    metricLabel: "Daily API Calls Handled",
    description: "A total overhaul of a legacy PHP backend into a high-concurrency Python/Django ecosystem. Standardized database connections, removed slow joins, and configured Celery tasks for path optimizations.",
    deliverables: ["Django Core upgrade", "PostgreSQL query isolation", "Celery Task Scheduler", "Dockerized cluster setup"],
    tags: ["Django REST", "Postgres", "Redis", "Celery", "AWS Cluster"]
  },
  {
    id: "ecommerce-b2b",
    title: "High-Traffic Fashion Multi-Vendor E-Commerce",
    client: "Velvett Luxury",
    industry: "E-Commerce & Retail",
    category: "ecommerce",
    metric: "2.1s",
    metricLabel: "Global Checkout TTFB",
    description: "Designed a lightweight custom checkout portal with integrated global payment gateways. Handled severe traffic spikes during flash sales by shifting state cache variables to Redis and indexing active database queries.",
    deliverables: ["Custom Cart Management Engine", "Stripe API Integration", "Redis session structures", "Admin Dashboard UI"],
    tags: ["React SPA", "Django Backend", "Redis Cache", "Tailwind CSS", "Stripe API"]
  },
  {
    id: "agritech",
    title: "Offline-First Mobile Farm Survey Application",
    client: "Arable Growers Ltd.",
    industry: "Agriculture Technology",
    category: "mobile",
    metric: "100%",
    metricLabel: "Sync Accuracy in No-Cell Zones",
    description: "Built a robust mobile tracking companion designed to handle continuous disconnects. Captured soil surveys, mapped boundaries with native GPS, and completed automatic background synching when network is recovered.",
    deliverables: ["Offline SQLite indexing", "Network synchronization queue", "Custom SVG mapping", "Multi-language companion"],
    tags: ["React Native", "SQLite Store", "Django sync API", "GeoJson Assets", "Auth0 Integration"]
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
