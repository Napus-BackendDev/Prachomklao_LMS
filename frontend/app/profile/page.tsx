"use client";
import useAuth from "@/hooks/useAuth";
import { useState, useMemo, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, Pencil, X } from "lucide-react";
import CourseCard from "@/components/ui/courseCard";
import { Button } from "@heroui/button";
import useEnroll from "@/hooks/useEnroll";
import { formatDate } from "@/public/util/fromatData";
import { Card, Input } from "@heroui/react";
import useUser from "@/hooks/useUser";

export default function ProfilePage() {
  const { user, fetchProfile, loading: authLoading } = useAuth();
  const { updateUser, loading: userLoading } = useUser();
  const { enrolled, loading: enrollLoading } = useEnroll();

  const courses = user?.courses ?? [];
  const displayAmount = 3;
  const [displayCourse, setDisplayCourse] = useState(0);
  const userDate = formatDate(user?.createdAt ?? "");
  const isLoading = authLoading || userLoading || enrollLoading;

  const handlePrev = () => {
    setDisplayCourse((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setDisplayCourse((prev) =>
      Math.min(prev + 1, courses.length - displayAmount)
    );
  };

  const [isUsernameEditing, setIsUsernameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCancel = () => {
    setShowEditModal(false);
    setIsUsernameEditing(false);
    setIsEmailEditing(false);
    setNewUsername(user?.username ?? "");
    setNewEmail(user?.email ?? "");
  };

  const handleSubmitEdit = async () => {
    const updatedData: Record<string, string> = {};
    if (newUsername !== user?.username) updatedData.username = newUsername;
    if (newEmail !== user?.email) updatedData.email = newEmail;

    if (Object.keys(updatedData).length === 0) return;

    const res = await updateUser(updatedData);
    if (res) window.location.reload();
  }

  useEffect(() => {
    if (!user) return;
    setNewUsername(user?.username);
    setNewEmail(user?.email);
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-10 py-10 gap-8">
      <p className="text-4xl sm:text-5xl font-bold text-primary mb-2 text-center">โปรไฟล์</p>

      {/* Profile Card */}
      <div className="flex flex-col sm:flex-row gap-6 border border-blue-100 bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-3xl">

        {/* User Information */}
        <div className="flex flex-col flex-1 gap-2 text-center sm:text-left">
          {/* Username */}
          {!isUsernameEditing ? (
            <div className="flex items-center gap-2">
              <p className="text-xl sm:text-2xl font-semibold text-gray-800">{user?.username}</p>
              <Pencil size={16} className="text-gray-600 cursor-pointer" onClick={() => setIsUsernameEditing(true)} />
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  variant="underlined"
                  value={newUsername}
                  onChange={(e) => {
                    setNewUsername(e.target.value);
                    setShowEditModal(true);
                  }}
                  classNames={{
                    input: "text-xl"
                  }}
                />
                <X
                  size={16}
                  className="text-gray-600 cursor-pointer"
                  onClick={() => {
                    setIsUsernameEditing(false);
                    setNewUsername(user?.username ?? "");
                    setShowEditModal(false)
                  }}
                />
              </div>
            </div>
          )}

          {/* Email */}
          {!isEmailEditing ? (
            <div className="flex items-center gap-2">
              <p className="text-lg sm:text-xl text-gray-500">{user?.email}</p>
              <Pencil size={16} className="text-gray-600 cursor-pointer" onClick={() => setIsEmailEditing(true)} />
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  variant="underlined"
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                    setShowEditModal(true);
                  }}
                  classNames={{
                    input: "text-xl"
                  }}
                />
                <X
                  size={16}
                  className="text-gray-600 cursor-pointer"
                  onClick={() => {
                    setIsEmailEditing(false);
                    setNewEmail(user?.email ?? "");
                    setShowEditModal(false)
                  }}
                />
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2 justify-center sm:justify-start text-gray-600 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="font-medium">เข้าระบบเมื่อ:</span>
              <span>{userDate}</span>
            </div>
          </div>
        </div>

        {/* Courses Progression */}
        <div className="flex gap-3 mt-4 sm:mt-0">
          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-gradient-to-tr from-yellow-100 to-yellow-50 shadow text-yellow-700 min-w-[90px] sm:min-w-[110px]">
            <span className="text-2xl sm:text-3xl font-bold">
              {enrolled.filter((c) => c.status === "In progress").length}
            </span>
            <span className="mt-1 text-sm sm:text-base font-semibold">กำลังเรียน</span>
          </div>
          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-gradient-to-tr from-blue-100 to-blue-50 shadow text-blue-700 min-w-[90px] sm:min-w-[110px]">
            <span className="text-2xl sm:text-3xl font-bold">
              {enrolled.filter((c) => c.status === "Completed").length}
            </span>
            <span className="mt-1 text-sm sm:text-base font-semibold">เรียนเสร็จแล้ว</span>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <section
        id="courses"
        className="flex flex-col items-center justify-center py-6 space-y-6 w-full"
      >
        <p className="text-3xl sm:text-4xl font-semibold mb-2 text-gray-700 text-center">
          เรียนต่อ
        </p>

        <div className="flex items-center gap-2 sm:gap-4 w-full justify-center">
          {courses.length > 0 && (
            <Button
              isIconOnly
              color={displayCourse === 0 ? "default" : "primary"}
              variant="flat"
              onPress={handlePrev}
              disabled={displayCourse === 0}
              className={displayCourse === 0 ? "" : "hover:scale-105"}
            >
              <ChevronLeft />
            </Button>
          )}

          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${displayCourse * (100 / displayAmount)}%)`,
              }}
            >
              {enrolled.map((course) => (
                <div
                  key={course.id}
                  className="shrink-0 w-[80%] sm:w-[33.3333%] p-2 sm:p-4"
                >
                  <CourseCard
                    title={course.title}
                    id={course.id ?? ""}
                    picture={course.urlPicture ?? ""}
                  />
                </div>
              ))}
            </div>
          </div>

          {courses.length > displayAmount && (
            <Button
              isIconOnly
              color={
                displayCourse === courses.length - displayAmount
                  ? "default"
                  : "primary"
              }
              variant="flat"
              onPress={handleNext}
              disabled={displayCourse === courses.length - displayAmount}
              className={
                displayCourse === courses.length - displayAmount
                  ? ""
                  : "hover:scale-105"
              }
            >
              <ChevronRight />
            </Button>
          )}
        </div>

        {courses.length === 0 && (
          <div className="text-gray-400 text-lg mt-8 text-center">
            คุณยังไม่ได้สมัครคอร์ส
          </div>
        )}
      </section>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50">
          <Card className="py-8 px-16 flex flex-col items-center">
            <p className="text-2xl mb-2">ต้องการบันทึกการเปลี่ยนแปลงหรือไม่?</p>
            <div className="flex gap-2">
              <Button size="lg" variant="flat" color="danger" onPress={handleCancel}>
                ยกเลิก
              </Button>
              <Button size="lg" className="text-white" color="success" onPress={handleSubmitEdit}>
                ยืนยัน
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
