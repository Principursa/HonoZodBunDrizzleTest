import { describe, expect, it} from "vitest";
import router from "./tasks.index";

describe("Tasks list", () => {
  it("responds with an array", async () => {
    const response = await router.request("/list");
    const result = await response.text();

    console.log(result);
    expect(false).toBe(true);

  })
})

