export async function renderEvents(root) {
  const events = await EventService.getEvents();

  root.innerHTML = `
    <h1>Events</h1>
    <ul>
      ${events.map(ev => `
        <li>
          <strong>${ev.title}</strong><br>
          ${ev.date}<br>
          ${ev.description}
        </li>
      `).join("")}
    </ul>
  `;
}
