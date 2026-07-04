// ============================================
// 📄 src/modules/users/user.service.ts
// ============================================

import prisma from "../../lib/prisma";

import bcrypt from "bcrypt";

import { CreateUserDTO, UpdateUserDTO } from "./user.types";

class UserService {
  // ==========================================
  // GET ALL USERS
  // ==========================================

  // ==========================================
  // GET USERS
  // ==========================================

  async getAllUsers(query: UserQuery) {
    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const where = {
      ...(query.role && {
        role: query.role,
      }),

      ...(query.search && {
        OR: [
          {
            name: {
              contains: query.search,
            },
          },

          {
            email: {
              contains: query.search,
            },
          },
        ],
      }),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,

        skip,

        take: limit,

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,

          name: true,

          email: true,

          role: true,

          createdAt: true,

          _count: {
            select: {
              assignedTasks: true,

              createdRCAs: true,

              notifications: true,
            },
          },
        },
      }),

      prisma.user.count({
        where,
      }),
    ]);

    return {
      users,

      total,

      page,

      limit,

      totalPages: Math.ceil(total / limit),
    };
  }

  // ==========================================
  // GET USER BY ID
  // ==========================================

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        id: true,

        name: true,

        email: true,

        role: true,

        createdAt: true,

        updatedAt: true,

        _count: {
          select: {
            assignedTasks: true,

            createdRCAs: true,

            notifications: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  // ==========================================
  // CREATE USER
  // ==========================================

  async createUser(data: CreateUserDTO) {
    const existing = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        name: data.name,

        email: data.email,

        password: hashedPassword,

        role: data.role,
      },

      select: {
        id: true,

        name: true,

        email: true,

        role: true,

        createdAt: true,
      },
    });
  }

  // ==========================================
  // UPDATE USER
  // ==========================================

  async updateUser(id: string, data: UpdateUserDTO) {
    const existing = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      throw new Error("User not found");
    }

    if (data.email && data.email !== existing.email) {
      const emailExists = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (emailExists) {
        throw new Error("Email already exists");
      }
    }

    return prisma.user.update({
      where: {
        id,
      },

      data,

      select: {
        id: true,

        name: true,

        email: true,

        role: true,

        updatedAt: true,
      },
    });
  }

  // ==========================================
  // CHANGE ROLE
  // ==========================================

  async changeRole(id: string, role: UpdateUserDTO["role"]) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return prisma.user.update({
      where: {
        id,
      },

      data: {
        role,
      },

      select: {
        id: true,

        name: true,

        email: true,

        role: true,
      },
    });
  }

  // ==========================================
  // DELETE USER
  // ==========================================

  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return prisma.user.delete({
      where: {
        id,
      },
    });
  }
  // ==========================================
// GET MY PROFILE
// ==========================================

async getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      theme: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

// ==========================================
// UPDATE MY PROFILE
// ==========================================

async updateProfile(
  userId: string,
  data: UpdateUserDTO,
) {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      name: data.name,
      email: data.email,
      theme: data.theme,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      theme: true,
    },
  });
}
}

export default new UserService();
