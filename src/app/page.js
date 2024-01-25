import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <p>Welcome to EasyGoods</p>
      <Link href='/user'>
        <button className="mt-2 rounded-md bg-indigo-500 px-10 py-3">
          Customer
        </button>
      </Link>
    </main>
  );
}
