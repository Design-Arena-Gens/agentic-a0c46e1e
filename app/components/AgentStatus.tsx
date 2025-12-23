'use client';

import { useState, useEffect } from 'react';

export default function AgentStatus() {
  const [status, setStatus] = useState<'active' | 'idle'>('idle');

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
        <span className="text-sm text-gray-300">
          {status === 'active' ? 'Agent Active' : 'Agent Ready'}
        </span>
      </div>
      <div className="text-xs text-gray-500">
        Multi-Role AI System
      </div>
    </div>
  );
}
