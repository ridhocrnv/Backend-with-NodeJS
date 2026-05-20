import { PrismaClient } from "@prisma/client";
import pg from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const { Pool } = pg;

let pool;
let adapter;
let prisma;

const connectDB = async () => {
    try {
        if (!prisma) {
            pool = new Pool({ 
                connectionString: process.env.DATABASE_URL  
            });
            adapter = new PrismaPg(pool);
            prisma = new PrismaClient({ 
                adapter,
                log: process.env.DATABASE_URL === "development" ? ["query", "error", "warn"] : ["error"]
            });
        }

        await prisma.$connect();
        console.log("DB Connected via Prisma");
    } catch (error) {
        console.error("Database Connection Error:", error);
        process.exit(1); 
    }
};

const disconnectDB = async () => {
    if (prisma) {
        await prisma.$disconnect();
    }
    if (pool) {
        await pool.end();
    }
};

export { connectDB, disconnectDB };
export { prisma };
