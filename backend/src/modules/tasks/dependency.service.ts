import prisma from "../../lib/prisma";
import { RelationType, TaskStatus } from "@prisma/client";

class DependencyService {

  //------------------------------------
  // Add Dependency
  //------------------------------------

  async addDependency(
    sourceTaskId: string,
    targetTaskId: string,
    relationType: RelationType
  ) {

    const sourceTask =
      await prisma.task.findUnique({
        where: {
          id: sourceTaskId,
        },
      });

    if (!sourceTask) {
      throw new Error("Source task not found");
    }

    const targetTask =
      await prisma.task.findUnique({
        where: {
          id: targetTaskId,
        },
      });

    if (!targetTask) {
      throw new Error("Target task not found");
    }

    if (
      sourceTask.projectId !==
      targetTask.projectId
    ) {
      throw new Error(
        "Tasks must belong to same project"
      );
    }

    const exists =
      await prisma.taskRelation.findFirst({
        where: {
          sourceTaskId,
          targetTaskId,
        },
      });

    if (exists) {
      throw new Error(
        "Dependency already exists"
      );
    }

    return prisma.taskRelation.create({
      data: {
        sourceTaskId,
        targetTaskId,
        relationType,
      },
    });
  }

  //------------------------------------
  // Remove Dependency
  //------------------------------------

  async removeDependency(id: string) {

    return prisma.taskRelation.delete({

      where: {

        id,

      },

    });

  }

  //------------------------------------
  // Get Dependencies
  //------------------------------------

  async getDependencies(taskId: string) {

    return prisma.taskRelation.findMany({

      where: {

        OR: [

          {
            sourceTaskId: taskId,
          },

          {
            targetTaskId: taskId,
          },

        ],

      },

      include: {

        sourceTask: true,

        targetTask: true,

      },

    });

  }

  //------------------------------------
  // Check Blocking Tasks
  //------------------------------------

  async validateTaskCompletion(taskId: string) {

    const blockers =
      await prisma.taskRelation.findMany({

        where: {

          targetTaskId: taskId,

        },

        include: {

          sourceTask: true,

        },

      });

    const pending =
      blockers.filter(

        relation =>
          relation.sourceTask.status !==
          TaskStatus.DONE

      );

    if (pending.length > 0) {

      throw new Error(

        `Task is blocked by ${pending.length} unfinished task(s).`

      );

    }

    return true;

  }

}

export default new DependencyService();