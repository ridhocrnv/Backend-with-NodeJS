import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});

const connectDB = async () => {
    try {
        await prisma.$connect()
        console.log("DB Connected via Prisma")
    } catch (error) {
        console.error("Database Connection Error:", error);
        process.exit(1); // Exit the process with an error code
    }
};

const disconnectDB = async () => {
        await prisma.$disconnect()
}

export { prisma, connectDB, disconnectDB };
