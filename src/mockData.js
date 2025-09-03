// src/mockData.js
export const mockStudents = [
  {
    id: 1,
    username: 'student1',
    email: 'john.doe@university.edu',
    firstName: 'John',
    lastName: 'Doe',
    registrationNumber: 'STU2024001',
    department: 'Computer Science',
    status: 'active',
    yearOfStudy: 4,
    phone: '+234-803-123-4567'
  },
  {
    id: 2,
    username: 'student2',
    email: 'chinedu.okoro@university.edu',
    firstName: 'Chinedu',
    lastName: 'Okoro',
    registrationNumber: 'STU2024002',
    department: 'Computer Science',
    status: 'active',
    yearOfStudy: 4,
    phone: '+234-803-456-7890'
  },
  {
    id: 3,
    username: 'student3',
    email: 'amina.mohammed@university.edu',
    firstName: 'Amina',
    lastName: 'Mohammed',
    registrationNumber: 'STU2024003',
    department: 'Electrical Engineering',
    status: 'active',
    yearOfStudy: 3,
    phone: '+234-802-345-6789'
  },
  {
    id: 4,
    username: 'student4',
    email: 'tunde.adeyemi@university.edu',
    firstName: 'Tunde',
    lastName: 'Adeyemi',
    registrationNumber: 'STU2024004',
    department: 'Computer Science',
    status: 'active',
    yearOfStudy: 4,
    phone: '+234-805-678-9012'
  },
  {
    id: 5,
    username: 'student5',
    email: 'grace.okafor@university.edu',
    firstName: 'Grace',
    lastName: 'Okafor',
    registrationNumber: 'STU2024005',
    department: 'Computer Science',
    status: 'active',
    yearOfStudy: 4,
    phone: '+234-806-789-0123'
  },
  {
    id: 6,
    username: 'student6',
    email: 'emmanuel.bello@university.edu',
    firstName: 'Emmanuel',
    lastName: 'Bello',
    registrationNumber: 'STU2024006',
    department: 'Electrical Engineering',
    status: 'active',
    yearOfStudy: 3,
    phone: '+234-807-890-1234'
  }
];

export const mockSupervisors = [
  {
    id: 101,
    username: 'drsmith',
    email: 'sarah.smith@university.edu',
    firstName: 'Sarah',
    lastName: 'smith',
    staffId: 'LEC2024001',
    department: 'Computer Science',
    status: 'active',
    capacity: 5,
    position: 'Associate Professor',
    expertise: ['Artificial Intelligence', 'Machine Learning'],
    rating: 4.8,
    office: 'Block C, Room 305',
    officeHours: 'Monday-Wednesday: 10AM-4PM',
    phone: '+234-801-234-5678'
  },
  {
    id: 102,
    username: 'drroberts',
    email: 'michael.roberts@university.edu',
    firstName: 'Michael',
    lastName: 'Roberts',
    staffId: 'LEC2024002',
    department: 'Electrical Engineering',
    status: 'active',
    capacity: 4,
    position: 'Professor',
    expertise: ['Internet of Things', 'Embedded Systems'],
    rating: 4.7,
    office: 'Block D, Room 210',
    officeHours: 'Tuesday-Thursday: 9AM-3PM',
    phone: '+234-802-345-6789'
  }
];

export const mockTopics = [
  {
    id: 1,
    title: 'AI-Based Project Topic Duplication Detection System',
    description: 'Develop a machine learning system to detect duplicate project topics using natural language processing and similarity algorithms',
    department: 'Computer Science',
    status: 'allocated',
    createdAt: '2025-01-10',
    studentId: 1,
    supervisorId: 101
  },
  {
    id: 2,
    title: 'Blockchain-based Secure Voting System',
    description: 'Secure voting system using blockchain technology',
    department: 'Computer Science',
    status: 'allocated',
    createdAt: '2025-01-12',
    studentId: 2,
    supervisorId: 101
  },
  {
    id: 3,
    title: 'IoT-based Smart Classroom Monitoring',
    description: 'Real-time classroom monitoring using IoT sensors',
    department: 'Electrical Engineering',
    status: 'allocated',
    createdAt: '2025-01-15',
    studentId: 3,
    supervisorId: 102
  },
  {
    id: 4,
    title: 'Mobile Health Diagnosis Assistant',
    description: 'AI-powered mobile app for health diagnosis assistance',
    department: 'Computer Science',
    status: 'available',
    createdAt: '2025-02-01',
    studentId: null,
    supervisorId: 101
  },
  {
    id: 5,
    title: 'Renewable Energy Monitoring System',
    description: 'IoT system to monitor solar panel efficiency',
    department: 'Electrical Engineering',
    status: 'available',
    createdAt: '2025-02-05',
    studentId: null,
    supervisorId: 102
  }
];

export const mockAllocations = [
  {
    id: 1,
    studentId: 1,
    student: 'student1',
    supervisorId: 101,
    supervisor: 'drsmith',
    topic: 'AI-Based Project Topic Duplication Detection System',
    status: 'accepted',
    allocatedDate: '2025-01-10',
    deadline: '2025-05-15'
  },
  {
    id: 2,
    studentId: 2,
    student: 'student2',
    supervisorId: 101,
    supervisor: 'drsmith',
    topic: 'Blockchain-based Secure Voting System',
    status: 'accepted',
    allocatedDate: '2025-01-12',
    deadline: '2025-05-15'
  },
  {
    id: 3,
    studentId: 3,
    student: 'student3',
    supervisorId: 102,
    supervisor: 'drroberts',
    topic: 'IoT-based Smart Classroom Monitoring',
    status: 'accepted',
    allocatedDate: '2025-01-15',
    deadline: '2025-05-15'
  }
];