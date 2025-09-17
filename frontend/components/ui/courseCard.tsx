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
      className="flex flex-col gap-2 mx-auto h-full rounded-xl group hover:scale-105 transition duration-300 bg-white shadow-md w-full max-w-md min-h-[420px]"
      style={{ minWidth: 320 }}
    >
      <div className="w-full aspect-video rounded-t-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <Image
          alt={title}
          src={picture}
          radius="none"
          height={220}
          width={390}
          className="object-cover w-full h-full group-hover:brightness-60 transition duration-300"
        />
      </div>
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
      ) : (
        ""
      )}
      <p className="text-2xl font-semibold group-hover:text-primary line-clamp-2">{title}</p>
      <div className="flex justify-between text-lg text-default-600 font-medium">
        <p>{courseCode}</p>
        <p className="flex items-center gap-2">
          <Users size={14} />
          {totalStudent}
        </p>
      </div>
      <Divider className="h-0.5 rounded-full group-hover:bg-primary" />
    </Link>
  );
}
