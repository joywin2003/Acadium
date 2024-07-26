# Acadium - A Centralized College Management System

Acadium is a comprehensive college management platform designed to streamline administrative tasks, enhance communication, and optimize resource management within educational institutions. The platform offers significant potential for future enhancements and additional functionalities.

## Current Features

### Centralized Communication System
- Acadium includes a centralized email-like system that allows administrators to send messages directly to students and faculty. This system serves as a dedicated platform for college-related communications, eliminating the need to sift through personal emails or WhatsApp messages.
- For instance, a secretary can issue a circular within Acadium, ensuring that all relevant information is easily accessible and organized.

### Faculty and Student Information Access
- Students can view detailed information about their faculty, including contact details and professional profiles, all in one place.
- Faculty members can access information about their students, including details across various batches, years, and departments, facilitating better management and communication.

### Enhanced Messaging Features
- The messaging system in Acadium supports a variety of content, including text, images, and attachments, ensuring comprehensive and versatile communication.

### Authentication and Authorization
- **NextAuth.js Integration**: Acadium uses NextAuth.js for authentication and authorization, promoting secure, passwordless sign-in and adhering to best practices for security.
  - **Security Features**:
    - Cross-Site Request Forgery Tokens.
    - Encrypted JSON Web Tokens (JWE) with A256GCM.
    - Auto-generated symmetric signing and encryption keys.
    - Supports tab/window syncing and keepalive messages.
- **User Management**: Only college authorities can register students and faculty, ensuring controlled access and secure login for users.

### Data Management
- **React Query**: Utilizes React Query for efficient data fetching and caching of mails, students, profiles, and faculty.
- **Server Actions**: Implements Next.js Server Actions for asynchronous server-side functions.

### Database
- **PostgreSQL with Prisma ORM**: The platform uses a PostgreSQL database managed with Prisma ORM, providing robust and efficient database solutions.
- **Neon DB**: Utilizes Neon DB for serverless PostgreSQL management, ensuring scalability and flexibility.

### Communication Features
- **Admin Mail Functionality**: Allows administrators to add and manage mail directly within Acadium.

### User Interface
- **UI Design**: Features a modern and responsive interface using Tailwind CSS and Shadcn.

### Deployment
- Deployed on Vercel.
- Accessible at the domain name [acadium.tech](https://acadium.tech).

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS, Shadcn  
- **Backend**: Next.js Server Actions, Prisma ORM with PostgreSQL  
- **Database**: Neon DB (Serverless PostgreSQL)  
- **Data Management**: React Query  
- **Deployment**: Vercel  
- **Authentication and Authorization**: NextAuth.js

## Resources

To learn more about the technologies used in Acadium, take a look at the following resources:

- **Next.js**: [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- **Tailwind CSS**: [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Explore Tailwind's utility-first CSS framework.
- **Shadcn**: [Shadcn Documentation](https://ui.shadcn.com/docs) - Find information about the Shadcn design system.
- **Prisma ORM**: [Prisma Documentation](https://www.prisma.io/docs) - Understand how to use Prisma ORM for database management.
- **Neon DB**: [Neon DB Documentation](https://neon.tech/docs) - Learn about Neon’s serverless PostgreSQL database.
- **React Query**: [React Query Documentation](https://tanstack.com/query/latest) - Get details on managing server state in React.
- **Vercel**: [Vercel Documentation](https://vercel.com/docs) - Discover how to deploy and manage your projects on Vercel.
- **NextAuth.js**: [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction) - Read about authentication and authorization for Next.js applications.
