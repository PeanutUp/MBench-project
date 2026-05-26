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
        metricCopy: "The paper compares viewpoint-aligned fold pairs and scores structure preservation inside the target mask.",
        referenceCopy: "Object shape before exit",
        generatedCopy: "Shape after re-entry",
        referenceNote: "The initial frame establishes the object silhouette and visible structure.",
        generatedNote: "A memory failure appears when the object returns with warped or missing geometry.",
        paperCaption: "Figure 2 entity case: the bowl pattern and visible structure change after the memory challenge."
      },
      {
        key: "texture",
        label: "Object Texture",
        title: "Object Texture Consistency",
        summary: "Measures whether color, texture, and fine-grained object patterns stay invariant across long temporal gaps.",
        trigger: "Trigger: occlusion or camera re-entry",
        metric: "Metric: DINOv2 cosine similarity over SAM2 masks",
        metricCopy: "Masked object features are compared with the global track centroid to detect long-horizon texture drift.",
        referenceCopy: "Texture before occlusion",
        generatedCopy: "Texture after re-entry",
        referenceNote: "Fine-grained markings and material cues are visible before the object leaves view.",
        generatedNote: "A failure occurs when the returned object keeps the category but forgets detailed texture.",
        paperCaption: "Figure 2 entity case: object-level memory reveals texture and pattern drift."
      },
      {
        key: "identity",
        label: "Human Identity",
        title: "Human Identity Consistency",
        summary: "Checks whether a human subject remains recognizable as the same person across sampled frames and temporal gaps.",
        trigger: "Trigger: human motion, occlusion, or re-entry",
        metric: "Metric: ArcFace track-centroid similarity",
        metricCopy: "Face embeddings are matched through a rolling-average track and compared with the identity centroid.",
        referenceCopy: "Identity anchor",
        generatedCopy: "Identity after gap",
        referenceNote: "The subject identity is anchored by early face observations.",
        generatedNote: "The model should avoid gradual identity drift or subject replacement.",
        paperCaption: "Entity consistency covers both object memory and human-specific identity preservation."
      },
      {
        key: "appearance",
        label: "Human Appearance",
        title: "Human Appearance Consistency",
        summary: "Evaluates whether clothing, hairstyle, accessories, and full-body appearance remain stable over the rollout.",
        trigger: "Trigger: human leaves/re-enters or is temporarily occluded",
        metric: "Metric: DINOv2 full-body feature consistency",
        metricCopy: "SAM2 full-body masks and semantic features quantify holistic appearance retention.",
        referenceCopy: "Appearance anchor",
        generatedCopy: "Appearance after challenge",
        referenceNote: "Clothing and visual attributes are established before the memory trigger.",
        generatedNote: "A failure appears when the same person returns with altered clothing or attributes.",
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
        metricCopy: "DA3-estimated poses define fundamental matrices for non-adjacent frame-pair checks.",
        referenceCopy: "Scene layout before motion",
        generatedCopy: "Layout after revisit",
        referenceNote: "The first view fixes the room structure and object placement.",
        generatedNote: "A failure occurs when layout geometry no longer matches the revisited viewpoint.",
        paperCaption: "Figure 2 environment case: scene layout changes after the model revisits the space."
      },
      {
        key: "reprojection",
        label: "Reprojection",
        title: "Reprojection Consistency",
        summary: "Checks whether triangulated 3D points project back to consistent 2D observations across revisited views.",
        trigger: "Trigger: similar camera poses at distant times",
        metric: "Metric: reprojection error",
        metricCopy: "The score uses 3D points triangulated from matched non-adjacent views and DA3 camera parameters.",
        referenceCopy: "Original 3D arrangement",
        generatedCopy: "Reprojected arrangement",
        referenceNote: "Spatial anchors are established before camera movement.",
        generatedNote: "The model should remember the same layout rather than inventing a shifted room.",
        paperCaption: "Spatial consistency includes both relative epipolar constraints and absolute reprojection fidelity."
      },
      {
        key: "lighting",
        label: "Lighting",
        title: "Lighting Consistency",
        summary: "Measures stability of global brightness, color temperature, color distribution, and shadow structure.",
        trigger: "Trigger: scene revisit under departure-return motion",
        metric: "Metric: illumination and color-shift deviation",
        metricCopy: "CIELAB lightness maps and color-channel means are compared between corresponding segments.",
        referenceCopy: "Original illumination",
        generatedCopy: "Lighting after revisit",
        referenceNote: "The initial frames define brightness, shadows, and color temperature.",
        generatedNote: "A failure appears when lighting changes without a causal reason.",
        paperCaption: "Rendering consistency targets lighting and color stability independent of geometry."
      },
      {
        key: "style",
        label: "Style",
        title: "Rendering Style Consistency",
        summary: "Checks whether the generated video keeps a coherent visual style instead of drifting frame by frame.",
        trigger: "Trigger: long continuous rollout",
        metric: "Metric: Gram matrix distance",
        metricCopy: "VGG feature Gram matrices measure style changes across neighboring frames.",
        referenceCopy: "Style context",
        generatedCopy: "Style after rollout",
        referenceNote: "The first segment establishes visual rendering style.",
        generatedNote: "The model should not switch texture style or image statistics over time.",
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
        metricCopy: "A VLM judges whether the described process is untriggered or fully actuated after re-entry.",
        referenceCopy: "Event before hidden interval",
        generatedCopy: "State after hidden interval",
        referenceNote: "The initial state and expected process are established by the prompt.",
        generatedNote: "A failure occurs when the scene returns unchanged despite the required event.",
        paperCaption: "Figure 2 causal case: state evolution is not remembered after the off-screen interval."
      },
      {
        key: "correctness",
        label: "Evolution",
        title: "Evolution Correctness",
        summary: "Checks whether triggered dynamics follow physical laws and causal logic rather than arbitrary changes.",
        trigger: "Trigger: state transition is actuated",
        metric: "Metric: gated VLM correctness score",
        metricCopy: "Correctness is softly gated by trigger strength so untriggered events cannot receive high scores.",
        referenceCopy: "Physical setup",
        generatedCopy: "Evolved state",
        referenceNote: "The scene contains an event expected to progress naturally.",
        generatedNote: "The resulting state should be physically plausible and causally connected.",
        paperCaption: "Self-evolution requires both event actuation and physically sound progression."
      },
      {
        key: "text",
        label: "Text",
        title: "Text-conditioned Interaction",
        summary: "Measures whether sequential text prompts are followed and sustained across continuous video segments.",
        trigger: "Trigger: multi-segment text instruction",
        metric: "Metric: OpenCLIP text-video similarity",
        metricCopy: "Frame embeddings are compared with the corresponding prompt embedding for each segment.",
        referenceCopy: "Instruction context",
        generatedCopy: "Prompt-aligned segment",
        referenceNote: "The prompt specifies what should appear or happen in a later segment.",
        generatedNote: "The model should remember and maintain the instruction across rollout boundaries.",
        paperCaption: "Interaction consistency measures whether external prompts are remembered and propagated."
      },
      {
        key: "action",
        label: "Action",
        title: "Action-conditioned Interaction",
        summary: "Evaluates whether an action-conditioned model follows prescribed camera movement instructions.",
        trigger: "Trigger: exit-wait-reenter action sequence",
        metric: "Metric: 6-DoF twist cosine alignment",
        metricCopy: "DA3-estimated camera extrinsics are converted into frame-wise twists and compared with the target action.",
        referenceCopy: "Action path begins",
        generatedCopy: "Action path returns",
        referenceNote: "The action sequence moves the camera away from the target entity.",
        generatedNote: "The model should return along the intended path and preserve the hidden world state.",
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
  setText("#memory-metric-copy", activeItem.metricCopy);
  setText("#memory-reference-copy", activeItem.referenceCopy);
  setText("#memory-generated-copy", activeItem.generatedCopy);
  setText("#memory-reference-note", activeItem.referenceNote);
  setText("#memory-generated-note", activeItem.generatedNote);
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
