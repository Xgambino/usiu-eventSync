// src/index.js
// Entry point for USIU EventSync
// Imports EventModel and helpers for demonstration purposes

import { EventModel } from "./modules/events/EventModel.js";
import { formatDate } from "./utils/helpers.js";

// Example usage
const exampleEvent = new EventModel({
  id: 1,
  title: "Sample Event",
  date: new Date(),
  description: "This is a test event",
});

console.log("Event:", exampleEvent);
console.log("Formatted date:", formatDate(exampleEvent.date));

// Export modules for use elsewhere (optional)
export { EventModel, formatDate };
