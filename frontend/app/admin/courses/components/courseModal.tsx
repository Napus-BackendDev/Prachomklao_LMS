"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Divider,
  Form,
} from "@heroui/react";
import { Content, MainContent } from "@/types/content";
import { CourseData, Courses } from "@/types/couses";
import CourseAccordion from "./courseAccordion";
import { Test } from "@/types/test";
import TestAccordion from "./testAccordion";

type CourseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (course: (MainContent | Content)[]) => void;
  course?: CourseData | null;
  onEdit?: (course: Courses, pretest: Test[], posttest: { question: "", options: [], correctAnswer: "", explanation: "" }[]) => void;
};

export default function CourseModal({ isOpen, onClose, onAdd, course, onEdit }: CourseModalProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [content, setContent] = useState<Content[]>([{ title: "", url: "" }]);
  const [pretest, setPretest] = useState<Test[]>([{ question: "", options: [], correctAnswer: "" }]);
  const [posttest, setPosttest] = useState<Test[]>([{ question: "", options: [], correctAnswer: "", explanation: "" }]);

  useEffect(() => {
    if (course) {
      setTitle(course.courses.title);
      setUrl(course.courses.url);
      setCode(course.courses.courseCode ?? "");
      setContent(course.courses.content ?? [{ title: "", url: "" }]);
      setPretest(course.pretest ?? [{ question: "", options: [], correctAnswer: "" }]);
      setPosttest(course.posttest ?? [{ question: "", options: [], correctAnswer: "", explanation: "" }]);
    }
  }, [course]);

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setUrl("");
      setCode("");
      setContent([{ title: "", url: "" }]);
      setPretest([{ question: "", options: [], correctAnswer: "" }]);
      setPosttest([{ question: "", options: [], correctAnswer: "", explanation: "" }]);
    }
  }, [isOpen]);

  const handleAddContent = () => {
    setContent([...content, { title: "", url: "" }]);
  };

  const handleRemoveContent = (index: number) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const handleContentChange = (index: number, field: keyof Content, value: string) => {
    const updated = [...content];
    updated[index][field] = value;
    setContent(updated);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (course && onEdit) {
      // Edit
      const editCourse: Courses = {
        title,
        url,
        courseCode: code,
        content: [...content],
      };
      onEdit(editCourse, pretest, posttest as { question: "", options: [], correctAnswer: "", explanation: "" }[]);
    } else {
      // Add
      const data = [
        {
          title,
          url,
          courseCode: code,
        },
        ...content.map((item) => ({
          title: item.title,
          url: item.url,
        })),
      ];
      onAdd(data);
    }

    onClose(); // ปิด modal หลัง submit
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      scrollBehavior="inside"
      backdrop="blur"
      size="lg"
      placement="center"
    >
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <ModalHeader className="text-xl font-bold">
            {course ? "แก้ไขหลักสูตร" : "เพิ่มหลักสูตรใหม่"}
          </ModalHeader>
          <Divider />
          <ModalBody className="flex flex-col gap-4 w-full max-h-[70vh]">
            <Input
              label="Title"
              value={title}
              onValueChange={setTitle}
              placeholder="ชื่อหลักสูตร"
              isRequired={true}
            />
            <Input
              label="URL"
              value={url}
              onValueChange={setUrl}
              placeholder="ลิงก์หลักสูตร"
              isRequired={true}
            />
            <Input
              label="Code"
              value={code}
              onValueChange={setCode}
              placeholder="รหัสหลักสูตร"
            />

            {/* Course Accordion */}
            <CourseAccordion
              content={content}
              onAddContent={handleAddContent}
              onRemoveContent={handleRemoveContent}
              onContentChange={handleContentChange}
            />

            {/* Course Accordion */}
            {!!course && onEdit ?
              (
                < TestAccordion
                  pretest={pretest}
                  setPretest={setPretest}
                  posttest={posttest}
                  setPosttest={setPosttest}
                />
              ) : <p className="text-lg text-center text-primary">Pre-test และ Post-test สามารถเพิ่มได้จากหน้าแก้ไข</p>
            }
          </ModalBody>
          <Divider />
          <ModalFooter className="w-full">
            <Button variant="light" onPress={onClose}>
              ยกเลิก
            </Button>
            <Button color="primary" type="submit">
              {course ? "ยืนยัน" : "เพิ่ม"}
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
}
