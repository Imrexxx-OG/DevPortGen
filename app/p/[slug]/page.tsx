import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NovaTemplate, {
  SocialLinks,
} from "@/components/templates/nova/NovaTemplate";

interface Props {
  params: Promise<{ slug: string }>; // CHANGED: params is now a Promise in Next.js 15+
}

export default async function PublicPortfolioPage({ params }: Props) {
  const { slug } = await params; // CHANGED: await the params

  const portfolio = await prisma.portfolio.findUnique({
    where: { slug }, // Now slug has the actual value
    include: {
      user: { select: { name: true, image: true } },
      projects: { orderBy: { displayOrder: "asc" } },
    },
  });

  if (!portfolio || !portfolio.isPublished) {
    return notFound();
  }

  // Normalize Prisma JSON → UI-safe object
  const normalizedPortfolio = {
    ...portfolio,
    socialLinks:
      typeof portfolio.socialLinks === "object" &&
      portfolio.socialLinks !== null
        ? (portfolio.socialLinks as SocialLinks)
        : undefined,
  };

  return <NovaTemplate portfolio={normalizedPortfolio} />;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params; // CHANGED: await the params here too

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