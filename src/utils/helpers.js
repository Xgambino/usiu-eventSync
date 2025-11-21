// src/utils/helpers.js

// Pure helper function, no imports from anywhere
export function formatDate(date) {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}
