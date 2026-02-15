import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, tagline, bio, skills, web3Address, socialLinks, projects } = body;

  // Generate a unique slug from the name
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  let slug = baseSlug;
  let counter = 1;
  
  // Check if slug exists, append number if needed
  while (await prisma.portfolio.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  try {
    // Create or update portfolio
    const portfolio = await prisma.portfolio.upsert({
      where: { userId: session.user.id },
      update: {
        bio,
        tagline,
        skills,
        web3Address,
        socialLinks,
      },
      create: {
        userId: session.user.id,
        slug,
        bio,
        tagline,
        skills,
        web3Address,
        socialLinks,
      },
    });

    // Delete existing projects and create new ones
    await prisma.project.deleteMany({ where: { portfolioId: portfolio.id } });
    
    if (projects && projects.length > 0) {
      await prisma.project.createMany({
        data: projects.map((project: any, index: number) => ({
          portfolioId: portfolio.id,
          title: project.title,
          description: project.description,
          techStack: project.techStack,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          displayOrder: index,
        })),
      });
    }

    return NextResponse.json({ 
      success: true, 
      portfolio: { ...portfolio, slug } 
    });
  } catch (error) {
    console.error("Error saving portfolio:", error);
    return NextResponse.json(
      { error: "Failed to save portfolio" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const portfolio = await prisma.portfolio.findUnique({
    where: { userId: session.user.id },
    include: { projects: { orderBy: { displayOrder: "asc" } } },
  });

  return NextResponse.json({ portfolio });
}