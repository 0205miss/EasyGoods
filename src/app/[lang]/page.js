import LocaleSelector from "@/components/locale_selector";
import Link from "next/link";
import { Teko } from "next/font/google";
import Image from "next/image";
import logo from "./logo.png";
import { getDictionary } from "@/lib/dictionary";
const teko = Teko({
  subsets: ["latin"],
});

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-10">
      <Image src={logo} alt="Logo for the EasyGoods project" priority />
      <Link href={`/${lang}/map/22.7704832/121.1334656`}>
        <button className="mt-2 rounded-md text-white bg-[#485696] px-10 py-3 w-40">
          {dict.Customer}
        </button>
      </Link>
      <Link href={`/${lang}/business`}>
        <button className="mt-2 rounded-md text-white bg-[#485696] px-10 py-3 w-40">
          {dict.Business}
        </button>
      </Link>
      <LocaleSelector lang={lang} />
    </main>
  );
}
