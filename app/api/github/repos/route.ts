import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchUserRepos } from "@/lib/github";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get user's GitHub token from database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { githubToken: true, githubLogin: true },
    });

    if (!user?.githubToken) {
      return NextResponse.json(
        { error: "GitHub token not found. Please re-authenticate." },
        { status: 400 }
      );
    }

    const repos = await fetchUserRepos(user.githubToken);

    return NextResponse.json({ repos, username: user.githubLogin });
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub repos" },
      { status: 500 }
    );
  }
}