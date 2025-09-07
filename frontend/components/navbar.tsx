"use client"

import {
  Button,
  Image,
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { usePathname, useRouter } from "next/navigation";
import useStudent from "@/hooks/useStudent";
import { useEffect } from "react";
import { Student } from "@/types/student";
import { ChevronDown, LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();
  const { student, fetchStudent } = useStudent();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  }

  return (
    <HeroUINavbar
      maxWidth="2xl"
      position="static"
      className={`${fontSans.className} py-2 shadow-2xs border-t-4 border-t-[#0930CF]`}
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full space-x-4"
        justify="start"
      >
        <NavbarBrand className={`${fontSans.className} gap-3 max-w-fit`}>
          <Link className="flex justify-start items-center gap-4" href="/">
            <Image
              alt="Prachomklao College of Nursing Logo"
              src="/logo.png"
              height={60}
            />
            <div>
              <p className="text-xl font-semibold text-default-800">
                Prachomklao
              </p>
              <p className="text-md text-default-400 font-medium">
                College of Nursing
              </p>
            </div>
          </Link>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={`text-lg font-medium ${pathName === item.href ? "text-primary" : "text-default-800"} hover:text-primary hover:underline underline-offset-4 px-2`}
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {student ? (
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <div className="flex flex-col group py-2 rounded-lg cursor-pointer">
                  <p className="text-lg font-semibold text-default-800">
                    {(student as Student).username}
                  </p>
                  <p className="text-md text-default-400">
                    {(student as Student).role}
                  </p>
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="logout"
                  startContent={<LogOut size={18} />}
                  onPress={handleLogout}
                  classNames={{
                    title: "text-xl font-bold"
                  }}
                >
                  Log out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden lg:flex">
            <Link href={"/login"}>
              <Button
                className="text-sm font-medium px-6"
                variant="flat"
                color="primary"
              >
                Log In
              </Button>
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Link href={"/signup"}>
              <Button
                className="text-sm font-medium px-6"
                color="primary"
                variant="shadow"
              >
                Sign Up
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-5 space-y-3 flex flex-col gap-2 justify-center items-center">
          {siteConfig.navMenuItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <Link
                className="px-2 py-4 font-medium text-default-800 hover:text-primary"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
