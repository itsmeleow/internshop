import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';

// return company details from db by company name
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const companyName = searchParams.get("company");
  if (!companyName) return NextResponse.json({error: "No company name in search paramater."}, { status: 400});
  try {
    const companyDetails = await prisma.company.findUnique({
        where: {
            name: companyName
        }
    })
    return NextResponse.json(companyDetails);
  } catch (error) {
    return NextResponse.json({error})
  }
}

// add a company to db
export async function POST(request: NextRequest,) {
    const body = await request.json();
    try {
        await prisma.company.create({
            data: {
                name: body.name,
                logo: body.logo,
                description: body.description,
                atsType: body.atsType,
                searchUrl: body.searchUrl,
                queryKeyword: body.queryKeyword
            }
        })
    } catch (error) {
        return NextResponse.json({error})
    }
}
