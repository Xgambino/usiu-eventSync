export function LoadingScreen() {
  const container = document.createElement("div");
  container.className = "loading-container";
  container.innerHTML = `...`;
  return container;
}
