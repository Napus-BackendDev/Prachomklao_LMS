# 📚 Prachomklao LMS

> Online Learning Management System for Prachomklao Nursing College, Phetchaburi

![Prachomklao LMS](/assets/homepage.png)

## 🌟 About The Project

**Prachomklao LMS** is a Learning Management System developed to support pediatric and adolescent nursing education. It focuses on integrating modern educational technology with real-world experience to prepare students for practical training.

### 🎯 Main Objectives
- **User-Friendly** - Intuitive UI/UX design for users of all levels
- **Beautiful Interface** - Modern design that is attractive and convenient to use
- **Dynamic System** - Flexible content management and course administration

## 🌐 Demo & Deployment

- **Website URL**: [https://prachomklao-lms-bice.vercel.app/](https://prachomklao-lms-bice.vercel.app/)
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render

## 🏛️ System Architecture

### Tech Stack

#### Frontend
- **Framework**: Next.js 15.3.1 (React 18.3.1)
- **UI Library**: HeroUI (NextUI-based components)
- **Styling**: Tailwind CSS 4.1.11
- **Charts**: Chart.js + React-ChartJS-2
- **Icons**: Lucide React
- **State Management**: React Hooks & Custom Hooks
- **Type Safety**: TypeScript

#### Backend
- **Framework**: NestJS 11.0.1
- **Runtime**: Node.js 22
- **Authentication**: JWT + Passport.js
- **Validation**: Class Validator & Class Transformer
- **Password Hashing**: bcrypt

#### Database & Storage
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Admin SDK
- **File Storage**: Firebase Storage

#### Deployment
- **Frontend**: Vercel
- **Backend**: Render + Firebase Functions
- **CI/CD**: Automated deployment via Git

## 📱 Key Features

### 🔐 Authentication System
- User registration
- Email/Password login
- Password reset
- JWT Token Authentication
- Role-based Authorization (Admin/Student)

### 👨‍🎓 Student Features
- **Homepage**: Overview and welcome interface
- **Course Catalog**: Browse and select courses of interest
- **Course Enrollment**: Register for desired courses
- **Progress Tracking**: Progress bar showing learning advancement

### 📚 Learning Management System
- **Pre-test**: Assess initial knowledge
- **Learning Content**: Videos and learning materials
- **Post-test**: Evaluate learning outcomes
- **Test Results**: Display scores and incorrect answers
- **Grading System**: Automatic scoring and calculation

### 👨‍💼 Admin Dashboard
- **Main Dashboard**: 
  - Total user statistics
  - Total course count
  - Weekly new user charts
  - Course registration by category charts
  - Recent users table

- **User Management**:
  - View all users list
  - Search users
  - View user course enrollment details
  - View individual test scores

- **Course Management**:
  - Add/Edit/Delete courses
  - Upload learning content
  - Create Pre-test and Post-test questions
  - Configure answer options and explanations

## 🗂️ Project Structure

### Frontend Structure
```
frontend/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin Dashboard
│   │   ├── courses/       # Course Management
│   │   ├── users/         # User Management
│   │   └── page.tsx       # Dashboard หลัก
│   ├── courses/           # Course Pages
│   ├── enroll/            # Learning Environment
│   └── profile/           # User Profile
├── components/            # Reusable Components
│   ├── ui/               # UI Components
│   ├── navbar.tsx        # Navigation Bar
│   └── footer.tsx        # Footer
├── hooks/                # Custom React Hooks
│   ├── useAuth.ts        # Authentication
│   ├── useCourses.ts     # Course Management
│   ├── useUser.ts        # User Management
│   ├── useEnroll.ts      # Enrollment
│   ├── usePretest.ts     # Pre-test
│   └── usePosttest.ts    # Post-test
├── types/                # TypeScript Types
└── public/               # Static Assets
```

### Backend Structure
```
backend/
├── src/
│   ├── module/
│   │   ├── core/
│   │   │   ├── auth/      # Authentication Module
│   │   │   └── user/      # User Management Module
│   │   ├── courses/       # Course Management Module
│   │   ├── enrollments/   # Enrollment Module
│   │   ├── pretest/       # Pre-test Module
│   │   └── posttest/      # Post-test Module
│   ├── common/
│   │   ├── interface/     # Type Definitions
│   │   └── utils/         # Utility Functions
│   └── seed/              # Database Seeders
└── config/                # Configuration Files
```

## 🚀 Installation and Usage

### System Requirements
- Node.js 18+ 
- npm or pnpm
- Firebase Account

### 1. Clone Repository
```bash
git clone https://github.com/Napus-BackendDev/Prachomklao_LMS.git
cd Prachomklao_LMS
```

### 2. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
# หรือ
pnpm install
```

#### Backend
```bash
cd backend
npm install
# หรือ
pnpm install
```

### 3. Environment Variables Setup

#### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=your-url-backend
```

#### Backend (.env)
```env
PORT=your-port-backend
JWT_SECRET=your-jwt-secret-key
CORS_ORIGIN=your-url-frontend
ADMIN_EMAIL=your-email
ADMIN_PASSWORD=your-password
# Firebase Admin SDK credentials 
```

### 4. Firebase Setup
1. Create Firebase Project
2. Enable Firestore Database
3. Create Service Account Key
4. Place credentials file in `backend/config/` folder
5. Change file name tobe firebasekey.json
6. Close this code line 
```bash
const serviceAccount = JSON.parse(
  readFileSync('/etc/secrets/firebasekey.json', 'utf8'),
);
```
7. Open this code line
```bash
const serviceAccount = JSON.parse(
   readFileSync(path.resolve(process.cwd(), 'config/firebasekey.json'), 'utf8'),
);
```

### 5. Run Project

#### Development Mode

**Backend (Port 3001)**
```bash
cd backend
npm run dev
```

**Frontend (Port 3000)**
```bash
cd frontend
npm run dev
```

#### Production Build

**Backend**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend**
```bash
cd frontend
npm run build
npm run start
```

##  Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password encryption
- **Role-based Access Control**: Access control based on user roles
- **HTTP-only Cookies**: Protection against XSS attacks
- **CORS Configuration**: Secure API access configuration
- **Input Validation**: Comprehensive input data validation

## 🎨 UI/UX Features

- **Responsive Design**: Support for all screen sizes
- **Dark/Light Mode**: Multiple theme support
- **Loading States**: Skeleton and Spinner for loading feedback
- **Error Handling**: User-friendly error messages
- **Smooth Animations**: Fluid animations and transitions
- **Accessible**: Accessibility support for users with disabilities

## 🛣️ API Endpoints

### Authentication
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `POST /auth/logout` - User logout
- `POST /register` - User registration
- `POST /resetpassword` - Password reset

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course by ID
- `POST /courses` - Create new course (Admin)
- `PATCH /courses/:id` - Update course (Admin)
- `DELETE /courses/:id` - Delete course (Admin)

### Enrollments
- `POST /student/enrollments/:courseId` - Enroll in course
- `GET /student/enrollments` - Get enrolled courses
- `PATCH /student/enrollments/:courseId/progress` - Update progress

### Tests
- `POST /student/courses/:courseId/answer/pretest` - Submit Pre-test answers
- `GET /student/courses/:courseId/answer/pretest` - Get Pre-test results
- `POST /student/courses/:courseId/answer/posttest` - Submit Post-test answers
- `GET /student/courses/:courseId/answer/posttest` - Get Post-test results

### Admin
- `GET /admin` - Get all users
- `GET /admin/weekly-users` - Weekly user statistics
- `GET /admin/:id` - Get user by ID

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Development Team

**Napus-BackendDev Team**
- University of Phayao
- Prachomklao Nursing College, Phetchaburi

---

## 📞 Contact

For questions or suggestions, please contact us through:
- **Repository**: [Prachomklao_LMS](https://github.com/Napus-BackendDev/Prachomklao_LMS)
- **Issues**: [GitHub Issues](https://github.com/Napus-BackendDev/Prachomklao_LMS/issues)

---

<div align="center">
  <p>🌟 Made with ❤️ for Education 🌟</p>
  <p>© 2025 Prachomklao LMS - All Rights Reserved</p>
</div>