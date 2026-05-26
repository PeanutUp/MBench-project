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

const QUALITATIVE = {
  entity: {
    label: "Entity Consistency",
    focus: "entity",
    caseImage: "assets/case-entity.png",
    caseAlt: "Entity consistency failure case from the MBench paper",
    items: [
      {
        key: "geometry",
        label: "Object Geometry",
        title: "Object Geometry Consistency",
        summary: "Tests whether the geometric structure of a target object is preserved after departure-return camera motion.",
        trigger: "Trigger: object exits and re-enters the FoV",
        metric: "Metric: SSIM on SAM2 object masks",
        paperCaption: "Figure 2 entity case: the bowl pattern and visible structure change after the memory challenge."
      },
      {
        key: "texture",
        label: "Object Texture",
        title: "Object Texture Consistency",
        summary: "Measures whether color, texture, and fine-grained object patterns stay invariant across long temporal gaps.",
        trigger: "Trigger: occlusion or camera re-entry",
        metric: "Metric: DINOv2 cosine similarity over SAM2 masks",
        paperCaption: "Figure 2 entity case: object-level memory reveals texture and pattern drift."
      },
      {
        key: "identity",
        label: "Human Identity",
        title: "Human Identity Consistency",
        summary: "Checks whether a human subject remains recognizable as the same person across sampled frames and temporal gaps.",
        trigger: "Trigger: human motion, occlusion, or re-entry",
        metric: "Metric: ArcFace track-centroid similarity",
        paperCaption: "Entity consistency covers both object memory and human-specific identity preservation."
      },
      {
        key: "appearance",
        label: "Human Appearance",
        title: "Human Appearance Consistency",
        summary: "Evaluates whether clothing, hairstyle, accessories, and full-body appearance remain stable over the rollout.",
        trigger: "Trigger: human leaves/re-enters or is temporarily occluded",
        metric: "Metric: DINOv2 full-body feature consistency",
        paperCaption: "Human appearance is evaluated separately from face identity to catch holistic visual drift."
      }
    ]
  },
  environment: {
    label: "Environment Consistency",
    focus: "environment",
    caseImage: "assets/case-environment.png",
    caseAlt: "Environment consistency failure case from the MBench paper",
    items: [
      {
        key: "epipolar",
        label: "Epipolar",
        title: "Epipolar Geometry Consistency",
        summary: "Evaluates whether non-adjacent views obey stable relative camera geometry during long-range camera motion.",
        trigger: "Trigger: camera departure-return",
        metric: "Metric: epipolar geometry error",
        paperCaption: "Figure 2 environment case: scene layout changes after the model revisits the space."
      },
      {
        key: "reprojection",
        label: "Reprojection",
        title: "Reprojection Consistency",
        summary: "Checks whether triangulated 3D points project back to consistent 2D observations across revisited views.",
        trigger: "Trigger: similar camera poses at distant times",
        metric: "Metric: reprojection error",
        paperCaption: "Spatial consistency includes both relative epipolar constraints and absolute reprojection fidelity."
      },
      {
        key: "lighting",
        label: "Lighting",
        title: "Lighting Consistency",
        summary: "Measures stability of global brightness, color temperature, color distribution, and shadow structure.",
        trigger: "Trigger: scene revisit under departure-return motion",
        metric: "Metric: illumination and color-shift deviation",
        paperCaption: "Rendering consistency targets lighting and color stability independent of geometry."
      },
      {
        key: "style",
        label: "Style",
        title: "Rendering Style Consistency",
        summary: "Checks whether the generated video keeps a coherent visual style instead of drifting frame by frame.",
        trigger: "Trigger: long continuous rollout",
        metric: "Metric: Gram matrix distance",
        paperCaption: "Environment memory also monitors rendering properties such as lighting and style."
      }
    ]
  },
  causal: {
    label: "Causal Consistency",
    focus: "causal",
    caseImage: "assets/case-causal.png",
    caseAlt: "Causal consistency failure case from the MBench paper",
    items: [
      {
        key: "progress",
        label: "State Progress",
        title: "Progress Trigger",
        summary: "Evaluates whether an expected off-screen physical or semantic event actually happens during generation.",
        trigger: "Trigger: event progresses outside the FoV",
        metric: "Metric: VLM progress trigger score",
        paperCaption: "Figure 2 causal case: state evolution is not remembered after the off-screen interval."
      },
      {
        key: "correctness",
        label: "Evolution",
        title: "Evolution Correctness",
        summary: "Checks whether triggered dynamics follow physical laws and causal logic rather than arbitrary changes.",
        trigger: "Trigger: state transition is actuated",
        metric: "Metric: gated VLM correctness score",
        paperCaption: "Self-evolution requires both event actuation and physically sound progression."
      },
      {
        key: "text",
        label: "Text",
        title: "Text-conditioned Interaction",
        summary: "Measures whether sequential text prompts are followed and sustained across continuous video segments.",
        trigger: "Trigger: multi-segment text instruction",
        metric: "Metric: OpenCLIP text-video similarity",
        paperCaption: "Interaction consistency measures whether external prompts are remembered and propagated."
      },
      {
        key: "action",
        label: "Action",
        title: "Action-conditioned Interaction",
        summary: "Evaluates whether an action-conditioned model follows prescribed camera movement instructions.",
        trigger: "Trigger: exit-wait-reenter action sequence",
        metric: "Metric: 6-DoF twist cosine alignment",
        paperCaption: "Action-conditioned interaction uses an exit-wait-reenter paradigm to stress memory."
      }
    ]
  }
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
  setText("#memory-trigger", activeItem.trigger.replace(/^Trigger:\s*/, ""));
  setText("#memory-metric", activeItem.metric.replace(/^Metric:\s*/, ""));
  setText("#memory-paper-caption", activeItem.paperCaption);

  const caseImage = document.querySelector("#memory-case-image");
  if (caseImage) {
    caseImage.src = group.caseImage;
    caseImage.alt = group.caseAlt;
  }
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    renderLeaderboard(button.dataset.tab);
  });
});

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

renderLeaderboard("text");
renderQualitative("entity");
