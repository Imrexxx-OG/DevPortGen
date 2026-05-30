"use client";

export function SkeletonLoader({ count = 1, height = "h-12" }: { count?: number; height?: string }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${height} bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg animate-pulse`}
        />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-10 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-48 animate-pulse" />
        <div className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-80 animate-pulse" />
      </div>

      {/* Empty State Skeleton */}
      <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-full animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-48 animate-pulse" />
            <div className="h-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-64 animate-pulse" />
          </div>
        </div>
        <div className="h-2 bg-slate-700 rounded-full animate-pulse" />
        <SkeletonLoader count={4} height="h-16" />
      </div>

      {/* Portfolio Card Skeleton */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-32 animate-pulse" />
          <div className="h-6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-full w-24 animate-pulse" />
        </div>
        <SkeletonLoader count={3} height="h-10" />
      </div>

      {/* Stats Skeleton */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <div className="h-6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-24 mb-4 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SkeletonLoader count={1} height="h-20" />
          <SkeletonLoader count={1} height="h-20" />
          <SkeletonLoader count={1} height="h-20" />
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-32" />
        <div className="h-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-full" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded px-2 w-16" />
          <div className="h-6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded px-2 w-20" />
        </div>
      </div>
    </div>
  );
}

export function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-24 animate-pulse" />
      <div className="h-10 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg animate-pulse" />
    </div>
  );
}

export function BuilderSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
      {/* Left sidebar */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
          <div className="h-6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-32 animate-pulse" />
          <SkeletonLoader count={4} height="h-10" />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Progress bar */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-2">
          <div className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-32 animate-pulse" />
          <div className="h-2 bg-slate-700 rounded-full animate-pulse" />
        </div>

        {/* Form fields */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-4">
          <FormFieldSkeleton />
          <FormFieldSkeleton />
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-20 animate-pulse" />
            <div className="h-24 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg animate-pulse" />
          </div>
          <SkeletonLoader count={1} height="h-10" />
        </div>
      </div>
    </div>
  );
}