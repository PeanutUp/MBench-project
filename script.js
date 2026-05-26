const DATA = {
  text: [
    { model: "LongCat-Video", m: 0.72, e: 0.69, v: 0.74, c: 0.70, t: 0.83 },
    { model: "Self Forcing", m: 0.66, e: 0.64, v: 0.67, c: 0.62, t: 0.78 },
    { model: "SkyReels V2", m: 0.61, e: 0.58, v: 0.63, c: 0.59, t: 0.76 },
    { model: "Cosmos-Predict 2.5", m: 0.55, e: 0.57, v: 0.52, c: 0.50, t: 0.70 }
  ],
  action: [
    { model: "HY-WorldPlay", m: 0.73, e: 0.70, v: 0.75, c: 0.72, t: 0.86 },
    { model: "Matrix-Game 3.0", m: 0.68, e: 0.66, v: 0.69, c: 0.65, t: 0.81 },
    { model: "Infinite-World", m: 0.63, e: 0.60, v: 0.65, c: 0.62, t: 0.79 },
    { model: "Lingbot-World", m: 0.51, e: 0.49, v: 0.53, c: 0.50, t: 0.71 }
  ]
};

function renderLeaderboard(kind = "text") {
  const tbody = document.querySelector("#leaderboard-table tbody");
  if (!tbody) return;
  const rows = DATA[kind] || DATA.text;
  tbody.innerHTML = "";
  [...rows]
    .sort((a, b) => b.m - a.m)
    .forEach((row, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${row.model}</td>
        <td>${row.m.toFixed(2)}</td>
        <td>${row.e.toFixed(2)}</td>
        <td>${row.v.toFixed(2)}</td>
        <td>${row.c.toFixed(2)}</td>
        <td>${row.t.toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    renderLeaderboard(button.dataset.tab);
  });
});

const copyButton = document.querySelector("#copy-bibtex");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const text = document.querySelector("#bibtex-block").innerText;
    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = "Copied!";
      setTimeout(() => (copyButton.textContent = "Copy BibTeX"), 1400);
    } catch {
      copyButton.textContent = "Copy failed";
    }
  });
}

renderLeaderboard("text");
