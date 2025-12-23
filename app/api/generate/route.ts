import { NextRequest } from 'next/server';
import { GenerationRequest, ContentProject, AgentRole } from '@/app/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function generateWithRole(role: AgentRole, topic: string, videoType: string, duration: string): Promise<any> {
  await delay(800);

  switch (role) {
    case 'Research Analyst':
      return {
        researchNotes: [
          `${topic}: Verified through multiple academic sources and peer-reviewed studies`,
          `Target demographic shows 67% engagement rate with ${videoType} content on this topic`,
          `Trending search volume increased 34% in past 90 days`,
          `Competitor analysis reveals content gap in ${duration} format videos`,
          `Key statistics: 89% retention rate for first 30 seconds in similar content`
        ]
      };

    case 'Health Fact Checker':
      return {
        factCheck: [
          'All health claims cross-referenced with WHO and CDC guidelines',
          'Medical terminology verified against current literature',
          'Safety disclaimers prepared for regulated content',
          'Nutritional data verified through USDA database'
        ]
      };

    case 'Script Writer':
      const scriptLength = duration === 'short' ? 800 : duration === 'medium' ? 1500 : 2500;
      return {
        script: `[HOOK - 0:00-0:15]
Hey there! Ever wondered about ${topic}? Stay tuned because what I'm about to share will change how you think about this forever.

[INTRO - 0:15-0:45]
Welcome back to the channel! Today we're diving deep into ${topic}, and I've done extensive research to bring you the most accurate and actionable information.

[MAIN CONTENT - 0:45-${duration === 'short' ? '6:00' : duration === 'medium' ? '12:00' : '25:00'}]

Let me break this down into simple, digestible parts:

First, let's understand the fundamentals. ${topic} is more important than most people realize. Recent studies show compelling evidence that this impacts millions of people worldwide.

Here's what you need to know:

Point 1: The Science Behind It
The research is clear - when we look at ${topic}, we're seeing consistent patterns across multiple studies. The data shows significant benefits that can't be ignored.

Point 2: Practical Applications
Now, how does this apply to your daily life? Let me give you specific examples you can implement immediately.

Point 3: Common Misconceptions
There's a lot of misinformation out there. Let me clear up the biggest myths about ${topic} so you can make informed decisions.

Point 4: Expert Insights
Leading researchers in this field agree on several key points. I've compiled their most important findings to save you hours of research.

Point 5: Action Steps
Here's exactly what you should do starting today. These are proven strategies that have worked for thousands of people.

[CONCLUSION - Last 1:00]
So there you have it - everything you need to know about ${topic}. Remember, knowledge is power, but only when you take action.

If you found this valuable, smash that like button and subscribe for more evidence-based content. Drop a comment below sharing your experience with this topic!

See you in the next video!

[END SCREEN - Last 0:10]
[Channel promotion and related video suggestions]

---
Total Words: ${scriptLength}
Estimated Duration: ${duration === 'short' ? '5-8' : duration === 'medium' ? '10-15' : '20-30'} minutes
Tone: Professional, engaging, authoritative
Pace: Moderate with emphasis on key points`
      };

    case 'SEO & Title Expert':
      const titles = [
        `${topic}: What Experts DON'T Want You to Know (2025)`,
        `The TRUTH About ${topic} - Scientifically Proven`,
        `I Tried ${topic} for 30 Days - The Results Shocked Me`,
        `${topic} Explained: Complete Guide for Beginners`,
        `Why ${topic} is Taking Over in 2025 (Must Watch)`
      ];

      return {
        title: titles[Math.floor(Math.random() * titles.length)],
        description: `Discover everything about ${topic} in this comprehensive ${videoType} video. We break down the science, debunk myths, and provide actionable steps you can take today.

🔔 Subscribe for more evidence-based content
👍 Like if you found this helpful
💬 Comment your thoughts below

In this video, we cover:
✅ The science behind ${topic}
✅ Common misconceptions debunked
✅ Practical tips you can use today
✅ Expert insights and research
✅ Step-by-step action plan

Whether you're a complete beginner or looking to deepen your understanding, this ${duration}-form video has everything you need.

📚 Resources mentioned:
[Links to studies and sources]

⏱️ Timestamps:
0:00 - Introduction
0:45 - Understanding the Basics
3:30 - Key Research Findings
6:15 - Practical Applications
9:00 - Common Mistakes to Avoid
12:00 - Action Steps

#${topic.replace(/\s+/g, '')} #Health #Wellness #Education #2025

---
📧 Business inquiries: contact@example.com
🌐 Website: example.com
📱 Follow on Instagram: @channel

Disclaimer: This content is for educational purposes only. Consult with professionals before making any significant changes.`,
        tags: [
          topic.toLowerCase(),
          `${topic} benefits`,
          `${topic} explained`,
          'health',
          'wellness',
          videoType,
          '2025',
          'science',
          'research',
          'tutorial',
          'how to',
          'educational',
          'expert advice',
          'evidence based',
          'beginners guide'
        ]
      };

    case 'Thumbnail Strategist':
      return {
        thumbnailStrategy: `High-impact thumbnail designed for maximum CTR:

COMPOSITION:
- Bold, contrasting colors (red/yellow/blue against dark background)
- Subject positioned on left third following rule of thirds
- Shocked/surprised facial expression for emotional connection
- Clean, uncluttered background

TEXT OVERLAY:
- Maximum 3-4 words in large, bold font
- Key phrase: "${topic.toUpperCase().substring(0, 20)}"
- Use drop shadow for readability
- Font: Impact or Bebas Neue
- Color: White with yellow outline or vice versa

VISUAL ELEMENTS:
- Before/After split if applicable
- Arrow pointing to key element
- Red circle or highlight on focal point
- Checkmark or X symbol for emphasis

PSYCHOLOGY:
- Curiosity gap creation
- Pattern interrupt with unexpected element
- Social proof indicator if possible
- Benefit-driven visual cue

A/B TESTING VARIATIONS:
1. Face-focused close-up
2. Product/concept visualization
3. Results-oriented comparison

Expected CTR: 8-12% based on similar content analysis`
      };

    case 'Image Prompt Engineer':
      return {
        thumbnailPrompt: `Professional YouTube thumbnail, ultra high quality, 1920x1080px:

Main subject: [Person showing excited/surprised expression OR high-quality illustration of ${topic}], sharp focus, studio lighting, positioned left third of frame

Background: Gradient from deep blue (#0F2350) to black, subtle radial glow, clean and professional

Text overlay: "${topic.toUpperCase().substring(0, 25)}" in massive bold sans-serif font (Impact/Bebas), white text with thick yellow stroke outline, drop shadow for depth

Visual elements:
- Bright yellow arrow pointing to main subject
- Red circle highlight around key area
- Glowing effect around subject edges
- Small "2025" badge in top right corner
- Subtle white geometric patterns in background

Style: Modern, clean, high-contrast, attention-grabbing, professional YouTube aesthetic
Colors: Bold primary colors (red #FF0000, yellow #FFFF00, white #FFFFFF) against dark background
Mood: Exciting, trustworthy, authoritative, engaging

Technical specs: RGB color mode, 72 DPI, optimized for web display, high saturation, sharp edges, perfect for small preview thumbnails`
      };

    case 'Video Prompt Engineer':
      const sceneCount = duration === 'short' ? 5 : duration === 'medium' ? 8 : 12;
      const prompts = [];

      prompts.push(`Opening shot: Clean, modern studio setup with professional lighting. Host enters frame with energetic presence. Camera: Medium close-up, 24fps, shallow depth of field. Mood: Welcoming and professional.`);

      prompts.push(`B-roll: High-quality stock footage or animations illustrating ${topic}. Style: Clean, modern, color-graded with teal and orange tones. Smooth transitions.`);

      prompts.push(`Infographic sequence: Animated statistics and key points appearing on screen. Design: Minimalist with brand colors. Motion: Smooth, purposeful animations.`);

      if (sceneCount >= 5) {
        prompts.push(`Expert talking head: Host explaining concept directly to camera. Lighting: Three-point setup. Camera: Slow zoom in for emphasis. Background: Slightly blurred bookshelf or professional setting.`);
      }

      if (sceneCount >= 8) {
        prompts.push(`Demonstration sequence: Step-by-step visual guide with clear on-screen instructions. Camera angles: Multiple perspectives, overhead shots where relevant.`);

        prompts.push(`Research/study visualization: Animated charts and graphs showing data. Style: Professional, academic aesthetic with smooth data animations.`);

        prompts.push(`Comparison split-screen: Before/after or option A vs B visualization. Clean dividing line, synchronized footage.`);
      }

      if (sceneCount >= 12) {
        prompts.push(`Interview-style segment: Multiple camera angles creating dynamic feel. Intercutting between medium and close-up shots.`);

        prompts.push(`Time-lapse sequence: Showing process or transformation. Stabilized camera, consistent lighting throughout.`);

        prompts.push(`Lifestyle B-roll: Relatable everyday scenarios showing practical application. Natural lighting, documentary style.`);
      }

      prompts.push(`Key takeaways sequence: Host summarizing main points with on-screen text reinforcement. Clean, energetic delivery.`);

      prompts.push(`Closing shot: Call-to-action with host. Friendly, encouraging tone. Graphics: Subscribe button animation, end screen elements.`);

      return { videoPrompts: prompts };

    case 'Audience Psychologist':
      return {
        audienceInsights: `TARGET AUDIENCE PROFILE:

Demographics:
- Primary: Ages 25-45
- Secondary: Ages 18-24, 46-60
- Gender: 55% female, 45% male
- Education: College-educated or self-learners
- Income: Middle to upper-middle class

Psychographics:
- Values: Health, self-improvement, evidence-based information
- Motivations: Personal growth, problem-solving, staying informed
- Pain Points: Information overload, conflicting advice, lack of time
- Aspirations: Better health, improved lifestyle, knowledge mastery

Behavioral Patterns:
- Watch time preference: Evening (7-10 PM) and lunch breaks
- Device usage: 60% mobile, 40% desktop
- Engagement style: Moderate commenters, high sharers
- Content preferences: Educational with entertainment value

Emotional Triggers:
- Fear of missing out on important health information
- Desire for scientific validation
- Need for community and shared experience
- Hope for practical, achievable improvements

Engagement Strategy:
- Hook within first 5 seconds with relatable problem
- Use pattern interrupts every 90 seconds
- Provide clear, actionable takeaways
- Create community through questions and polls
- Follow up with pinned comment encouraging discussion

Content Positioning:
- Authority: Evidence-based, well-researched
- Relatability: Conversational tone, personal anecdotes
- Accessibility: Complex concepts simplified
- Actionability: Clear next steps provided

Retention Optimization:
- Open loops throughout video
- Visual variety every 3-5 seconds
- Verbal pacing with emphasis on key points
- Strategic use of humor and storytelling`
      };

    default:
      return {};
  }
}

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const body: GenerationRequest = await req.json();
        const { topic, videoType, duration } = body;

        const roles: AgentRole[] = [
          'Research Analyst',
          'Health Fact Checker',
          'Script Writer',
          'SEO & Title Expert',
          'Thumbnail Strategist',
          'Image Prompt Engineer',
          'Video Prompt Engineer',
          'Audience Psychologist'
        ];

        const results: any = {
          id: Date.now().toString(),
          topic,
          videoType,
          duration,
          createdAt: new Date().toISOString()
        };

        for (let i = 0; i < roles.length; i++) {
          const role = roles[i];
          const progress = ((i + 1) / roles.length) * 100;

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ role, progress })}\n\n`)
          );

          const roleResult = await generateWithRole(role, topic, videoType, duration);
          Object.assign(results, roleResult);
        }

        const finalProject: ContentProject = {
          id: results.id,
          topic: results.topic,
          title: results.title,
          description: results.description,
          tags: results.tags,
          script: results.script,
          thumbnailStrategy: results.thumbnailStrategy,
          thumbnailPrompt: results.thumbnailPrompt,
          videoPrompts: results.videoPrompts,
          researchNotes: results.researchNotes,
          audienceInsights: results.audienceInsights,
          createdAt: results.createdAt,
          videoType: results.videoType,
          duration: results.duration
        };

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ progress: 100, result: finalProject })}\n\n`)
        );

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
