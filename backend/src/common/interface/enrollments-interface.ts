import { Timestamp } from 'firebase-admin/firestore';

export interface Enrollment {
  id: string;
  title: string;
  urlPicture?: string;
  enrolledAt: Timestamp;
  status: string;
  progress: { current: number; total: number };
}

export interface EnrollmentData {
  id: string;
  title: string;
  enrolledAt: string;
  status: string;
}
