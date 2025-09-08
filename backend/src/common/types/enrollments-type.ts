import { Timestamp } from 'firebase-admin/firestore';

export interface Enrollment {
  id: string;
  title: string;
  code: string;
  enrolledAt: Timestamp;
  status: string;
}

export interface EnrollmentData {
  id: string;
  title: string;
  code: string;
  enrolledAt: string;
  status: string;
}
