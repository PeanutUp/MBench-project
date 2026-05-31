const QUALITATIVE = {
  entity: {
    label: "Entity Consistency",
    sub: {
      object: {
        label: "Object Consistency",
        items: [
          {
            key: "geometry",
            label: "Geometry",
            title: "Object Geometry Consistency",
            summary: "Evaluates whether the geometric structure of a target object remains stable after departure-return camera motion or temporary field-of-view loss.",
            video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/geometry_1.mp4",
            video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/geometry_2.mp4",
            score1: "58.38",
            score2: "0.05"
          },
          {
            key: "texture",
            label: "Texture",
            title: "Object Texture Consistency",
            summary: "Measures whether object color, texture, material cues, and fine-grained patterns remain invariant across long temporal gaps.",
            video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/texture_1.mp4",
            video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/texture_2.mp4",
            score1: "67.49",
            score2: "9.14"
          }
        ]
      },
      human: {
        label: "Human Consistency",
        items: [
          {
            key: "identity",
            label: "Identity",
            title: "Human Identity Consistency",
            summary: "Checks whether a human subject remains recognizable as the same person across sampled frames, occlusions, and temporal gaps.",
            video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/identity_1.mp4",
            video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/identity_2.mp4",
            score1: "85.35",
            score2: "0.00"
          },
          {
            key: "appearance",
            label: "Appearance",
            title: "Human Appearance Consistency",
            summary: "Evaluates whether clothing, hairstyle, accessories, and holistic full-body appearance remain stable over long-horizon generation.",
            video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/appearance_1.mp4",
            video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/appearance_2.mp4",
            score1: "46.64",
            score2: "0.00"
          }
        ]
      }
    }
  },
  environment: {
    label: "Environment Consistency",
    sub: {
      spatial: {
        label: "Spatial Consistency",
        items: [
          {
            key: "epipolar",
            label: "Epipolar",
            title: "Epipolar Geometry Consistency",
            summary: "Evaluates whether non-adjacent generated views obey stable relative camera geometry when the model revisits a scene.",
            video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/epipolar1.mp4",
            video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/epipolar2.mp4",
            score1: "57.56",
            score2: "45.02"
          },
          {
            key: "reprojection",
            label: "Reprojection",
            title: "Reprojection Consistency",
            summary: "Measures whether triangulated 3D points project back to consistent 2D observations across revisited views.",
            video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/reprojection1.mp4",
            video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/reprojection2.mp4",
            score1: "67.85",
            score2: "1.55"
          }
        ]
      },
      rendering: {
        label: "Rendering Consistency",
        items: [
          {
            key: "lighting",
            label: "Lighting",
            title: "Lighting Consistency",
            summary: "Quantifies stability of global brightness, color temperature, color distribution, and shadow structure across corresponding segments.",
            video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/lighting1.mp4",
            video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/lighting2.mp4",
            score1: "90.79",
            score2: "22.99"
          },
          {
            key: "style",
            label: "Style",
            title: "Style Consistency",
            summary: "Checks whether the overall visual style remains coherent instead of drifting across neighboring frames or long rollouts.",
            video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/style1.mp4",
            video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/style2.mp4",
            score1: "95.07",
            score2: "57.26"
          }
        ]
      }
    }
  },
  causal: {
    label: "Causal Consistency",
    sub: {
      selfevolution: {
        label: "Self-Evolution",
        items: [
          {
            key: "evolution",
            label: "Evolution",
            title: "State Evolution & Correctness",
            summary: "Evaluates whether an expected off-screen physical or semantic event is correctly initiated and follows real-world physical laws during generation.",
            video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/evolution1.mp4",
            video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/evolution2.mp4",
            score1: "100",
            score2: "0"
          }
        ]
      },
      interaction: {
        label: "Interaction",
        items: [
          {
            key: "instruction",
            label: "Instruction",
            title: "Prompt-Conditioned Interaction",
            summary: "Measures whether external sequence instructions (text prompts or action control) are followed and sustained across continuous video segments.",
            video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/prompt2.mp4",
            video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/prompt1.mp4",
            score1: "29.49",
            score2: "18.73"
          }
        ]
      }
    }
  }
};

let currentAxis = "entity";
let currentSub = "object";
let currentSlide = 0;

function renderQualitative(axis, sub) {
  const group = QUALITATIVE[axis] || QUALITATIVE.entity;
  sub = sub || Object.keys(group.sub)[0];
  currentAxis = axis;
  currentSub = sub;
  currentSlide = 0;

  const subGroup = group.sub[sub] || Object.values(group.sub)[0];
  const items = subGroup.items;

  // Update axis tabs
  document.querySelectorAll(".axis-tab").forEach((button) => {
    const active = button.dataset.axis === axis;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });

  // Build sub-tabs
  const subtabs = document.querySelector("#memory-subtabs");
  if (subtabs) {
    subtabs.innerHTML = "";
    Object.entries(group.sub).forEach(([key, val]) => {
      const button = document.createElement("button");
      button.className = `sub-tab${key === sub ? " active" : ""}`;
      button.type = "button";
      button.textContent = val.label;
      button.dataset.axis = axis;
      button.dataset.sub = key;
      button.setAttribute("aria-selected", key === sub ? "true" : "false");
      button.addEventListener("click", () => renderQualitative(axis, key));
      subtabs.appendChild(button);
    });
  }

  const setText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  };

  setText("#memory-axis-label", subGroup.label);

  // Build carousel
  const slidesContainer = document.querySelector("#carousel-slides");
  const dotsContainer = document.querySelector("#carousel-dots");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  if (!slidesContainer) return;

  slidesContainer.innerHTML = "";
  if (dotsContainer) dotsContainer.innerHTML = "";

  items.forEach((item, idx) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";

    const wrapper1 = document.createElement("div");
    wrapper1.className = "video-wrapper";
    const video1 = document.createElement("video");
    video1.autoplay = true;
    video1.loop = true;
    video1.muted = true;
    video1.playsInline = true;
    video1.controls = true;
    video1.src = item.video1;
    const score1 = document.createElement("div");
    score1.className = "video-score";
    score1.textContent = item.score1 ? `${item.label} Score: ${item.score1}` : "Score: N/A";
    wrapper1.appendChild(video1);
    wrapper1.appendChild(score1);

    const wrapper2 = document.createElement("div");
    wrapper2.className = "video-wrapper";
    const video2 = document.createElement("video");
    video2.autoplay = true;
    video2.loop = true;
    video2.muted = true;
    video2.playsInline = true;
    video2.controls = true;
    video2.src = item.video2;
    const score2 = document.createElement("div");
    score2.className = "video-score";
    score2.textContent = item.score2 ? `${item.label} Score: ${item.score2}` : "Score: N/A";
    wrapper2.appendChild(video2);
    wrapper2.appendChild(score2);

    const comparison = document.createElement("div");
    comparison.className = "video-comparison-container";
    comparison.appendChild(wrapper1);
    comparison.appendChild(wrapper2);
    slide.appendChild(comparison);
    slidesContainer.appendChild(slide);

    if (dotsContainer && items.length > 1) {
      const dot = document.createElement("button");
      dot.className = `carousel-dot${idx === 0 ? " active" : ""}`;
      dot.type = "button";
      dot.setAttribute("aria-label", `Slide ${idx + 1}`);
      dot.addEventListener("click", () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    }
  });

  const hasMultiple = items.length > 1;
  if (prevBtn) prevBtn.style.display = hasMultiple ? "" : "none";
  if (nextBtn) nextBtn.style.display = hasMultiple ? "" : "none";

  if (dotsContainer) dotsContainer.style.display = hasMultiple ? "" : "none";

  updateSlide(0);
}

function goToSlide(index) {
  const group = QUALITATIVE[currentAxis];
  if (!group) return;
  const subGroup = group.sub[currentSub];
  if (!subGroup) return;
  const items = subGroup.items;
  if (index < 0 || index >= items.length) return;
  currentSlide = index;
  updateSlide(index);
}

function updateSlide(index) {
  const group = QUALITATIVE[currentAxis];
  if (!group) return;
  const subGroup = group.sub[currentSub];
  if (!subGroup) return;
  const items = subGroup.items;
  const item = items[index];

  const slidesContainer = document.querySelector("#carousel-slides");
  if (slidesContainer) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  }

  document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  const setText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  };
  setText("#memory-title", item.title);
  setText("#memory-summary", item.summary);
}

// Axis tab click handlers
document.querySelectorAll(".axis-tab").forEach((button) => {
  button.addEventListener("click", () => renderQualitative(button.dataset.axis));
});

// Carousel arrow handlers
document.querySelector(".carousel-prev")?.addEventListener("click", () => {
  const group = QUALITATIVE[currentAxis];
  if (!group) return;
  const items = group.sub[currentSub].items;
  goToSlide(currentSlide > 0 ? currentSlide - 1 : items.length - 1);
});
document.querySelector(".carousel-next")?.addEventListener("click", () => {
  const group = QUALITATIVE[currentAxis];
  if (!group) return;
  const items = group.sub[currentSub].items;
  goToSlide(currentSlide < items.length - 1 ? currentSlide + 1 : 0);
});

// Touch swipe support
let touchStartX = 0;
const slidesEl = document.querySelector("#carousel-slides");
if (slidesEl) {
  slidesEl.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  slidesEl.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    const group = QUALITATIVE[currentAxis];
    if (!group) return;
    const items = group.sub[currentSub].items;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < items.length - 1) {
        goToSlide(currentSlide + 1);
      } else if (diff < 0 && currentSlide > 0) {
        goToSlide(currentSlide - 1);
      }
    }
  });
}

// ---- Existing functionality ----

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

function initTableInteractions() {
  const table = document.querySelector(".table-wrap table");
  if (!table) return;

  const headers = Array.from(table.querySelectorAll("th"));
  const tbody = table.querySelector("tbody");
  if (!tbody) return;

  headers.forEach((th, index) => {
    const label = th.textContent.trim();
    th.classList.add("sortable");
    th.dataset.label = label;
    th.title = "Click column name to sort";
    th.innerHTML = `<span class="sort-label"></span><span class="sort-indicator" aria-hidden="true"></span>`;
    th.querySelector(".sort-label").textContent = label;

    th.addEventListener("click", () => {
      const nextDirection = th.dataset.sortDirection === "asc" ? "desc" : "asc";

      headers.forEach((header) => {
        header.classList.remove("sorted-asc", "sorted-desc");
        header.removeAttribute("data-sort-direction");
        header.setAttribute("aria-sort", "none");
        const indicator = header.querySelector(".sort-indicator");
        if (indicator) indicator.textContent = "";
      });

      th.dataset.sortDirection = nextDirection;
      th.classList.add(nextDirection === "asc" ? "sorted-asc" : "sorted-desc");
      th.setAttribute("aria-sort", nextDirection === "asc" ? "ascending" : "descending");
      const indicator = th.querySelector(".sort-indicator");
      if (indicator) indicator.textContent = nextDirection === "asc" ? "↑" : "↓";

      const rows = Array.from(tbody.querySelectorAll("tr"));
      rows.sort((a, b) => {
        const valA = a.cells[index].innerText.trim();
        const valB = b.cells[index].innerText.trim();
        const numA = parseFloat(valA);
        const numB = parseFloat(valB);
        const isNumA = !Number.isNaN(numA) && valA !== "-";
        const isNumB = !Number.isNaN(numB) && valB !== "-";

        if (isNumA && isNumB) {
          return nextDirection === "asc" ? numA - numB : numB - numA;
        }

        if (isNumA !== isNumB) {
          return isNumA ? -1 : 1;
        }

        return nextDirection === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });

      rows.forEach((row) => tbody.appendChild(row));
    });
  });
}

function initModelToggle() {
  const table = document.querySelector(".table-wrap table");
  const buttons = document.querySelectorAll(".model-toggle .toggle-btn");
  if (!table || !buttons.length) return;

  const tbody = table.querySelector("tbody");
  if (!tbody) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.dataset.target;

      if (target === "all") {
        table.classList.add("hide-ranks");
      } else {
        table.classList.remove("hide-ranks");
      }

      const rows = Array.from(tbody.querySelectorAll("tr"));

      rows.forEach(row => {
        const settingType = row.cells[1].innerText.trim().toLowerCase();
        if (target === "all") {
          row.style.display = "";
        } else if (target === settingType) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });
}

initTableInteractions();
initModelToggle();

renderQualitative("entity");
