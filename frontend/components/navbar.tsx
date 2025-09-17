"use client";

import {
  Button,
  Image,
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { LogOut, LayoutDashboard, BookCopy } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import LogInModal from "./ui/loginModal";
import SignUpModal from "./ui/signupModal";
import ResetPassword from "./ui/resetPasswordModal";

export default function Navbar() {
  const { user, setUser, login, signup, logout, resetPassword } = useAuth();
  const pathName = usePathname();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const handleClear = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleOpenLogin = () => {
    handleClear();
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const handleOpenSignup = () => {
    handleClear();
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const handleOpenReset = () => {
    handleClear();
    setIsLoginOpen(false);
    setIsResetOpen(true);
  };

  const handleLogin = async () => {
    const res = await login(email, password);
    return res;
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    const res = await signup(username, email, password);
    if (res) window.location.reload();
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      setUser(null);
      setIsLoginOpen(true);
      handleClear();
      router.push("/");
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    const res = await resetPassword(email, password);
    if (res) {
      setIsResetOpen(false);
      setIsLoginOpen(true);
      handleClear();
    }
  };

  const navigateContent = useMemo(() => {
    return (
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
          {siteConfig.navItems
            .filter((item) => user?.role === "Admin" ? item : item.label !== "Admin")
            .map((item) => (
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
    );
  }, [user, setIsLoginOpen, setIsSignupOpen, handleLogout]);

  const profileContent = useMemo(() => {
    if (user) {
      if (user.role === "Admin") {
        // Admin: โชว์ Dashboard กับ Logout
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
                      ผู้ดูแลระบบ
                    </p>
                    <p className="text-md text-default-400">{user.role}</p>
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="Dashboard"
                    startContent={<LayoutDashboard size={18} />}
                    onPress={() => router.push("/admin")}
                    classNames={{ title: "text-xl font-bold" }}
                  >
                    Dashboard
                  </DropdownItem>
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
      } else if (user.role === "Student") {
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
                      {user.username}
                    </p>
                    <p className="text-md text-default-400">{user.role}</p>
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="profile"
                    startContent={<BookCopy  size={18} />}
                    onPress={() => router.push("/profile")}
                    classNames={{ title: "text-xl font-bold" }}
                  >
                    Profile
                  </DropdownItem>
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
      }
    }
    // ยังไม่ login
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
  }, [user, setIsLoginOpen, setIsSignupOpen, handleLogout, router]);

  return (
    <HeroUINavbar
      maxWidth="2xl"
      position="static"
      className={`${fontSans.className} py-4 shadow-2xs`}
    >
      {/* Navigate */}
      {navigateContent}

      {/* Profile */}
      {profileContent}

      <LogInModal
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
          handleClear();
        }}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onLogin={handleLogin}
        onOpenSignup={handleOpenSignup}
        onOpenReset={handleOpenReset}
      />

      <SignUpModal
        isOpen={isSignupOpen}
        onClose={() => {
          setIsSignupOpen(false);
          handleClear();
        }}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSignup={handleSignup}
        onOpenLogin={handleOpenLogin}
      />

      <ResetPassword
        isOpen={isResetOpen}
        onClose={() => {
          setIsResetOpen(false);
          setIsLoginOpen(true);
          handleClear();
        }}
        email={email}
        setEmail={setEmail}
        newPassword={password}
        setNewPassword={setPassword}
        onResetPassword={handleResetPassword}
      />
    </HeroUINavbar>
  );
}
