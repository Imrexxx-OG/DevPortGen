import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateBio } from "@/lib/claude";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, skills, projectTitles, web3Address } = await req.json();

    const isWeb3 =
      !!web3Address ||
      skills.some((s: string) =>
        ["solidity", "web3", "ethereum", "solana", "defi", "nft"].includes(
          s.toLowerCase()
        )
      );

    const bio = await generateBio({
      name,
      skills,
      projectTitles: projectTitles || [],
      isWeb3,
    });

    return NextResponse.json({ bio });
  } catch (error) {
    console.error("Error generating bio:", error);
    return NextResponse.json(
      { error: "Failed to generate bio" },
      { status: 500 }
    );
  }
}