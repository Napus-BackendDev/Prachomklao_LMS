"use client";

import Link from "next/link";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Image } from "@heroui/image";

type CourseCardProps = {
  title: string;
  code: string;
  url: string;
};

export function CourseCard({ title, code, url }: CourseCardProps) {
  return (
    <Link href={`/courses/${code}`} key={title}>
      <Card
        className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden items-stretch border border-[#e5e9f7] h-full min-h-[320px] max-w-xs mx-auto"
        key={title}
      >
        <CardHeader className="p-0 rounded-t-2xl overflow-hidden">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={url}
              className="object-cover w-full h-full"
              alt={title}
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
        </CardHeader>
        <CardBody className="flex-1 flex flex-col px-3 pt-3 pb-2">
          <div className="text-sm font-medium text-[#222] mb-1">{code}</div>
          <div className="font-semibold text-base text-[#222] mb-2 leading-snug">
            {title}
          </div>
        </CardBody>
        <CardFooter className="px-6 pb-4 pt-2">
          {/* เก็บไว้ก่อน ใช้ในการทำ feedback */}
        </CardFooter>
      </Card>
    </Link>
  );
}
