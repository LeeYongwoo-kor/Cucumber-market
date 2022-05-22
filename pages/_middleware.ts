import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.ua?.isBot) {
    return new Response("Please don't be a bot. Be human.", { status: 403 });
  }
  if (!request.url.includes("/api")) {
    if (!request.url.includes("/enter") && !request.cookies.cucumberSession) {
      return NextResponse.redirect("/enter");
    }
  }
}
