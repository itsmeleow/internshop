import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  {params}: { params: { site: string } }
) {
  let externalUrl = "";
  let payload = {}
  const body = await request.json();
  externalUrl = body.searchUrl;
  switch (params.site) {
    case "workday":
      payload = {
        "appliedFacets": {},
        "limit": 20,
        "offset": 0,
        "searchText": body.queryKeyword,
      };
      break;
    case "greenhouse":
      break;
    case "adp":
      break;
    default:
      return new NextResponse("Site not supported yet", { status: 400 });
  }
  
  try {
    const response = await fetch(externalUrl, {
      method: 'POST',
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US",
        "content-type": "application/json",
        "connection": "keep-alive"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch external data", { status: 500 });
  }
}
