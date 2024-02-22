import BusinessSelector from "./business";
import PiUser from "./pi";
import { getDictionary } from "@/lib/dictionary";

export default async function BusinessLayout({ children,params:{lang} }) {
  const dict = await getDictionary(lang)
  return (
    <PiUser transcript={dict}>
      <div className="w-screen h-screen">
        <BusinessSelector>{children}</BusinessSelector>
      </div>
    </PiUser>
  );
}
