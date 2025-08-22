import { isAxiosError } from 'axios';
import { user } from '@api/auth';

describe("User API", () => {
  it("returns 401 for unauthenticated request", async () => {
    try {
      await user();
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(401);
      } else {
        throw e;
      }
    }
  });
});
