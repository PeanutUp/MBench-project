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
        caption: "A geometry memory failure appears when the object returns with warped shape or missing structure."
      },
      {
        key: "texture",
        label: "Object Texture",
        title: "Object Texture Consistency",
        summary: "Measures whether object color, texture, material cues, and fine-grained patterns remain invariant across long temporal gaps.",
        trigger: "The target object is occluded or revisited after camera movement.",
        metric: "DINOv2 features are extracted from SAM 2 masks and compared against the global object-track centroid.",
        caption: "Texture consistency catches cases where the object category remains but the remembered details drift."
      },
      {
        key: "identity",
        label: "Human Identity",
        title: "Human Identity Consistency",
        summary: "Checks whether a human subject remains recognizable as the same person across sampled frames, occlusions, and temporal gaps.",
        trigger: "A human face appears across non-adjacent frames after motion, occlusion, or re-entry.",
        metric: "ArcFace embeddings are tracked with rolling-average matching and scored by centroid-based cosine similarity.",
        caption: "Identity consistency is evaluated separately because human subjects require persistent facial identity, not just visual similarity."
      },
      {
        key: "appearance",
        label: "Human Appearance",
        title: "Human Appearance Consistency",
        summary: "Evaluates whether clothing, hairstyle, accessories, and holistic full-body appearance remain stable over long-horizon generation.",
        trigger: "A person leaves view, is temporarily occluded, or is revisited in a later segment.",
        metric: "SAM 2 full-body masks and DINOv2 semantic embeddings measure appearance invariance across the subject track.",
        caption: "Appearance consistency catches clothing, accessory, and body-level drift that may occur even when identity is preserved."
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
        caption: "Epipolar errors reveal spatial memory failures that are not visible from local frame quality alone."
      },
      {
        key: "reprojection",
        label: "Reprojection",
        title: "Reprojection Consistency",
        summary: "Measures whether triangulated 3D points project back to consistent 2D observations across revisited views.",
        trigger: "Two distant frames provide comparable non-adjacent views for spatial reconstruction.",
        metric: "Matched points are triangulated using DA3 camera parameters and scored by 3D-to-2D reprojection error.",
        caption: "Reprojection consistency tests whether the generated scene returns to the same 3D configuration."
      },
      {
        key: "lighting",
        label: "Lighting",
        title: "Lighting Consistency",
        summary: "Quantifies stability of global brightness, color temperature, color distribution, and shadow structure across corresponding segments.",
        trigger: "A scene is revisited after a departure-return trajectory.",
        metric: "CIELAB lightness maps and color-channel means are compared with a weighted illumination and color-shift deviation.",
        caption: "Lighting consistency detects unsupported changes in illumination when the model revisits a remembered scene."
      },
      {
        key: "style",
        label: "Style",
        title: "Style Consistency",
        summary: "Checks whether the overall visual style remains coherent instead of drifting across neighboring frames or long rollouts.",
        trigger: "The model generates a continuous long-horizon rollout.",
        metric: "VGG feature Gram matrices are compared with Frobenius distance to measure style changes through time.",
        caption: "Style consistency separates global rendering drift from geometric or entity-level memory errors."
      }
    ]
  },
  causal: {
    label: "Causal Consistency",
    image: "assets/case-causal.png",
    alt: "Causal consistency case from MBench",
    items: [
      {
        key: "state",
        label: "State Evolution",
        title: "State Evolution",
        summary: "Evaluates whether an expected off-screen physical or semantic event is actually initiated during generation.",
        trigger: "A prompt describes a process that should progress while the relevant region is outside the field of view.",
        metric: "A VLM assigns a normalized state-evolution score indicating whether the hidden process is untriggered or fully actuated.",
        caption: "State evolution prevents a model from receiving credit when the world simply returns unchanged."
      },
      {
        key: "correctness",
        label: "Correctness",
        title: "Evolution Correctness",
        summary: "Assesses whether the triggered dynamic process follows real-world physical laws and causal logic.",
        trigger: "The hidden event has visibly progressed after re-entry.",
        metric: "A VLM correctness score is softly gated by state-evolution strength, so untriggered events cannot score highly.",
        caption: "Evolution correctness rewards videos that both trigger the event and preserve plausible causal consequences."
      },
      {
        key: "text",
        label: "Text Instruction",
        title: "Text-conditioned Interaction",
        summary: "Measures whether sequential text prompts are followed and sustained across continuous video segments.",
        trigger: "A multi-segment continuation prompt specifies what should happen or remain present later in the rollout.",
        metric: "OpenCLIP cosine similarity is macro-averaged between segment prompts and sampled frame embeddings.",
        caption: "Text interaction tests whether external instructions are remembered and propagated over time."
      },
      {
        key: "action",
        label: "Action Instruction",
        title: "Action-conditioned Interaction",
        summary: "Evaluates whether an action-conditioned world model follows prescribed camera movement instructions.",
        trigger: "An exit-wait-reenter action sequence moves the camera away from and back to a target entity.",
        metric: "DA3-estimated camera extrinsics are converted to 6-DoF twists and compared with target action directions by cosine alignment.",
        caption: "Action interaction exposes whether the model responds to control signals rather than producing generic plausible motion."
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

  const caseImage = document.querySelector("#memory-case-image");
  if (caseImage) {
    caseImage.src = group.image;
    caseImage.alt = group.alt;
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

renderQualitative("entity");
