import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  {params}: { params: { site: string } }
) {
  let listingUrl = "";
  const body = await request.json();
  
  switch (params.site) {
    case "workday":
      listingUrl = body.searchUrl.replace("/jobs", body.externalPath);
      break;
    case "greenhouse":
      break;
    case "adp":
      break;
    default:
      return new NextResponse("Site not supported yet", { status: 400 });
  }
  
  try {
    const response = await fetch(listingUrl, {
      method: 'GET',
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US",
        "content-type": "application/json",
        "connection": "keep-alive"
      },
    });
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch external data", { status: 500 });
  }
}
