import { Collection, MongoClient } from "mongodb";
import { WaitlistDocument } from "./evolutionWaitlist";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "hersteam";

// Next.js reloads modules on every edit in dev, and serverless keeps instances
// warm between invocations. Caching the client promise on globalThis means we
// reuse one connection pool instead of opening a socket per request.
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const getClient = (): Promise<MongoClient> => {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }

  return globalForMongo._mongoClientPromise;
};

let indexesReady: Promise<unknown> | null = null;

export const getWaitlistCollection = async (): Promise<
  Collection<WaitlistDocument>
> => {
  const client = await getClient();
  const collection = client
    .db(dbName)
    .collection<WaitlistDocument>("evolution_waitlist");

  // Unique on email is what actually guarantees one row per registrant — the
  // upsert relies on it to stay race-free. createIndex is idempotent, and the
  // promise is cached so we only pay for it once per instance.
  if (!indexesReady) {
    indexesReady = collection
      .createIndex({ email: 1 }, { unique: true })
      .catch((error) => {
        // Don't wedge the instance if index creation loses a race — the next
        // request will retry.
        indexesReady = null;
        throw error;
      });
  }
  await indexesReady;

  return collection;
};
