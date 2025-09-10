import { Timestamp } from 'firebase-admin/firestore';

export interface Enrollment {
  id: string;
  title: string;
  urlPicture?: string
  enrolledAt: Timestamp;
  status: string;
}

export interface EnrollmentData {
  id: string;
  title: string;
  enrolledAt: string;
  status: string;
}
