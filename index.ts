import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { DOMParser } from "@xmldom/xmldom";

const OUT_DIRECTORY = "./early-vote-locations/";

function getGeoJsonFeaturesFromString(
  locationString: string,
  staticProperties: Record<string, string>
): GeoJSON.Feature<GeoJSON.Point, Record<string, string>>[] {
  const document = new DOMParser().parseFromString(locationString, "text/html");
  const locations = document.getElementsByTagName("marker");

  const locationObjects: Record<string, string>[] = [];
  for (const location of locations) {
    const locationData: Record<string, string> = { ...staticProperties };

    for (const attr of location.attributes) {
      locationData[attr.name] = attr.value;
    }
    locationObjects.push(locationData);
  }

  return locationObjects.map((location) => ({
    type: "Feature",
    properties: {
      ...location,
    },
    geometry: {
      type: "Point",
      coordinates: [parseFloat(location.lng), parseFloat(location.lat)],
    },
  }));
}

async function fetchLocations() {
  if (process.env.USE_FIXTURE) {
    if (existsSync("./locations.txt")) {
      return readFileSync("./locations.txt", "utf-8");
    }
  }
  const response = await fetch(
    "https://www.elections.ca/vote/locate/data/roData.js?v=3.0"
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  const data = await response.text();
  if (process.env.USE_FIXTURE) {
    writeFileSync("./locations.txt", data);
  }
  return data;
}

async function main() {
  const data = await fetchLocations();

  // The data is wrapped in a JavaScript variable assignment.
  const trimmedData = data
    .trim()
    .replace(/^var vdata =\'/, "")
    .replace(/\'\;$/, "");

  const lastUpdatedAt = new Date().toUTCString();
  const allFeatures = getGeoJsonFeaturesFromString(trimmedData, {
    location_fetched_at: lastUpdatedAt,
  });
  const canadaLocationsGeoJson = {
    type: "FeatureCollection",
    features: allFeatures,
  };
  const allLocationsPath = path.join(OUT_DIRECTORY, "canada.geojson");
  writeFileSync(
    allLocationsPath,
    JSON.stringify(canadaLocationsGeoJson, null, 2)
  );

  const locationsByProvince = allFeatures.reduce<
    Record<string, GeoJSON.Feature<GeoJSON.Point, Record<string, string>>[]>
  >((acc, pollingLocation) => {
    const province = pollingLocation.properties?.prov;
    if (!acc[province]) {
      acc[province] = [];
    }
    acc[province].push(pollingLocation);
    return acc;
  }, {});
  for (const [province, locations] of Object.entries(locationsByProvince)) {
    const provinceLocationsGeoJson = {
      type: "FeatureCollection",
      features: locations,
    };
    const provinceLocationsPath = path.join(
      OUT_DIRECTORY,
      `${province}.geojson`
    );
    writeFileSync(
      provinceLocationsPath,
      JSON.stringify(provinceLocationsGeoJson, null, 2)
    );
  }
  console.log(`All locations saved to ${allLocationsPath}`);
}

main().then();
