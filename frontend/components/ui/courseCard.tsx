"use client";

import Link from "next/link";
import { Image } from "@heroui/image";

type CourseCardProps = {
  title: string;
  id: string;
  picture: string;
};

export default function CourseCard({ title, id, picture }: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`} key={title}>
      <div
        key={title}
        className="flex flex-col overflow-hidden mx-auto rounded-md group"
      >
        <Image
          alt={title}
          src={picture}
          radius="sm"
          className="transition duration-300 group-hover:brightness-60"
        />
        <p className="text-2xl font-semibold mt-2 group-hover:text-primary">{title}</p>
      </div>
    </Link>
  );
}
