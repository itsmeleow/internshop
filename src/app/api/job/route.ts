import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// query db for job details with Job "id"
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobID = searchParams.get("jobID");
  if (!jobID) {
    return NextResponse.json(
      { error: "No job ID provided in search parameter." },
      { status: 400 }
    );
  }
  try {
    const jobDetails = await prisma.job.findUnique({
      where: {
        id: jobID,
      },
    });
    return NextResponse.json(
      { jobDetails },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
