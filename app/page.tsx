'use client';

import { useState } from 'react';
import ContentGenerator from './components/ContentGenerator';
import ProjectHistory from './components/ProjectHistory';
import AgentStatus from './components/AgentStatus';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate');

  return (
    <div className="min-h-screen">
      <header className="bg-youtube-gray border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-youtube-red">YT-A2Z</h1>
              <p className="text-gray-400 text-sm mt-1">Autonomous YouTube Content Creation AI</p>
            </div>
            <AgentStatus />
          </div>
        </div>
      </header>

      <nav className="bg-youtube-gray border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'generate'
                  ? 'text-youtube-red border-b-2 border-youtube-red'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Content Generator
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-youtube-red border-b-2 border-youtube-red'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Project History
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'generate' ? <ContentGenerator /> : <ProjectHistory />}
      </main>

      <footer className="bg-youtube-gray border-t border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
          <p>YT-A2Z - Professional YouTube Content Creation AI Agent</p>
          <p className="mt-2">Script Writing • Research • SEO • Thumbnails • Video Production</p>
        </div>
      </footer>
    </div>
  );
}
