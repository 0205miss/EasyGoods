export async function GET(request) {
   
    return Response.json({ lat:request.geo.latitude,long:request.geo.longitude })
  }