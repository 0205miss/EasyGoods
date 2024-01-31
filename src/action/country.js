'use server'
const borders = require('@osm_borders/maritime_1000m')
const lookup = require('geojson-geometries-lookup')

export async function  getcountry(lat,lng){
    const search = new lookup(borders);
	const countries = await search.getContainers({type: 'Point', coordinates: [lng, lat]});
	if(countries.features.length > 0){
    	return countries.features.map(f => f.properties.isoA2);

  	}
  	return [];
}