import { NavItem, SidebarNavItem } from '~/types';

export const navItems: NavItem[] = [
    {
      title: 'Email',
      href: '/dashboard',
      icon: 'mail',
      label: 'News'
    },
    {
      title: 'Students',
      href: '/dashboard/students',
      icon: 'user',
      label: 'user'
    },
    {
      title: 'Faculty',
      href: '/dashboard/faculties',
      icon: 'employee',
      label: 'employee'
    },
    {
      title: 'Profile',
      href: '/dashboard/profile',
      icon: 'profile',
      label: 'profile'
    },
    {
      title: 'Login',
      href: '/',
      icon: 'login',
      label: 'login'
    }
  ];


  export type User = {
    id: number;
    name: string;
    company: string;
    role: string;
    verified: boolean;
    status: string;
  };

  export const users: User[] = [
    {
      id: 1,
      name: 'Candice Schiner',
      company: 'Dell',
      role: 'Frontend Developer',
      verified: false,
      status: 'Active'
    },
    {
      id: 2,
      name: 'John Doe',
      company: 'TechCorp',
      role: 'Backend Developer',
      verified: true,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      company: 'WebTech',
      role: 'UI Designer',
      verified: true,
      status: 'Active'
    },
    {
      id: 4,
      name: 'David Smith',
      company: 'Innovate Inc.',
      role: 'Fullstack Developer',
      verified: false,
      status: 'Inactive'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      company: 'TechGuru',
      role: 'Product Manager',
      verified: true,
      status: 'Active'
    },
    {
      id: 6,
      name: 'James Brown',
      company: 'CodeGenius',
      role: 'QA Engineer',
      verified: false,
      status: 'Active'
    },
    {
      id: 7,
      name: 'Laura White',
      company: 'SoftWorks',
      role: 'UX Designer',
      verified: true,
      status: 'Active'
    },
    {
      id: 8,
      name: 'Michael Lee',
      company: 'DevCraft',
      role: 'DevOps Engineer',
      verified: false,
      status: 'Active'
    },
    {
      id: 9,
      name: 'Olivia Green',
      company: 'WebSolutions',
      role: 'Frontend Developer',
      verified: true,
      status: 'Active'
    },
    {
      id: 10,
      name: 'Robert Taylor',
      company: 'DataTech',
      role: 'Data Analyst',
      verified: false,
      status: 'Active'
    }
  ];


export type Student = {
    id: string;
    usn: string;
    name: string;
    email: string;
    phone: string;
    branch: string;
    section: string;
  };

export  const students: Student[] = [
    {
      id: "1",
      usn: "USN001",
      name: "Candice Schiner",
      email: "candice.schiner@example.com",
      phone: "123-456-7890",
      branch: "CSE",
      section: "A",
    },
    {
      id: "2",
      usn: "USN002",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "234-567-8901",
      branch: "ECE",
      section: "B",
    },
    {
      id: "3",
      usn: "USN003",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "345-678-9012",
      branch: "ME",
      section: "C",
    },
    {
      id: "4",
      usn: "USN004",
      name: "David Smith",
      email: "david.smith@example.com",
      phone: "456-789-0123",
      branch: "CIVIL",
      section: "D",
    },
    {
      id: "5",
      usn: "USN005",
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      phone: "567-890-1234",
      branch: "CSE",
      section: "A",
    },
    {
      id: "6",
      usn: "USN006",
      name: "James Brown",
      email: "james.brown@example.com",
      phone: "678-901-2345",
      branch: "ECE",
      section: "B",
    },
    {
      id: "7",
      usn: "USN007",
      name: "Laura White",
      email: "laura.white@example.com",
      phone: "789-012-3456",
      branch: "ME",
      section: "C",
    },
    {
      id: "8",
      usn: "USN008",
      name: "Michael Lee",
      email: "michael.lee@example.com",
      phone: "890-123-4567",
      branch: "CIVIL",
      section: "D",
    },
    {
      id: "9",
      usn: "USN009",
      name: "Olivia Green",
      email: "olivia.green@example.com",
      phone: "901-234-5678",
      branch: "CSE",
      section: "A",
    },
    {
      id: "10",
      usn: "USN010",
      name: "Robert Taylor",
      email: "robert.taylor@example.com",
      phone: "012-345-6789",
      branch: "ECE",
      section: "B",
    },
  ];
  
export type Faculty = {
    id: string;
    name: string;
    email: string;
    phone: string;
    branch: string;
    subjects: string;
  };

export  const faculty: Faculty[] = [
    {
      id: '1',
      name: 'Dr. John Smith',
      email: 'john.smith@example.com',
      phone: '123-456-7890',
      branch: 'Computer Science',
      subjects: 'Data Structures, Algorithms'
    },
    {
      id: '2',
      name: 'Prof. Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '234-567-8901',
      branch: 'Electrical Engineering',
      subjects: 'Circuit Theory, Control Systems'
    },
    {
      id: '3',
      name: 'Dr. Michael Lee',
      email: 'michael.lee@example.com',
      phone: '345-678-9012',
      branch: 'Mechanical Engineering',
      subjects: 'Thermodynamics, Fluid Mechanics'
    },
    {
      id: '4',
      name: 'Prof. Laura White',
      email: 'laura.white@example.com',
      phone: '456-789-0123',
      branch: 'Civil Engineering',
      subjects: 'Structural Analysis, Concrete Technology'
    },
    {
      id: '5',
      name: 'Dr. Robert Taylor',
      email: 'robert.taylor@example.com',
      phone: '567-890-1234',
      branch: 'Computer Science',
      subjects: 'Database Management, Software Engineering'
    }
  ];