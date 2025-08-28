"use client";

import {
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Image } from "@heroui/image";
import { Users, FileText, Target, User } from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { RegisterCourseModal } from "./components/registerCourseModal";
import { pretestModal } from "./components/pretestModal";
import { posttestModal } from "./components/posttestModal";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

export default function CoursesPage() {
  // ตัวอย่างข้อมูล
  const examList = [
    { title: "แบบทดสอบก่อนเรียน", count: 5 },
    { title: "แบบทดสอบหลังเรียน", count: 10 },
    { title: "แบบประเมินบทเรียน", count: 5 },
  ];

  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  const [showVideo, setShowVideo] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showPosttest, setShowPosttest] = useState(false);
  const [showPretest, setShowPretest] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (showVideo) {
      // โหลด YouTube IFrame API
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }

      // รอให้ YT พร้อม
      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player("yt-player", {
          events: {
            onStateChange: (event: any) => {
              // 0 = ended
              if (event.data === 0) {
                setShowPosttest(true);
              }
            },
          },
        });
      };

      // ถ้า YT โหลดแล้ว
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player("yt-player", {
          events: {
            onStateChange: (event: any) => {
              if (event.data === 0) {
                setShowPosttest(true);
              }
            },
          },
        });
      }
    }
    // eslint-disable-next-line
  }, [showVideo]);

  return (
    <div className="flex flex-col w-full px-8 py-4">
      <h1 className="text-3xl font-extrabold">Course</h1>
      <hr className="flex-1 border-t border-gray-300" aria-hidden="true" />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
        {/* LEFT */}
        <div className="flex flex-col justify-center items-center gap-6 ">
          {!showVideo ? (
            <Image
              src="https://img.youtube.com/vi/hFgiweAHkXQ/0.jpg"
              className="w-full max-w-[650px] aspect-video object-cover"
              alt="course"
            />
          ) : (
            <div className="w-full max-w-[650px] aspect-video">
              <div id="yt-player-container" className="w-full h-full">
                <iframe
                  id="yt-player"
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/hFgiweAHkXQ?enablejsapi=1"
                  title="course video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg w-full h-full"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            </div>
          )}

          <Card className="flex py-5 px-4">
            <div className="mb-2">
              <span className="font-bold">หัวข้อ :</span>{" "}
              การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้เครื่องช่วยหายใจ(Ventilator)
            </div>
            <div className="mb-2">
              <span className="font-bold">รายละเอียด :</span>{" "}
              เครื่องช่วยหายใจ(Ventilator)
              คืออุปกรณ์ที่ช่วยหรือควบคุมการหายใจของผู้ป่วยที่ไม่สามารถหายใจเองได้เพียงพอโดยควบคุมปริมาตรลมหายใจเข้า/ออก
              ความถี่และแรงดันให้เหมาะสมกับความต้องการของผู้ป่วย
            </div>
            <Button color="primary" variant="shadow" size="md" onPress={onOpen}>
              สมัคร Course
            </Button>

            <RegisterCourseModal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              setShowPretest={setShowPretest}
            />
            {pretestModal({
              showPretest,
              setShowPretest,
              setShowVideo,
            })}

            {posttestModal({
              showPosttest,
              setShowPosttest,
              setShowAssessment,
            })}

            <Modal
              isOpen={showAssessment}
              placement="top-center"
              onOpenChange={setShowAssessment}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader>แบบประเมิน หลักสูตรออนไลน์</ModalHeader>
                    <ModalBody>
                      <div>
                        <p>1. ตัวอย่างคำถาม แบบประเมิน</p>
                        <Input label="คำตอบของคุณ" />
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={() => onClose()}>
                        ส่งคำตอบ
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </Card>
        </div>
        {/* RIGHT */}
        <Card className="flex flex-col justify-between px-6 py-4 gap-4">
          {/* Exams */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Target /> รายละเอียดแบบทดสอบในคอร์สนี้
              </div>
            </div>
            {examList.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border border-blue-400 rounded px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <FileText className="text-blue-500" size={20} />
                  {item.title}
                </div>
                <span className="text-blue-600">จำนวน {item.count} ข้อ</span>
              </div>
            ))}
          </div>
          {/* Users */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Users /> จำนวน คนที่สมัครคอร์สนี้ไปแล้ว
              </div>
              <span className="text-blue-600 font-semibold">จำนวน 10 คน</span>
            </div>
            <Table
              aria-label="Example table with dynamic content"
              className="mt-5"
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>
    </div>
  );
}
