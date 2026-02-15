import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const isPublished = formData.get("isPublished") === "true";

    await prisma.portfolio.update({
      where: { userId: session.user.id },
      data: { isPublished },
    });

    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error) {
    console.error("Error publishing portfolio:", error);
    return NextResponse.json(
      { error: "Failed to publish portfolio" },
      { status: 500 }
    );
  }
}