import React from "react";

export function LoaderComponent() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-6 py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-crimson-500"></div>
      <p className="font-semibold text-sm text-white">Loading data...</p>
    </div>
  );
}
