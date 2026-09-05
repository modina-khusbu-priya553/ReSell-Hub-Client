import React from 'react';

const LoadingDashboard = () => {
    return (
         <aside className="hidden w-64 shrink-0 bg-slate-900 lg:block">
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <svg
          className="h-6 w-6 animate-spin text-teal-400"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <p className="text-xs text-slate-400">Loading...</p>
      </div>
    </aside>
    );
};

export default LoadingDashboard;