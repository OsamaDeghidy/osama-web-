export interface BlueprintRequest {
  requirements: string;
  projectType: string;
  budget: string;
  timeline: string;
}

export interface BlueprintPhase {
  phase: string;
  duration: string;
  deliverables: string[];
}

export interface RecommendedStack {
  frontend: string;
  backend: string;
  infrastructure: string;
}

export interface BlueprintResponse {
  projectTitle: string;
  recommendedStack: RecommendedStack;
  architectureHighlights: string[];
  timelinePhases: BlueprintPhase[];
  expertAdvice: string;
  estimatedComplexity: string;
  error?: string;
}

export interface DjangoOptimizeRequest {
  codeSnippet: string;
  description: string;
}

export interface DjangoOptimizeResponse {
  rating: number;
  issues: string[];
  optimizedCode: string;
  explanation: string;
  error?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: "django" | "ecommerce" | "mobile" | "custom";
  metric: string;
  metricLabel: string;
  description: string;
  deliverables: string[];
  tags: string[];
  imageUrl?: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  iconName: string;
  bulletPoints: string[];
  colorAccent: string;
}
