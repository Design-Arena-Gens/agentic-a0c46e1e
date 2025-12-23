'use client';

import { useState, useEffect } from 'react';
import { ContentProject } from '../types';
import { format } from 'date-fns';

export default function ProjectHistory() {
  const [projects, setProjects] = useState<ContentProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<ContentProject | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const stored = localStorage.getItem('yt-a2z-projects');
    if (stored) {
      setProjects(JSON.parse(stored));
    }
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('yt-a2z-projects', JSON.stringify(updated));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-youtube-gray rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Saved Projects</h2>

            {projects.length === 0 ? (
              <p className="text-gray-400 text-sm">No projects yet. Generate your first content!</p>
            ) : (
              <div className="space-y-2">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedProject?.id === project.id
                        ? 'bg-youtube-red'
                        : 'bg-youtube-dark hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <h3 className="font-medium text-sm line-clamp-2">{project.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(project.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedProject ? (
            <div className="bg-youtube-gray rounded-lg p-6 shadow-xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Created {format(new Date(selectedProject.createdAt), 'MMMM d, yyyy')}
                  </p>
                </div>
                <button
                  onClick={() => deleteProject(selectedProject.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-youtube-dark p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm text-gray-400">Description</h4>
                  <p className="text-sm text-gray-300">{selectedProject.description}</p>
                </div>

                <div className="bg-youtube-dark p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm text-gray-400">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-youtube-dark p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm text-gray-400">Script</h4>
                  <div className="max-h-64 overflow-y-auto text-sm text-gray-300 whitespace-pre-wrap">
                    {selectedProject.script}
                  </div>
                </div>

                <div className="bg-youtube-dark p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm text-gray-400">Thumbnail</h4>
                  <p className="text-sm text-gray-300 mb-2">{selectedProject.thumbnailStrategy}</p>
                  <div className="bg-gray-700 p-3 rounded text-xs font-mono">
                    {selectedProject.thumbnailPrompt}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(selectedProject, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${selectedProject.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.json`;
                    a.click();
                  }}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Download Project
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-youtube-gray rounded-lg p-12 shadow-xl text-center">
              <p className="text-gray-400">Select a project to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
