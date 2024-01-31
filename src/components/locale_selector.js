"use client";
import { useRouter } from "next/navigation";
import locale from "@/transcript/list.json";

export default function LocaleSelector({ lang }) {
  const router = useRouter();
  const localecode = Object.keys(locale);
  const changelang = (e) => {
    router.push(process.env.NEXT_PUBLIC_APP_DOMAIN + e.target.value);
  };
  return (
    <select
      onChange={changelang}
      value={lang}
      className="bg-gray-50 border mt-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-40 text-center"
    >
      {localecode.map((code) => {
        return (
          <option key={code} value={code}>
            {locale[code]}
          </option>
        );
      })}
    </select>
  );
}
