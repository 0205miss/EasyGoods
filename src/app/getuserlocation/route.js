import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    let lat = headers().get('x-vercel-ip-latitude'),long = headers().get('x-vercel-ip-longitude')
   return NextResponse.json({ lat:lat,long:long });
  }