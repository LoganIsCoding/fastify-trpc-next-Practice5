import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
// Reference required for compilation
import type fastify from "fastify";

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContextInner() {
  return {};
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const server = req.server;

  try {
    const rawToken = req.headers["authorization"]?.split(" ")[1];
    const decoded = rawToken ? JSON.parse(Buffer.from(rawToken.split(".")[1] ?? "", "base64").toString()) : null;
    return {
      fastify: server,
      req,
      res,
      user: decoded,
    };
  } catch {
    return {
      fastify: server,
      req,
      res,
      user: null,
    };
  }
}

export type Context = inferAsyncReturnType<typeof createContext>;
export type InnerContext = inferAsyncReturnType<typeof createContextInner>;
