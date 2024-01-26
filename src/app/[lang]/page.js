import Link from "next/link";

export default function Home({params}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <p>Welcome to EasyGoods</p>
      <Link href={`/${params.lang}/map`}>
        <button className="mt-2 rounded-md bg-indigo-500 px-10 py-3">
          Customer
        </button>
      </Link>
    </main>
  );
}
