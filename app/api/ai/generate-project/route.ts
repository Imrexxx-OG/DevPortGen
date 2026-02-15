import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateProjectDescription } from "@/lib/claude";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { repoName, description, languages, stars } = await req.json();

    const projectDescription = await generateProjectDescription({
      repoName,
      description: description || "",
      languages: languages || [],
      stars: stars || 0,
    });

    return NextResponse.json({ description: projectDescription });
  } catch (error) {
    console.error("Error generating project description:", error);
    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 }
    );
  }
}