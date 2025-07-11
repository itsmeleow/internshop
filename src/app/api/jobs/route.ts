import { NextRequest, NextResponse } from "next/server";

export async function GET(  
    request: NextRequest,
    {params}: { params: { site: string } }
) {
  const body = await request.json();
  try {
    const response = await fetch(body.searchUrl);
  } catch(error) {

  }
}
