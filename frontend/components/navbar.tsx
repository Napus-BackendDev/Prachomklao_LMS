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
import { LogOut, LayoutDashboard, BookCopy, Home, BookMarked } from "lucide-react";
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

  const handleSignup = async () => {
    const res = await signup(username, email, password);
    return res;
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      setUser(null);
      setIsLoginOpen(true);
      handleClear();
      router.replace("/");
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
      <div className="hidden md:flex text-center gap-4">
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
      </div>
    );
  }, [user, setIsLoginOpen, setIsSignupOpen, handleLogout]);

  const profileContent = useMemo(() => {
    if (user) {
      if (user.role === "Admin") {
        // Admin Role
        return (
          <NavbarContent>
            <div className="flex w-full justify-end">
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
                      key="Home"
                      startContent={<Home size={18} />}
                      onPress={() => router.push("/")}
                      className="md:hidden"
                      classNames={{ title: "text-xl font-bold" }}
                    >
                      หน้าแรก
                    </DropdownItem>
                    <DropdownItem
                      key="Courses"
                      startContent={<BookMarked size={18} />}
                      onPress={() => router.push("/courses")}
                      className="md:hidden"
                      classNames={{ title: "text-xl font-bold" }}
                    >
                      หลักสูตร
                    </DropdownItem>
                    <DropdownItem
                      key="Dashboard"
                      startContent={<LayoutDashboard size={18} />}
                      onPress={() => router.push("/admin")}
                      classNames={{ title: "text-xl font-bold" }}
                    >
                      แดชบอร์ด
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      startContent={<LogOut size={18} />}
                      onPress={handleLogout}
                      classNames={{ title: "text-xl font-bold" }}
                    >
                      ออกระบบ
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </div>
          </NavbarContent>
        );
      } else if (user.role === "Student") {
        // User Role
        return (
          <NavbarContent>
            <div className="flex w-full justify-end">
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
                      key="Home"
                      startContent={<Home size={18} />}
                      onPress={() => router.push("/")}
                      className="md:hidden"
                      classNames={{ title: "text-xl font-bold" }}
                    >
                      หน้าแรก
                    </DropdownItem>
                    <DropdownItem
                      key="Courses"
                      startContent={<BookMarked size={18} />}
                      onPress={() => router.push("/courses")}
                      className="md:hidden"
                      classNames={{ title: "text-xl font-bold" }}
                    >
                      หลักสูตร
                    </DropdownItem>
                    <DropdownItem
                      key="profile"
                      startContent={<BookCopy size={18} />}
                      onPress={() => router.push("/profile")}
                      classNames={{ title: "text-xl font-bold" }}
                    >
                      โปรไฟล์
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      startContent={<LogOut size={18} />}
                      onPress={handleLogout}
                      classNames={{ title: "text-xl font-bold" }}
                    >
                      ออกระบบ
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </div>
          </NavbarContent>
        );
      }
    }
    // ยังไม่ login
    return (
      <NavbarContent>
        <div className="flex w-full justify-end gap-2">
          <NavbarItem>
            <Button
              className="text-sm font-medium px-6"
              variant="flat"
              color="primary"
              onPress={() => setIsLoginOpen(true)}
            >
              เข้าสู่ระบบ
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Button
              className="text-sm font-medium px-6"
              color="primary"
              variant="shadow"
              onPress={() => setIsSignupOpen(true)}
            >
              ลงทะเบียน
            </Button>
          </NavbarItem>
        </div>
      </NavbarContent>
    );
  }, [user, setIsLoginOpen, setIsSignupOpen, handleLogout, router]);

  return (
    <HeroUINavbar
      shouldHideOnScroll
      height="30"
      maxWidth="2xl"
      className={`${fontSans.className} py-4 h-auto`}
    >
      <div className="flex items-center justify-between w-full lg:max-w-screen-md xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
        {/* Logo */}
        <NavbarContent>
          <NavbarBrand className={`${fontSans.className}`}>
            <Link className="flex justify-start items-center gap-4" href="/">
              <Image
                alt="Prachomklao College of Nursing Logo"
                src="/logo.png"
                className="h-full h-12 object-cover"
              />
              <div>
                <p className="text-md text-default-400 font-medium">
                  วิทยาลัยพยาบาล
                </p>
                <p className="text-xl font-semibold text-default-800">
                  พระจอมเกล้า
                </p>
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Navigate */}
        {navigateContent}

        {/* Profile */}
        {profileContent}
      </div>

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
