import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// query db for company details with Company "companyName"
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const companyName = searchParams.get("company");
  if (!companyName) {
    return NextResponse.json(
      { error: "No company name in search paramater." },
      { status: 400 }
    );
  }
  try {
    const companyDetails = await prisma.company.findUnique({
      where: {
        name: companyName,
      },
    });
    return NextResponse.json(
      { companyDetails },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return NextResponse.json("Failed to fetch company details: " + { error }, { status: 500 });
  }
}

// add new company to db
export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const company = await prisma.company.create({
      data: {
        name: body.name,
        logo: body.logo,
        description: body.description,
        atsType: body.atsType,
        searchUrl: body.searchUrl,
        queryKeyword: body.queryKeyword,
      },
    });
    return NextResponse.json(
      { company },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return NextResponse.json("Failed to add company: " + { error }, { status: 500 });
  }
}
