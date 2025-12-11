// ------------------------------
// Basic safety functions
// ------------------------------

// Remove unsafe characters (prevents XSS)
function sanitize(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

// Allow only normal letters, numbers and spaces
function validateSearchInput(text) {
  const allowed = /^[a-zA-Z0-9\s]*$/;
  return allowed.test(text);
}

// Example of code-splitting (performance)
import("./events.js")
  .then(() => console.log("Extra code loaded"))
  .catch(() => console.log("Failed to load extra code"));



// ------------------------------
// 1. Load events from API
// ------------------------------

async function loadEvents() {
  const eventsContainer = document.querySelector(".featured");
  eventsContainer.innerHTML = "Loading events...";

  try {
    // Fetch your events file
    const response = await fetch("/api/events.json");

    if (!response.ok) {
      throw new Error("Could not load events");
    }

    const data = await response.json();

    // Show up to 100 events
    const events = data.slice(0, 100);

    eventsContainer.innerHTML = "";

    // Add event cards to the page
    events.forEach(event => {
      eventsContainer.innerHTML += `
        <article class="card">
          <time>${sanitize(event.date || "2025")}</time>
          <h4>${sanitize(event.title)}</h4>
          <p>${sanitize(event.description)}</p>
          <footer>
            <span>${sanitize(event.location || "Main Campus")}</span>
            <a href="#">View Details</a>
          </footer>
        </article>
      `;
    });

    // Save events for offline use
    saveToIndexedDB(events);

  } catch (error) {
    console.error(error);
    eventsContainer.innerHTML = `
      <p style="color:red;">Could not load events.</p>
    `;
  }
}

loadEvents();



// ------------------------------
// 2. Search with delay
// ------------------------------

let searchTimeout;

document.querySelector(".search input").addEventListener("input", function () {
  const query = this.value;

  // Stop unsafe characters
  if (!validateSearchInput(query)) {
    alert("Invalid characters!");
    this.value = query.replace(/[^a-zA-Z0-9\s]/g, "");
    return;
  }

  // Clear old timer
  clearTimeout(searchTimeout);

  // Wait 300ms before saving search text
  searchTimeout = setTimeout(() => {
    console.log("Searching:", query);
    localStorage.setItem("lastSearch", query);
  }, 300);
});



// ------------------------------
// 3. Remember selected filter
// ------------------------------

document.querySelectorAll(".filters button").forEach(button => {
  button.addEventListener("click", () => {
    localStorage.setItem("selectedFilter", button.innerText);
    console.log("Saved filter:", button.innerText);
  });
});

// Show last filter used
const savedFilter = localStorage.getItem("selectedFilter");
if (savedFilter) {
  console.log("Last filter:", savedFilter);
}



// ------------------------------
// 4. Basic IndexedDB
// ------------------------------

let db;

// Open database
function openIndexedDB() {
  const request = indexedDB.open("EventSyncDB", 1);

  // Create table on first load
  request.onupgradeneeded = function (event) {
    db = event.target.result;
    db.createObjectStore("events", { keyPath: "id" });
  };

  // Success
  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("IndexedDB ready");
  };

  // Error
  request.onerror = function () {
    console.log("IndexedDB error");
  };
}

openIndexedDB();

// Save events in database
function saveToIndexedDB(events) {
  const transaction = db.transaction("events", "readwrite");
  const store = transaction.objectStore("events");

  events.forEach(event => {
    store.put(event);
  });

  console.log("Saved to IndexedDB:", events);
}
