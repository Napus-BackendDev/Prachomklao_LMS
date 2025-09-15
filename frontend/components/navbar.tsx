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
import { useEffect, useMemo, useState } from "react";
import { LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import LogInModal from "./ui/loginModal";
import SignUpModal from "./ui/signupModal";
import ResetPassword from "./ui/resetPasswordModal";

export default function Navbar() {
  const { login, signup, logout, resetPassword } = useAuth();
  const { student, setStudent, fetchStudent } = useStudent();
  const pathName = usePathname();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleClear = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  }

  const handleOpenLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  }

  const handleOpenSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  }

  const handleOpenReset = () => {
    setIsLoginOpen(false);
    setIsResetOpen(true);
  }

  const handleLogin = async () => {
    if (!email || !password) return console.error("กรอกอีเมล/รหัสผ่านก่อน");

    const res = await login(email, password);
    if (res) window.location.reload();
  };

  const handleSignup = async () => {
    if (!username || !email || !password) return console.error("กรอกข้อมูลให้ครบ");

    const res = await signup(username, email, password);
    if (res) window.location.reload();
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      setStudent(null);
      setIsLoginOpen(true);
      handleClear();
      router.push("/");
    };
  }

  const handleResetPassword = async (email: string, newPassword: string) => {
    if (!email || !newPassword) return;

    const res = await resetPassword(email, newPassword);
    if (res) {
      setIsResetOpen(false);
      setIsLoginOpen(true);
      handleClear();
    };
  }

  const profileContent = useMemo(() => {
    if (student) {
      return (
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <div className="flex flex-col group py-2 rounded-lg cursor-pointer">
                  <p className="text-lg font-semibold text-default-800">
                    {student.username}
                  </p>
                  <p className="text-md text-default-400">{student.role}</p>
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="logout"
                  startContent={<LogOut size={18} />}
                  onPress={handleLogout}
                  classNames={{ title: "text-xl font-bold" }}
                >
                  Log out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      );
    } else {
      return (
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden lg:flex">
            <Button
              className="text-sm font-medium px-6"
              variant="flat"
              color="primary"
              onPress={() => setIsLoginOpen(true)}
            >
              Log In
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Button
              className="text-sm font-medium px-6"
              color="primary"
              variant="shadow"
              onPress={() => setIsSignupOpen(true)}
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      );
    }
  }, [student, setIsLoginOpen, setIsSignupOpen, handleLogout]);

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

      {profileContent}

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

      <LogInModal
        isOpen={isLoginOpen}
        onClose={() => { setIsLoginOpen(false); handleClear(); }}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleOpenSignup={handleOpenSignup}
        handleOpenReset={handleOpenReset}
      />

      <SignUpModal
        isOpen={isSignupOpen}
        onClose={() => { setIsSignupOpen(false); handleClear(); }}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSignup={handleSignup}
        handleOpenLogin={handleOpenLogin}
      />

      <ResetPassword
        isOpen={isResetOpen}
        onClose={() => { setIsResetOpen(false); setIsLoginOpen(true); handleClear(); }}
        email={email}
        setEmail={setEmail}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        handleResetPassword={handleResetPassword}
      />

    </HeroUINavbar>
  );
};
