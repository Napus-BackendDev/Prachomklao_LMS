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
import { Trash } from "lucide-react";
import { Content, MainContent } from "@/types/content";
import { CourseData, Courses } from "@/types/couses";

type CourseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (course: (MainContent | Content)[]) => void;
  course?: CourseData | null;
  onEdit?: (course: Courses) => void;
};

export default function CourseModal({ isOpen, onClose, onAdd, course, onEdit }: CourseModalProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [content, setContent] = useState<Content[]>([{ title: "", url: "" }]);

  useEffect(() => {
    if (course) {
      setTitle(course.courses.title);
      setUrl(course.courses.url);
      setCode(course.courses.courseCode ?? "");
      setContent(course.courses.content ?? [{ title: "", url: "" }]);
    }
  }, [course]);

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setUrl("");
      setCode("");
      setContent([{ title: "", url: "" }]);
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
      onEdit(editCourse);
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
    >
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <ModalHeader className="text-xl font-bold">
            {course ? "แก้ไขคอร์ส" : "เพิ่มคอร์สใหม่"}
          </ModalHeader>
          <Divider />
          <ModalBody className="flex flex-col gap-4 w-full">
            <Input
              label="Title"
              value={title}
              onValueChange={setTitle}
              placeholder="ชื่อคอร์ส"
              isRequired={true}
            />
            <Input
              label="URL"
              value={url}
              onValueChange={setUrl}
              placeholder="ลิงก์คอร์ส"
              isRequired={true}
            />
            <Input
              label="Code"
              value={code}
              onValueChange={setCode}
              placeholder="รหัสคอร์ส"
            />
            <div className="space-y-4">
              <p className="font-medium">Content</p>
              {content.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    label="Content Title"
                    value={item.title}
                    onValueChange={(val) => handleContentChange(index, "title", val)}
                    placeholder="ชื่อบทเรียน"
                    className="flex-1"
                  />
                  <Input
                    label="Content URL"
                    value={item.url}
                    onValueChange={(val) => handleContentChange(index, "url", val)}
                    placeholder="ลิงก์บทเรียน"
                    className="flex-1"
                  />
                  {content.length > 1 && (
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onPress={() => handleRemoveContent(index)}
                    >
                      <Trash size="20" />
                    </Button>
                  )}
                </div>
              ))}
              <Button color="primary" variant="flat" onPress={handleAddContent}>
                + เพิ่ม Content
              </Button>
            </div>
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
