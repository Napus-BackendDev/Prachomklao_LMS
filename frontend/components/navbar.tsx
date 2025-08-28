import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import Link from "next/link";

export const Navbar = () => {
  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className={` ${fontSans.className} py-0.5 shadow-2xs border-t-4 border-t-[#0930CF] `}
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full space-x-4"
        justify="start"
      >
        <NavbarBrand className={`${fontSans.className} gap-3 max-w-fit`}>
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <img
              alt="Prachomklao College of Nursing Logo"
              className="w-12 h-12"
              src="/logo.png"
            />
            <div>
              <p className="text-sm font-semibold text-default-800">
                Prachomklao
              </p>
              <p className="text-xs text-default-400 font-medium">
                College of Nursing
              </p>
            </div>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className="text-sm font-medium text-default-800 hover:text-primary hover:underline underline-offset-4 px-1 "
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">
          <Link href={"/signin"}>
          <Button
            className="text-sm font-medium px-6 border-2 border-primary"
            variant="flat"
            color="primary"
          >
            Sign In
          </Button>
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            className="text-sm font-medium px-6"
            href={"/registration"}
            color="primary"
            variant="shadow"
          >
            Register
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-5 space-y-3 flex flex-col gap-2 justify-center items-center">
          {siteConfig.navMenuItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <NextLink
                className="px-2 py-4 font-medium text-default-800 hover:text-primary"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
