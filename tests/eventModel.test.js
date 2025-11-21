import { EventModel } from "../src/modules/events/EventModel.js";

test("creates a valid event model", () => {
  const ev = new EventModel({
    id: 1,
    title: "Test",
    date: "2025-01-01",
    description: "desc"
  });

  expect(ev.id).toBe(1);
  expect(ev.title).toBe("Test");
});
