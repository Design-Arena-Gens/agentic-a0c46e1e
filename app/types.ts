export type AgentRole =
  | 'Research Analyst'
  | 'Health Fact Checker'
  | 'Script Writer'
  | 'SEO & Title Expert'
  | 'Thumbnail Strategist'
  | 'Image Prompt Engineer'
  | 'Video Prompt Engineer'
  | 'Audience Psychologist';

export interface ContentProject {
  id: string;
  topic: string;
  title: string;
  description: string;
  tags: string[];
  script: string;
  thumbnailStrategy: string;
  thumbnailPrompt: string;
  videoPrompts: string[];
  researchNotes: string[];
  audienceInsights: string;
  createdAt: string;
  videoType: 'educational' | 'entertainment' | 'tutorial' | 'review';
  duration: 'short' | 'medium' | 'long';
}

export interface GenerationRequest {
  topic: string;
  videoType: 'educational' | 'entertainment' | 'tutorial' | 'review';
  duration: 'short' | 'medium' | 'long';
}
