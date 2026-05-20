import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool(
    { 
        connectionString: process.env.DATABASE_URL  
    }
)

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ 
        adapter,
        log: process.env.DATABASE_URL === "development" ? ["query", "error", "warn"] : ["error"]
    }
);

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

export { pool, adapter, prisma, connectDB, disconnectDB };
