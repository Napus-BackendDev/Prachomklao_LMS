"use client";

import Link from "next/link";
import { Image } from "@heroui/image";
import { Divider } from "@heroui/react";
import { Users } from "lucide-react";

type CourseCardProps = {
  title: string;
  id: string;
  picture: string;
  enrolledAt?: string;
  courseCode?: string;
  totalStudent?: number;
};

export default function CourseCard({ title, id, picture, enrolledAt, courseCode, totalStudent }: CourseCardProps) {
  return (
    <Link
      key={title}
      href={`/courses/${id}`}
      className="flex flex-col gap-2 mx-auto h-full rounded-md group hover:scale-105 transition duration-300"
    >
      <Image
        alt={title}
        src={picture}
        radius="sm"
        height={360}
        className="object-cover group-hover:brightness-60 transition duration-300"
      />
      {enrolledAt ? (
        <div className="flex gap-1">
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
      <div className="flex justify-between text-lg text-default-600 font-medium">
        <p>{courseCode}</p>
        <p className="flex items-center gap-2"><Users size={14}/>{totalStudent}</p>
      </div>
      <Divider className="h-0.5 rounded-full group-hover:bg-primary" />
    </Link>
  );
}
