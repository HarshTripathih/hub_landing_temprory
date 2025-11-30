import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Extend global type so TS knows about our cache
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function dbConnect(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => m.connection); // ✅ assign the connection
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // reset if failed
    throw err;
  }

  return cached.conn;
}
