import { describe, expect, it } from "vitest";

describe("Example Tests", () => {
  it("demonstrates basic test structure", () => {
    expect(1 + 1).toBe(2);
  });

  it("tests string equality", () => {
    const greeting = "hello";
    expect(greeting).toBe("hello");
  });

  it("tests array operations", () => {
    const items = [1, 2, 3];
    expect(items).toHaveLength(3);
    expect(items).toContain(2);
  });
});
