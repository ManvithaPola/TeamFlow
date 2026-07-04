import { PrismaClient, Role, ProjectStatus, TaskStatus, Priority } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("TeamFlow@123", 10);

  // Admin User
  const admin = await prisma.user.upsert({
    where: { email: "admin@teamflow.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@teamflow.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  // Manager
  const manager = await prisma.user.upsert({
    where: { email: "manager@teamflow.com" },
    update: {},
    create: {
      name: "Project Manager",
      email: "manager@teamflow.com",
      password: hashedPassword,
      role: Role.MANAGER,
    },
  });

  // Developer
  const developer = await prisma.user.upsert({
    where: { email: "developer@teamflow.com" },
    update: {},
    create: {
      name: "Developer",
      email: "developer@teamflow.com",
      password: hashedPassword,
      role: Role.DEVELOPER,
    },
  });

  // Project
  const project = await prisma.project.create({
    data: {
      title: "TeamFlow Assignment",
      description: "Software Engineering Hiring Assignment",
      status: ProjectStatus.ACTIVE,
      createdById: admin.id,
    },
  });

  // Members
  await prisma.projectMember.createMany({
    data: [
      {
        projectId: project.id,
        userId: admin.id,
        role: Role.ADMIN,
      },
      {
        projectId: project.id,
        userId: manager.id,
        role: Role.MANAGER,
      },
      {
        projectId: project.id,
        userId: developer.id,
        role: Role.DEVELOPER,
      },
    ],
    skipDuplicates: true,
  });

  // Task 1
  const task1 = await prisma.task.create({
    data: {
      title: "Design Database",
      description: "Create Prisma schema",
      status: TaskStatus.IN_PROGRESS,
      priority: Priority.HIGH,
      projectId: project.id,
      reporterId: admin.id,
      assigneeId: developer.id,
    },
  });

  // Task 2
  await prisma.task.create({
    data: {
      title: "Build Authentication",
      description: "Implement JWT Login",
      status: TaskStatus.TODO,
      priority: Priority.CRITICAL,
      projectId: project.id,
      reporterId: manager.id,
      assigneeId: developer.id,
    },
  });

  console.log("✅ Database Seeded Successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });