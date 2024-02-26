import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Link href={"/rc-gantt-test1"}>rc-gantt</Link>
      <Link href={"/gantt-task-react-test1"}>gantt-task-react-test1</Link>
      <Link href={"/dnd-timeline-simple"}>dnd-timeline-simple</Link>
      <Link href={"/dnd-timeline-time"}>dnd-timeline-time</Link>
      <Link href={"/dnd-timeline-time2"}>dnd-timeline-time v2</Link>
    </main>
  );
}
