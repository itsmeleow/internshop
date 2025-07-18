import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { site: string } }
) {
  let externalUrl = "";
  let payload = {};
  let curListings = 0;
  let maxListings = Number.MAX_SAFE_INTEGER;

  const allData = [];
  const body = await request.json();
  externalUrl = body.searchUrl;
  
  switch (params.site) {
    case "workday":
      payload = {
        appliedFacets: {},
        limit: 20,
        offset: curListings,
        searchText: body.queryKeyword,
      };
      break;
    case "greenhouse":
      break;
    case "adp":
      break;
    default:
      return new NextResponse("Site not supported yet", { status: 400 });
  }
  
  while (curListings < maxListings) {
    payload = {
      ...payload,
      offset: curListings,
    };
    
    try {
      const response = await fetch(externalUrl, {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US",
          "content-type": "application/json",
          connection: "keep-alive",
        },
        body: JSON.stringify(payload),
      });
      
      const responseData = await response.json();
      
      if (maxListings === Number.MAX_SAFE_INTEGER) {
        maxListings = responseData.total;
      }
      
      if (responseData.jobPostings && Array.isArray(responseData.jobPostings)) {
        allData.push(...responseData.jobPostings);
      }
      
      curListings += 20;
      
      // If we got fewer results than the limit, we've reached the end3
      if (responseData.jobPostings && responseData.jobPostings.length < 20) {
        break;
      }
      
    } catch (error) {
      console.error(error);
      return new NextResponse("Failed to fetch external data", { status: 500 });
    }
  }
  
  return NextResponse.json({
    jobPostings: allData,
    total: allData.length,
  });
}
