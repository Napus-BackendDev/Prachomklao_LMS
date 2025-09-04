"use client"

import { Button, Divider, Link } from "@heroui/react";
import { Facebook, Globe } from "lucide-react";

const contacts = [
  {
    icon: Globe,
    name: "Website",
    url: "https://pckpb.pbri.ac.th",
  },
  {
    icon: Facebook,
    name: "Facebook",
    url: "https://www.facebook.com/pckpb.ac.th",
  },
];

export default function Footer() {
  return (
    <footer className="w-full b-0 py-8 border-b-4 border-[#0930CF] shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.1)]">
      <div className="max-w-screen-2xl grid grid-cols-3 mx-auto">
        {/* ABOUT */}
        <section
          id="about"
          className="flex flex-col items-center"
        >
          <div>
            <p className="font-black text-3xl text-gray-600 mb-4">About</p>
            <p className="font-medium text-2xl">Prachomklao College of Nursing</p>
            <div className="text-2xl">
              <p>" วิทยาลัยพยาบาลพระจอมเกล้าจังหวัดเพชรบุรี "</p>
              <p>งามสง่า มีคุณค่า อ่อนโยนและเข้มแข็ง</p>
              <Divider className="my-2" />
              <p>วินัย หน้าที่ สามัคคี เสียสละ สัจจะ กตเวที</p>
            </div>
          </div>
        </section>

        {/* QUICK LINKS */}
        <section
          id="links"
          className="flex flex-col items-center"
        >
          <div className="flex flex-col">
            <p className="font-black text-3xl text-gray-600 mb-4">Quick Links</p>
            <Link href="/" className="text-2xl text-black hover:text-primary">Home</Link>
            <Link href="/courses" className="text-2xl text-black hover:text-primary">Courses</Link>
          </div>
        </section>

        {/* CONTACT US */}
        <section
          id="contact"
          className="flex flex-col items-center"
        >
          <div>
            <p className="font-black text-3xl text-gray-600 mb-4">Contact Us</p>
            <div className="flex gap-2">
              {contacts.map((contact) => (
                <Link
                  key={contact.url}
                  href={contact.url}
                  target="_blank"
                >
                  <Button
                    isIconOnly
                    variant="flat"
                    radius="full"
                    color="primary"
                    className="rounded-full p-4 w-12 h-12"
                  >
                    <contact.icon />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}