export function initRouting() {
  const root = document.body;

  root.innerHTML = "";
  root.appendChild(LoadingScreen());

  setTimeout(() => {
    loadDashboard(root);
  }, 2000);
}

function loadDashboard(root) {
  root.innerHTML = "";
  renderEvents(root);
}
