"use client";

import Link from "next/link";
import { Image } from "@heroui/image";

type CourseCardProps = {
  title: string;
  code: string;
  url: string;
};

export default function CourseCard({ title, code, url }: CourseCardProps) {
  return (
    <Link href={`/courses/${code}`} key={title}>
      <div
        key={title}
        className="flex flex-col overflow-hidden max-w-xs mx-auto rounded-md group"
      >
        <Image
          alt={title}
          src={url}
          radius="sm"
          className="transition duration-300 group-hover:brightness-60"
        />
        <p className="text-2xl font-semibold mt-2 group-hover:text-primary">{title}</p>
      </div>
    </Link>
  );
}
