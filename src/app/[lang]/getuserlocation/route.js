import { NextResponse } from "next/server";

export async function GET(request) {
   return NextResponse.json({ lat:request.geo.latitude,long:request.geo.longitude });
  }