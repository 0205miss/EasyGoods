"use server";

export async function geocoding(address,lang) {
  const api_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API}&language=${lang}`;
  const res = await fetch(api_url);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  } else {
    const response = await res.json();
    if(response.status=='OK'){
        let result = response.results[0].geometry.location
        result.format = response.results[0].formatted_address
        return result
    }else if(response.status=='ZERO_RESULTS'){
        return 0
    }else if(response.status=='OVER_DAILY_LIMIT'){
        return 0
    }else if(response.status=='OVER_QUERY_LIMIT'){
        return 0
    }else if(response.status=='REQUEST_DENIED'){
        return 0
    }else if(response.status=='INVALID_REQUEST'){
        return 0
    }else{
        return 0
    }
  }
}
