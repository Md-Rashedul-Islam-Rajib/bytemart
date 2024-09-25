import { MongoClient, Db, ServerApiVersion } from "mongodb";

let db: Db | null = null; // Explicitly typing `db` as `Db | null`

export const connectDB = async (): Promise<Db | undefined> => {
  if (db) return db; // Return the existing connection if it exists.

  try {
    const uri = process.env.NEXT_PUBLIC_MONGO_URI;

    if (!uri) {
      throw new Error("MongoDB URI is not provided in the environment variables.");
    }

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    db = client.db("bytemart"); // Use the specific database `bytemart`

    return db; 
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("Unknown error connecting to MongoDB");
    }
  }
};
