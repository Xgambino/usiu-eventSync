// 1. FETCH EVENTS FROM API

async function loadEvents() {
  const eventsContainer = document.querySelector(".featured");
  eventsContainer.innerHTML = "Loading events...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error("Failed to load events");
    }

    const data = await response.json();

    // Only show 2 sample events
    const events = data.slice(0, 2);

    eventsContainer.innerHTML = "";

    events.forEach(event => {
      eventsContainer.innerHTML += `
        <article class="card">
          <time>2025 • Demo Event</time>
          <h4>${event.title}</h4>
          <p>${event.body}</p>
          <footer>
            <span>Main Campus</span>
            <a href="#">View Details</a>
          </footer>
        </article>
      `;
    });

    // Save to IndexedDB for offline use
    saveToIndexedDB(events);

  } catch (error) {
    console.error(error);
    eventsContainer.innerHTML = `
      <p style="color:red;">Failed to load events. Please try again later.</p>
    `;
  }
}

loadEvents();


// 2. DEBOUNCED SEARCH


let searchTimeout;

document.querySelector(".search input").addEventListener("input", function () {
  const query = this.value;

  // Clear previous timer
  clearTimeout(searchTimeout);

  // Wait 300ms after typing stops
  searchTimeout = setTimeout(() => {
    console.log("Searching for:", query);
    localStorage.setItem("lastSearch", query);
  }, 300);
});


// 3. SAVE FILTER BUTTON TO LOCAL STORAGE

document.querySelectorAll(".filters button").forEach(button => {
  button.addEventListener("click", () => {
    localStorage.setItem("selectedFilter", button.innerText);
    console.log("Saved filter:", button.innerText);
  });
});

// Load saved filter
const savedFilter = localStorage.getItem("selectedFilter");
if (savedFilter) {
  console.log("Last used filter:", savedFilter);
}


// 4. BASIC INDEXEDDB STORAGE

let db;

function openIndexedDB() {
  const request = indexedDB.open("EventSyncDB", 1);

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    db.createObjectStore("events", { keyPath: "id" });
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("IndexedDB ready");
  };

  request.onerror = function () {
    console.log("IndexedDB error");
  };
}

openIndexedDB();

// Save events to DB
function saveToIndexedDB(events) {
  const transaction = db.transaction("events", "readwrite");
  const store = transaction.objectStore("events");

  events.forEach(event => {
    store.put(event);
  });

  console.log("Saved to IndexedDB:", events);
}
