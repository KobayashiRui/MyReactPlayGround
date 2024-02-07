import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex">
      <Link href={"/sample1"}>sample1</Link>
    </main>
  );
}
