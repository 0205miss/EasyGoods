"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="bg-[#485696] mt-6 text-xl w-36 rounded-lg text-white py-2"
      type="button"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
}
