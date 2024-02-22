"use client";
import { useRouter } from "next/navigation";

export default function BackButton({lang}) {
  const router = useRouter();
  return (
    <button
      className="bg-[#485696] mt-6 text-xl w-36 rounded-lg text-white py-2"
      type="button"
      onClick={() => router.back()}
    >
      {lang.Back}
    </button>
  );
}
