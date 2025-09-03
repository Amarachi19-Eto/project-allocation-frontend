// mockData.js
export const mockStudents = [
  {
    id: 1,
    username: 'STU2024001',
    password: 'hashed_password_1',
    email: 'student1@university.edu',
    firstName: 'John',
    lastName: 'Doe',
    registrationNumber: 'STU2024001',
    department: 'Computer Science',
    yearOfStudy: 4,
    phone: '+234-800-000-0001',
    isAssigned: true
  },
  {
    id: 2,
    username: 'STU2024002',
    password: 'hashed_password_2',
    email: 'student2@university.edu',
    firstName: 'Chinedu',
    lastName: 'Okoro',
    registrationNumber: 'STU2024002',
    department: 'Computer Science',
    yearOfStudy: 4,
    phone: '+234-800-000-0002',
    isAssigned: true
  },
  {
    id: 3,
    username: 'STU2024003',
    password: 'hashed_password_3',
    email: 'student3@university.edu',
    firstName: 'Amina',
    lastName: 'Mohammed',
    registrationNumber: 'STU2024003',
    department: 'Computer Science',
    yearOfStudy: 4,
    phone: '+234-800-000-0003',
    isAssigned: true
  },
  {
    id: 4,
    username: 'STU2024004',
    password: 'hashed_password_4',
    email: 'student4@university.edu',
    firstName: 'Tunde',
    lastName: 'Adeyemi',
    registrationNumber: 'STU2024004',
    department: 'Computer Science',
    yearOfStudy: 4,
    phone: '+234-800-000-0004',
    isAssigned: true
  }
];

export const mockSupervisors = [
  {
    id: 101,
    username: 'drsmith',
    password: 'hashed_password_smith',
    email: 's.smith@university.edu',
    firstName: 'Sarah',
    lastName: 'Smith',
    staffId: 'LEC101',
    department: 'Computer Science',
    position: 'Senior Lecturer',
    maxProjects: 5,
    currentProjects: 3,
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Natural Language Processing'],
    rating: 4.8,
    office: 'Block A, Room 101',
    officeHours: 'Monday-Wednesday: 10AM-4PM',
    phone: '+234-801-234-5678'
  },
  {
    id: 102,
    username: 'drroberts',
    password: 'hashed_password_roberts',
    email: 'm.roberts@university.edu',
    firstName: 'Michael',
    lastName: 'Roberts',
    staffId: 'LEC102',
    department: 'Electrical Engineering',
    position: 'Professor',
    maxProjects: 6,
    currentProjects: 2,
    expertise: ['Power Systems', 'Renewable Energy', 'Control Systems'],
    rating: 4.9,
    office: 'Block B, Room 205',
    officeHours: 'Tuesday-Thursday: 9AM-3PM',
    phone: '+234-802-345-6789'
  }
];

export const mockTopics = [
  {
    id: 1,
    title: "AI-Based Project Topic Duplication Detection System",
    description: "Develop a machine learning system to detect duplicate project topics using natural language processing and similarity algorithms",
    department: "Computer Science",
    status: "pending",
    studentId: 1,
    supervisorId: 101,
    createdAt: "2024-12-01"
  },
  {
    id: 2,
    title: "Blockchain-based Secure Voting System",
    description: "Design and implement a secure, transparent voting system using blockchain technology",
    department: "Computer Science",
    status: "allocated",
    studentId: 2,
    supervisorId: 101,
    createdAt: "2024-12-01"
  },
  {
    id: 3,
    title: "IoT-based Smart Classroom Monitoring System",
    description: "Develop an IoT solution for monitoring classroom occupancy and environmental conditions",
    department: "Computer Science",
    status: "allocated",
    studentId: 3,
    supervisorId: 101,
    createdAt: "2024-12-01"
  },
  {
    id: 4,
    title: "Renewable Energy Microgrid Design for Rural Communities",
    description: "Design a sustainable microgrid system using solar and wind energy for off-grid communities",
    department: "Electrical Engineering",
    status: "allocated",
    studentId: 4,
    supervisorId: 102,
    createdAt: "2024-12-01"
  },
  {
    id: 5,
    title: "Machine Learning for Predictive Maintenance in Industrial Equipment",
    description: "Develop ML models to predict equipment failures and schedule maintenance",
    department: "Computer Science",
    status: "available",
    studentId: null,
    supervisorId: null,
    createdAt: "2024-12-01"
  }
];

export const mockAllocations = [
  {
    id: 1,
    studentId: 1,
    supervisorId: 101,
    topicId: 1,
    status: "pending",
    allocatedDate: "2025-01-15",
    deadline: "2025-05-15"
  },
  {
    id: 2,
    studentId: 2,
    supervisorId: 101,
    topicId: 2,
    status: "pending",
    allocatedDate: "2025-01-15",
    deadline: "2025-05-15"
  },
  {
    id: 3,
    studentId: 3,
    supervisorId: 101,
    topicId: 3,
    status: "pending",
    allocatedDate: "2025-01-15",
    deadline: "2025-05-15"
  },
  {
    id: 4,
    studentId: 4,
    supervisorId: 102,
    topicId: 4,
    status: "pending",
    allocatedDate: "2025-01-15",
    deadline: "2025-05-15"
  }
];

