import { PrismaClient, Action } from "@prisma/client";

export async function addAction(action: Action): Promise<Action | undefined> {
    const prisma = new PrismaClient();
    try {
        const actionResult = await prisma.action.create({
            data: {
                name: action.name,
                object: action.object
            }
        });
        return actionResult;
    } catch (error) {
        console.error("Error adding action:", error);
        return undefined;
    } finally {
        await prisma.$disconnect();
    }
}

export async function getActionByName(name: string): Promise<Action | undefined> {
    const prisma = new PrismaClient();
    try {
        const actionResult = await prisma.action.findFirst({
            where: {
                name: name
            }
        });
        return actionResult ? actionResult : undefined;
    } catch (error) {
        console.error("Error geting actions:", error);
        return undefined;
    } finally {
        await prisma.$disconnect();
    }
}



async function getActions(action: Action): Promise<Action[] | undefined> {
    const prisma = new PrismaClient();
    try {
        const actionResult = await prisma.action.findMany();
        return actionResult;
    } catch (error) {
        console.error("Error geting actions:", error);
        return undefined;
    } finally {
        await prisma.$disconnect();
    }
}
