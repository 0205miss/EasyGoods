import { getDictionary } from "@/lib/dictionary";
import BusinessClientPage from "./client";

export default async function BusinessPage({ params:{lang} }) {
  const dict = await getDictionary(lang)
  return (
    <BusinessClientPage dict={dict} lang={lang}/>
  )
}
