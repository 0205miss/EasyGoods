import { getDictionary } from "@/lib/dictionary";
import MapClientPage from "./client";

export default async function MapPage({ params }) {
  const transcript = await getDictionary(params.lang);
  return <MapClientPage params={params} transcript={transcript} />;
}
