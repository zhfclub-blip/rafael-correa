import { Suspense } from "react";
import OposicionContent from "./OposicionContent";

export default function OposicionPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-full max-w-3xl" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-card" />
            ))}
          </div>
        </div>
      </div>
    }>
      <OposicionContent />
    </Suspense>
  );
}
