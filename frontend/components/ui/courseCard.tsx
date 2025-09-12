"use client";

import Link from "next/link";
import { Image } from "@heroui/image";

type CourseCardProps = {
  title: string;
  id: string;
  picture: string;
  enrolledAt?: Date;
};

export default function CourseCard({ title, id, picture, enrolledAt }: CourseCardProps) {
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
          className="transition duration-300 mb-1 group-hover:brightness-60"
        />
        {enrolledAt ? (
          <div className="flex ">
            <p className="text-lg text-default-600">เริ่มสมัครเรียนเมื่อ</p>
            <p className="text-lg text-default-600">
              {new Date(enrolledAt).toLocaleDateString("th-TH", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        ) : ""}
        <p className="text-2xl font-semibold group-hover:text-primary">{title}</p>
      </div>
    </Link>
  );
}
