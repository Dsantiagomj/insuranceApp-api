import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { PrismaClient } from "@prisma/client";

const client = new SecretManagerServiceClient();
export const prisma = new PrismaClient();

export async function getDbUrl() {
  try {
    const [version] = await client.accessSecretVersion({
      name: "projects/insuranceapp-438123/secrets/DATABASE_URL/versions/latest",
    });
    return version.payload.data.toString("utf8");
  } catch (error) {
    console.error("Error retrieving DATABASE_URL:", error);
    throw error; // Rethrow to handle in the connect function
  }
}

export const connect = async function () {
  const dbUrl = await getDbUrl();
  console.log("Retrieved DATABASE_URL:", dbUrl);
  // Set the DATABASE_URL for Prisma
  process.env.DATABASE_URL = dbUrl;
  // Optionally log the database URL (for debugging)
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  await prisma.$connect();
  console.log("Database connected");
};

export const disconnect = async function () {
  await prisma.$disconnect("Database disconnected");
};
