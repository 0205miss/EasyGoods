import LocaleSelector from "@/components/locale_selector";
import Link from "next/link";
import { Teko } from "next/font/google";
import Image from 'next/image'
import logo from './logo.png'
const teko = Teko({
  subsets: ["latin"] 
});

export default function Home({params}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Image src={logo} alt="Logo for the EasyGoods project"/>
      <Link href={`/${params.lang}/map`}>
        <button className="mt-2 rounded-md text-white bg-[#485696] px-10 py-3 w-40">
          Customer
        </button>
      </Link>
      <Link href={`/${params.lang}/business`}>
        <button className="mt-2 rounded-md text-white bg-[#485696] px-10 py-3 w-40">
          Business
        </button>
      </Link>
      <LocaleSelector lang={params.lang}/>
    </main>
  );
}
