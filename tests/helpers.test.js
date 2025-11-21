import { formatDate } from "../src/utils/helpers.js";

test("formats date correctly", () => {
  const result = formatDate("2025-01-01");
  expect(result).toBe("2025-01-01");
});
