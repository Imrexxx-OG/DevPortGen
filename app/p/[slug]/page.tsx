import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NovaPro from "@/components/templates/nova-pro/NovaPro";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PublicPortfolioPage({ params }: Props) {
  const { slug } = await params;

  const portfolio = await prisma.portfolio.findUnique({
    where: { slug },
    include: {
      user: { select: { name: true, image: true, email: true } },
      projects: { orderBy: { displayOrder: "asc" } },
    },
  });

  if (!portfolio || !portfolio.isPublished) {
    return notFound();
  }

  // Parse skills - handle both string and array formats
  let parsedSkills: string[] = [];
  if (typeof portfolio.skills === "string") {
    try {
      parsedSkills = JSON.parse(portfolio.skills);
    } catch {
      parsedSkills = [];
    }
  } else if (Array.isArray(portfolio.skills)) {
    parsedSkills = portfolio.skills;
  }

  // Transform projects
  const transformedProjects = portfolio.projects.map((project) => {
    let technologies: string[] = [];
    if (typeof project.technologies === "string") {
      try {
        technologies = JSON.parse(project.technologies);
      } catch {
        technologies = [];
      }
    } else if (Array.isArray(project.technologies)) {
      technologies = project.technologies as string[];
    }

    return {
      id: project.id,
      title: project.title,
      description: project.description,
      url: project.liveUrl || undefined,
      github: project.repoUrl || undefined,
      technologies,
      image: project.image || undefined,
    };
  });

  const transformedPortfolio = {
    name: portfolio.user?.name || "Developer",
    email: portfolio.user?.email || "contact@example.com",
    bio: portfolio.bio || portfolio.tagline || "",
    skills: parsedSkills,
    projects: transformedProjects,
    socialLinks: {
      github: (portfolio.socialLinks as any)?.github || undefined,
      twitter: (portfolio.socialLinks as any)?.twitter || undefined,
      linkedin: (portfolio.socialLinks as any)?.linkedin || undefined,
      website: (portfolio.socialLinks as any)?.website || undefined,
    },
    web3Address: portfolio.web3Address || undefined,
  };

  return <NovaPro portfolio={transformedPortfolio} />;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const portfolio = await prisma.portfolio.findUnique({
    where: { slug },
    include: { user: true },
  });

  if (!portfolio) {
    return { title: "Portfolio Not Found" };
  }

  return {
    title: `${portfolio.user?.name || "Developer"} — Portfolio`,
    description: portfolio.bio?.slice(0, 160) || portfolio.tagline,
  };
}