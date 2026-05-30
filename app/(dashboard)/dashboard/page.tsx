// app/(dashboard)/dashboard/page.tsx - UPDATED VERSION WITH SKELETONS

// Note: This is a server component, but we'll wrap it with a client component for skeleton loading

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ExternalLink, Edit, Globe, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import CopyLinkButton from "@/components/CopyLinkButton";
import { DashboardSkeleton } from "@/components/SkeletonLoaders";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Portfolio {
  id: string;
  slug: string;
  isPublished: boolean;
  projects: Array<{ id: string; title: string }>;
  skills: string[];
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchPortfolio();
    }
  }, [status, router]);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      setPortfolio(data || null);
    } catch (error) {
      console.error("Failed to fetch portfolio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return <DashboardSkeleton />;
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Redirecting..." />
      </div>
    );
  }

  const hasProjects = (portfolio?.projects?.length || 0) > 0;
  const hasSkills = (portfolio?.skills?.length || 0) > 0;
  const isPublished = portfolio?.isPublished || false;
  const showEmptyState = !hasProjects || !hasSkills || !isPublished;

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          Welcome, {session.user.name}! 👋
        </h1>
        <p className="text-slate-400 mt-2">
          Let's build your AI-powered portfolio
        </p>
      </div>

      {/* Empty State Onboarding */}
      {showEmptyState && (
        <EmptyState
          hasProjects={hasProjects}
          hasSkills={hasSkills}
          isPublished={isPublished}
        />
      )}

      {/* Portfolio Card */}
      {portfolio ? (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Your Portfolio</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                portfolio.isPublished
                  ? "bg-green-900/30 text-green-400 border-green-700"
                  : "bg-orange-900/30 text-orange-400 border-orange-700"
              }`}
            >
              {portfolio.isPublished ? "🟢 Published" : "⚠️ Draft"}
            </span>
          </div>

          <div className="space-y-4">
            {/* Portfolio URL */}
            <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-md">
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4 text-teal-400" />
                <span className="font-mono text-sm">/p/{portfolio.slug}</span>
              </div>
              <CopyLinkButton slug={portfolio.slug} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/builder"
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Portfolio
              </Link>

              {portfolio.isPublished && (
                <Link
                  href={`/p/${portfolio.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live
                </Link>
              )}

              <PublishButton
                portfolioId={portfolio.id}
                isPublished={portfolio.isPublished}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-teal-900/10 border border-teal-800/50 rounded-lg p-8 text-center">
          <LayoutDashboard className="w-12 h-12 text-teal-500 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-teal-400 mb-2">
            🚀 Get Started
          </h3>
          <p className="text-slate-300 mb-6">
            You haven't created a portfolio yet. Let's build one!
          </p>
          <Link
            href="/builder"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg transition-transform active:scale-95 shadow-lg"
          >
            Create Portfolio
          </Link>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-2xl font-bold text-teal-400">
              {portfolio?.projects?.length || 0}
            </div>
            <div className="text-sm text-slate-400">Projects</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-2xl font-bold text-teal-400">
              {portfolio?.skills?.length || 0}
            </div>
            <div className="text-sm text-slate-400">Skills</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-2xl font-bold text-orange-400">
              {portfolio?.isPublished ? "Live" : "Draft"}
            </div>
            <div className="text-sm text-slate-400">Status</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PublishButton({
  portfolioId,
  isPublished,
}: {
  portfolioId: string;
  isPublished: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/portfolio/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolioId,
          isPublished: !isPublished,
        }),
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to publish:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePublish}>
      <button
        type="submit"
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
          isLoading
            ? "bg-slate-600 text-slate-400 cursor-not-allowed"
            : isPublished
            ? "bg-slate-600 hover:bg-slate-500 text-white"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin" />
        )}
        {isPublished ? "Unpublish" : "Publish"}
      </button>
    </form>
  );
}