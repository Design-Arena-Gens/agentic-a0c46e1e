'use client';

import { useState } from 'react';
import { ContentProject, AgentRole } from '../types';

export default function ContentGenerator() {
  const [topic, setTopic] = useState('');
  const [videoType, setVideoType] = useState<'educational' | 'entertainment' | 'tutorial' | 'review'>('educational');
  const [duration, setDuration] = useState<'short' | 'medium' | 'long'>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentRole, setCurrentRole] = useState<AgentRole | null>(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ContentProject | null>(null);

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

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setProgress(0);
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, videoType, duration })
      });

      if (!response.ok) throw new Error('Generation failed');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6));

              if (data.role) {
                setCurrentRole(data.role);
              }
              if (data.progress !== undefined) {
                setProgress(data.progress);
              }
              if (data.result) {
                setResult(data.result);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
      setCurrentRole(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-youtube-gray rounded-lg p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Generate YouTube Content</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Video Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your video topic (e.g., 'Benefits of Mediterranean Diet')"
              className="w-full px-4 py-3 bg-youtube-dark border border-gray-600 rounded-lg focus:outline-none focus:border-youtube-red text-white"
              disabled={isGenerating}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Video Type</label>
              <select
                value={videoType}
                onChange={(e) => setVideoType(e.target.value as any)}
                className="w-full px-4 py-3 bg-youtube-dark border border-gray-600 rounded-lg focus:outline-none focus:border-youtube-red text-white"
                disabled={isGenerating}
              >
                <option value="educational">Educational</option>
                <option value="entertainment">Entertainment</option>
                <option value="tutorial">Tutorial</option>
                <option value="review">Review</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as any)}
                className="w-full px-4 py-3 bg-youtube-dark border border-gray-600 rounded-lg focus:outline-none focus:border-youtube-red text-white"
                disabled={isGenerating}
              >
                <option value="short">Short (5-8 min)</option>
                <option value="medium">Medium (10-15 min)</option>
                <option value="long">Long (20-30 min)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className="w-full bg-youtube-red hover:bg-red-600 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
          >
            {isGenerating ? 'Generating...' : 'Generate Complete Content Package'}
          </button>
        </div>

        {isGenerating && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">AI Agent Working...</span>
              <span className="text-youtube-red font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-youtube-dark rounded-full h-2">
              <div
                className="bg-youtube-red h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            {currentRole && (
              <div className="flex items-center space-x-3 p-4 bg-youtube-dark rounded-lg">
                <div className="w-2 h-2 bg-youtube-red rounded-full animate-pulse" />
                <span className="text-sm">
                  <span className="text-gray-400">Active Role:</span>{' '}
                  <span className="text-white font-medium">{currentRole}</span>
                </span>
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-xl font-bold mb-4 text-youtube-red">Content Package Generated</h3>

              <div className="space-y-4">
                <div className="bg-youtube-dark p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm text-gray-400">Video Title</h4>
                  <p className="text-lg">{result.title}</p>
                </div>

                <div className="bg-youtube-dark p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm text-gray-400">SEO Description</h4>
                  <p className="text-sm text-gray-300">{result.description}</p>
                </div>

                <div className="bg-youtube-dark p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm text-gray-400">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-youtube-dark p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm text-gray-400">Full Script</h4>
                  <div className="max-h-64 overflow-y-auto text-sm text-gray-300 whitespace-pre-wrap">
                    {result.script}
                  </div>
                </div>

                <div className="bg-youtube-dark p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm text-gray-400">Thumbnail Strategy</h4>
                  <p className="text-sm text-gray-300 mb-3">{result.thumbnailStrategy}</p>
                  <div className="bg-gray-700 p-3 rounded text-xs font-mono">
                    {result.thumbnailPrompt}
                  </div>
                </div>

                <div className="bg-youtube-dark p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm text-gray-400">Video Production Prompts</h4>
                  <div className="space-y-2">
                    {result.videoPrompts.map((prompt, idx) => (
                      <div key={idx} className="bg-gray-700 p-3 rounded">
                        <p className="text-xs text-gray-400 mb-1">Scene {idx + 1}</p>
                        <p className="text-sm">{prompt}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-youtube-dark p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm text-gray-400">Research & Facts</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {result.researchNotes.map((note, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-youtube-red mr-2">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-youtube-dark p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm text-gray-400">Audience Insights</h4>
                  <p className="text-sm text-gray-300">{result.audienceInsights}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `youtube-content-${Date.now()}.json`;
                  a.click();
                }}
                className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Download Complete Package (JSON)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
