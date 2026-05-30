const QUALITATIVE = {
  entity: {
    label: "Entity Consistency",
    image: "assets/case-entity.png",
    alt: "Entity consistency case from MBench",
    items: [
      {
        key: "geometry",
        label: "Object Geometry",
        title: "Object Geometry Consistency",
        summary: "Evaluates whether the geometric structure of a target object remains stable after departure-return camera motion or temporary field-of-view loss.",
        trigger: "Object exits and re-enters the field of view during a departure-return trajectory.",
        metric: "SSIM is computed inside SAM 2 object masks after warping the return view to the aligned forward view.",
        caption: "A geometry memory failure appears when the object returns with warped shape or missing structure.",
        video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/geometry_1.mp4",
        video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/geometry_2.mp4",
        score1: "58.38",
        score2: "0.05"
      },
      {
        key: "texture",
        label: "Object Texture",
        title: "Object Texture Consistency",
        summary: "Measures whether object color, texture, material cues, and fine-grained patterns remain invariant across long temporal gaps.",
        trigger: "The target object is occluded or revisited after camera movement.",
        metric: "DINOv2 features are extracted from SAM 2 masks and compared against the global object-track centroid.",
        caption: "Texture consistency catches cases where the object category remains but the remembered details drift.",
        video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/texture_1.mp4",
        video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/texture_2.mp4",
        score1: "67.49",
        score2: "9.14"
      },
      {
        key: "identity",
        label: "Human Identity",
        title: "Human Identity Consistency",
        summary: "Checks whether a human subject remains recognizable as the same person across sampled frames, occlusions, and temporal gaps.",
        trigger: "A human face appears across non-adjacent frames after motion, occlusion, or re-entry.",
        metric: "ArcFace embeddings are tracked with rolling-average matching and scored by centroid-based cosine similarity.",
        caption: "Identity consistency is evaluated separately because human subjects require persistent facial identity, not just visual similarity.",
        video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/identity_1.mp4",
        video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/identity_2.mp4",
        score1: "85.35",
        score2: "0.00"
      },
      {
        key: "appearance",
        label: "Human Appearance",
        title: "Human Appearance Consistency",
        summary: "Evaluates whether clothing, hairstyle, accessories, and holistic full-body appearance remain stable over long-horizon generation.",
        trigger: "A person leaves view, is temporarily occluded, or is revisited in a later segment.",
        metric: "SAM 2 full-body masks and DINOv2 semantic embeddings measure appearance invariance across the subject track.",
        caption: "Appearance consistency catches clothing, accessory, and body-level drift that may occur even when identity is preserved.",
        video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/appearance_1.mp4",
        video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/appearance_2.mp4",
        score1: "46.64",
        score2: "0.00"
      }
    ]
  },
  environment: {
    label: "Environment Consistency",
    image: "assets/case-environment.png",
    alt: "Environment consistency case from MBench",
    items: [
      {
        key: "epipolar",
        label: "Epipolar",
        title: "Epipolar Geometry Consistency",
        summary: "Evaluates whether non-adjacent generated views obey stable relative camera geometry when the model revisits a scene.",
        trigger: "The camera departs from and later returns to a comparable viewpoint.",
        metric: "DA3-estimated poses define fundamental matrices; matched point pairs are scored by epipolar line distance.",
        caption: "Epipolar errors reveal spatial memory failures that are not visible from local frame quality alone.",
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
        trigger: "Two distant frames provide comparable non-adjacent views for spatial reconstruction.",
        metric: "Matched points are triangulated using DA3 camera parameters and scored by 3D-to-2D reprojection error.",
        caption: "Reprojection consistency tests whether the generated scene returns to the same 3D configuration.",
        video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/reprojection1.mp4",
        video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/reprojection2.mp4",
        score1: "67.85",
        score2: "1.55"
      },
      {
        key: "lighting",
        label: "Lighting",
        title: "Lighting Consistency",
        summary: "Quantifies stability of global brightness, color temperature, color distribution, and shadow structure across corresponding segments.",
        trigger: "A scene is revisited after a departure-return trajectory.",
        metric: "CIELAB lightness maps and color-channel means are compared with a weighted illumination and color-shift deviation.",
        caption: "Lighting consistency detects unsupported changes in illumination when the model revisits a remembered scene.",
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
        trigger: "The model generates a continuous long-horizon rollout.",
        metric: "VGG feature Gram matrices are compared with Frobenius distance to measure style changes through time.",
        caption: "Style consistency separates global rendering drift from geometric or entity-level memory errors.",
        video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/style1.mp4",
        video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/style2.mp4",
        score1: "95.07",
        score2: "57.26"
      }
    ]
  },
  causal: {
    label: "Causal Consistency",
    image: "assets/case-causal.png",
    alt: "Causal consistency case from MBench",
    items: [
      {
        key: "evolution",
        label: "Evolution",
        title: "State Evolution & Correctness",
        summary: "Evaluates whether an expected off-screen physical or semantic event is correctly initiated and follows real-world physical laws during generation.",
        trigger: "A prompt describes a process that should progress while the relevant region is outside the field of view.",
        metric: "A VLM assigns a state-evolution and correctness score, ensuring the process is actuated and plausible.",
        caption: "Evolution rewards videos that both trigger the hidden event and preserve plausible causal consequences when the object returns.",
        video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/evolution1.mp4",
        video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/evolution2.mp4",
        score1: "100",
        score2: "0"
      },
      {
        key: "instruction",
        label: "Prompt-Conditioned Instruction",
        title: "Prompt-Conditioned Interaction",
        summary: "Measures whether external sequence instructions (text prompts or action control) are followed and sustained across continuous video segments.",
        trigger: "A multi-segment context or action sequence specifies what should happen or how the camera should move.",
        metric: "Evaluated either by OpenCLIP embeddings for text adherence or DA3-estimated camera extrinsics for action alignment.",
        caption: "Instruction interaction tests whether the model responds to control signals and external prompts over time.",
        video1: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/prompt2.mp4",
        video2: "https://huggingface.co/datasets/PeanutUp/PeanutUpproject-page-videos/resolve/main/assets/prompt1.mp4",
        score1: "29.49",
        score2: "18.73"
      }
    ]
  }
};

function renderQualitative(axis = "entity", key) {
  const group = QUALITATIVE[axis] || QUALITATIVE.entity;
  const activeItem = group.items.find((item) => item.key === key) || group.items[0];
  const subtabs = document.querySelector("#memory-subtabs");
  if (!subtabs) return;

  document.querySelectorAll(".axis-tab").forEach((button) => {
    const active = button.dataset.axis === axis;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });

  subtabs.innerHTML = "";
  group.items.forEach((item) => {
    const button = document.createElement("button");
    button.className = `sub-tab${item.key === activeItem.key ? " active" : ""}`;
    button.type = "button";
    button.textContent = item.label;
    button.dataset.axis = axis;
    button.dataset.key = item.key;
    button.setAttribute("aria-selected", item.key === activeItem.key ? "true" : "false");
    button.addEventListener("click", () => renderQualitative(axis, item.key));
    subtabs.appendChild(button);
  });

  const setText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  };

  setText("#memory-axis-label", group.label);
  setText("#memory-title", activeItem.title);
  setText("#memory-summary", activeItem.summary);
  setText("#memory-trigger", activeItem.trigger);
  setText("#memory-metric", activeItem.metric);
  setText("#memory-paper-caption", activeItem.caption);

  const video1 = document.querySelector("#memory-video-1");
  const video2 = document.querySelector("#memory-video-2");
  const score1 = document.querySelector("#memory-score-1");
  const score2 = document.querySelector("#memory-score-2");

  if (video1 && activeItem.video1) {
    video1.src = activeItem.video1;
  }
  if (video2 && activeItem.video2) {
    video2.src = activeItem.video2;
  }
  if (score1) {
    score1.textContent = activeItem.score1 ? `Score: ${activeItem.score1}` : "Score: N/A";
  }
  if (score2) {
    score2.textContent = activeItem.score2 ? `Score: ${activeItem.score2}` : "Score: N/A";
  }
}

document.querySelectorAll(".axis-tab").forEach((button) => {
  button.addEventListener("click", () => renderQualitative(button.dataset.axis));
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

// Table Sorting functionality
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
      // Update active state
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.dataset.target; // "all", "text", "action"
      
      if (target === "all") {
        table.classList.add("hide-ranks");
      } else {
        table.classList.remove("hide-ranks");
      }

      const rows = Array.from(tbody.querySelectorAll("tr"));

      rows.forEach(row => {
        // The setting type is in the second column (index 1)
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
