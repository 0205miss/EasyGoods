
import OrderUserPage from "@/components/order/main";
import { getDictionary } from "@/lib/dictionary";


export default async function OrderPage({ params: { lang } }) {
  const transcript = await getDictionary(lang);
  return (
    <div className="w-full h-full overflow-scroll flex flex-col">
      <OrderUserPage transcript={transcript}/>
    </div>
  );
}
