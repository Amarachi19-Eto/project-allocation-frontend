// mockData.js - Updated with correct topics and better duplicate detection

export const mockStudents = [
  {
    id: 1,
    username: 'etokwudo.amala',
    firstName: 'Etokwudo',
    lastName: 'Amala Cynthia',
    registrationNumber: 'STU2024001',
    department: 'Computer Science',
    email: 'etokwudo.amala@university.edu',
    status: 'active',
    yearOfStudy: 4,
    phone: '+234-810-000-0001'
  },
  {
    id: 2,
    username: 'eze.chisom',
    firstName: 'Eze',
    lastName: 'Chisom Emmanuel',
    registrationNumber: 'STU2024002',
    department: 'Computer Science',
    email: 'eze.chisom@university.edu',
    status: 'active',
    yearOfStudy: 4,
    phone: '+234-810-000-0002'
  },
  {
    id: 3,
    username: 'enweani.emmanuel',
    firstName: 'Enweani',
    lastName: 'Emmanuel Ebube',
    registrationNumber: 'STU2024003',
    department: 'Computer Science',
    email: 'enweani.emmanuel@university.edu',
    status: 'active',
    yearOfStudy: 4,
    phone: '+234-810-000-0003'
  },
  {
    id: 4,
    username: 'nweke.arinze',
    firstName: 'Nweke',
    lastName: 'Arinze Michael',
    registrationNumber: 'STU2024004',
    department: 'Computer Science',
    email: 'nweke.arinze@university.edu',
    status: 'active',
    yearOfStudy: 4,
    phone: '+234-810-000-0004'
  }
];

export const mockSupervisors = [
  {
    id: 1,
    username: 'g.anigbogu',
    firstName: 'Gloria',
    lastName: 'N. Anigbogu',
    staffId: 'LEC2024001',
    department: 'Computer Science',
    email: 'g.anigbogu@university.edu',
    status: 'active',
    capacity: 5,
    position: 'Senior Lecturer',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Natural Language Processing'],
    rating: 4.8,
    office: 'Jupeb Building, Science Village',
    officeHours: 'Monday-Wednesday: 10AM-4PM',
    phone: '+234-810-038-2660'
  },
  {
    id: 2,
    username: 'v.ejiofor',
    firstName: 'V.E',
    lastName: 'Ejiofor',
    staffId: 'LEC2024002',
    department: 'Computer Science',
    email: 'v.ejiofor@university.edu',
    status: 'active',
    capacity: 5,
    position: 'Professor',
    expertise: ['Renewable Energy Systems', 'Power Electronics', 'Microgrid Design'],
    rating: 4.9,
    office: 'Engineering Block, Room 205',
    officeHours: 'Tuesday-Thursday: 9AM-3PM',
    phone: '+234-810-038-2661'
  }
];

export const mockTopics = [
  {
    id: 1,
    title: 'Student Project Topic Allocation System for Monitoring Duplication',
    description: 'Develop a comprehensive system to manage student project topic allocation with duplicate detection and monitoring capabilities',
    department: 'Computer Science',
    status: 'allocated',
    studentId: 1,
    createdAt: '2024-01-10'
  },
  {
    id: 2,
    title: 'Blockchain-based Secure Voting System',
    description: 'Design and implement a secure, transparent voting system using blockchain technology to ensure election integrity',
    department: 'Computer Science',
    status: 'allocated',
    studentId: 2,
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    title: 'Product Expiry Alert Management System (PEAMS)',
    description: 'Develop an intelligent system to track product expiry dates and send automated alerts to users and administrators',
    department: 'Computer Science',
    status: 'allocated',
    studentId: 3,
    createdAt: '2024-01-10'
  },
  {
    id: 4,
    title: 'Renewable Energy Microgrid Design for Rural Communities',
    description: 'Design a sustainable microgrid system using solar and wind energy for off-grid communities in rural areas',
    department: 'Computer Science',
    status: 'allocated',
    studentId: 4,
    createdAt: '2024-01-10'
  },
];

export const mockAllocations = [
  {
    id: 1,
    studentId: 1,
    student: 'etokwudo.amala',
    supervisorId: 1,
    supervisor: 'g.anigbogu',
    topic: 'Student Project Topic Allocation System for Monitoring Duplication',
    topicId: 1,
    status: 'pending',
    allocatedDate: '2025-01-15',
    deadline: '2025-05-15'
  },
  {
    id: 2,
    studentId: 2,
    student: 'eze.chisom',
    supervisorId: 1,
    supervisor: 'g.anigbogu',
    topic: 'Blockchain-based Secure Voting System',
    topicId: 2,
    status: 'accepted',
    allocatedDate: '2025-01-15',
    deadline: '2025-05-15'
  },
  {
    id: 3,
    studentId: 3,
    student: 'enweani.emmanuel',
    supervisorId: 1,
    supervisor: 'g.anigbogu',
    topic: 'Product Expiry Alert Management System (PEAMS)',
    topicId: 3,
    status: 'pending',
    allocatedDate: '2025-01-15',
    deadline: '2025-05-15'
  },
  {
    id: 4,
    studentId: 4,
    student: 'nweke.arinze',
    supervisorId: 2,
    supervisor: 'v.ejiofor',
    topic: 'Renewable Energy Microgrid Design for Rural Communities',
    topicId: 4,
    status: 'pending',
    allocatedDate: '2025-01-15',
    deadline: '2025-05-15'
  }
];

// Mock messages and feedback
export const mockMessages = [
  {
    id: 1,
    studentId: 1,
    supervisorId: 1,
    type: 'progress',
    message: 'Great progress on the literature review. Please focus more on recent publications from 2024-2025.',
    date: '2025-01-25',
    read: true
  },
  {
    id: 2,
    studentId: 1,
    supervisorId: 1,
    type: 'suggestion',
    message: 'Your project proposal needs more detailed methodology section. Let\'s discuss this in our next meeting.',
    date: '2025-01-20',
    read: true
  },
  {
    id: 3,
    studentId: 1,
    supervisorId: 1,
    type: 'praise',
    message: 'Well done on completing the initial requirements analysis. The use case diagrams are clear and comprehensive.',
    date: '2025-01-15',
    read: true
  }
];

// Mock co-students data
export const mockCoStudents = [
  {
    id: 2,
    name: 'Eze Chisom Emmanuel',
    registrationNumber: 'STU2024002',
    email: 'eze.chisom@university.edu',
    project: 'Blockchain-based Secure Voting System',
    status: 'accepted'
  },
  {
    id: 3,
    name: 'Enweani Emmanuel Ebube',
    registrationNumber: 'STU2024003',
    email: 'enweani.emmanuel@university.edu',
    project: 'Product Expiry Alert Management System (PEAMS)',
    status: 'pending'
  }
];