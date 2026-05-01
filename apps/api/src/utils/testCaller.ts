import { testRouter } from "../routes";
import { createContextInner } from "../routes/context";

export const createTestCaller = async () => {
  const ctx = await createContextInner();
  return testRouter.createCaller(ctx);
};

export function extractUserFromToken(token: string) {
  const parts = token.split(".");
  const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
  return payload;
}
