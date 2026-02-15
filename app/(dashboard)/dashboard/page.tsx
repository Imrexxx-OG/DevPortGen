import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ExternalLink, Edit, Globe, LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import CopyLinkButton from "@/components/CopyLinkButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const portfolio = await prisma.portfolio.findUnique({
    where: { userId: session.user.id },
    include: { 
      projects: true,
    },
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          Welcome, {session.user.name}! 👋
        </h1>
        <p className="text-slate-400 mt-2">
          Let's build your AI-powered portfolio
        </p>
      </div>

      {portfolio ? (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Your Portfolio
            </h2>
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
            <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-md">
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4 text-teal-400" />
                <span className="font-mono text-sm">/p/{portfolio.slug}</span>
              </div>
              <CopyLinkButton slug={portfolio.slug} />
            </div>

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
  return (
    <form action="/api/portfolio/publish" method="POST">
      <input type="hidden" name="portfolioId" value={portfolioId} />
      <input
        type="hidden"
        name="isPublished"
        value={(!isPublished).toString()}
      />
      <button
        type="submit"
        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
          isPublished
            ? "bg-slate-600 hover:bg-slate-500 text-white"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </button>
    </form>
  );
}